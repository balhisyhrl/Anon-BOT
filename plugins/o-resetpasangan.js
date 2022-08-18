let handler = async (m, { conn, args }) => {
    let who = m.mentionedJid ? m.mentionedJid[0] : (args[0].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')
    if(!m.mentionedJid || !args[0]) throw 'Tag salah satu, atau ketik Nomernya!!'
	global.db.data.users[who].pasangan = 0
	conn.reply(m.chat, `*Pasangan berhasil direset untuk @${who.split('@')[0]}*`, m, {contextInfo: {
        mentionedJid:  who
      }})
}
handler.help = ['resetpasangan']
handler.tags = ['owner']
handler.command = /^(resetpasangan)$/i

handler.owner = true

module.exports = handler