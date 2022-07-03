/*
Made by https://github.com/balhisyhrl
*/
const axios = require('axios')
const cheerio = require('cheerio')

let handler = async(m, { conn, text, usedPrefix, command }) => {
  let gaskan = pickRandom(global.bts)
  const json = await pinterest(gaskan)
  let img = json[Math.floor(Math.random() * json.length)]
  api = await conn.getBuffer(img)
  if(!api) throw conn.sendButton(m.chat, 'Pelan - Pelan Aja kk', wm, `${command} Lagi?`, usedPrefix + command, m)
const buttons = [
  {buttonId: usedPrefix + command, buttonText: {displayText: `${command} Lagi?`}, type: 1}
]
 let gass = await conn.sendMessage(m.chat, { 
  image: {url: img},
  caption: `BTS`.trim(),
  footer: wm,
  buttons: buttons,
  headerType: 4
  })
  if (!gass) throw `ERROR`
}
handler.tags = ['random']
handler.help = ['bts']
handler.command = /^(bts)$/i

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

global.bts = [
    "BTS",
    "BTS aesthetic",
    "BTS wallpaper",
    "BTS hd",
    "BTS keren",
    "capas soft kpop BTS",
    "BTS cybercore",
    "Icons BTS"
  ]