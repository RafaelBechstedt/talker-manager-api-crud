const fs = require('fs').promises;

async function readTalker() {
  try {
    const data = await fs.readFile('./src/talker.json');
    const talker = JSON.parse(data);
    return talker;
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
}

async function writeNewTalker(newTalker) {
  try {
    const oldTalkers = await readTalker();
    const allTalkers = [...oldTalkers, newTalker];
    const data = await fs.writeFile('./src/talker.json', allTalkers);
    return data;
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
}

module.exports = {
  readTalker,
  writeNewTalker,
};
