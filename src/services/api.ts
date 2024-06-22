import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Card } from "../components/cards-list/card-list";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://jsonplaceholder.typicode.com/",
});

export const allCards = createApi({
  reducerPath: "allCards",
  baseQuery,
  endpoints: (builder) => ({
    getAllCards: builder.query<Card[], void>({
      query: () => ({
        url: "/photos?_limit=10",
      }),
    }),
    deleteCard: builder.mutation<Card, number>({
      query: ( id ) => ({
        url: `/photos/${id}`,
        method: "DELETE",
      }),
    }),
    getCurrentCard: builder.query<Card, number>({
      query: ( id ) => `/photos/${id}`,
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useDeleteCardMutation,
  useGetCurrentCardQuery,
} = allCards;
