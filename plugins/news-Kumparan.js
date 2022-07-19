const feedid = require('feedid')

let handler = async (m, { conn }) => {
    let kumparan = await feedid.kumparan.terbaru()
    if(kumparan.success == false) throw kumparan.message
    let Array = kumparan.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'kumparan.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['kumparan']
handler.tags = ['news','update']
handler.command = /^(kumparan)$/i
  
module.exports = handler