import { configureStore } from "@reduxjs/toolkit";
import { allCards } from "./api";
import cardsSlice from "./slices";

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
    [allCards.reducerPath]: allCards.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allCards.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
