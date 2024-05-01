import { apiSlice } from './apiSlice';
import { CATE_BLOG_URL } from '../constants'; 

export const categoryBlogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategoryBlog: builder.mutation({
      query: (data) => ({
        url: `${CATE_BLOG_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CategoryBlog'],
    }),
    getCategoryBlogDetails: builder.query({
      query: (categoryBlogId) => ({
        url: `${CATE_BLOG_URL}/${categoryBlogId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateCategoryBlog: builder.mutation({
      query: (data) => ({
        url: `${CATE_BLOG_URL}/${data.categoryBlogId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CategoriesBlog'],
    }),
    deleteCategoryBlog: builder.mutation({
      query: (categoryBlogId) => ({
        url: `${CATE_BLOG_URL}/${categoryBlogId}`,
        method: 'DELETE',
      }),
      providesTags: ['CategoryBlog'],
    }),
    getCategoriesBlog: builder.query({
      query: () => ({
        url: CATE_BLOG_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['CategoriesBlog'],
    }),
  }),
});

export const {
  useCreateCategoryBlogMutation,
  useGetCategoryBlogDetailsQuery,
  useUpdateCategoryBlogMutation,
  useDeleteCategoryBlogMutation,
  useGetCategoriesBlogQuery,
} = categoryBlogApiSlice;
