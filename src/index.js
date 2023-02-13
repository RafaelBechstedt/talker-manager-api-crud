const express = require('express');
const crypto = require('crypto');
const { readTalker } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkers = await readTalker();
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
const { id } = req.params;
const talkers = await readTalker();
const talkerFound = talkers.find((talker) => talker.id === Number(id));

if (!talkerFound) {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
} else {
  res.status(200).json(talkerFound);
}
});

app.post('/login', (req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});