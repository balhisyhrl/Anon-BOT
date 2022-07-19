/*
Made by https://github.com/balhisyhrl
*/
const fetch = require('node-fetch')
const axios = require('axios')

let handler = async (m, { conn, text }) => {
    let res = await fetch(`https://katanime.vercel.app/api/getrandom`)
    if (!res.ok) throw 'error'
    let json = await res.json()
    if (!json.sukses) throw 'error'
    let quotes = pickRandom(json.result)
    let kataid = `"${quotes.indo}"

- ${quotes.character} dari ${quotes.anime}`
    let kataen = `"${quotes.english}"

- ${quotes.character} from ${quotes.anime}`
    await conn.reply(m.chat, kataid, m)
    await conn.reply(m.chat, kataen, m)
}

handler.help = ['katanime']
handler.tags = ['quotes','animanga','update']
handler.command = /^(katanime)$/i

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
  }