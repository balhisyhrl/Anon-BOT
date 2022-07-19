const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['terbaru', 'jakarta', 'dunia', 'gaya', 'olahraga', 'teknologi', 'otomotif', 'khas', 'sehat', 'jabar', 'jatim', 'jateng', 'sumut']
    let er = `
┌「 *Pilihan Kategori Merdeka* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let merdekadotcom
    if (/terbaru/.test(text)) merdekadotcom = await feedid.merdeka.terbaru()
    if (/jakarta/.test(text)) merdekadotcom = await feedid.merdeka.jakarta()
    if (/dunia/.test(text)) merdekadotcom = await feedid.merdeka.dunia()
    if (/gaya/.test(text)) merdekadotcom = await feedid.merdeka.gaya()
    if (/olahraga/.test(text)) merdekadotcom = await feedid.merdeka.olahraga()
    if (/teknologi/.test(text)) merdekadotcom = await feedid.merdeka.teknologi()
    if (/otomotif/.test(text)) merdekadotcom = await feedid.merdeka.otomotif()
    if (/khas/.test(text)) merdekadotcom = await feedid.merdeka.khas()
    if (/sehat/.test(text)) merdekadotcom = await feedid.merdeka.sehat()
    if (/jabar/.test(text)) merdekadotcom = await feedid.merdeka.jabar()
    if (/jatim/.test(text)) merdekadotcom = await feedid.merdeka.jatim()
    if (/jateng/.test(text)) merdekadotcom = await feedid.merdeka.jateng()
    if (/sumut/.test(text)) merdekadotcom = await feedid.merdeka.sumut()
    if(merdekadotcom.success == false) throw merdekadotcom.message
    let Array = merdekadotcom.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'merdekadotcom.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['merdekadotcom <kategori>']
handler.tags = ['news','update']
handler.command = /^(merdekadotcom)$/i
  
module.exports = handler