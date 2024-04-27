import React from 'react';
import { Box } from '@mui/material';

import { useFetchDocumentsQuery } from 'src/redux/api/document_api_slice';

import DocumentTable from './components/document_table';
import UploadDocument from './components/upload_document';
// import AddDocument from './components/add_document';

function DocumentView() {
  const { data, isLoading, isSuccess, isError, error } = useFetchDocumentsQuery();

  console.log('is loading', isLoading, isSuccess, data, isError, error);

  return (
    <Box>
      <UploadDocument />
      <br />
      <DocumentTable />
      {/* <AddDocument /> */}
    </Box>
  );
}

export default DocumentView;
