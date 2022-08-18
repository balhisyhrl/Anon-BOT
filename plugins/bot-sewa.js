let handler = async (m, { conn}) => {
    conn.sendButton(m.chat, `┌「 *Sewa Bot ke Grup* 」
├ 7 Hari / Rp 5,000
├ 30 Hari / Rp 15,000
└────
`.trim(), wm, 'Pemilik Bot', '.owner', m)

}
handler.help = ['sewa']
handler.tags = ['main']
handler.command = /^sewabot|sewa$/i

module.exports = handler