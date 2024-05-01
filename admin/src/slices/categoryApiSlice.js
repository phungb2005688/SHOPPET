import { apiSlice } from './apiSlice';
import { CATEGORY_URL } from '../constants'; 

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.categoryId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: 'DELETE',
      }),
      providesTags: ['Category'],
    }),
    getCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Categories'],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} = categoryApiSlice;
