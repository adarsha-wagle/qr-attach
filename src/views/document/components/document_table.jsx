import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogContent, Box } from '@mui/material';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import {
  selectAllDocuments,
  useDeleteDocumentByIdMutation,
} from 'src/redux/api/document_api_slice';

import DeletePopup from 'src/components/popup/delete_popup';
import { useSelector } from 'react-redux';
import { throwErrorToast, throwSuccessToast } from 'src/utils/throw_toast';

export default function DocumentTable() {
  const [selectedTitle, setSelectedTitle] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(null);
  const [isdeletePopupOpen, setIsdeletePopupOpen] = React.useState(false);

  const documents = useSelector((state) => selectAllDocuments(state));

  const [deleteDocumentById, { isLoading }] = useDeleteDocumentByIdMutation();

  const handleDeleteClick = async () => {
    try {
      await deleteDocumentById(selectedId)
        .unwrap()
        .then(() => {
          setIsdeletePopupOpen(false);
          setSelectedId(null);
          setSelectedTitle(null);
          throwSuccessToast('Document deleted successfully');
        });
    } catch (err) {
      throwErrorToast(err?.message || 'Unable to delete');
      console.log('error when deleting', err);
    }
  };

  const handleDownloadWithQr = () => {};

  const handleDownloadWithoutQr = () => {};

  const openDeleteDialog = (e, row) => {
    setSelectedTitle(row?.title);
    setSelectedId(row?.id);
    setIsdeletePopupOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsdeletePopupOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      editable: true,
    },
    {
      field: 'letterNumber',
      headerName: 'Letter no.',
      width: 120,
      editable: true,
    },
    {
      field: 'referenceNumber',
      headerName: 'Ref. Number',
      width: 120,
      editable: true,
    },
    {
      field: 'issuedDate',
      headerName: 'Issued Date',
      width: 180,
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

  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={documents} columns={columns} pstatusSize={5} rowsPerPstatusOptions={[5]} />
      </Box>
      <Dialog open={isdeletePopupOpen} onClose={closeDeleteDialog}>
        <DialogContent>
          <DeletePopup
            deleteMessage={selectedTitle}
            handleDeleteClick={handleDeleteClick}
            handleCloseClick={closeDeleteDialog}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
