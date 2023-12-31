const express = require('express');
const crypto = require('crypto');
const { readTalker, writeNewTalker, editTalkers } = require('./utils/fsUtils');
const validateLogin = require('./middlewares/validateLogin');
const validateAge = require('./middlewares/validateAge');
const validateToken = require('./middlewares/validateToken');
const validateTalk = require('./middlewares/validateTalk');
const validateName = require('./middlewares/validateName');
const validateRate = require('./middlewares/validateRate');
const validateWatchedAt = require('./middlewares/validateWatchedAt');

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

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readTalker();

  if (!q || q.length === 0) {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }
  const talkersFound = talkers.filter((talker) => talker.name.includes(q));
  return res.status(HTTP_OK_STATUS).json(talkersFound);
});

app.get('/talker/:id', async (req, res) => {
const { id } = req.params;
const talkers = await readTalker();
const talkerFound = talkers.find((talker) => talker.id === Number(id));

if (!talkerFound) {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
} else {
  res.status(HTTP_OK_STATUS).json(talkerFound);
}
});

app.post('/login', validateLogin, (req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validateToken, validateName, validateAge,
validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const oldTalkers = await readTalker();
  const newTalker = {
    id: oldTalkers.length + 1,
    ...req.body,
  };
  await writeNewTalker(newTalker);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', validateToken, validateName, validateAge, 
validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readTalker();
  const index = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[index] = { id: Number(id), name, age, talk };
  editTalkers(talkers);
  return res.status(HTTP_OK_STATUS).json(talkers[index]);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalker();

  const talkerToBeDeleted = talkers.filter((talker) => talker.id !== Number(id));
  editTalkers(talkerToBeDeleted);
  return res.status(204).end();
});