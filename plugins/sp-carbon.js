const onecak = require("1cak");
const fetch = require('node-fetch')
const axios = require('axios')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Code nya mana?`
    let carbon = `https://carbonnowsh.herokuapp.com/?code=${encodeURIComponent(text)}`
    let result = await axios.get(carbon, {
        responseType: 'arraybuffer'
      })
    if (!result) throw `error`
    await conn.sendFile(m.chat, result.data, 'code.png', `https://carbon.now.sh`, m)
}
handler.help = ['carbonnowsh <text>']
handler.tags = ['image','sptools','update']
handler.command = /^(carbon|carbonnowsh)$/i
  
module.exports = handler