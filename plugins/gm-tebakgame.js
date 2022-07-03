let fetch = require('node-fetch')

let timeout = 180000
let poin = 1000
let tiketcoin = 1
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgame = conn.tebakgame ? conn.tebakgame : {}
  let id = m.chat
  if (id in conn.tebakgame) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgame[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tebakgame.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
  // if (!json.status) throw json
  let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}tega untuk clue
Bonus: ${poin} XP
TiketCoin: ${tiketcoin}
    `.trim()
    const buttons = [
      {buttonId: usedPrefix + 'tega', buttonText: {displayText: `Bantuan`}, type: 1}
    ]
  conn.tebakgame[id] = [
    await conn.sendMessage(m.chat, { 
      image: {url: json.img},
      caption: `${caption}`.trim(),
      footer: wm,
      buttons: buttons,
      headerType: 4
      }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakgame[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakgame[id][0])
      delete conn.tebakgame[id]
    }, timeout)
  ]
}
handler.help = ['tebakgame']
handler.tags = ['game']
handler.command = /^tebakgame/i
handler.limit = false
handler.group = true

module.exports = handler