const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['terbaru', 'bisnis', 'bola', 'lifestyle', 'entertaiment', 'otomotif', 'tekno', 'health']
    let er = `
┌「 *Pilihan Kategori Suara.com* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let suaradotcom
    if (/terbaru/.test(text)) suaradotcom = await feedid.suara.terbaru()
    if (/bisnis/.test(text)) suaradotcom = await feedid.suara.bisnis()
    if (/bola/.test(text)) suaradotcom = await feedid.suara.bola()
    if (/lifestyle/.test(text)) suaradotcom = await feedid.suara.lifestyle()
    if (/entertaiment/.test(text)) suaradotcom = await feedid.suara.entertaiment()
    if (/tekno/.test(text)) suaradotcom = await feedid.suara.tekno()
    if (/otomotif/.test(text)) suaradotcom = await feedid.suara.otomotif()
    if (/health/.test(text)) suaradotcom = await feedid.suara.health()
    if(suaradotcom.success == false) throw suaradotcom.message
    let Array = suaradotcom.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'suaradotcom.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['suaradotcom <kategori>']
handler.tags = ['news','update']
handler.command = /^(suaradotcom)$/i
  
module.exports = handler