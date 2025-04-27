// Серверный код для Invoice Handling Proxy

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Ручка для создания инвойса через форму
app.post('/create-invoice', async (req, res) => {
  try {
    const invoiceData = req.body;
    const response = await axios.post('https://invoice-generator.com', invoiceData, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
    });
    res.send(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Ошибка генерации счёта.');
  }
});

// Ручка для создания инвойса через API
app.post('/api/invoice', async (req, res) => {
  try {
    const invoiceData = req.body;

    const response = await axios.post('https://invoice-generator.com', invoiceData, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
    });

    res.send(response.data);
  } catch (error) {
    console.error('Ошибка при создании счёта:', error.message);
    res.status(500).send('Ошибка при создании счёта.');
  }
});

// 🚀 ВАЖНО: Отдаём HTML из public/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy-сервер запущен на порту ${PORT}`);
});