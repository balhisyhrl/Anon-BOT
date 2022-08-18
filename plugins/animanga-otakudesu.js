let fetch = require('node-fetch')
let fs = require('fs')
const { otakudesu } = require("../lib/scrape")
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    //let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    if (!text) throw `Use example ${usedPrefix}${command} Anime`
    let result = await otakudesu(text)
    let datathumb = await(await fetch(result.img)).buffer()
    let otaku = `
*JUDUL:* ${result.judul}
*JEPANG:* ${result.jepang}
*RATE:* ${result.rate}
*PRODUSER:* ${result.produser}
*TIPE:* ${result.tipe}
*STATUS:* ${result.status}
*EPISODE:* ${result.episode}
*DURASI:* ${result.durasi}
*RILIS:* ${result.rilis}
*STUDIO:* ${result.studio}
*GENRE:* ${result.genre}
*DESC:* ${result.desc}
*BATCH:* ${result.batch}
*BATCHSD:* ${result.batchSD}
*BATCHHD:* ${result.batchHD}
`
await conn.sendButtonImg(m.chat, datathumb, otaku, wm, 'menu', '.menu', m)
}

handler.help = ['otakudesu']
handler.tags = ['animanga','update']
handler.command = /^(otakudesu)$/i

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}