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

module.exports = {
  readTalker,
};
