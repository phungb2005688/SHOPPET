import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber, category, brand }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber, category, brand },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
    
    // getProducts: builder.query({
    //   query: ({ keyword, pageNumber }) => ({
    //     url: PRODUCTS_URL,
    //     params: { keyword, pageNumber },
    //   }),
    //   keepUnusedDataFor: 5,
    //   providesTags: ['Products'],
    // }),
    // getFilteredProducts: builder.query({
    //   query: ({ keyword, pageNumber, category, brand }) => ({
    //     url: `${PRODUCTS_URL}/filtered`,
    //     params: { keyword, pageNumber, category, brand },
    //   }),
    //   keepUnusedDataFor: 5,
    //   providesTags: ['Products'],
    // }),
    getCategoriesAndBrands: builder.query({
      query: () => `${PRODUCTS_URL}/categories-brands`,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['Product'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  // useGetFilteredProductsQuery,
  useGetCategoriesAndBrandsQuery,
} = productsApiSlice;
