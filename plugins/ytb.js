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