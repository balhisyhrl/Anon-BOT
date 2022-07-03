const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*teka/i.test(m.quoted.text)) return !0
    this.tebakkata = this.tebakkata ? this.tebakkata : {}
    if (!(id in this.tebakkata)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebakkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkata[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakkata[id][2]
            global.db.data.users[m.sender].tiketcoin += 1
            this.sendButton(m.chat, benar + ` +${this.tebakkata[id][2]} XP\n+1 Tiketcoin`, wm, 'Lagi?', '.tebakkata', m)
            clearTimeout(this.tebakkata[id][3])
            delete this.tebakkata[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) this.sendButton(m.chat, dikit, wm, 'Bantuan', '.teka', m)
        else this.sendButton(m.chat, salah, wm, 'Bantuan', '.teka', m)
    }
    return !0
}
handler.exp = 0

module.exports = handler