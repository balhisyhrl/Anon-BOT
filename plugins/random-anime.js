/*
Made by https://github.com/balhisyhrl
*/
const axios = require('axios')
const cheerio = require('cheerio')

let handler = async(m, { conn, usedPrefix, command }) => {
  let gaskan = pickRandom(global.wibuu)
  const json = await pinterest(gaskan)

  let img = json[Math.floor(Math.random() * json.length)]
  api = await conn.getBuffer(img)
  if(!api) throw conn.sendButton(m.chat, 'Pelan - Pelan Aja kk', wm, 'WIBU Lagi?', usedPrefix + command, m)
const buttons = [
  {buttonId: usedPrefix + command, buttonText: {displayText: `WIBU Lagi?`}, type: 1}
]
 let gass = await conn.sendMessage(m.chat, { 
  image: {url: img},
  caption: `WIBU!`.trim(),
  footer: wm,
  buttons: buttons,
  headerType: 4
  })
  if (!gass) throw `ERROR`
}
handler.help = ['picanime']
handler.tags = ['random','animanga','top']
handler.command = /^(randomanime|picanime)$/i

module.exports = handler

function pinterest(querry){
	return new Promise(async(resolve,reject) => {
        try {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
			"cookie" : global.pinhead
        }
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236x/g,'originals'))
			})
			hasil.shift();
		resolve(hasil)
		})
    } catch (e) {
        reject(e)
      }
	})
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

global.wibuu = [
    "anime",
    "anime aesthetic",
    "anime wallpaper",
    "anime hd",
    "anime keren",
    "Wallpaper anime",
    "cybergoth icons anime",
    "cyber anime edit",
    "dark anime",
    "anime pfp",
    "anime cybercore",
    "Icons anime",
    "One Punch Man",
    "One Piece",
    "Naruto",
    "Boruto"
  ]