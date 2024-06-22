import { Link, useParams } from "react-router-dom";
import { useGetCurrentCardQuery } from "../../services/api";
import "./card-page.css";

export const CardPage = () => {
  const cardID = useParams();
  const idCard = Number(cardID.cardID);
  const { data, isLoading, error } = useGetCurrentCardQuery({ id: idCard });

  return (
    <div className="modal">
      <div className="modal__card">
        {isLoading ? (
          <p className="loading">Подождите, страница загружается</p>
        ) : error ? (
          <p className="error">Что-то пошло не так...</p>
        ) : (
          <>
            <h2 className="modal__card_title">Страница карточки № {data.id}</h2>
            <img src={data.url} alt="color" className="modal__card_img" />
            <p className="modal__card_text">{data.title}</p>
            <Link to="/">
              <button className="modal__card_button">Вернуться назад</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
