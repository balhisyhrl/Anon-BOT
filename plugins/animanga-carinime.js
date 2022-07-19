/*
Made by https://github.com/balhisyhrl
*/
const uploadImage = require('../lib/uploadImage')
const fetch = require('node-fetch')
const { getBuffer } = require('../lib/functions')
let handler = async (m, { conn, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Kirim/balas gambar dengan perintah ${usedPrefix}carinime`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  let img = await q.download()
  let url = await (uploadImage)(img)
  //let anime = `data:${mime};base64,${img.toString('base64')}`
  let res = await fetch(`https://api.trace.moe/search?anilistInfo&cutBorders&url=${encodeURIComponent(url)}`)
  if (!res.ok) throw eror
  let json = await res.json()
  // m.reply(`${require('util').format(result)}`)
  let { episode, season, similarity, filename, video, image  } = json.result[0]
  let { is_adult, synonyms } = json.result[0].anilist
  let { native, romaji, english } = json.result[0].anilist.title
  //let videos = await getBuffer(video)
  let ecch = () => is_adult ? "Iya 🔞" : "Tidak"
  if(is_adult){
  conn.sendFile(m.chat, 'https://telegra.ph/file/72fb839f41633c4dca43c.jpg', 'carinime.png', `
*[ Cari Anime ]*\n
${similarity < 0.89 ? 'Saya Memiliki Keyakinan Rendah Tentang Hal Ini' : ''}
~> Ecchi : *${ecch()}*
~> Judul Jepang : *${native}*
~> Ejaan Judul : *${romaji}*
~> Judul Inggris : *${english}*
~> Sinonim : *${synonyms}*
~> Episode : *${episode}*
~> Season  : *${season}*
~> Nama File : *${filename}*
~> Kesamaan : *${(similarity * 100).toFixed(1)}%*
~> Episode : *${episode.toString()}*
~> Link Video : *${video}*
  `.trim(), m)
} else {
  conn.sendFile(m.chat, image, 'carinime.png', `
*[ Cari Anime ]*\n
${similarity < 0.89 ? 'Saya Memiliki Keyakinan Rendah Tentang Hal Ini' : ''}
~> Ecchi : *${ecch()}*
~> Judul Jepang : *${native}*
~> Ejaan Judul : *${romaji}*
~> Judul Inggris : *${english}*
~> Sinonim : *${synonyms}*
~> Episode : *${episode}*
~> Season  : *${season}*
~> Nama File : *${filename}*
~> Kesamaan : *${(similarity * 100).toFixed(1)}%*
~> Episode : *${episode.toString()}*
~> Link Video : *${video}*
  `.trim(), m)
}
}
handler.help = ['carinime <media>']
handler.tags = ['animanga']
handler.command = /^(wait|carinime)$/i

handler.register = true

module.exports = handler