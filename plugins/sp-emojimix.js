const fs = require('fs')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [emoji1, emoji2] = text.split`+`
		if (!emoji1) throw `Contoh : ${usedPrefix + command} 😅+🤔`
		if (!emoji2) throw `Contoh : ${usedPrefix + command} 😅+🤔`
        m.reply('Tunggu kk')
        let res = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyDKSMQm8LfbKntv-7Kq0SZl4C1ix82eDmA&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
        let json = await res.json()
        if(json.results[0] == null) throw 'ERROR'
        let { id, title, url } = json.results[0]
        m.reply(`https://tenor.googleapis.com/v2/featured?key=AIzaSyDKSMQm8LfbKntv-7Kq0SZl4C1ix82eDmA&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
        let encmedia = await conn.sendImageAsSticker(m.chat, url, m, { 
            packname: global.packname, 
            author: global.author, 
            categories: res.tags,
            quoted: m,
            mimetype: 'image/webp',
            ephemeralExpiration: 86400
          })
          /*if (isUrl(url)) stiker = await sticker(false, url, global.packname, global.author)
          if (stiker) await conn.sendMessage(m.chat, { sticker: stiker }, {
            quoted: m,
            mimetype: 'image/webp',
            ephemeralExpiration: 86400
          })
          /*let stiker = await sticker(false, url, global.packname, global.author)
          await conn.sendMessage(m.chat, { sticker: stiker }, {
            quoted: m,
            mimetype: 'image/webp',
            ephemeralExpiration: 86400
          })*/
		    await fs.unlinkSync(encmedia)
        /*let stiker = await sticker(false, url, global.packname, global.author)
        await conn.sendMessage(m.chat, { sticker: stiker }, {
            quoted: m,
            mimetype: 'image/webp',
            ephemeralExpiration: 86400
          })*/
		
  }
  handler.help = ['emojimix 😅+🤔']
  handler.tags = ['sptools','top']
  handler.command = /^(emojimix|emotemix|emotmix)$/i
  
  module.exports = handler

  const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
  }