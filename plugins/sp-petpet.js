/*const uploadImage = require('../lib/uploadImage')
const fetch = require('node-fetch')
const petPetGif = require('pet-pet-gif')
const FileType = require('file-type')
const WSF = require('wa-sticker-formatter')
let fs = require('fs')
let path = require('path')
let handler = async (m, { conn, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Kirim/balas gambar dengan perintah ${usedPrefix}petpet`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  let img = await q.download()
  let url = await (uploadImage)(img)
  let animatedGif = await petPetGif(url)
  let filename = Math.floor(Math.random() * 1000)+'.gif'
  await fs.writeFileSync(filename, animatedGif)
  let imggiff = filename
  wsf = new WSF.Sticker(imggiff, {
        pack: global.packname,
        author: global.author,
        crop: true,
      })
  await wsf.build()
  const sticBuffer = await wsf.get()
  conn.sendMessage(m.chat, { sticker: sticBuffer }, {
    quoted: m,
    mimetype: 'image/webp',
    ephemeralExpiration: 86400
  })
    fs.unlinkSync(filename)
}
handler.help = ['']
handler.tags = ['', '']
handler.command = /^(petpet)$/i

module.exports = handler */