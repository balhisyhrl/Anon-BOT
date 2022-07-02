let handler = async (m, { conn, participants, command, text }) => {
    let textfitlter = text.replace(listkatakotor, '(*SENSOR*)')
    let who
    if (!m.isGroup) who = m.sender
    else {
        let member = participants.map(u => u.id)
        who = member[Math.floor(Math.random() * member.length)]
    }
    let jawab = `Yang paling ${textfitlter} disini adalah @${who.replace(/@.+/, '')}
    `.trim()
    let saha = [who]
    let mentionedJid = saha.concat(m.mentionedJid)
    conn.reply(m.chat, jawab, m, { contextInfo: { mentionedJid } })
}
handler.help = ['paling <teks>']
handler.tags = ['kerang']
handler.command = /^(paling|sipaling)$/i

module.exports = handler