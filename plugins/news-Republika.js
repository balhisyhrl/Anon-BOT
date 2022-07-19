const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['terbaru', 'news', 'daerah', 'khazanah', 'islam', 'internasional', 'leisure', 'bola']
    let er = `
┌「 *Pilihan Kategori Republika* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let republikadotcom
    if (/terbaru/.test(text)) republikadotcom = await feedid.republika.terbaru()
    if (/news/.test(text)) republikadotcom = await feedid.republika.news()
    if (/daerah/.test(text)) republikadotcom = await feedid.republika.daerah()
    if (/khazanah/.test(text)) republikadotcom = await feedid.republika.khazanah()
    if (/islam/.test(text)) republikadotcom = await feedid.republika.islam()
    if (/internasional/.test(text)) republikadotcom = await feedid.republika.internasional()
    if (/leisure/.test(text)) republikadotcom = await feedid.republika.leisure()
    if (/bola/.test(text)) republikadotcom = await feedid.republika.bola()
    if(republikadotcom.success == false) throw republikadotcom.message
    let Array = republikadotcom.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'republikadotcom.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['republika <kategori>']
handler.tags = ['news','update']
handler.command = /^(republika)$/i
  
module.exports = handler