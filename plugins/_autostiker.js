const { sticker } = require('../lib/sticker')
const WSF = require('wa-sticker-formatter')
const uploadImage = require('../lib/uploadImage')
const ocrapi = require("ocr-space-api-wrapper")
const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
let handler = m => m

handler.before = async function (m) {
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    if (chat.stiker && !user.banned && !chat.isBanned && !m.fromMe && !m.isBaileys) {
        /*// try {
        let q = m
        let stiker = false
        let wsf = false
        let mime = (q.msg || q).mimetype || ''
        if (/webp/.test(mime)) return
        if (/image/.test(mime)) {
            let img = await q.download()
            if (!img) return
            wsf = new WSF.Sticker(img, {
                pack: global.packname,
                author: global.author,
                crop: false,
            })
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
            let img = await q.download()
            if (!img) return
            wsf = new WSF.Sticker(img, {
                pack: global.packname,
                author: global.author,
                crop: false,
            })
        } else if (m.text.split` `[0]) {
            if (isUrl(m.text.split` `[0])) stiker = await sticker(false, m.text.split` `[0], global.packname, global.author)
            else return
        }
        if (wsf) {
            await wsf.build()
            const sticBuffer = await wsf.get()
            if (sticBuffer) await this.sendMessage(m.chat, { sticker: sticBuffer }, {
                quoted: m,
                mimetype: 'image/webp',
                ephemeralExpiration: 86400
            })
        }
        if (stiker) await this.sendMessage(m.chat, { sticker: stiker }, {
                quoted: m,
                mimetype: 'image/webp',
                ephemeralExpiration: 86400
            })
        // } finally {
        //     if (stiker) { 
        //     }
        // } */
        let quoted = m
        let mime = (quoted.msg || quoted).mimetype || ''
        if (/image/.test(mime)) {
            let media = await quoted.download()
            let url = await uploadImage(media)
            let hasil = await ocrapi.ocrSpace(url)
            let getText = hasil.ParsedResults[0].ParsedText
            let isBadword = listkatakotor.exec(getText.toLowerCase())
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
            //let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
            //await fs.unlinkSync(encmedia) 
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
            //let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
            //await fs.unlinkSync(encmedia)
        }
    }
    return true
}
module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}