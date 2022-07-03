let fetch = require('node-fetch')

let timeout = 180000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tekateki[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tekateki.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `${json.pertanyaan}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}tekki untuk bantuan
Bonus: ${poin} XP
Tiketcoin: 1 Tiketcoin
`.trim()
        const buttons = [
            {buttonId: usedPrefix + 'tekki', buttonText: {displayText: `Bantuan`}, type: 1}
        ]
    conn.tekateki[id] = [
        await conn.sendMessage(m.chat, { 
            image: {url: fla + 'Teka-Teki'},
            caption: `${caption}`.trim(),
            footer: wm,
            buttons: buttons,
            headerType: 4
            }),
        json, poin,
        setTimeout(() => {
            if (conn.tekateki[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}
handler.help = ['tekateki']
handler.tags = ['game']
handler.command = /^tekateki/i
handler.group = true

module.exports = handler