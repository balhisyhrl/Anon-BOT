let fetch = require('node-fetch')
let fs = require('fs')
const { mangatoons } = require("../lib/scrape")
let handler = async(m, { conn, usedPrefix, text, command }) => {
  if (!text) throw `Masukan Judul Manga Nya!`
  let json = await mangatoons(text)
  if(json.length < 1) throw `Judul ${text} Tidak Ditemukan`
  let { thumbnail, judul, genre, link } = pickRandom(json)
  if(!thumbnail || !judul || !genre || !link ) hrow `Judul ${text} Tidak Ditemukan`
  let mangatoonss = `✨️ *Title:* ${judul}
🔥 *Genre :* ${genre}
🌐️ *Link :* ${link}`
  conn.sendButtonImg(m.chat, thumbnail, mangatoonss, wm, `Lainnya`, `${usedPrefix + command}`, m)
}

handler.help = ['mangatoons <judul>']
handler.tags = ['animanga', 'update']
handler.command = /^(mangatoons)$/i

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}