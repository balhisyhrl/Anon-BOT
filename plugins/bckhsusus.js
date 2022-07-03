const fetch = require('node-fetch')
const uploadImage = require('../lib/uploadImage')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let listgc = groups.map(v => v.id)
    m.reply(`Mengirim Broadcast Ke ${listgc.length} Group Chat, Waktu Selesai ${listgc.length * 1.5} detik`)
    let [bc, menu, display] = text.split`%`
    if (!bc || !menu || !display) throw `Gunakan perintah dengan benar\n\ncontoh:\n${usedPrefix + command} pesan|!menu|menu`
    let quoted = m.quoted ? m.quoted : m
    let mime = (quoted.msg || quoted).mimetype || ''
    if (!mime) throw `Balas Video/Image Dengan Caption :\n${usedPrefix + command} ${bc}`
    let mediaurl = await quoted.download()
    let link = await (uploadImage)(mediaurl)
    for (let id of listgc) {
        const buttons = [
            {buttonId: menu, buttonText: {displayText: display}, type: 1}
          ]
        let bg = link
        await conn.delay(1500)
        await conn.sendMessage(id, { 
            image: {url: bg},
            caption: `${bc}`.trim(),
            footer: `BROADCAST ` + wm,
            buttons: buttons,
            headerType: 4
            })
    }
    m.reply(`Sukses Mengirim Broadcast Ke ${listgc.length} Group`)  
}
handler.help = ['bckhusus'].map(v => v + '<text>|<menu>|<displaymenu> <media>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(khusus)$/i

handler.owner = true

module.exports = handler