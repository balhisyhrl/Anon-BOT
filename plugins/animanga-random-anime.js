/*
Made by https://github.com/balhisyhrl
*/
const translate = require('translate-google-api')
const defaultLang = 'id'
const tld = 'cn'

let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  let res = await fetch('https://api.jikan.moe/v4/random/anime')
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let { title, members, synopsis, episodes, url, rating, score, rank, images, popularity, type, aired, airing, status, duration, season } = json.data
  if(synopsis == null) synopsis = '-'
  let translateid = await translate(synopsis, {
    tld,
    to: 'id',
})
  let ratednime
  if(/g|G/.test(rating)) ratednime = 'Semua Umur'
  if(/pg|PG/.test(rating)) ratednime = 'Anak-Anak'
  if(/pg13|PG-13/.test(rating)) ratednime = 'Remaja 13 Tahun Atau Lebih Tua'
  if(/R - 17+ (violence & profanity) /.test(rating)) ratednime = 'R - 17+ (kekerasan & kata-kata kotor)'
  if(/R+ - Mild Nudity/.test(rating)) ratednime = 'Unsur Ketelanjangan (Mungkin mengandung kekerasan & kata kata kotor)'
  if(/rx|Rx/.test(rating)) ratednime = 'HENTAI 🔞'
  let animeingfo = `*[ RANDOM ANIME ]*\n
${ratednime == 'HENTAI 🔞' ? '*ALERT! KONTEN 18+*, Segala dosa yang kamu dapatkan menjadi tanggunganmu sendiri! ANON-BOT TIDAK BERTANGGUNG JAWAB ATAS DOSAMU!' : ''}
✨️ *Title :* ${title}
💫 *Episodes :* ${episodes}
💫 *Duration :* ${duration}
⭐ *Season :* ${season}
➡️ *Air date :* ${aired.string}
💬 *Airing :* ${airing}
💬 *Status :* ${status}
🎥 *Show Type :* ${type}
👑 *Rank :* ${rank}
💌️ *Rating :* ${rating} - ${ratednime}
💯 *Score :* ${score}
👥 *Members :* ${members}
🌟 *Popularity :* ${popularity}
🇬🇧 *Synopsis :* ${synopsis}
🇲🇨 *Sinopsis :* ${translateid[0]}
🌐️ *URL* : ${url}`
if(/rx|Rx/.test(rating)) {
    conn.sendFile(m.chat, 'https://telegra.ph/file/72fb839f41633c4dca43c.jpg', '', animeingfo, m)
} else{
    //m.reply(animeingfo)
    conn.sendFile(m.chat, images.jpg.image_url, '', animeingfo, m)
}
}
handler.help = ['randomnime']
handler.tags = ['animanga']
handler.command = /^(randomnime)$/i

module.exports = handler