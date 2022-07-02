const { mediafiredl } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Mau download apa?\nContoh :\n${usedPrefix}${command}  https://www.mediafire.com/file/fvpc2fwrtdc6v2e/IMG_20220603_202808_004.jpg/file`
    if(!isUrl(args[0])) throw `INVALID URL`
    let res = await mediafiredl(args[0])
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let caption = `
*Name:* ${filename}
*Size:* ${filesizeH}
*Extension:* ${ext}
*Uploaded:* ${aploud}
_Download on process..._
`.trim()
    m.reply(caption)
    await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i

module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?mediafire.com{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
  }