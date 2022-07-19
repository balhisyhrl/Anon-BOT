/*const { facebookdl, facebookdlv2 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://fb.watch/azFEBmFRcy/`
    const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]))
    let { url, isVideo } = result.reverse() 
    conn.sendFile(m.chat, url, `facebook.mp4`, `🔗 *Url:* ${url}`, m)
}
handler.help = ['facebbok'].map(v => v + ' <url>')
handler.tags = [''] 

handler.command = /^((facebook|fb)(downloder|dl)?)$/i

module.exports = handler

let fetch = require('node-fetch')
const {
    MessageType
} = require('@adiwajshing/baileys')

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) return m.reply(`INVALID URL\n\nContoh :\n${usedPrefix + command} https://fb.watch/azFEBmFRcy/`)
    if (!/facebook|fb.watch/.test(args[0])) return m.reply(`INVALID URL\n\nContoh :\n${usedPrefix + command} https://fb.watch/azFEBmFRcy/`)
	let res = await fetch(`https://masgimenz.my.id/facebook/?url=` + args[0])
	//if (res.status !== 200) throw `Coba Lagi`
	let json = await res.json()
	//if (!json.result) throw `Media tidak ditemukan atau postingan mungkin diprivate`
	let url = json.videoUrl
	m.reply('Tunggu kk')
	if (url) await conn.sendFile(m.chat, url, 'fb.mp4', `✨️ *Title:* ${json.title}\n🎥 *Filesize:* ${json.filesize}\n🔗 *Url:* ${url}`, m)
	//if (url) await conn.sendMessage(m.chat, url, MessageType.video, {mimetype: 'video/mp4', quoted: m, caption: wm})
	else m.reply('Link download tidak ditemukan')
	
	m.reply('Sedang dalam perbaikan')
	}

handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^f((b|acebook)(dl|download)?(er)?)$/i

module.exports = handler */

const cheerio = require('cheerio')
const fetch = require('node-fetch')
const FormData = require('form-data')
let handler = async (m, { usedPrefix, command, conn, args }) => {
  if (!args[0]) throw `Gunakan format: ${usedPrefix}${command} https://fb.watch/xxxxx/`
  let res = await fbdl(args[0])
  if (!res['mp4'].length) throw 'Video not found'
  let video, index
  for (let i = res['mp4'].length - 1; i > 0; i--) {
    let { link, form } = res['mp4'][i]
    let err
    try {
      let res = await fetch(link, {
        method: 'POST',
        headers: { ...form.getHeaders() },
        body: form
      })
      if (!res.ok) continue
      video = await res.buffer()
      index = i
      break
    } catch (e) {
      err = e
      continue
    }
    throw err
  }
  if (!video) throw 'Can\t get video'
  let json = res['mp4'][index]
  let caption = `
*Size:* ${json.fileSizeF}
*Kualitas:* ${json.quality}
`.trim()
  conn.sendFile(m.chat, video, 'media-fb', caption, m)
}
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^f((b|acebook)(dl|download)?(er)?)$/i

module.exports = handler

async function fbdl(url) {
  let headers = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'cookie': '_ga=GA1.1.1805764726.1637028313; __gads=ID=da725d89de7eb36f-22203a52b3ce0048:T=1637028314:RT=1637028314:S=ALNI_MbT2Q15c2dssQYSUzklsfV5jNvQHw; _ga_2JFZCQLD66=GS1.1.1637028313.1.1.1637030115.0',
    'origin': 'https://video-converter-mp4.com',
    'referer': 'https://video-converter-mp4.com/fb-downloader/',
    'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
  }
  let form = new FormData()
  form.append('action', 'wsmd_user_download_request')
  form.append('link', encodeURI(url))
  form.append('requestlink', 'https://video-converter-mp4.com/fb-downloader/')
  form.append('deftab', 'video')
  let res = await fetch('https://video-converter-mp4.com/wp-admin/admin-ajax.php', {
    method: 'POST',
    headers: { ...headers, ...form.getHeaders() },
    body: form
  })
  let $ = cheerio.load(await res.text())
  let results = {
    thumbnail: $('div.wsmd_preview_holder > a').attr('href')
  }
  $('body > div.wsmd_result_table_holder > div.wsmd_tabcontent').each(function (n, element) {
    $(element).find('table.wsmd_result_table > tbody > tr').each(function (i, el) {
      if (i > 0) {
        let type = $(el).find('td:nth-child(1)').text()
        type = /\//.test(type) ? type.split('/')[0] : type
        let quality = $(el).find('td:nth-child(2)').text()
        let fileSizeF = $(el).find('td:nth-child(3)').text()
        let form = $(el).find('td:nth-child(4) > button > form')
        let fileSize = $(form).find('input[name="size"]').attr('value')
        let mime = $(form).find('input[name="type"]').attr('value')
        let link = $(form).attr('action')
        let form2 = new FormData()
        $(form).find('input[name][value]').each(function (j, elem) {
          let name = $(elem).attr('name')
          let value = $(elem).attr('value')
          form2.append(name, value)
        })
        if (type && !(type in results)) results[type] = []
        results[type].push({
          form: form2,
          link,
          type,
          mime,
          quality,
          fileSize,
          fileSizeF
        })
      }
    })
  })
  return results
}