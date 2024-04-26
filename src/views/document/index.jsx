import React from 'react';
import { Box } from '@mui/material';

import DocumentTable from './components/document_table';
import UploadDocument from './components/upload_document';
// import AddDocument from './components/add_document';

function DocumentView() {
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
