const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['terbaru', 'nasional', 'internasional', 'ekonomi', 'olahraga', 'teknologi', 'hiburan', 'gayaHidup']
    let er = `
┌「 *Pilihan Kategori CNN* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} investment
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let CNN
    if (/terbaru/.test(text)) CNN = await feedid.cnn.terbaru()
    if (/nasional/.test(text)) CNN = await feedid.cnn.nasional()
    if (/internasional/.test(text)) CNN = await feedid.cnn.internasional()
    if (/ekonomi/.test(text)) CNN = await feedid.cnn.ekonomi()
    if (/olahraga/.test(text)) CNN = await feedid.cnn.olahraga()
    if (/teknologi/.test(text)) CNN = await feedid.cnn.teknologi()
    if (/hiburan/.test(text)) CNN = await feedid.cnn.hiburan()
    if (/gayaHidup/.test(text)) CNN = await feedid.cnn.gayaHidup()
    if(CNN.success == false) throw CNN.message
    let Array = CNN.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'cnn.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['cnn <kategori>']
handler.tags = ['news','update']
handler.command = /^(cnn)$/i
  
module.exports = handler