let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Masukkan query!`
  let res = await fetch(global.API('https://api.jikan.moe', '/v3/search/character', { q: text }))
  if (!res.ok) throw `API ERROR atau CHARACTER TIDAK DITEMUKAN`
  let json = await res.json()
  if (json.status == '404') throw `CHARACTER TIDAK DITEMUKAN`
  if (json.status == '500') throw `API ERROR atau CHARACTER TIDAK DITEMUKAN`
  let { name, alternative_names, url, image_url } = json.results[0]
let charaingfo = `✨️ *Name :* ${name}
💫 *Alternative Name :* ${alternative_names}
🌐️ *Link* : ${url}`
  conn.sendFile(m.chat, image_url, '', charaingfo, m)
}
handler.help = ['chara <nama chara>']
handler.tags = ['animanga']
handler.command = /^(chara|character)$/i

handler.register = true

module.exports = handler