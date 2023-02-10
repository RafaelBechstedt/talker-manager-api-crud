const express = require('express');
const { readTalker } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

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

// app.get('/talker', async (req, res) => {
//   const talkers = await readTalker;
//   return res.status(HTTP_OK_STATUS).json(talkers);
// });s