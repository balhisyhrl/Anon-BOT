const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')

let handler = async (m, { conn, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Kirim gambar yang ingin diubah menjadi pixel dengan caption *${usedPrefix}${command}* atau reply medianya`
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif|webp)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  conn.sendFile(m.chat, 'https://some-random-api.ml/canvas/pixelate?avatar='+link, '', 'Catto', m)
}
handler.help = ['pixel <media>']
handler.tags = ['image']
handler.command = /^(pixel)$/i

module.exports = handler
