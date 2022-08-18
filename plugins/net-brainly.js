const { Brainly } = require('brainly-scraper-v2')
const brain = new Brainly("id");
let handler = async function (m, { text }) {
  if (!text) throw 'Soalnya?'
  let res = await brain.search(text)
  let jumlahJawaban = res.length
  m.reply(`Terdapat ${jumlahJawaban} Soal yang mirip\n\n_Proses mengirim soal & jawaban......_`)
 for(let i = 0; i < jumlahJawaban; i++){
    let Brains = `User : ${res[i].question.author.username ? res[i].question.author.username : ''}
Pertanyaan : 
${res[i].question.content ? res[i].question.content : ''}
File : 
${res[i].question.attachments[0] ? res[i].question.attachments[0] : 'none'}

${res[i].answers[0].content ? 'Jawaban\n: '+ res[i].answers[0].content : 'Jawaban :\nBelum ada :('}
    `
m.reply(Brains)

  }
}
handler.help = ['brainly <soal>']
handler.tags = ['internet','update']

handler.command = /^brainly$/i

module.exports = handler