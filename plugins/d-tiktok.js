const { tiktokdl } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Contoh :\n${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
    if(!isUrl(args[0])) throw `INVALID URL\nContoh :\n${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
    const { author: { nickname }, video, description } = await tiktokdl(args[0])
    const url = video.no_watermark || video.no_watermark2 || video.no_watermark_raw
    if (!url) throw 'Can\'t download video!'
    conn.sendFile(m.chat, url, 'tiktok.mp4', `
*Nickname:* ${nickname}
*Description:* ${description}
`.trim(), m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader','top']

handler.command = /^(tik(tok)?(dl)?)$/i

module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/, 'gi'))
  }