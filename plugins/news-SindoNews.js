const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['terbaru', 'nasional', 'metro', 'ekbis', 'international', 'daerah', 'sports', 'otomotif', 'tekno', 'sains', 'edukasi', 'lifestyle', 'kalam']
    let er = `
┌「 *Pilihan Kategori sindonews* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let sindonews
    if (/terbaru/.test(text)) sindonews = await feedid.sindonews.terbaru()
    if (/nasional/.test(text)) sindonews = await feedid.sindonews.nasional()
    if (/metro/.test(text)) sindonews = await feedid.sindonews.metro()
    if (/ekbis/.test(text)) sindonews = await feedid.sindonews.ekbis()
    if (/international/.test(text)) sindonews = await feedid.sindonews.international()
    if (/daerah/.test(text)) sindonews = await feedid.sindonews.daerah()
    if (/sports/.test(text)) sindonews = await feedid.sindonews.sports()
    if (/otomotif/.test(text)) sindonews = await feedid.sindonews.otomotif()
    if (/tekno/.test(text)) sindonews = await feedid.sindonews.tekno()
    if (/sains/.test(text)) sindonews = await feedid.sindonews.sains()
    if (/edukasi/.test(text)) sindonews = await feedid.sindonews.edukasi()
    if (/lifestyle/.test(text)) sindonews = await feedid.sindonews.lifestyle()
    if (/kalam/.test(text)) sindonews = await feedid.sindonews.kalam()
    if(sindonews.success == false) throw sindonews.message
    let Array = sindonews.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'sindonews.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['sindonews <kategori>']
handler.tags = ['news','update']
handler.command = /^(sindonews)$/i
  
module.exports = handler