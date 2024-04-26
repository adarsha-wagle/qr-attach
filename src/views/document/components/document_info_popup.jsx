import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function DocumentInfoPopup(handleSaveToDb) {
  const [documentTitle, setDocumentTitle] = useState('');
  const [letterNumber, setLetterNumber] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState(new Date());

  const handleSubmit = () => {
    const documentInfo = {
      documentTitle,
      letterNumber,
      referenceNumber,
      issuedDate,
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
              renderInput={(params) => <TextField {...params} />}
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
        >
          Upload
        </Button>
      </form>
    </Card>
  );
}
