// import React, { useState } from 'react';
// import { PDFDocument, rgb } from 'pdf-lib';
// import QRCode from 'qrcode';

// function AddQRCodeToPDF() {
//   const [pdfBytes, setPdfBytes] = useState(null);
//   const [modifiedPdf, setModifiedPdf] = useState(null);
//   const [uploadedFileName, setUploadedFileName] = useState('');
//   const [qrCodeAdded, setQRCodeAdded] = useState(false);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setUploadedFileName(file.name);
//     const reader = new FileReader();

//     reader.onload = async (event) => {
//       const bytes = event.target.result;
//       setPdfBytes(new Uint8Array(bytes));
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   async function addQRCodeToPDF() {
//     try {
//       console.log('pdf bytesp', pdfBytes);
//       const pdfDoc = await PDFDocument.load(pdfBytes);
//       const page = pdfDoc.getPages()[0]; // Get the first page
//       const { width, height } = page.getSize();

//       // Generate the QR code data
//       const qrCodeUrl = 'https://example.com'; // URL for the QR code
//       const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);

//       // Convert the base64 QR code image to bytes
//       const qrCodeBytes = Uint8Array.from(atob(qrCodeDataUrl.split(',')[1]), (c) =>
//         c.charCodeAt(0)
//       );

//       // Embed the QR code image into the PDF
//       const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);
//       const qrCodeDims = qrCodeImage.scale(0.5); // Adjust the scale as needed

//       // Add the QR code image to the page
//       page.drawImage(qrCodeImage, {
//         x: 50,
//         y: height - qrCodeDims.height - 50, // Adjust the position as needed
//         width: qrCodeDims.width,
//         height: qrCodeDims.height,
//       });

//       // Save the modified PDF
//       setModifiedPdf(await pdfDoc.save());
//       setQRCodeAdded(true);
//     } catch (error) {
//       console.error('Error adding QR code to PDF:', error);
//     }
//   }

//   const downloadPDF = () => {
//     // Create a Blob from the modified PDF bytes
//     const blob = new Blob([modifiedPdf], { type: 'application/pdf' });

//     // Create a temporary URL for the Blob
//     const url = window.URL.createObjectURL(blob);

//     // Create an <a> element to trigger the download
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'modified_pdf.pdf';

//     // Append the <a> element to the DOM and trigger the download
//     document.body.appendChild(a);
//     a.click();

//     // Remove the <a> element and revoke the temporary URL
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       {uploadedFileName && <p>Uploaded File: {uploadedFileName}</p>}
//       <button onClick={addQRCodeToPDF} disabled={!pdfBytes}>
//         Add QR Code to PDF
//       </button>
//       {qrCodeAdded && (
//         <div>
//           <p>QR Code added successfully!</p>
//           <button onClick={downloadPDF}>Download Modified PDF</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddQRCodeToPDF;
