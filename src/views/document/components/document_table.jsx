import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogContent, Box } from '@mui/material';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { selectAllDocuments } from 'src/redux/api/document_api_slice';

import DeletePopup from 'src/components/popup/delete_popup';
import { useSelector } from 'react-redux';

export default function DocumentTable() {
  const [selectedTitle, setSelectedTitle] = React.useState('');

  const [isdeletePopupOpen, setIsdeletePopupOpen] = React.useState(false);

  const documents = useSelector((state) => selectAllDocuments(state));

  console.log('documents', documents);
  const handleDeleteClick = () => {};

  const handleDownloadWithQr = () => {};

  const handleDownloadWithoutQr = () => {};

  const openDeleteDialog = (e, row) => {
    console.log('row', row);
    setSelectedTitle(row?.documentTitle);
    setIsdeletePopupOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsdeletePopupOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'documentTitle',
      headerName: 'Document Title',
      width: 200,
      editable: true,
    },
    {
      field: 'created',
      headerName: 'Created',
      width: 200,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 150,
      editable: true,
    },
    {
      field: 'deleteButton',
      headerName: 'Actions',
      description: 'Actions column.',
      sortable: false,
      width: 400,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="error"
            onClick={(e) => openDeleteDialog(e, params.row)}
            variant="contained"
          >
            Delete
          </Button>
          <Button
            onClick={(e) => handleDownloadWithoutQr(e, params.row)}
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            sx={{ backgroundColor: 'primary' }}
          >
            With Qr
          </Button>
          <Button
            onClick={(e) => handleDownloadWithQr(e, params.row)}
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            sx={{ backgroundColor: 'primary' }}
          >
            Without Qr
          </Button>
        </Box>
      ),
    },
  ];

  const rows = [
    { id: 1, documentTitle: 'Snow', created: 'Jon', status: 35, author: 'Ram' },
    { id: 2, documentTitle: 'Lannister', created: 'Cersei', status: 42, author: 'Ram' },
    { id: 3, documentTitle: 'Lannister', created: 'Jaime', status: 45, author: 'Ram' },
    { id: 4, documentTitle: 'Stark', created: 'Arya', status: 16, author: 'Ram' },
    { id: 5, documentTitle: 'Targaryen', created: 'Daenerys', status: null, author: 'Ram' },
    { id: 6, documentTitle: 'Melisandre', created: null, status: 150, author: 'Ram' },
    { id: 7, documentTitle: 'Clifford', created: 'Ferrara', status: 44, author: 'Ram' },
    { id: 8, documentTitle: 'Frances', created: 'Rossini', status: 36, author: 'Ram' },
    { id: 9, documentTitle: 'Roxie', created: 'Harvey', status: 65, author: 'Ram' },
  ];

  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pstatusSize={5} rowsPerPstatusOptions={[5]} />
      </Box>
      <Dialog open={isdeletePopupOpen} onClose={closeDeleteDialog}>
        <DialogContent>
          <DeletePopup
            deleteMessage={selectedTitle}
            handleDeleteClick={handleDeleteClick}
            handleCloseClick={closeDeleteDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
