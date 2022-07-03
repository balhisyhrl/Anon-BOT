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
    let ayat = `*Nomor*: ${json.surat.nomor}
*Nama (ID)*: ${json.surat.nama}
*Name (EN)*: ${json.surat.name}
*Asma*: ${json.surat.asma}
*Start*: ${json.surat.start}
*Ayat*: ${json.surat.ayat}
*type*: ${json.surat.type}
*Urut*: ${json.surat.urut}
*Rukuk*: ${json.surat.rukuk}
*Arti*: ${json.surat.arti}
*Keterangan*: ${json.surat.keterangan.replace(/(<i>|<\/i>)/g, '_')}`
    await conn.sendButton(m.chat, ayat.trim(), 'Mari Bertobat', 'Lagi?', '.tafsir', m)
  }
}

handler.help = ['tafsir']
handler.tags = ['random','islam']
handler.command = /tafsir|randomtafsir/i

module.exports = handler
