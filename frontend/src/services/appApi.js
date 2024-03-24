import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//essentially createApi will create a structure for a way to talk to my server api endpoints
// fetchBaseQuery this is the engine that actually performs the http requests

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081" }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "users/signup",
                method: "POST",
                body: user,
            }),
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "users/login",
                method: "POST",
                body: user,
            }),
        }),

        // creating product
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
        }),

        // delete a product
        deleteProduct: builder.mutation({
            query: (product_id, user_id) => ({
                url: `/products/${product_id}`,
                method: "DELETE",
                body: {
                    user_id,
                },
            }),
        }),

        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PATCH",
                body: product,
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = appApi;

export default appApi;
