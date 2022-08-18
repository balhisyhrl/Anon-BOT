const uploadImage = require('../lib/uploadImage')
const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
//const { sticker } = require('../lib/sticker')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/exif')
let handler = async (m, { conn, text, usedPrefix, command }) => {

    let [atas, bawah] = text.toLowerCase().replace(listkatakotor, 'SENSOR').split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command} <${atas.replace(listkatakotor, '(*kata kotor*)') ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    let img = await q.download()
    let url = await uploadImage(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
    let options = { packname: global.packname, author: global.author }
      let buff = Buffer.isBuffer(meme) ? meme : /^data:.*?\/.*?;base64,/i.test(meme) ? Buffer.from(meme.split`,`[1], 'base64') : /^https?:\/\//.test(meme) ? await (await getBuffer(meme)) : fs.existsSync(meme) ? fs.readFileSync(path) : Buffer.alloc(0)
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
    //conn.sendStimg(m.chat, meme, m, { packname: packname, author: author })

}
handler.help = ['stickermeme <teks>|<teks>']
handler.tags = ['sticker','top']
handler.command = /^(s(tic?ker)?me(me)?)$/i

handler.limit = false

module.exports = handler
