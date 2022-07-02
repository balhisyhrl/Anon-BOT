const { sticker } = require('../lib/sticker.js')

let handler = async (m, { conn, text }) => {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    api = await conn.getBuffer(`https://xteam.xyz/ttp?file&text=${text.toLowerCase().replace(listkatakotor, '(*BADWORD*)')}`)
    if(!api) throw `ERROR atau API DOWN`
    conn.sendMessage(m.chat, {sticker:api},{quoted:m}) 
}
handler.help = ['ttp <teks>']
handler.tags = ['sticker']

handler.command = /^ttp$/i

module.exports = handler