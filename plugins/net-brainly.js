const { Brainly } = require('brainly-scraper-v2')
const brain = new Brainly("id");
let handler = async function (m, { text }) {
  if (!text) throw 'Soalnya?'
  let res = await brain.search(text)
  let jumlahJawaban = res.length
  m.reply(`Terdapat ${jumlahJawaban} Soal yang mirip\n\n_Proses mengirim soal & jawaban......_`)
 for(let i = 0; i < jumlahJawaban; i++){
    let Brains = `User : ${res[i].question.author.username}
Pertanyaan : 
${res[i].question.content}
File : 
${res[i].question.attachments[0]}

${res[i].answers[0].content ? 'Jawaban : '+ res[i].answers[0].content : 'Jawaban :\nBelum ada :('}
${res[i].answers[1].content ? '\nJawaban ke-2: '+ res[i].answers[1].content : ''}
    `
m.reply(Brains)

  }
}
handler.help = ['brainly <soal>']
handler.tags = ['internet','update']

handler.command = /^brainly$/i

module.exports = handler