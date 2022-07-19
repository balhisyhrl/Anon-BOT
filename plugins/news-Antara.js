const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['terbaru', 'politik', 'hukum', 'ekonomi', 'metro', 'bola', 'olahraga', 'humaniora', 'lifestyle', 'hiburan', 'dunia', 'tekno', 'otomotif']
    let er = `
┌「 *Pilihan Kategori AntaraNews* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} politik
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let antaranews
    if (/terbaru/.test(text)) antaranews = await feedid.antara.terbaru()
    if (/politik/.test(text)) antaranews = await feedid.antara.politik()
    if (/hukum/.test(text)) antaranews = await feedid.antara.hukum()
    if (/ekonomi/.test(text)) antaranews = await feedid.antara.ekonomi()
    if (/metro/.test(text)) antaranews = await feedid.antara.metro()
    if (/bola/.test(text)) antaranews = await feedid.antara.bola()
    if (/olahraga/.test(text)) antaranews = await feedid.antara.olahraga()
    if (/humaniora/.test(text)) antaranews = await feedid.antara.humaniora()
    if (/lifestyle/.test(text)) antaranews = await feedid.antara.lifestyle()
    if (/hiburan/.test(text)) antaranews = await feedid.antara.hiburan()
    if (/dunia/.test(text)) antaranews = await feedid.antara.dunia()
    if (/tekno/.test(text)) antaranews = await feedid.antara.tekno()
    if (/otomotif/.test(text)) antaranews = await feedid.antara.otomotif()
    if(antaranews.success == false) throw antaranews.message
    let Array = antaranews.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'antaranews.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['antaranews <kategori>']
handler.tags = ['news','update']
handler.command = /^(antaranews)$/i
  
module.exports = handler