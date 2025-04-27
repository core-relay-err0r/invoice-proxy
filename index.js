// Серверный код для Invoice Handling Proxy

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Старая ручка через форму
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
    console.error(error);
    res.status(500).send('Ошибка генерации счёта.');
  }
});

// НОВАЯ ручка через API
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

// HTML-форма
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Создать счёт</title>
    </head>
    <body>
      <h1>Создать новый счёт</h1>
      <form id="invoiceForm">
        <label>Кому (Имя клиента):<br><input type="text" name="to" required></label><br><br>
        <label>От кого (Твоя компания):<br><input type="text" name="from" required></label><br><br>
        <label>Описание:<br><input type="text" name="notes"></label><br><br>
        <label>Дата оплаты:<br><input type="date" name="payment_terms"></label><br><br>
        <label>Сумма ($):<br><input type="number" name="items[0][amount]" required></label><br><br>
        <button type="submit">Создать счёт</button>
      </form>

      <script>
        document.getElementById('invoiceForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = {
            from: formData.get('from'),
            to: formData.get('to'),
            notes: formData.get('notes'),
            payment_terms: formData.get('payment_terms'),
            items: [
  { name: formData.get('notes'), quantity: 1, amount: parseFloat(formData.get('items[0][amount]')) }
]
          };

          const response = await fetch('/create-invoice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
          } else {
            alert('Ошибка создания счёта');
          }
        });
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Proxy-сервер запущен на порту ${PORT}`);
});