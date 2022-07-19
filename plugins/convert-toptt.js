const { toPTT } = require('../lib/converter')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime)) throw `Balas audio yang ingin diubah ke voice note dengan caption *${usedPrefix + command}*`
  let media = await q.download()
  let audio = await toPTT(media, 'mp4')
  await conn.sendMessage(m.chat, { document: audio.data, mimetype: 'audio/mpeg', fileName: `out.ptt`}, {quoted: m})
}
handler.help = ['toptt']
handler.tags = ['convert','update']

handler.command = /^toptt$/i

module.exports = handler