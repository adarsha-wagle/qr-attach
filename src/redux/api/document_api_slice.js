import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const documentsAdapter = createEntityAdapter({
  // eslint-disable-next-line
  // sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
});

const initialState = documentsAdapter.getInitialState();

export const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDocuments: builder.query({
      query: () => '/documents',
      validateStatus: (response, result) => response.status === 200 && !result.isError,

      transformResponse: (responseData) => documentsAdapter.setAll(initialState, responseData.data),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Document', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Document', id })),
          ];
        }
        return [{ type: 'Document', id: 'LIST' }];
      },
    }),
    addNewDocument: builder.mutation({
      query: (formData) => ({
        url: '/documents',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Document', id: 'LIST' }],
    }),

    deleteDocumentById: builder.mutation({
      query: (id) => ({
        url: `/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Document', id: arg.id }],
    }),
  }),
});

export const { useFetchDocumentsQuery, useAddNewDocumentMutation, useDeleteDocumentByIdMutation } =
  documentApiSlice;

// returns the query result object
export const selectDocumentResult = documentApiSlice.endpoints.fetchDocuments.select();

// creates memoized selector
const selectDocumentsData = createSelector(
  selectDocumentResult,
  (documentResult) => documentResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllDocuments,
  selectById: selectDocumentById,
  selectIds: selectDocumentIds,
  // Pass in a selector that returns the notes slice of state
} = documentsAdapter.getSelectors((state) => selectDocumentsData(state) ?? initialState);
