let { MessageType } = require('@adiwajshing/baileys')
let levelling = require('../lib/levelling')
let fetch = require('node-fetch')
let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, usedPrefix, text }) => {
    //let { premium, registered } = global.db.data.users[m.sender]
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let { name, premium, premiumTime, atm, limit, warning, pasangan, money, exp, lastclaim, tiketcoin, registered, regTime, age, level, role } = global.db.data.users[who]
    if(level < 10) throw `Maaf, Hanya User Diatas Level 10 yang Dapat Menggunakan Fitur Ini`
    let username = conn.getName(who)
    let judul = 'Hi '
      const sections = [
      {
        rows: [
          { title: 'Profile', rowId: `${usedPrefix}profile` },
          { title: `Ambil Semua Uang ${atm}`, rowId: `${usedPrefix}narik all` },
          { title: `Tabung Semua Uang ${money}`, rowId: `${usedPrefix}nabung all` },
                    
        ]
}
    ]
    const listMessage = {
      text: `╭───ꕥ *B* ꕥ───✾
│•> *Nama* : ${username} | ${name}
│•> 🌟  *Premium:* ${premium ? "✅" :"❌"}
│•> 📑  *Registered:* ${registered ? '✅': '❌'}
│•> ⛔  *Warning:* ${warning < 1 ? '❌' : warning}
┝─[ * Exp & Limit* 」
│
│•> 🎫 *Exp* : ${exp}
│•> 🎫 *Limit* : ${limit}
│
┝─[ *Bank* 」
│•> 💳 *ATM* : ${atm}
│•> 💹 *Money* : ${money}
╰─────···─✧`,
      footer: ``,
      title: ``,
      buttonText: "Tarik & Menabung",
      sections
    }
    return conn.sendMessage(m.chat, listMessage, { quoted: m, mentions: await conn.parseMention(judul)})

}
handler.help = ['atm', 'bank', 'my']
handler.tags = ['rpg', 'exp']
handler.command = /^(atm|bank|my)$/i

module.exports = handler