const feedid = require('feedid')

let handler = async (m, { conn }) => {
    let JPNN = await feedid.jpnn.terbaru()
    if(JPNN.success == false) throw JPNN.message
    let Array = JPNN.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'JPNN.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['jpnn']
handler.tags = ['news','update']
handler.command = /^(jpnn)$/i
  
module.exports = handler