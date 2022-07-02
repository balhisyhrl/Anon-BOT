/* const { sticker } = require('../lib/sticker')
const WSF = require('wa-sticker-formatter')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  let wsf = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/webp/.test(mime)) {
      let img = await q.download()
      if (!img) throw `balas stiker dengan perintah ${usedPrefix + command}`
      wsf = new WSF.Sticker(img, {
        pack: global.packname,
        author: global.author,
        crop: false,
      })
    } else if (/image/.test(mime)) {
      let img = await q.download()
      if (!img) throw `balas gambar dengan perintah ${usedPrefix + command}`
      wsf = new WSF.Sticker(img, {
        pack: global.packname,
        author: global.author,
        crop: false,
      })
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) throw 'Maksimal 10 detik!'
      let img = await q.download()
      if (!img) throw `balas video dengan perintah ${usedPrefix + command}`
      wsf = new WSF.Sticker(img, {
        pack: global.packname,
        author: global.author,
        crop: true,
      })
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
      else throw 'URL tidak valid!'
    }
  } catch (e) {
    throw e
  }
  finally {
    if (wsf) {
      await wsf.build()
      const sticBuffer = await wsf.get()
      if (sticBuffer) await conn.sendMessage(m.chat, { sticker: sticBuffer }, {
        quoted: m,
        mimetype: 'image/webp',
        ephemeralExpiration: 86400
      })
    }
    if (stiker) await conn.sendMessage(m.chat, { sticker: stiker }, {
      quoted: m,
      mimetype: 'image/webp',
      ephemeralExpiration: 86400
    })
    // else throw `Gagal${m.isGroup ? ', balas gambarnya!' : ''}`
  }
}
handler.help = ['stiker', 'stiker <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
} */
const fs = require('fs')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let quoted = m.quoted ? m.quoted : m
  let mime = (quoted.msg || quoted).mimetype || ''
  if (!quoted) throw `Balas Video/Image Dengan Caption ${usedPrefix + command}`
  m.reply('Tunggu kk')
  if (/image/.test(mime)) {
      let media = await quoted.download()
      let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
      await fs.unlinkSync(encmedia)
  } else if (/video/.test(mime)) {
      if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
      let media = await quoted.download()
      let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
      await fs.unlinkSync(encmedia)
  } else if (args[0]) {
    if (isUrl(args[0])) encmedia = await conn.sendImageAsSticker(m.chat, args[0], m, { packname: global.packname, author: global.author, categories: res.tags })
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