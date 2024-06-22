import { Outlet } from "react-router-dom";
import { CardsList } from "../../components/cards-list/card-list";
import { Filter } from "../../components/filter/filter";

export const MainPage = () => {
  return (
    <div>
      <h1 className="App_title">Палитра цветов</h1>
      <Filter />
      <CardsList />
      <Outlet />
    </div>
  );
};
