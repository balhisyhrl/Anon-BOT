const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let ar = ['greyscale', 'invert', 'invertgreyscale','brightness', 'threshold', 'sepia', 'red', 'green', 'bloo', 'blurple', 'blurple2']
  let er = `
┌「 *Pilihan* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} greyscale
`.trim()
  if (!text) throw er
  if (!ar.includes(text)) throw er
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Kirim gambar yang ingin difilter dengan caption *${usedPrefix}${command}* atau reply medianya`
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif|webp)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  conn.sendFile(m.chat, 'https://some-random-api.ml/canvas/'+text+'?avatar='+link, '', 'Filter '+text, m)
}
handler.help = ['filter <option> <media>']
handler.tags = ['image']
handler.command = /^(filter)$/i

module.exports = handler

