/*
Made by https://github.com/balhisyhrl
*/
let handler = async (m, { conn, usedprefix, args, command }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    if(args[0] == '') throw `contoh :\n!${command} username displayname comment`
    if(args[1] == '') throw `contoh :\n!${command} username displayname comment`
    if(args.slice(2).join(' ') == '') throw `contoh :\n!${command} username displayname comment`
    conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/tweet', {
        avatar: await conn.profilePictureUrl(who).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
        username: args[0].replace(/<|>/g, ''),
        displayname: args[1].replace(/<|>/g, ''),
        comment: args.slice(2).join(' ').replace(/<|>/g, ''),
    }), '', `wah viral yah`, m)
}

handler.help = ['faketweet <username> <displayname> <comment> ']
handler.tags = ['image']

handler.command = /^(tweetcom|tweetcomment|faketweet)$/i

module.exports = handler