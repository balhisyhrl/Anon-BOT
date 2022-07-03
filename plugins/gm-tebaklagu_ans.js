const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEBAK JUDUL LAGU/i.test(m.quoted.text)) return !0
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
    if (!(id in this.tebaklagu)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebaklagu[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.judul.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaklagu[id][2]
            global.db.data.users[m.sender].tiketcoin += 1
            this.sendButton(m.chat, benar + ` +${this.tebaklagu[id][2]} XP\n+1 Tiketcoin`, wm, 'Lagi?', '.tebaklagu', m)
            clearTimeout(this.tebaklagu[id][3])
            delete this.tebaklagu[id]
        } else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold) this.sendButton(m.chat, dikit, wm, 'Bantuan', '.ceklagu', m)
        else this.sendButton(m.chat, salah, wm, 'Bantuan', '.ceklagu', m)
    }
    return !0
}
handler.exp = 0

module.exports = handler
