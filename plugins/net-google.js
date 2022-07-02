let fetch = require('node-fetch')
let googleIt = require('google-it')
let handler = async (m, { conn, command, args, usedPrefix }) => {
  let full = /f$/i.test(command)
  let text = args.join` `
  let textfilter = text.toLowerCase().replace(listkatakotor, 'astaghfirullah').replace(/(se(g?k)s|sex|sange|hentai|bugil|gay|lesbi|lesbian|homo|homosexual|lgbt|xnxx|porn|brazzer|naked)/,'astaghfirullah')
  if (!text) throw `Cari apa?\n\nContoh penggunaan:\n${usedPrefix + command} Bahasa pemrograman`
  let url = 'https://google.com/search?q=' + encodeURIComponent(textfilter)
  let search = await googleIt({ query: textfilter })
  let msg = search.map(({ title, link, snippet }) => {
    return `*${title}*\n_${link}_\n_${snippet}_`
  }).join`\n\n`
  try {
    let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).buffer()
    if (ss.includes('html')) throw ''
    await conn.sendFile(m.chat, ss, 'screenshot.png', url + '\n\n' + msg, m, 0, { thumbnail: Buffer.alloc(0) })
  } catch (e) {
    m.reply(msg)
  }
}
handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

