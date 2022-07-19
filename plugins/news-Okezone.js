const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['terbaru', 'celebrity', 'sports', 'otomotif', 'economy', 'techno', 'lifestyle', 'bola']
    let er = `
┌「 *Pilihan Kategori Okezone* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let okezonedotcom
    if (/terbaru/.test(text)) okezonedotcom = await feedid.okezone.terbaru()
    if (/celebrity/.test(text)) okezonedotcom = await feedid.okezone.celebrity()
    if (/sports/.test(text)) okezonedotcom = await feedid.okezone.sports()
    if (/otomotif/.test(text)) okezonedotcom = await feedid.okezone.otomotif()
    if (/economy/.test(text)) okezonedotcom = await feedid.okezone.economy()
    if (/techno/.test(text)) okezonedotcom = await feedid.okezone.techno()
    if (/lifestyle/.test(text)) okezonedotcom = await feedid.okezone.lifestyle()
    if (/bola/.test(text)) okezonedotcom = await feedid.okezone.bola()
    if(okezonedotcom.success == false) throw okezonedotcom.message
    let Array = okezonedotcom.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'okezonedotcom.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['okezonedotcom <kategori>']
handler.tags = ['news','update']
handler.command = /^(okezonedotcom)$/i
  
module.exports = handler