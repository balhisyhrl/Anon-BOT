let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, command }) => {
  let res = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/renungan.json')).json()
  let cosser = res[Math.floor(Math.random() * res.length)]
  await conn.sendButtonImg(m.chat, cosser, '....', wm, 'Renungan', `.renungan`, m, false)
}
handler.help = ['renungan']
handler.tags = ['quotes']
handler.command = /^(renungan)$/i

module.exports = handler