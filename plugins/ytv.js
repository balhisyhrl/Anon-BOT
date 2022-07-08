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
}
handler.help = ['ytmp4 <query>']
handler.tags = ['downloader']
handler.command = /^yt(v(idi?e?o)?|mp4)?$/i

module.exports = handler

