const fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let listgc = groups.map(v => v.id)
    m.reply(`Mengirim Broadcast Ke ${listgc.length} Group Chat, Waktu Selesai ${listgc.length * 1.5} detik`)
    for (let id of listgc) {
        const buttons = [
            {buttonId: '!menu', buttonText: {displayText: `MENU`}, type: 1}
          ]
        let bg = 'https://telegra.ph/file/b9484a813e7c1112c9a59.jpg'
        await conn.delay(1500)
        await conn.sendMessage(id, { 
            image: {url: bg},
            caption: `${text}`.trim(),
            footer: `BROADCAST ` + wm,
            buttons: buttons,
            headerType: 4
            })
    }
    m.reply(`Sukses Mengirim Broadcast Ke ${listgc.length} Group`)  
}
handler.help = ['bcloc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(loc)$/i

handler.owner = true

module.exports = handler