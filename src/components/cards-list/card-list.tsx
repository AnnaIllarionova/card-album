import { useDeleteCardMutation, useGetAllCardsQuery } from "../../services/api";
import "./card-list.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChosenCard,
  setCardAlbum,
  setChosenCard,
  setLikedArr,
} from "../../services/slices";
import { RootState } from "../../services/store";
import { useNavigate } from "react-router-dom";
import React from "react";

export interface Card {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

interface IOneCard {
  card: Card;
}

export const CardsList = () => {
  const { data, isLoading, error } = useGetAllCardsQuery(undefined);
  // console.log(data);
  const dispatch = useDispatch();
  const cardsAlbum = useSelector((state: RootState) => state.cards.cardsAlbum);

  React.useEffect(() => {
    if (data && cardsAlbum.length === 0) {
      dispatch(setCardAlbum(data));
    }
  }, [data, dispatch, cardsAlbum.length]);

  const isFiltered = useSelector((state: RootState) => state.cards.isFiltered);
  const filteredCards = useSelector(
    (state: RootState) => state.cards.filteredCards
  );

  if (isLoading) {
    return <p className="loading">Подождите, палитра загружается</p>;
  }
  if (error) {
    console.log(error);
    return <p className="error">Что-то пошло не так...</p>;
  }

  console.log("cardsArr", cardsAlbum);
  console.log("filteredArr", filteredCards);

  return (
    <div className="cards">
      {isFiltered
        ? filteredCards.map((card: Card) => (
            <OneCard card={card} key={card.id} />
          ))
        :
          cardsAlbum.map((card: Card) => <OneCard card={card} key={card.id} />)}
    </div>
  );
};

export const OneCard = ({ card }: IOneCard) => {
  const [deleteCard, { isLoading: deleteIsLoading, error: deleteError }] =
    useDeleteCardMutation();
  // console.log("deleteError", deleteError);
  const dispatch = useDispatch();
  const chosenCard = useSelector((state: RootState) => state.cards.chosenCard);
  const likedArr = useSelector((state: RootState) => state.cards.likedArr);

  const handleChangeLike = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    cardId: number
  ) => {
    e.stopPropagation();
    dispatch(setLikedArr(cardId));
  };

  const handleDeleteCard = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    card: Card
  ) => {
    e.stopPropagation();

    dispatch(setChosenCard(card));
    try {
      await deleteCard({ id: card.id });
      dispatch(deleteChosenCard(card.id));
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleOpenCard = () => {
    navigate(`/card/${card.id}`);
  };

  return (
    <div className="cards__item" onClick={handleOpenCard}>
      <img className="cards__item_image" src={card.url} alt="card" />
      <p className="cards__item_text">{card.title}</p>
      <div className="cards__icons">
        <svg
          className="cards__icons_delete"
          onClick={(e) => handleDeleteCard(e, card)}
        >
          <use xlinkHref="/img/sprite.svg#icon-delete"></use>
        </svg>
        <svg
          className={
            likedArr.includes(card.id)
              ? "cards__icons_like"
              : "cards__icons_dislike"
          }
          onClick={(e) => handleChangeLike(e, card.id)}
        >
          <use xlinkHref="/img/sprite.svg#icon-like"></use>
        </svg>
      </div>
      {deleteIsLoading && chosenCard?.id === card.id && (
        <p>Подождите, удаляем...</p>
      )}
      {deleteError && chosenCard?.id === card.id && (
        <p>Что-то пошло не так, попробуйте еще раз</p>
      )}
    </div>
  );
};
