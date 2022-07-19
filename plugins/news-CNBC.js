const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['terbaru', 'investment', 'news', 'market', 'enterpreneur', 'syariah', 'tech', 'lifestyle', 'opini', 'profil']
    let er = `
┌「 *Pilihan Kategori CNBC* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} investment
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let cnbc
    if (/terbaru/.test(text)) cnbc = await feedid.cnbc.terbaru()
    if (/investment/.test(text)) cnbc = await feedid.cnbc.investment()
    if (/news/.test(text)) cnbc = await feedid.cnbc.news()
    if (/market/.test(text)) cnbc = await feedid.cnbc.market()
    if (/enterpreneur/.test(text)) cnbc = await feedid.cnbc.enterpreneur()
    if (/syariah/.test(text)) cnbc = await feedid.cnbc.syariah()
    if (/tech/.test(text)) cnbc = await feedid.cnbc.tech()
    if (/lifestyle/.test(text)) cnbc = await feedid.cnbc.lifestyle()
    if (/opini/.test(text)) cnbc = await feedid.cnbc.opini()
    if (/profil/.test(text)) cnbc = await feedid.cnbc.profil()
    if(cnbc.success == false) throw cnbc.message
    let Array = cnbc.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'cnbc.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['cnbc <kategori>']
handler.tags = ['news','update']
handler.command = /^(cnbc)$/i
  
module.exports = handler