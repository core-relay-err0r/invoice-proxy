# Invoice Proxy

A simple Node.js proxy server for generating PDF invoices using the external service [invoice-generator.com](https://invoice-generator.com). This server provides a secure API and optional web interface for creating invoices, ensuring your clients never interact directly with the external service.

## Features
- REST API endpoint to generate invoices as PDFs
- Web interface for manual invoice creation (served at `/`)
- Forwards invoice data to invoice-generator.com and returns the generated PDF

## Requirements
- Node.js (v14 or higher recommended)
- npm (Node package manager)

## Setup
1. **Clone the repository** (if not already):
   ```bash
   git clone <repository-url>
   cd invoice-proxy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Server
Start the server with:
```bash
npm start
```
By default, the server runs on port 3000. You can change the port by setting the `PORT` environment variable:
```bash
PORT=4000 npm start
```

## Usage
### API Endpoint
- `POST /create-invoice` or `POST /api/invoice`
  - Send invoice data as JSON in the request body.
  - Receives a PDF invoice in response.

### Web Interface
- Open [http://localhost:3000/](http://localhost:3000/) in your browser to use the HTML form for invoice creation (if available in `public/index.html`).

## License
MIT
