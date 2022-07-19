/*
Made by https://github.com/balhisyhrl
*/
const wpCheck = require('wordpress-check');

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Contoh :\n${usedPrefix + command} https://blog.balhis.codes`
    if(!isUrl(text)) `Contoh :\n${usedPrefix + command} https://blog.balhis.codes`
        try {
            let ssweb = `https://nurutomo.herokuapp.com/api/ssweb?url=${encodeURIComponent(text)}&full=false&type=png`
            let WP = await checkUrl(text)
            let WPVerfromMeta = WP.version[0].fromMeta
            let WPfromFeed = WP.version[1].fromFeed
            let user = WP.users.map(v => v.name).join('\n│ • ')
            let themes = WP.themes.map(v => v.name + '^' + v.version).join('\n│ • ')
            let plugins = WP.plugins.map(v => v.name + '^' + v.version).join('\n│ • ')
            let directoryIndexing = WP.directoryIndexing.map(v => text + v).join('\n│ • ')
            let hasilscan = `*[ ANON-BOT Wordpress Scanner ]*

╭─❑ 「 WP Version 」 ❑──
│ • WP Version fromMeta : ${WPVerfromMeta ? WPVerfromMeta : 'GAGAL'}
│ • WP Version WPfromFeed : ${WPfromFeed ? WPfromFeed : 'GAGAL'}
╰❑
╭─❑ 「 User 」 ❑──
│ • ${user ? user : 'GAGAL MENGAMBIL USER'}
╰❑
╭─❑ 「 Themes 」 ❑──
│ • ${themes ? themes : "GAGAL MENGAMBIL THEMES"}
╰❑
╭─❑ 「 Plugins 」 ❑──
│ • ${plugins ? plugins : "GAGAL MENGAMBIL PLUGINS"}
╰❑
╭─❑ 「 directoryIndexing 」 ❑──
│ • ${directoryIndexing ? directoryIndexing : "null"}
╰❑
`
            await conn.sendFile(m.chat, ssweb, 'ss.png', hasilscan, m)
        } catch(e){
            m.reply(`Maaf sedang ERROR atau WEB tidak dapat di scan`)
        }
  }
handler.help = ['wpscan <url>']
handler.tags = ['sptools','update']
handler.command = /^(wpcheck|wpscan)$/i
  
module.exports = handler

async function checkUrl(url) {
    const results = await wpCheck(url)
    return results
}

async function checkUrlAndSaveReport(url) {
    const results = await wpCheck(url, true)
    return results
}

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'gi'))
}