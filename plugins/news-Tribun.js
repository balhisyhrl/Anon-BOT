const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['terbaru', 'bisnis', 'superskor', 'sport', 'seleb', 'lifestyle', 'travel', 'parapuan', 'otomotif', 'techno', 'kesehatan']
    let er = `
┌「 *Pilihan Kategori tribun* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let tribun
    if (/terbaru/.test(text)) tribun = await feedid.tribun.terbaru()
    if (/bisnis/.test(text)) tribun = await feedid.tribun.bisnis()
    if (/superskor/.test(text)) tribun = await feedid.tribun.superskor()
    if (/sport/.test(text)) tribun = await feedid.tribun.sport()
    if (/travel/.test(text)) tribun = await feedid.tribun.travel()
    if (/parapuan/.test(text)) tribun = await feedid.tribun.parapuan()
    if (/otomotif/.test(text)) tribun = await feedid.tribun.otomotif()
    if (/techno/.test(text)) tribun = await feedid.tribun.techno()
    if (/lifestyle/.test(text)) tribun = await feedid.tribun.lifestyle()
    if (/kesehatan/.test(text)) tribun = await feedid.tribun.kesehatan()
    if(tribun.success == false) throw tribun.message
    let Array = tribun.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'tribun.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['tribun <kategori>']
handler.tags = ['news','update']
handler.command = /^(tribun)$/i
  
module.exports = handler