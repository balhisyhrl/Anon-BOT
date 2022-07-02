const { toDataURL } = require('qrcode')

let handler = async (m, { conn, text }) => {
if(!text) throw 'Contoh :\n!qr ABC'
conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', 'udah jadi nih kk', m)
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <teks>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i


module.exports = handler