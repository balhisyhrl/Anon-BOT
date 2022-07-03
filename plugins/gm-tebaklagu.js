let fetch = require('node-fetch')
const fs = require('fs')

let timeout = 180000
let poin = 1000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (id in conn.tebaklagu) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaklagu[id][0])
        throw false
    }
    // ubah isi 'id' kalo mau ganti playlist spotifynya
    
    let src = JSON.parse(fs.readFileSync('./api/tebaklagu.json'))
    let json = src[Math.floor(Math.random() * src.length)]
    // if (!json.status) throw json
    let caption = `
TEBAK JUDUL LAGU 
Artis : ${json.artis}
Judul : _____
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *${usedPrefix}ceklagu* untuk bantuan
Bonus: ${poin} XP
Tiketcoin: 1 Tiketcoin
*Balas pesan ini untuk menjawab!*`.trim()
    const buttons = [
        {buttonId: usedPrefix + 'ceklagu', buttonText: {displayText: `Bantuan`}, type: 1}
    ]
    conn.tebaklagu[id] = [
        await conn.sendMessage(m.chat, { 
            image: {url: fla + 'Tebak Lagu'},
            caption: `${caption}`.trim(),
            footer: wm,
            buttons: buttons,
            headerType: 4
            }),
        json, poin,
        setTimeout(() => {
            if (conn.tebaklagu[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.judul}*`, conn.tebaklagu[id][0])
            delete conn.tebaklagu[id]
        }, timeout)
    ]
    await conn.sendFile(m.chat, json.lagu, 'audio.mp3', '', m)
}
handler.help = ['tebaklagu']
handler.tags = ['game']
handler.command = /^tebaklagu$/i
handler.group = true
module.exports = handler
