const axios = require('axios')
const cheerio = require('cheerio')

let handler = async(m, { conn, text, usedPrefix, command }) => {
  let gaskan = pickRandom(global.lolicon)
  const json = await pinterest(gaskan)
  let img = json[Math.floor(Math.random() * json.length)]
  api = await conn.getBuffer(img)
  if(!api) throw conn.sendButton(m.chat, 'Pelan - Pelan Aja kk', wm, `Loli Lagi? Pedo Kah?`, usedPrefix + command, m)
const buttons = [
  {buttonId: usedPrefix + command, buttonText: {displayText: `Loli Lagi? Pedo Kah?`}, type: 1}
]
 let gass = await conn.sendMessage(m.chat, { 
  image: {url: img},
  caption: `Pedo kah?`.trim(),
  footer: wm,
  buttons: buttons,
  headerType: 4
  })
  if (!gass) throw `ERROR`
}
handler.tags = ['random','animanga','top']
handler.help = ['randomloli']
handler.command = /^(ranloli|randomloli)$/i

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

global.lolicon = [
    "anime loli",
    "anime loli aesthetic",
    "anime loli wallpaper",
    "anime loli hd",
    "anime loli keren",
    "capas soft anime loli",
    "anime loli cybercore",
    "Icons anime loli",
    "anya spy x family",
    "loli",
    "loli kawai",
    "loli sagiri",
    "anime loli",
    "loli cat"
  ]