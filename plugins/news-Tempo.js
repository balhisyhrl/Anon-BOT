const feedid = require('feedid')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['nasional', 'bisnis', 'metro', 'dunia', 'bola', 'cantik', 'tekno', 'otomotif', 'seleb', 'gaya', 'travel', 'difabel', 'creativelab', 'inforial', 'event']
    let er = `
┌「 *Pilihan Kategori TEMPO* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Contoh:
${usedPrefix}${command} recent
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let tempo
    if (/nasional/.test(text)) tempo = await feedid.tempo.nasional()
    if (/bisnis/.test(text)) tempo = await feedid.tempo.bisnis()
    if (/metro/.test(text)) tempo = await feedid.tempo.metro()
    if (/dunia/.test(text)) tempo = await feedid.tempo.dunia()
    if (/bola/.test(text)) tempo = await feedid.tempo.bola()
    if (/cantik/.test(text)) tempo = await feedid.tempo.cantik()
    if (/tekno/.test(text)) tempo = await feedid.tempo.tekno()
    if (/otomotif/.test(text)) tempo = await feedid.tempo.otomotif()
    if (/seleb/.test(text)) tempo = await feedid.tempo.seleb()
    if (/gaya/.test(text)) tempo = await feedid.tempo.gaya()
    if (/travel/.test(text)) tempo = await feedid.tempo.travel()
    if (/difabel/.test(text)) tempo = await feedid.tempo.difabel()
    if (/creativelab/.test(text)) tempo = await feedid.tempo.creativelab()
    if (/inforial/.test(text)) tempo = await feedid.tempo.inforial()
    if (/event/.test(text)) tempo = await feedid.tempo.event()
    if(tempo.success == false) throw tempo.message
    let Array = tempo.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'tempo.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
handler.help = ['tempo <kategori>']
handler.tags = ['news','update']
handler.command = /^(tempo)$/i
  
module.exports = handler