import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://jsonplaceholder.typicode.com/",
});

export const allCards = createApi({
  reducerPath: "allCards",
  baseQuery,
  endpoints: (builder) => ({
    getAllCards: builder.query({
      query: () => ({
        url: "/photos?_limit=10",
      }),
    }),
    deleteCard: builder.mutation({
      query: ({ id }) => ({
        url: `/photos/${id}`,
        method: "DELETE",
      }),
    }),
    getCurrentCard: builder.query({
      query: ({ id }) => `/photos/${id}`,
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useDeleteCardMutation,
  useGetCurrentCardQuery,
} = allCards;
