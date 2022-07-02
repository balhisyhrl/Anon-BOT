let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw `Gunakan https/http\nContoh : ${usedPrefix + command} https://balhis.codes`
    m.reply('Tunggu kk')
    if (args[0]) {
      if (isUrl(args[0])) url = `https://nurutomo.herokuapp.com/api/ssweb?url=${encodeURIComponent(args[0])}&full=false&type=png`
      else throw `URL tidak valid!\nGunakan https/http\nContoh : ${usedPrefix + command} https://balhis.codes`
      if (url) await conn.sendFile(m.chat, url, 'ss.png', 'ini kak', m)

    } else {
        throw `Gunakan https/http\nContoh : ${usedPrefix + command} https://balhis.codes`
    }
  }
  handler.help = ['ssweb']
  handler.tags = ['sptools']
  handler.command = /^ssweb$/i
  
  module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9]/, 'gi'))
}