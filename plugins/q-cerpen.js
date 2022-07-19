let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let url = await fetch('https://masgi.herokuapp.com/api/cerpen')
  let cerpen = await url.json()
let hasil = `${cerpen.data}`.trim()

  m.reply(hasil)
}
handler.help = ['cerpen']
handler.tags = ['internet','quotes','update']
handler.command = /^cerpen$/i

module.exports = handler