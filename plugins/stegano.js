/*
Made by https://github.com/balhisyhrl
*/
const fetch = require('node-fetch')

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let textfilter = text.toLowerCase().replace(listkatakotor, 'astaghfirullah')
  if (/sdec|textdecode/.test(command)){
    if (!text) throw `Mau Decode Text Apa?\nContoh :\n${usedPrefix + command} abc`
    let res = await fetch(global.API('https://balhis.codes', '/API/endec/steganotext', {
        decode: text
      }))
      if (!res.ok) throw await m.reply('error')
      let json = await res.json()
      if (json.status == false) {
           throw `${json.msgid}`
      } else {
        let steganotext = `Pesan Terlihat :\n${json.encode}\n\nPesan Tersembunyi :\n${json.decode}`
        await conn.reply(m.chat, steganotext, m)
      }
  } else if(/senc|textencode/.test(command)){
    if (!text) throw `Mau Sembuyiin Text Apa?\nContoh :\n${usedPrefix + command} Teks terlihat|Teks tersembunyi`
    let [public, private] = text.split`|`
    if(!public) throw `Teksnya mana?\nContoh :\n${usedPrefix + command} Teks terlihat|Teks tersembunyi`
    if(!private) throw `Teks yang mau disembunyiin mana?\nContoh :\n${usedPrefix + command} Teks terlihat|Teks tersembunyi`
    if(public.length == 2) throw `Minimal 2 kata pada teks terlihat`
    let res = await fetch(global.API('https://balhis.codes', '/API/endec/steganotext', {
        public: public,
        private: private
      }))
      if (!res.ok) throw await m.reply('error')
      let json = await res.json()
      if (json.status == false) {
          throw `${json.msgid}`
      } else {
        let steganotext = `${json.encode}`
        let info = `Silahkan Copy Text Diatas\n\nNote :\nText dapat di decode melalui
- Anon-BOT
- https://balhis.codes/API/endec/steganotext?decode=text`
        await conn.reply(m.chat, steganotext, m)
        await conn.reply(m.chat, info, m)
        //conn.reply(m.chat, steganotext, null)
      }
}
}

handler.help = ['senc <pesan terlihat>|<pesan tersembunyi>','sdec <pesan terlihat>|<pesan tersembunyi>','textencode <pesan terlihat>|<pesan tersembunyi>','textdecode <pesan terlihat>|<pesan tersembunyi>']
handler.tags = ['sptools']
handler.command = /^(senc|textencode|sdec|textdecode)$/i

module.exports = handler