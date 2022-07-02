let handler = async (m, { conn, usedPrefix }) => {
conn.sendButton(m.chat, `
╭─「 *DONASI* 」
│ > Ingin donasi ke BOT?
│ _Silahkan menghubungi owner_
│ _https://wa.me/6285156299020_
│ _Hasil donasi akan dipakai untuk membuat BOT ONLINE 24 JAM_
╰────
╭─「 *NOTE* 」
│ > _Tidak ada paksaan untuk kalian berdonasi~_
╰────
`.trim(), wm, 'Menu', usedPrefix + 'menu', m)
}
handler.help = ['donasi']
handler.tags = ['about']
handler.command = /^dona(te|si)$/i

module.exports = handler
