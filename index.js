{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // \uc0\u1057 \u1077 \u1088 \u1074 \u1077 \u1088 \u1085 \u1099 \u1081  \u1082 \u1086 \u1076  \u1076 \u1083 \u1103  Invoice Handling Proxy\
\
const express = require('express');\
const axios = require('axios');\
const bodyParser = require('body-parser');\
const fs = require('fs');\
const path = require('path');\
\
const app = express();\
const PORT = process.env.PORT || 3000;\
\
app.use(bodyParser.json());\
app.use(express.static('public'));\
\
app.post('/create-invoice', async (req, res) => \{\
  try \{\
    const invoiceData = req.body;\
    const response = await axios.post('https://invoice-generator.com', invoiceData, \{\
      responseType: 'arraybuffer',\
      headers: \{\
        'Content-Type': 'application/json',\
      \},\
    \});\

    app.post('/api/invoice', async (req, res) => {
  try {
    const invoiceData = req.body;

    const response = await axios.post('https://invoice-generator.com', invoiceData, {
      responseType: 'arraybuffer', // чтобы получить PDF в бинарном формате
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=\"invoice.pdf\"',
    });

    res.send(response.data);
  } catch (error) {
    console.error('Ошибка при создании счёта:', error.message);
    res.status(500).send('Ошибка при создании счёта.');
  }
});

    res.set(\{\
      'Content-Type': 'application/pdf',\
      'Content-Disposition': 'attachment; filename="invoice.pdf"',\
    \});\
    res.send(response.data);\
  \} catch (error) \{\
    console.error(error);\
    res.status(500).send('\uc0\u1054 \u1096 \u1080 \u1073 \u1082 \u1072  \u1075 \u1077 \u1085 \u1077 \u1088 \u1072 \u1094 \u1080 \u1080  \u1089 \u1095 \u1077 \u1090 \u1072 .');\
  \}\
\});\
\
app.get('/', (req, res) => \{\
  res.send(`\
    <!DOCTYPE html>\
    <html>\
    <head>\
      <title>\uc0\u1057 \u1086 \u1079 \u1076 \u1072 \u1090 \u1100  \u1089 \u1095 \u1105 \u1090 </title>\
    </head>\
    <body>\
      <h1>\uc0\u1057 \u1086 \u1079 \u1076 \u1072 \u1090 \u1100  \u1085 \u1086 \u1074 \u1099 \u1081  \u1089 \u1095 \u1105 \u1090 </h1>\
      <form id="invoiceForm">\
        <label>\uc0\u1050 \u1086 \u1084 \u1091  (\u1048 \u1084 \u1103  \u1082 \u1083 \u1080 \u1077 \u1085 \u1090 \u1072 ):<br><input type="text" name="to" required></label><br><br>\
        <label>\uc0\u1054 \u1090  \u1082 \u1086 \u1075 \u1086  (\u1058 \u1074 \u1086 \u1103  \u1082 \u1086 \u1084 \u1087 \u1072 \u1085 \u1080 \u1103 ):<br><input type="text" name="from" required></label><br><br>\
        <label>\uc0\u1054 \u1087 \u1080 \u1089 \u1072 \u1085 \u1080 \u1077 :<br><input type="text" name="notes"></label><br><br>\
        <label>\uc0\u1044 \u1072 \u1090 \u1072  \u1086 \u1087 \u1083 \u1072 \u1090 \u1099 :<br><input type="date" name="payment_terms"></label><br><br>\
        <label>\uc0\u1057 \u1091 \u1084 \u1084 \u1072  ($):<br><input type="number" name="items[0][amount]" required></label><br><br>\
        <button type="submit">\uc0\u1057 \u1086 \u1079 \u1076 \u1072 \u1090 \u1100  \u1089 \u1095 \u1105 \u1090 </button>\
      </form>\
\
      <script>\
        document.getElementById('invoiceForm').addEventListener('submit', async (e) => \{\
          e.preventDefault();\
          const formData = new FormData(e.target);\
          const data = \{\
            from: formData.get('from'),\
            to: formData.get('to'),\
            notes: formData.get('notes'),\
            payment_terms: formData.get('payment_terms'),\
            items: [\
              \{ description: formData.get('notes'), quantity: 1, amount: parseFloat(formData.get('items[0][amount]')) \}\
            ]\
          \};\
\
          const response = await fetch('/create-invoice', \{\
            method: 'POST',\
            headers: \{ 'Content-Type': 'application/json' \},\
            body: JSON.stringify(data)\
          \});\
\
          if (response.ok) \{\
            const blob = await response.blob();\
            const url = window.URL.createObjectURL(blob);\
            const a = document.createElement('a');\
            a.href = url;\
            a.download = 'invoice.pdf';\
            a.click();\
            window.URL.revokeObjectURL(url);\
          \} else \{\
            alert('\uc0\u1054 \u1096 \u1080 \u1073 \u1082 \u1072  \u1089 \u1086 \u1079 \u1076 \u1072 \u1085 \u1080 \u1103  \u1089 \u1095 \u1105 \u1090 \u1072 ');\
          \}\
        \});\
      </script>\
    </body>\
    </html>\
  `);\
\});\
\
app.listen(PORT, () => \{\
  console.log(`Proxy-\uc0\u1089 \u1077 \u1088 \u1074 \u1077 \u1088  \u1079 \u1072 \u1087 \u1091 \u1097 \u1077 \u1085  \u1085 \u1072  \u1087 \u1086 \u1088 \u1090 \u1091  $\{PORT\}`);\
\});\
}