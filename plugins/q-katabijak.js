/*
Made by https://github.com/balhisyhrl
*/
const fetch = require('node-fetch')
const axios = require('axios')

let handler = async (m, { conn, text }) => {
    let res = await fetch('https://twindev.herokuapp.com/api/v1/kata-bijak/kategori')
    let json = await res.json()
    let kategori = pickRandom(json)
    let res2 = await fetch(`https://twindev.herokuapp.com/api/v1/kata-bijak/kategori/tokoh?q=${encodeURI(kategori)}`)
    if (!res2.ok) throw 'error'
    let json2 = await res2.json()
    let tokoh = pickRandom(json2.results)
    let res3 = await fetch(`https://twindev.herokuapp.com/api/v1/kata-bijak/kata/tokoh?q=${encodeURI(tokoh.nama)}`)
    if (!res3.ok) throw 'error2'
    let json3 = await res3.json()
    let kata = `"${pickRandom(json3.results)}"

- ${tokoh.nama.replace(/_/g,' ')} ${tokoh.keterangan}`
    await conn.reply(m.chat, kata, m)
}

handler.help = ['katabijak']
handler.tags = ['quotes','update']
handler.command = /^(katabijak)$/i

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
  }