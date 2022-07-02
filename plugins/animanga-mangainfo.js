const translate = require('translate-google-api')
const defaultLang = 'id'
const tld = 'cn'

let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Masukkan query!`
  let res = await fetch(global.API('https://api.jikan.moe', '/v3/search/manga', { q: text }))
  if (!res.ok) throw `API ERROR atau JUDUL MANGA TIDAK DITEMUKAN`
  let json = await res.json()
  let { title, synopsis, chapters, url, volumes, score, image_url } = json.results[0]
  let err = `error`.trim()
  let texttrans = synopsis
  let lang = 'id'
  let mangaingfo = `✨️ *Title:* ${title}
💫 *Chapters :* ${chapters}
🔥 *Volumes :* ${volumes}
💯 *Score :* ${score}
🇬🇧 *Synopsis :* ${synopsis}`
  //conn.sendFile(m.chat, image_url, '', mangaingfo, m)
  try {
    result = await translate(`${texttrans}`, {
        tld,
        to: lang,
    })
    } catch (e) {
    result = await translate(`${texttrans}`, {
        tld,
        to: defaultLang,
    })
    throw err
    } finally {
    conn.sendFile(m.chat, image_url, '', mangaingfo + `\n🇲🇨 *Sinopsis :* ${result[0]}\n*Link*: ${url}`, m)}
}
handler.help = ['manga <judul>']
handler.tags = ['animanga']
handler.command = /^(manga)$/i

module.exports = handler