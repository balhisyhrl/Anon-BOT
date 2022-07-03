/*
Made by https://github.com/balhisyhrl
*/
const fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
  let res = await fetch(`https://api.banghasan.com/quran/format/json/acak`)
  if (!res.ok) throw await m.reply('error')
  let json = await res.json()
  if (json.status !== 'ok') {
      throw 'API ERROR'
  } else {
    let ayat = `${json.acak.ar.teks}\n
*Artinya* :\n${json.acak.id.teks}(Q.S ${json.surat.nama}/${json.acak.id.surat}: ${json.acak.id.ayat})`
    await conn.sendButton(m.chat, ayat.trim(), 'Mari Bertobat', 'Lagi?', '.ayat', m)
  }
}

handler.help = ['randomquran']
handler.tags = ['random','islam']
handler.command = /ayat|randomayat|randomquran/i

module.exports = handler
