let zsExtract = require('zs-extract')

let handler = async (m, { conn, args, usedPrefix, command }) => {
 if (!args[0]) throw `Uhm...url nya mana?\n\nContoh:\n${usedPrefix + command} https://www4.zippyshare.com/v/uBGCbNHt/file.html`
 try {
    let res = await zsExtract.extract(args[0])
    let { download, filename } = res
    //m.reply(JSON.stringify(res, null, 2))
    m.reply(wait)
    conn.sendFile(m.chat, download, filename, filename, m)
 } catch(e){
    m.reply('ERROR atau File Tidak Ditemukan ')
 }
}
handler.help = ['ippyshare','ippydl'].map(v => 'z' + v + ' <url>')
handler.tags = ['downloader','update']
handler.command = /^z(ippydl|ippyshare)$/i

module.exports = handler