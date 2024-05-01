import { CONTACT_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const contantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: CONTACT_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Contacts'],
    }),
    getContactDetails: builder.query({
      query: (contactId) => ({
        url: `${CONTACT_URL}/${contactId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: `${CONTACT_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),
    getMyContacts: builder.query({
      query: () => ({
        url: `${CONTACT_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateContact: builder.mutation({
      query: (data) => ({
        url: `${CONTACT_URL}/${data.contactId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `${CONTACT_URL}/${contactId}`,
        method: 'DELETE',
      }),
      providesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactDetailsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useGetMyContactsQuery,
} = contantsApiSlice;


// import { apiSlice } from './apiSlice';
// import { CONTACT_URL } from '../constants';

// export const contactsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createContact: builder.mutation({
//       query: (data) => ({
//         url: CONTACT_URL,
//         method: 'POST',
//         body: data,
//       }),
// invalidatesTags: ['Contact'],
//     }),
//     getMyContacts: builder.query({
//       query: () => ({
//         url: `${CONTACT_URL}/mine`,
//       }),
//       keepUnusedDataFor: 5,
//     }),
//     getContactDetails: builder.query({
//       query: (contactId) => ({
//         url: `${CONTACT_URL}/${contactId}`,
//       }),
//       keepUnusedDataFor: 5,
//     }),
//     updateContactStatus: builder.mutation({
//       query: ({ contactId, status }) => ({
//         url: `${CONTACT_URL}/${contactId}/status`,
//         method: 'PUT',
//         body: { status },
//       }),
//     }),

//     getAllContacts: builder.query({
//       query: () => ({
//         url: CONTACT_URL,
//       }),
//       keepUnusedDataFor: 5,
//     }),
//   }),
// });

// export const {
//   useCreateContactMutation,
//   useGetContactDetailsQuery,
//   useUpdateContactStatusMutation,
//   useGetMyContactsQuery,
//   useGetAllContactsQuery,
// } = contactsApiSlice;

// updateContact: builder.mutation({
//   query: (data) => ({
//     url: `${CONTACT_URL}/${data.contactId}`,
//     method: 'PUT',
//     body: data,
//   }),
//   invalidatesTags: ['Contacts'],
// }),
// deleteContact: builder.mutation({
//   query: (contactId) => ({
//     url: `${CONTACT_URL}/${contactId}`,
//     method: 'DELETE',
//   }),
//   providesTags: ['Contact'],
// }),
