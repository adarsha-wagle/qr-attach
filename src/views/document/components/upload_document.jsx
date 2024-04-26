import React, { useState } from 'react';
// import { PDFDocument } from 'pdf-lib';
// import html2canvas from 'html2canvas';
// import ReactDOM from 'react-dom/client';
// import { createPortal } from 'react-dom';
// import QRCode from 'qrcode.react';

import { Box, Button } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';

import ClearIcon from '@mui/icons-material/Clear';
import { PDFDocument } from 'pdf-lib';
import QRCode from 'qrcode';

const fileTypes = ['PDF'];

export default function UploadDocument() {
  const [originalFile, setOriginalFile] = useState(null);

  const [modifiedQrFile, setModifiedQrFile] = useState(null);

  const generatePdf = async (fileP) => {
    const reader = new FileReader();

    let pdfDoc;

    try {
      reader.onload = async (event) => {
        const bytes = event.target.result;
        const pdfBytes = new Uint8Array(bytes);

        pdfDoc = await PDFDocument.load(pdfBytes);

        const page = pdfDoc.getPages()[0];

        const { width, height } = page.getSize();

        const qrCodeUrl = `${fileP.name}`;

        const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);

        const qrCodeBytes = Uint8Array.from(atob(qrCodeDataUrl.split(',')[1]), (c) =>
          c.charCodeAt(0)
        );

        const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);

        const qrCodeDims = qrCodeImage.scale(0.5);

        page.drawImage(qrCodeImage, {
          x: width - 80,
          y: height - qrCodeDims.height - 10,
          width: qrCodeDims.width,
          height: qrCodeDims.height,
        });

        // Now that pdfDoc is initialized, you can call save() safely
        setModifiedQrFile(await pdfDoc.save());
      };
      reader.readAsArrayBuffer(fileP);
    } catch (err) {
      console.log('Error when generating pdf', err);
    }
  };
  const handleFileChange = (fileP) => {
    console.log('filep', fileP);
    setOriginalFile(fileP);
    generatePdf(fileP);
  };

  /**
   * @param {Uint8Array} pdfBytes
   * @returns {Promise<void>}
   *
   * Saves Pdf With Qr in own machine
   */
  const handleSaveToPc = () => {
    const blob = new Blob([modifiedQrFile], { type: 'application/pdf' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = `${originalFile?.name}.pdf`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  /**
   * @param {Uint8Array} pdfBytes
   * @returns {Promise<void>}
   *
   * Saves Pdf With and without Qr in Database
   */
  const handleSaveToDb = () => {
    console.log('modified pdf', modifiedQrFile);
    console.log('org pdf', originalFile);
  };

  const handleClearClick = () => {
    setOriginalFile(null);
  };

  return (
    <div className="App">
      <h1>Drag & Drop Files Pdf file</h1>
      <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} />

      {originalFile && (
        <>
          <Box sx={{ display: 'flex', gap: 4, my: 2 }}>
            <p>{originalFile ? `File name: ${originalFile.name}` : 'no files uploaded yet'}</p>
            <Button startIcon={<ClearIcon />} onClick={handleClearClick}>
              Clear
            </Button>
          </Box>

          <Box>
            <Button startIcon={<ClearIcon />} onClick={handleSaveToDb}>
              Add to db
            </Button>
            <Button startIcon={<ClearIcon />} onClick={handleSaveToPc}>
              Save to local
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}
