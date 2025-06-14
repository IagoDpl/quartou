// backend/index.js
const express = require('express');
const admin = require('firebase-admin');
const cron = require('node-cron');

const app = express();
app.use(express.json());

// Em vez de require('./serviceAccountKey.json'), parse a variável de ambiente:
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://SEU_PROJETO.firebaseio.com',
});

// ... resto do código (rotas, cron, etc)
