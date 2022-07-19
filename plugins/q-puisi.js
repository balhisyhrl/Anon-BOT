/*
Made by Aine
*/

let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let url = await fetch('https://masgi.herokuapp.com/api/puisi1')
  let puisi = await url.json()
let hasil = `${puisi.data}
`.trim()

  m.reply(hasil)
}
handler.help = ['puisi']
handler.tags = ['quotes']
handler.command = /^puisi$/i

module.exports = handler