/*
Made by https://github.com/balhisyhrl
*/
const fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Mau Encode Apa?\nContoh : .hash abc'
  let textfilter = text.toLowerCase().replace(listkatakotor, 'astaghfirullah')
  let res = await fetch(global.API('https://balhis.codes', '/API/endec/hash', {
    text: textfilter
  }))
  if (!res.ok) throw await m.reply('error')
  let json = await res.json()
  if (json.status == false) {
      throw 'API ERROR'
  } else {
    let hashh = `Text Asli : ${textfilter}\n
*MD2* : ${json.md2}\n
*MD4* : ${json.md4}\n
*MD5* : ${json.md5}\n
*Bcrypt* : ${json.Bcrypt}\n
*Bcrypt Blowfish* : ${json.Bcrypt_Blowfish}\n
*Argon2I* : ${json.Argon2I}\n
*Argon2ID* : ${json.Argon2ID}`
    await conn.reply(m.chat, hashh, m)
  }
}

handler.help = ['hash <text>']
handler.tags = ['sptools']
handler.command = /^(hash|hashing)$/i

module.exports = handler
