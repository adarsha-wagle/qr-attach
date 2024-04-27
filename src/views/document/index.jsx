import React from 'react';
import { Box } from '@mui/material';
import { HourGlassLoader } from 'src/components/ui/loaders';
import { useFetchDocumentsQuery } from 'src/redux/api/document_api_slice';

import DocumentTable from './components/document_table';
import UploadDocument from './components/upload_document';
// import AddDocument from './components/add_document';

function DocumentView() {
  const { isLoading, isSuccess, isError, error } = useFetchDocumentsQuery();

  console.log('is loading', isLoading, isSuccess, isError, error);

  return (
    <Box>
      <UploadDocument />
      <br />
      {isLoading ? (
        <Box
          sx={{ height: '20rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <HourGlassLoader />
        </Box>
      ) : (
        <DocumentTable />
      )}
    </Box>
  );
}

export default DocumentView;
