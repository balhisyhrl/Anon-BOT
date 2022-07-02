const { wallpaper, wallpaperv2  } = require('@bochilteam/scraper')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh :\n${usedPrefix}${command} Minecraft`
    let textfilter = text.toLowerCase().replace(listkatakotor, 'astaghfirullah')
    const res = await (/2/.test(command) ? wallpaperv2 : wallpaper)(textfilter)
    const img = res[Math.floor(Math.random() * res.length)]
    conn.sendFile(m.chat, img, 'wallpaper.jpg', `Result from *${textfilter}*`, m)
}
handler.help = ['2', '3'].map(v => 'wallpaper' + v + ' <query>')
handler.tags = ['image']

handler.command = /^wall(paper)?(2|3)?$/i

module.exports = handler