import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Card } from "../components/cards-list/card-list";

export interface MyState {
  cardsAlbum: Card[];
  chosenCard: Card | null;
  filteredCards: Card[];
  likedArr: number[];
  isFiltered: boolean;
}

interface IGetFilteredArr {
  album: Card[];
  likedArr: number[];
}

const initialState: MyState = {
  cardsAlbum: [],
  chosenCard: null,
  filteredCards: [],
  likedArr: [],
  isFiltered: false,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCardAlbum: (state, action: PayloadAction<Card[]>) => {
      state.cardsAlbum = action.payload;
    },
    setChosenCard: (state, action: PayloadAction<Card>) => {
      state.chosenCard = action.payload;
    },
    setLikedArr: (state, action: PayloadAction<Card["id"]>) => {
      if (state.likedArr.includes(action.payload)) {
        state.likedArr = state.likedArr.filter((id) => id !== action.payload);
      } else {
        state.likedArr.push(action.payload);
      }

      if (state.isFiltered) {
        state.filteredCards = state.cardsAlbum.filter((card) =>
          state.likedArr.includes(card.id)
        );
      }
    },
    getFilteredArr: (state, action: PayloadAction<IGetFilteredArr>) => {
      state.isFiltered = !state.isFiltered;
      state.cardsAlbum = action.payload.album;
      state.likedArr = action.payload.likedArr;
      // if (state.isFiltered) {
        state.filteredCards = state.cardsAlbum.filter((card) =>
          state.likedArr.includes(card.id)
        );
      // } else {
      //   state.filteredCards = state.cardsAlbum;
      // }
    },
    deleteChosenCard: (state, action: PayloadAction<Card["id"]>) => {
      state.cardsAlbum = state.cardsAlbum.filter(
        (card) => card.id !== action.payload
      );

      state.filteredCards = state.filteredCards.filter(
        (card) => card.id !== action.payload
      );

      state.likedArr = state.likedArr.filter((id) => id !== action.payload);
    },
  },
});

export const {
  setCardAlbum,
  setChosenCard,
  getFilteredArr,
  setLikedArr,
  deleteChosenCard,
} = cardsSlice.actions;
export default cardsSlice.reducer;
