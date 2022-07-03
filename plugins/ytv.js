let limit = 50
let fetch = require('node-fetch')
const { servers, ytv } = require('../lib/y2mate')
const { getBuffer } = require('../lib/functions')
let handler = async(m, { conn, args, isPrems, isOwner }) => {
    if (!args || !args[0]) return conn.reply(m.chat, 'Uhm... urlnya mana?', m)
    let chat = global.db.data.chats[m.chat]
    let server = (args[1] || servers[0]).toLowerCase()
    let { dl_link, thumb, title, filesize, filesizeF } = await ytv(args[0], servers.includes(server) ? server : servers[0])
    let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
    conn.reply(isLimit ? `Ukuran File: ${filesizeF}\nUkuran file diatas ${limit} MB, download sendiri: ${dl_link}` : global.wait, m)
    let _thumb = {}
    try { _thumb = { thumbnail: await (await fetch(thumb)).buffer() } } catch (e) {}
    m.reply(wait)
    let buf = await getBuffer(thumb)
    await conn.sendMessage(m.chat, { image: { url: thumb }, jpegThumbnail:buf, caption: `*Title:* ${title}\n*Filesize:* ${filesizeF}`.trim() }, { quoted: m }) 
    if (!isLimit) await conn.sendButtonVid(m.chat, dl_link, `*Title:* ${title}\n*Filesize:* ${filesizeF}`.trim(), wm, 'menu', '.?', m)
        //await conn.sendMessage(m.chat, { document: { url: dl_link }, mimetype: 'video/mp4', fileName: title + `.mp4`}, {quoted: m})
//conn.sendFile(m.chat, dl_link, title + '.mp4', `
//*Title:* ${title}
//*Filesize:* ${filesizeF}
//   `.trim(), m, false, { thumbnail: Buffer.alloc(0), mimetype: 'video/mp4' })
}
handler.help = ['ytmp4 <query>']
handler.tags = ['downloader']
handler.command = /^yt(v(idi?e?o)?|mp4)?$/i

module.exports = handler

/*let limit = 50
let fetch = require('node-fetch')
const { servers, ytv } = require('../lib/ytdl')
const axios = require('axios')
const { getBuffer } = require('../lib/functions')
let handler = async(m, { conn, args, isPrems, isOwner }) => {
    let text = args[0]
    let quality = args[1] ? args[1] : '360p'
    let media = await ytv(text, quality)
    if (media.filesize >= 999999) return reply('*File Over Limit* '+util.format(media))
    var capti = `*YOUTUBE VIDEO*\n\n*Title* : ${media.title}\n*File size* : ${media.filesizeF}\n*Url* : ${isUrl(text)}\n*Ext* : Mp4\n*Resoultion* : ${args[1] || '360p'}`
    var buf = await getBuffer(media.thumb)
    conn.sendMessage(m.chat, { image: { url: media.thumb }, jpegThumbnail:buf, caption: `${capti}` }, { quoted: m })
    conn.sendMessage(m.chat, { video: { url: media.dl_link }, jpegThumbnail:buf, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `Here you go!` }, { quoted: m }).catch((err) => reply("ERROR"))
    conn.sendMessage(m.chat, { document: { url: media.dl_link }, jpegThumbnail:buf, mimetype: 'video/mp4', fileName: `${media.title}.mp4` }, { quoted: m }).catch((err) => reply("ERROR"))
  }
handler.help = ['ytmp4 <query>']
handler.tags = ['downloader']
handler.command = /^yt(v(idi?e?o)?|mp4)?$/i

module.exports = handler

function isUrl(url) {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}*/
