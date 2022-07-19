let handler = async (m, { conn, usedPrefix }) => {
conn.sendButton(m.chat, `
╭─「 *DONASI* 」
│ > Ingin donasi ke BOT?
│ > Paypal : https://paypal.me/balhisyhrl
│ > Dana : 085156299020
│ > Gopay : 085156299020
│ > Perfect Money : U39360574
│ _Hasil donasi akan dipakai untuk membuat BOT ONLINE 24 JAM_
╰────
`.trim(), wm, 'Menu', usedPrefix + 'menu', m)
}
handler.help = ['donasi']
handler.tags = ['about']
handler.command = /^dona(te|si)$/i

module.exports = handler
