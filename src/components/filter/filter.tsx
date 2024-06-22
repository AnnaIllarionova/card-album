import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredArr } from "../../services/slices";
import { useGetAllCardsQuery } from "../../services/api";
import { RootState } from "../../services/store";

export const Filter = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllCardsQuery(undefined);
  const likedArr = useSelector((state: RootState) => state.cards.likedArr);
  const isFiltered = useSelector((state: RootState) => state.cards.isFiltered);
  const cardsAlbum = useSelector((state: RootState) => state.cards.cardsAlbum);

  const handleFilter = () => {
    if (data) {
    dispatch(getFilteredArr({ album: cardsAlbum, likedArr: likedArr }));
    }
  };

  return (
    <div className="filter">
      <h3 className="filter__text">Показать:</h3>
      <button className="filter__button" onClick={handleFilter}>
        {isFiltered ? "все" : "понравившиеся"}
      </button>
    </div>
  );
};
