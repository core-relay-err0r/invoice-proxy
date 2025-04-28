// Invoice Proxy Server
// This server acts as a proxy to invoice-generator.com, allowing clients to generate PDF invoices
// via a secure API or web interface.

const express = require('express'); // Web framework
const axios = require('axios'); // HTTP client for making requests to external API
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies
const path = require('path'); // Utility for handling file paths

const app = express();
const PORT = process.env.PORT || 3000; // Server port (default: 3000)

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Serve static files (e.g., HTML form) from the 'public' directory
app.use(express.static('public'));

/**
 * POST /create-invoice
 * Handles invoice creation via form submission (web interface).
 * Expects invoice data as JSON in the request body.
 * Returns the generated invoice as a PDF file.
 */
app.post('/create-invoice', async (req, res) => {
  try {
    const invoiceData = req.body; // Get invoice data from request
    // Forward the data to invoice-generator.com
    const response = await axios.post('https://invoice-generator.com', invoiceData, {
      responseType: 'arraybuffer', // Expect PDF as binary data
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Set headers to indicate a PDF file download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
    });
    res.send(response.data); // Send PDF to client
  } catch (error) {
    console.error('Error generating invoice:', error.message);
    res.status(500).send('Failed to generate invoice.');
  }
});

/**
 * POST /api/invoice
 * Handles invoice creation via API clients.
 * Expects invoice data as JSON in the request body.
 * Returns the generated invoice as a PDF file.
 */
app.post('/api/invoice', async (req, res) => {
  try {
    const invoiceData = req.body;
    // Forward the data to invoice-generator.com
    const response = await axios.post('https://invoice-generator.com', invoiceData, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Set headers to indicate a PDF file download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
    });
    res.send(response.data); // Send PDF to client
  } catch (error) {
    console.error('Error generating invoice via API:', error.message);
    res.status(500).send('Failed to generate invoice.');
  }
});

/**
 * GET /
 * Serves the main HTML page (web interface) from the public directory.
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Invoice Proxy server is running on port ${PORT}`);
});