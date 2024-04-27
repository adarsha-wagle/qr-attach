import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, Stack, TextField, Typography, Button } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// ----------------------------------------------------------------------

function DocumentInfoPopup({ handleSaveToDb, isLoading }) {
  const [documentTitle, setDocumentTitle] = useState('');
  const [letterNumber, setLetterNumber] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date(issuedDate?.$d);

    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Adding leading zeros if necessary (well not necessary but this is how backend accepting)
    // eslint-disable-next-line
    month = month < 10 ? '0' + month : month;
    // eslint-disable-next-line
    day = day < 10 ? '0' + day : day;

    const formattedDate = `${year}-${month}-${day}`;

    const documentInfo = {
      documentTitle,
      letterNumber,
      referenceNumber,
      issuedDate: formattedDate,
    };

    handleSaveToDb(documentInfo);
  };

  return (
    <Card
      sx={{
        width: '100%',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Fill document Details
        </Typography>

        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            name="documentTitle"
            label="Document Title"
            fullWidth
            required
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
          />
          <TextField
            name="referenceNumber"
            label="Reference Number"
            fullWidth
            required
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
          />
          <TextField
            name="letterNumber"
            label="Letter Number"
            fullWidth
            required
            value={letterNumber}
            onChange={(e) => setLetterNumber(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Issued Date"
              views={['year', 'month', 'day']}
              onChange={(newValue) => {
                setIssuedDate(newValue);
              }}
              slotProps={{ textField: { variant: 'outlined' } }}
            />
          </LocalizationProvider>
        </Stack>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          sx={{ my: 3 }}
          disabled={isLoading}
          startIcon={<CloudUploadIcon />}
        >
          {isLoading ? 'Uploading' : 'Upload'}
        </Button>
      </form>
    </Card>
  );
}

export default React.memo(DocumentInfoPopup);

DocumentInfoPopup.propTypes = {
  handleSaveToDb: PropTypes.func,
  isLoading: PropTypes.bool,
};
