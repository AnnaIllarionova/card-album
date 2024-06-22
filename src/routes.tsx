import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main-page/main-page";
import { CardPage } from "./pages/card-page/card-page";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} >
      <Route path="card/:cardID" element={<CardPage />}/>
      </Route>
    </Routes>
  );
};
