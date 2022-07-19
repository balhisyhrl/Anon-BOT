
const { instagramdl } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `*Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/CeV80M7vaUs/`
  if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/CeV80M7vaUs/`

instagramdl(args[0]).then(async res => {
    let instagramdl = JSON.stringify(res)
    let json = JSON.parse(instagramdl)
    let txt = 'Silahkan Tunggu Oneechan~'
    conn.reply(m.chat, txt, m)
    for (let { url, type } of json) {
      await delay(1500)
      conn.sendFile(m.chat, url, 'ig' + (type == 'image' ? '.jpg' : '.mp4'), 'File Udah Siap Oneechan~', m, { thumbnail: Buffer.alloc(0) })
    }
  })
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|igdl|instagram)$/i

handler.register = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))