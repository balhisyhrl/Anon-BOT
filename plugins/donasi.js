let handler = async (m, { conn, usedPrefix }) => {
conn.sendButton(m.chat, `
╭─「 *NOTE* 」
│ > Ingin donasi?
│ _Silahkan berdonasi kepada orang orang yang membutuhkan, misalnya ke panti asuhan, orang kurang mampu, masjid, dsb._
│ _BOT berjalan dengan biaya owner sendiri, sehingga tidak memerlukan donasi kalian_
╰────
`.trim(), wm, 'Menu', usedPrefix + 'menu', m)
}
handler.help = ['donasi']
handler.tags = ['about']
handler.command = /^dona(te|si)$/i

module.exports = handler
