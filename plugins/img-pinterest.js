const axios = require('axios')
const cheerio = require('cheerio')

let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh :\n${usedPrefix + command} anime`
  try{
    const json = await pinterest(text)
  //let regex = /https:\/\/i.pinimg.com\/(*?)\/(*?)\/(*?)\/(*?)/g
  let img = json[Math.floor(Math.random() * json.length)]
  api = await conn.getBuffer(img)
  if(!api) throw conn.sendButton(m.chat, 'Pelan - Pelan Aja kk', wm, `Cari ${text} Lagi?`, usedPrefix + `pinterest ${text}`, m)
  const buttons = [
    {buttonId: usedPrefix + `pinterest ${text}`, buttonText: {displayText: `Cari ${text} Lagi?`}, type: 1}
  ]
  await conn.sendMessage(m.chat, { 
    image: {url: img},
    caption: `*Hasil pencarian :* ${text}\n*Link Asli :* ${img}`.trim(),
    footer: wm,
    buttons: buttons,
    headerType: 4
  })
  } catch(e){
    await conn.sendButton(m.chat, 'Pelan - Pelan Aja kk\nERROR: Gagal mengambil gambar', wm, `Cari ${text} Lagi?`, usedPrefix + `pinterest ${text}`, m)
  }
}
handler.help = ['pinterest <keyword>']
handler.tags = ['image','top']
handler.command = /^(pinterest)$/i

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