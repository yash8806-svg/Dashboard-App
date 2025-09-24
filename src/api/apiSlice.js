import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"https://fakestoreapi.com/"}),
    endpoints: (builder) => ({
       getOrders:builder.query({query:()=>"/carts"}),
       getUsers:builder.query({query:()=>"/users"}),
       getProducts:builder.query({query:()=>"/products"})
    }),
});

export const {useGetOrdersQuery,useGetUsersQuery,useGetProductsQuery} = apiSlice;