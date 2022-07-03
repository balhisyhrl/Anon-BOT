let handler = async (m, { conn, args, usedPrefix, command, DevMode }) => {
    const isNumber = (text) => {
        return text.match(new RegExp(/[0-9]/, 'gi'))
      }
    let ar = ['exp','limit', 'money', 'potion', 'sampah','diamond', 'common', 'uncommon', 'mythic', 'legendary']
    let er = `
┌「 *Pilihan* 」
${ar.map(v => '├ ' + v).join`\n`}
└────
    
Contoh :
${usedPrefix}${command} money 100 @${m.sender.split`@`[0]}*
    `.trim()
    if (args.length < 3) {
        return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer money 100 @${m.sender.split`@`[0]}*`.trim(), m)
    } else if(!args[0] || !args[1] || !args[2]) {
        return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer money 100 @${m.sender.split`@`[0]}*`.trim(), m)
    } else if(!isNumber(args[2].replace(/[@ .+-]/g, '').replace(' ', ''))) {
        return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer money 100 @${m.sender.split`@`[0]}*`.trim(), m)
    } else if(!ar.includes(args[0])) {
        return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer money 100 @${m.sender.split`@`[0]}*\n\n${er}`.trim(), m)
    } else try {
        let type = (args[0] || '').toLowerCase()
        let count = args[1] && args[1].length > 0 ? Math.min(9999999, Math.max(parseInt(args[1]), 1)) : Math.min(1)
        let who = m.mentionedJid ? m.mentionedJid[0] : (args[2].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')
        if(!m.mentionedJid || !args[2]) throw 'Tag salah satu, atau ketik Nomernya!!'
        let users = global.db.data.users
        switch (type) {
            case 'exp':
                if (global.db.data.users[m.sender].exp >= count * 1) {
                    try {
                        global.db.data.users[m.sender].exp -= count * 1
                        global.db.data.users[who].exp += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer exp sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].exp += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (owner) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Exp kamu tidak mencukupi untuk mentransfer Exp sebesar ${count}`.trim(), m)
                break
            case 'limit':
                if (global.db.data.users[m.sender].limit >= count * 1) {
                    try {
                        global.db.data.users[m.sender].limit -= count * 1
                        global.db.data.users[who].limit += count * 1
                        conn.sendButton(m.chat, `Berhasil mentransfer ${rpg.emoticon('limit')}Limit sebesar ${count}`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                    } catch (e) {
                        global.db.data.users[m.sender].limit += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.sendButton(m.chat, `Limit kamu tidak mencukupi untuk mentransfer ${rpg.emoticon('limit')}Limit sebesar ${count}`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                break
            case 'money':
                if (global.db.data.users[m.sender].money >= count * 1) {
                    try {
                        global.db.data.users[m.sender].money -= count * 1
                        global.db.data.users[who].money += count * 1
                        conn.sendButton(m.chat, `Berhasil mentransfer ${rpg.emoticon('money')}money sebesar ${count}`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                    } catch (e) {
                        global.db.data.users[m.sender].money += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.sendButton(m.chat, `Uang kamu tidak mencukupi untuk mentransfer ${rpg.emoticon('money')}Money sebesar ${count}`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                break
            case 'potion':
                if (global.db.data.users[m.sender].potion >= count * 1) {
                    try {
                        global.db.data.users[m.sender].potion -= count * 1
                        global.db.data.users[who].potion += count * 1
                        conn.sendButton(m.chat, `Berhasil mentransfer ${count} ${rpg.emoticon('potion')}Potion`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                    } catch (e) {
                        global.db.data.users[m.sender].potion += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.sendButton(m.chat, `${rpg.emoticon('potion')}Potion kamu tidak cukup`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                break
            case 'sampah':
                if (global.db.data.users[m.sender].sampah >= count * 1) {
                    try {
                        global.db.data.users[m.sender].sampah -= count * 1
                        global.db.data.users[who].sampah += count * 1
                        conn.sendButton(m.chat, `Berhasil mentransfer ${count} ${rpg.emoticon('sampah')}Sampah`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                    } catch (e) {
                        global.db.data.users[m.sender].sampah += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.sendButton(m.chat, `${rpg.emoticon('sampah')}Sampah kamu tidak cukup`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                break
            case 'diamond':
                if (global.db.data.users[m.sender].diamond >= count * 1) {
                    try {
                        global.db.data.users[m.sender].diamond -= count * 1
                        global.db.data.users[who].diamond += count * 1
                        conn.sendButton(m.chat, `Berhasil mentransfer ${count} ${rpg.emoticon('diamond')}Diamond`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                    } catch (e) {
                        global.db.data.users[m.sender].diamond += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.sendButton(m.chat, `${rpg.emoticon('diamond')}Diamond kamu kamu tidak cukup`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                break
            case 'common':
                if (global.db.data.users[m.sender].common >= count * 1) {
                    try {
                        global.db.data.users[m.sender].common -= count * 1
                        global.db.data.users[who].common += count * 1
                        conn.sendButton(m.chat, `Berhasil mentransfer ${count} ${rpg.emoticon('common')}Common Crate`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                    } catch (e) {
                        global.db.data.users[m.sender].common += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.sendButton(m.chat, `${rpg.emoticon('common')}Common crate kamu kamu tidak cukup`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                break
            case 'uncommon':
                if (global.db.data.users[m.sender].uncommon >= count * 1) {
                    try {
                        global.db.data.users[m.sender].uncommon -= count * 1
                        global.db.data.users[who].uncommon += count * 1
                        conn.sendButton(m.chat, `Berhasil mentransfer ${count} ${rpg.emoticon('uncommon')}Uncommon Crate`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                    } catch (e) {
                        global.db.data.users[m.sender].uncommon += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.sendButton(m.chat, `${rpg.emoticon('uncommon')}Uncommon crate kamu kamu tidak cukup`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                break
            case 'mythic':
                if (global.db.data.users[m.sender].mythic >= count * 1) {
                    try {
                        global.db.data.users[m.sender].mythic -= count * 1
                        global.db.data.users[who].mythic += count * 1
                        conn.sendButton(m.chat, `Berhasil mentransfer ${count} ${rpg.emoticon('mythic')}Mythic Crate`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                    } catch (e) {
                        global.db.data.users[m.sender].mythic += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.sendButton(m.chat, `${rpg.emoticon('mythic')}Mythic crate kamu kamu tidak cukup`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                break
            case 'legendary':
                if (global.db.data.users[m.sender].legendary >= count * 1) {
                    try {
                        global.db.data.users[m.sender].legendary -= count * 1
                        global.db.data.users[who].legendary += count * 1
                        conn.sendButton(m.chat, `Berhasil mentransfer ${count} ${rpg.emoticon('legendary')}Legendary Crate`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                    } catch (e) {
                        global.db.data.users[m.sender].legendary += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.sendButton(m.chat, `${rpg.emoticon('legendary')}Legendary crate kamu kamu tidak cukup`.trim(), wm, 'inventory', usedPrefix + 'inv', m)
                break
            default:
                return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer money 100 @${m.sender.split`@`[0]}*\n\n*List yang bisa di transfer*\n${rpg.emoticon('money')}Money\n${rpg.emoticon('potion')}Potion\n${rpg.emoticon('sampah')}Sampah\n${rpg.emoticon('diamond')}Diamond\n${rpg.emoticon('common')}Common\n${rpg.emoticon('uncommon')}Uncommon\n${rpg.emoticon('mythic')}Mythic\n${rpg.emoticon('legendary')}Legendary`.trim(), m, { mentions: m.sender })
        }
    } catch (e) {
        return conn.reply(m.chat, `Format yang anda gunakan salah\n\nGunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer money 100 @${m.sender.split`@`[0]}*`.trim(), m)
    }
}

handler.help = ['transfer <Args>']
handler.tags = ['rpg']
handler.command = /^(transfer|tf)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0

module.exports = handler
