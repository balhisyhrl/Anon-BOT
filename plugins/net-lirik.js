const { lyrics, lyricsv2 } = require('@bochilteam/scraper')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    let textfilter = text.toLowerCase().replace(listkatakotor, 'astaghfirullah')
    if (!teks) throw `Use example ${usedPrefix}${command} hallo`
    const result = await lyricsv2(textfilter).catch(async _ => await lyrics(textfilter))
    conn.reply(m.chat, `Search : ${textfilter}\nLyrics : *${result.title}*\nAuthor : ${result.author}\n${result.lyrics}\n\nUrl : ${result.link}`.trim(), m)
}

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['fun','internet']
handler.command = /^(lirik|lyrics|lyric)$/i

module.exports = handler
