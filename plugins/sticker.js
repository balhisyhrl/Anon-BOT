const uploadImage = require('../lib/uploadImage')
const ocrapi = require("ocr-space-api-wrapper")
const detection = require('../lib/detect')
const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
//const { sticker } = require('../lib/sticker')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/exif')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let quoted = m.quoted ? m.quoted : m
  let mime = (quoted.msg || quoted).mimetype || ''
  if (!quoted) throw `Balas Video/Image Dengan Caption ${usedPrefix + command}`
  //m.reply('Tunggu kk')
  if (/image/.test(mime)) {
      let media = await quoted.download()
      let url = await uploadImage(media)
      let gettext = await getText(url)
      let isBadword = listkatakotor.exec(gettext.toLowerCase())
      if(isBadword) throw `Stiker mengandung kata kata kotor tidak di ijinkan`
      let options = { packname: global.packname, author: global.author }
      let buff = Buffer.isBuffer(media) ? media : /^data:.*?\/.*?;base64,/i.test(media) ? Buffer.from(media.split`,`[1], 'base64') : /^https?:\/\//.test(media) ? await (await getBuffer(media)) : fs.existsSync(media) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
      await conn.sendMessage(m.chat, { sticker: { url: buffer } }, {
        quoted: m,
        mimetype: 'image/webp',
        ephemeralExpiration: 86400
      })
      /*let encmedia = await conn.sendImageAsSticker(m.chat, media, m, {
        packname: global.packname, 
        author: global.author, 
        mimetype: 'image/webp', 
        ephemeralExpiration: 86400 
      })
      await fs.unlinkSync(encmedia) */
  } else if (/video/.test(mime)) {
      if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
      let media = await quoted.download()
      let options = { packname: global.packname, author: global.author }
      let buff = Buffer.isBuffer(media) ? media : /^data:.*?\/.*?;base64,/i.test(media) ? Buffer.from(media.split`,`[1], 'base64') : /^https?:\/\//.test(media) ? await (await getBuffer(media)) : fs.existsSync(media) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
      await conn.sendMessage(m.chat, { sticker: { url: buffer } }, {
        quoted: m,
        mimetype: 'image/webp',
        ephemeralExpiration: 86400
      })
      //let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author, ephemeralExpiration: 86400  })
      //await fs.unlinkSync(encmedia)
  } else if (args[0]) {
    if (isUrl(args[0])) encmedia = await conn.sendImageAsSticker(m.chat, args[0], m, { packname: global.packname, author: global.author, mimetype: 'image/webp', ephemeralExpiration: 86400 })
    else throw 'URL tidak valid!'
    if (encmedia) await fs.unlinkSync(encmedia)
  } else {
      throw `Kirim Gambar/Video Dengan Caption ${usedPrefix + command}\nDurasi Video 1-9 Detik`
  }
}
handler.help = ['stiker']
handler.tags = ['sticker','top']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

async function getText(url){
  try{
    let hasil = await ocrapi.ocrSpace(url)
    let getText = hasil.ParsedResults[0].ParsedText
    return getText
  } catch(e) {
    return 'a'
  }
} 