/*
Made by https://github.com/balhisyhrl
*/
const translate = require('translate-google-api')
const defaultLang = 'id'
const tld = 'cn'
let cheerio = require('cheerio')
let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Masukkan query!`
  let res = await fetch(global.API('https://api.jikan.moe', '/v3/search/anime', { q: text }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let { title, members, synopsis, episodes, url, rated, score, image_url, type, start_date, end_date, mal_id } = json.results[0]
  let translateid = await translate(synopsis, {
    tld,
    to: 'id',
})
const genAnim = []
await fetch(`https://myanimelist.net/anime/${mal_id}`, { method: 'get' }).then(res => res.text()).then(res => { const $ = cheerio.load(res);$('div[class="spaceit_pad"]').each((a, b) => { $(b).each(function(c, d) { $(d).find("a").each(function(e, f) { if ($(f).attr("href").startsWith('/anime/genre/')) { genAnim.push($(f).text()) } }) }) }) })
  let ratednime
  if(/g|G/.test(rated)) ratednime = 'Semua Umur - All Ages'
  if(/pg|PG/.test(rated)) ratednime = 'Anak-Anak - Children'
  if(/pg13|PG-13/.test(rated)) ratednime = 'Remaja 13 Atau Lebih Tua - Teens 13 or older'
  if(/r17|R - 17/.test(rated)) ratednime = 'Umur 17+ -  17+ recommended (violence & profanity)'
  if(/r|R+/.test(rated)) ratednime = 'Unsur Ketelanjangan (Mungkin mengandung kekerasan & kata kata kotor) - Mild Nudity (may also contain violence & profanity)'
  if(/rx|Rx/.test(rated)) ratednime = 'HENTAI 🔞'
  let animeingfo = `*[ Cari Anime ${text}]*\n
Halo WIBU! Berikut adalah Anime dengan judul mirip yang kamu cari
${ratednime == 'HENTAI 🔞' ? '*ALERT! KONTEN 18+*, Segala dosa yang kamu dapatkan menjadi tanggunganmu sendiri! ANON-BOT TIDAK BERTANGGUNG JAWAB ATAS DOSAMU!' : ''}
✨️ *Title:* ${title}
💫 *Episodes:* ${episodes}
🎗️ *Genre:* ${genAnim.join(", ")}
➡️ *Start date:* ${start_date}
🔚 *End date:* ${end_date}
🎥 *Show Type:* ${type}
💌️ *Rating:* ${rated} - ${ratednime}
💯 *Score:* ${score}
👥 *Members:* ${members}
🇬🇧 *Synopsis:* ${synopsis}
🇲🇨 *Sinopsis:* ${translateid[0]}
🌐️ *URL*: ${url}`
if(/rx|Rx/.test(rated)) {
    conn.sendFile(m.chat, 'https://telegra.ph/file/72fb839f41633c4dca43c.jpg', '', animeingfo, m)
} else{
    conn.sendFile(m.chat, image_url, '', animeingfo, m)
}
}
handler.help = ['carinime2 <judul>']
handler.tags = ['animanga']
handler.command = /^(carinime2)$/i

handler.register = true

module.exports = handler