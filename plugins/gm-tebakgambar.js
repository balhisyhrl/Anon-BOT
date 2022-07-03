let fetch = require('node-fetch')

let timeout = 180000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
  let id = m.chat
  if (id in conn.tebakgambar) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
  // if (!json.status) throw json
  let caption = `
  ${json.deskripsi}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hintga untuk hint
Bonus: ${poin} XP
Tiketcoin: 1 Tiketcoin
    `.trim()
    const buttons = [
      {buttonId: usedPrefix + 'hintga', buttonText: {displayText: `Bantuan`}, type: 1}
    ]
  conn.tebakgambar[id] = [
    await conn.sendMessage(m.chat, { 
      image: {url: json.img},
      caption: `${caption}`.trim(),
      footer: wm,
      buttons: buttons,
      headerType: 4
      }),
      json, poin,
    setTimeout(() => {
      if (conn.tebakgambar[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakgambar[id][0])
      delete conn.tebakgambar[id]
    }, timeout)
  ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i
handler.group = true

module.exports = handler