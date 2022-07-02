const fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Nyari apa?'
  let textfilter = text.toLowerCase().replace(listkatakotor, 'astaghfirullah')
  let res = await fetch(global.API('https://wall.alphacoders.com/api2.0', '/get.php', {
    auth: '3e7756c85df54b78f934a284c11abe4e',
    method: 'search',
    term: textfilter
  }))
  if (!res.ok) throw await res.textfilter()
  let json = await res.json()
  if (json.total_match == '0') {
      throw 'WALLPAPER NOT FOUND'
  } else {
    let img = json.wallpapers[Math.floor(Math.random() * json.wallpapers.length)]
    await conn.sendFile(m.chat, img.url_image, 'wallpaper', 'Nih wallpaper!', m)
  }
}

handler.help = ['wallpaper <query>']
handler.tags = ['image']
handler.command = /^wall(paper)?q?$/i

module.exports = handler
