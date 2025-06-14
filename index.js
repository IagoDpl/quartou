const express = require('express');
const admin = require('firebase-admin');
const cron = require('node-cron');
const app = express();

app.use(express.json());

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://SEU_PROJETO.firebaseio.com'
});

// Endpoint manual para disparar notificações:
app.post('/send', async (req, res) => {
  const message = {
    notification: {
      title: 'Quartou!',
      body: 'Hoje é quarta-feira! 🚀',
    },
    topic: 'all',
  };

  try {
    await admin.messaging().send(message);
    res.send('Notificação enviada com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao enviar notificação.');
  }
});

// Agendador de quarta-feira (para disparar automático toda quarta às 10h)
cron.schedule('0 10 * * 3', async () => {
  console.log('Enviando notificação automática de quarta-feira...');
  const message = {
    notification: {
      title: 'Quartou Automático!',
      body: 'Já é quarta, bora acordar 🚀!',
    },
    topic: 'all',
  };
  try {
    await admin.messaging().send(message);
    console.log('Notificação enviada!');
  } catch (error) {
    console.error('Erro ao enviar automática:', error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
