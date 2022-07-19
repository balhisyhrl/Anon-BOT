let fs = require('fs')
let moment = require('moment-timezone')
let { webp2png } = require('../lib/webp2mp4')
const detection = require('../lib/detect')
let handler = m => m

handler.all = async function (m) {
    if (m.chat.endsWith('status@broadcast')) {
        console.log('sw cok')
    }
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]
    let { group } = db.data.settings[this.user.jid]
    let setting = db.data.settings[this.user.jid]
    let user = global.db.data.users[m.sender]
    
    // salam
    let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_wa\'alaikumussalam wr.wb._`)
    }
    
    //Reply kata kata kotor
    let textfilter = m.text.toLowerCase()
    let isBadword = listkatakotor.exec(textfilter)
    if (isBadword && !m.fromMe) {
        let gabolekasar = `gabole kasar kk\n
 لَا يُحِبُّ اللّٰهُ الْجَهْرَ بِالسُّوْۤءِ مِنَ الْقَوْلِ اِلَّا مَنْ ظُلِمَ ۗ وَكَانَ اللّٰهُ سَمِيْعًا عَلِيْمًا

Allah tidak menyukai perkataan buruk, (yang diucapkan) secara terus terang kecuali oleh orang yang dizalimi. Dan Allah Maha Mendengar, Maha Mengetahui. [Q.S An-Nisa': 148]`
            this.sendButton(m.chat, gabolekasar.trim(), wm, 'Menu', '.menu', m)
        let who
        if (!m.isGroup) who = m.sender
        else {
            who = m.sender
        }
        let text = `${iklanOwner}

IKLAN KARENA @${await m.sender.replace(/@.+/, '')} BERKATA KASAR`.trim()
        let saha = [who]
        let mentionedJid = saha.concat(m.mentionedJid)
        await conn.reply(m.chat, text , m, { contextInfo: { mentionedJid } })
        
    }

    //Reply Horny
    let rrrrrrrrr = m.text.toLowerCase()
    let antihorn = /(se(g?k)s|sex|sange|hentai|bugil)/i
    let isHorn = antihorn.exec(rrrrrrrrr)
    if (isHorn && !m.fromMe) {
        //m.reply(`gabole sange ke BOT kk`)
        this.sendButton(m.chat, `gabole sange ke BOT kk`.trim(), wm, 'Menu', '.menu', m)
    }

    //Reply LGBT
    let antilgbt = /(gay|lesbi|lesbian|homo|homosexual|lgbt)/i
    let islgbt = antilgbt.exec(m.text)
    if (islgbt && !m.fromMe) {
        m.reply(`Anon-BOT anti LGBT ya kk\n\nAllah Ta’ala berfirman :\n وَلُوطًا إِذْ قَالَ لِقَوْمِهِ أَتَأْتُونَ الْفَاحِشَةَ مَا سَبَقَكُمْ بِهَا مِنْ أَحَدٍ مِنَ الْعَالَمِينَ \nDan (Kami juga telah mengutus Nabi) Luth (kepada kaumnya). (Ingatlah) tatkala dia berkata kepada mereka: “Mengapa kalian mengerjakan perbuatan yang sangat hina itu, yang belum pernah dilakukan oleh seorangpun (di dunia ini) sebelum kalian?” [Al-A’raaf: 80].\n\nAllah Ta’ala berfirman :\nإِنَّكُمْ لَتَأْتُونَ الرِّجَالَ شَهْوَةً مِنْ دُونِ النِّسَاءِ ۚ بَلْ أَنْتُمْ قَوْمٌ مُسْرِفُونَ
\nSesungguhnya kalian mendatangi lelaki untuk melepaskan nafsu kalian (kepada mereka), bukan kepada wanita, malah kalian ini adalah kaum yang melampaui batas. [Al-A’raaf: 81].
\nSumber: https://muslim.or.id/27432-kaum-gay-inilah-wahyu-allah-taala-tentang-anda.html`)
    }
    
    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.sendButton(m.chat, `┌「 *Undang Bot ke Grup* 」
├ 7 Hari / Rp 5,000
├ 30 Hari / Rp 15,000
└────
`.trim(), wm, 'Pemilik Bot', '.owner', m)
    }

    //Reply Stcicker
    /*let quoted = m.quoted ? m.quoted : m
    let mime = (quoted.msg || quoted).mimetype || ''
    let isStciker = /webp/.test(mime)
    if (isStciker && !m.fromMe) {
        let media = await quoted.download()
        let ScanSticker = await webp2png(media)
        if(!ScanSticker) return 0
        let { status, nude, nudescore, weapon, weaponscore, alcohol, alcoholscore, drugs, drugsscore, gore, gorescore } = await detection(ScanSticker)
        if(status == false) return 0
        if(nude == true) m.reply(`Terdeteksi Sticker mengandung unsur ketelanjangan\nScore : ${nudescore}\n\nJika ini sebuah kesalahan scanning, Abaikan saja~`)
        if(weapon == true) m.reply(`Sticker mengandung unsur senjata\nScore : ${weaponscore}\n\nJika ini sebuah kesalahan scanning, Abaikan saja~`)
        if(alcohol == true) m.reply(`Sticker mengandung unsur minuman keras\nScore : ${alcoholscore}\n\nJika ini sebuah kesalahan scanning, Abaikan saja~`)
        if(drugs == true) m.reply(`Sticker mengandung unsur obat obatan\nScore : ${drugsscore}\n\nJika ini sebuah kesalahan scanning, Abaikan saja~`)
        if(gore == true) m.reply(`Sticker mengandung unsur gore\nScore : ${gorescore}\n\nJika ini sebuah kesalahan scanning, Abaikan saja~`)
    }*/

    if (m.isGroup) {
    if (m.fromMe) return 0
    if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
        let teks = pickRandom([`Hii @${m.sender.split`@`[0]}_\n\n_Saya disini`, `Yo @${m.sender.split`@`[0]}\n\n_Ada apa??`, `Ekhheemmm, Uhuk Ughhuk`, `Puuuiyy`, `Poom`, `Hadirrr`, `Yooossshhhh`,`Ya ada apa?`, `Apaan`, `Ea`, `Laper nih, beliin makan dong`, `Apalu`])
    	await this.send2Button(m.chat, m.msg.contextInfo.expiration == 604800 ? '\n\nketik *.ephe* untuk matiin pesan sementaranya, biar tombolnya bisa dipake' : teks, wm, `${isBanned ? 'UNBAN' : 'MENU'}`, `${isBanned ? '.unban' : '.?'}`, `${!m.isGroup ? 'DONASI' : isBanned ? 'UNBAN' : 'BAN'}`, `${!m.isGroup ? '.donasi' : isBanned ? '.unban' : '.ban'}`, m)
    }
    }
    
    if (/^bot$/i.test(m.text)) {
        await this.sendButton(m.chat, !(m.isGroup || m.isPrems) && group ? 'hanya grup' : isBanned ? 'chat banned' : banned ? 'user banned' : 'aktif', wm, !(m.isGroup || m.isPrems) && group ? 'donasi' : isBanned ? 'unban' : banned ? 'minta owner kalo mau di unban' : 'donasi', !(m.isGroup || m.isPrems) && group ? '.donasi' : isBanned ? '.unban' : banned ? '.owner' : '.donasi', m)
    }


    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            let data = fs.readFileSync('./database.json')
            await this.sendMessage(owner[0] + '@s.whatsapp.net', { document: data, mimetype: 'application/json', fileName: 'database.json' }, { quoted: null })
            setting.backupDB = new Date() * 1
        }
    }

    return !0
}

module.exports = handler
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    res = "Selamat dinihari"
    if (time >= 4) {
        res = "Selamat pagi"
    }
    if (time > 10) {
        res = "Selamat siang"
    }
    if (time >= 15) {
        res = "Selamat sore"
    }
    if (time >= 18) {
        res = "Selamat malam"
    }
    return res
}

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
