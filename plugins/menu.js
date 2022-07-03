let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
moment.locale('id')
let Waktu = moment(new Date)
let WIB = Waktu.tz('Asia/Jakarta').format('HH:mm')
let WITA = Waktu.tz('Asia/Makassar').format('HH:mm')
let WIT = Waktu.tz('Asia/Jayapura').format('HH:mm')
const defaultMenu = {
  before: `
┌─〔 %me 〕
├ *%ucapan %name*
│
├ BOT AKTIF : *%uptime*
├ Total pengguna : %totalreg
├ Waktu (WIB) : ${WIB}
├ Waktu (WITA) : ${WITA}
├ Waktu (WIT) : ${WIT}
├ Github : %github
├ *%npmname V.%version*
└────
%readmore`.trim(),
  header: '┌─〔 %category 〕',
  body: '├ %cmd %islimit %isPremium',
  footer: '└────\n',
  after: `
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {

  let tags
  let teks = `${args[0]}`
  let arrayMenu = ['all', 'Top-Fitur', 'update', 'menfess', 'Special-Tools', 'Islamic-Menu','AniManga', 'stiker', 'game', 'downloader', 'tools', 'php', 'python', 'fun', 'image', 'pasangan', 'Random-Fitur', 'anonymous','internet', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'xp', 'rpg', 'database', 'info', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'UTAMA',
    'top': 'Top Fitur',
    'update': 'Fitur Terupdate',
    'menfess': 'Menfess BOT',
    'sptools': 'Special Tools',
    'islam': 'Islamic-Menu',
    'animanga': 'Anime & Manga',
    'sticker': 'Stiker',
    'game': 'Game',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'php': 'PHP Tools',
    'python': 'Python Tools',
    'fun': 'Fun',
    'image': 'Images Maker or Search',
    'pasangan': 'Cari Pasangan',
    'random': 'Random Fitur',
    'anonymous': 'Anonymous Chat',
    'internet': 'Internet',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'group': 'Grup',
    'premium': 'Premium',
    'xp': 'Exp & Limit',
    'rpg': 'GAME RPG',
    'database': 'Database',
    'info': 'Info',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'Top-Fitur') tags = {
    'top': 'Top Fitur'
  }
  if (teks == 'update') tags = {
    'update': 'Fitur Terupdate'
  }
  if (teks == 'menfess') tags = {
    'menfess': 'Menfess'
  }
  if (teks == 'Special-Tools') tags = {
    'sptools': 'Special Tools'
  }
  if (teks == 'Islamic-Menu') tags = {
    'islam': 'Islamic Menu'
  }
  if (teks == 'AniManga') tags = {
    'animanga': 'Anime & Manga'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'pasangan') tags = {
    'pasangan': 'Cari Pasangan'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Images Maker or Search'
  }
  if (teks == 'Random-Fitur') tags = {
    'random': 'Random Fitur'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'php') tags = {
    'php': 'PHP Tools'
  }
  if (teks == 'python') tags = {
    'python': 'Python Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'GAME RPG'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, age, money, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let umur = `*${age == '-1' ? 'Belum Daftar*' : age + '* Thn'}`
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    global.jam = time
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      let judul = `${global.ucapan}, ${name}`.trim()
      const sections = [
      {
        title: 'List Menu ' + namabot,
        rows: [
          { title: 'Semua Perintah', rowId: `${_p}? all` },
          { title: 'Top Fitur', rowId: `${_p}? Top-Fitur` },
          { title: 'Fitur Terupdate', rowId: `${_p}? update` },
          { title: 'Menfess BOT', rowId: `${_p}? menfess` },
          { title: 'Special Tools', rowId: `${_p}? Special-Tools` },
          { title: 'Islamic Menu', rowId: `${_p}? Islamic-Menu` },
          { title: 'Anime & Manga', rowId: `${_p}? AniManga` },
          { title: 'Stiker', rowId: `${_p}? stiker` },
          { title: 'Game', rowId: `${_p}? game` },
          { title: 'Downloader', rowId: `${_p}? downloader` },
          { title: 'Tools', rowId: `${_p}? tools` },
          { title: 'PHP Tools', rowId: `${_p}? php` },
          { title: 'Python Tools', rowId: `${_p}? python` },
          { title: 'Fun', rowId: `${_p}? fun`},
          { title: 'Images Maker or Search', rowId: `${_p}? image`},
          { title: 'Random Fitur', rowId: `${_p}? Random-Fitur` },
          { title: 'Cari Pasangan', rowId: `${_p}? pasangan` },
          { title: 'Anonymous', rowId: `${_p}? anonymous` },
          { title: 'Internet', rowId: `${_p}? internet` },
          { title: 'Kerang Ajaib', rowId: `${_p}? kerangajaib` },
          { title: 'Quotes', rowId: `${_p}? quotes` },
          { title: 'Grup', rowId: `${_p}? grup` },
          { title: 'Premium', rowId: `${_p}? premium` },
          { title: 'XP', rowId: `${_p}? xp` },
          { title: 'GAME RPG', rowId: `${_p}? rpg` },
          { title: 'Database', rowId: `${_p}? database` },
          { title: 'Info', rowId: `${_p}? info` },
          { title: 'Owner', rowId: `${_p}? owner` },
        ]
      }
    ]
    const listMessage = {
      text: judul,
      footer: wm,
      mentions: await conn.parseMention(judul),
      title: '',
      buttonText: "Klik Disini",
      sections
    }
    return conn.sendMessage(m.chat, listMessage, { quoted: m, mentions: await conn.parseMention(judul), contextInfo: { forwardingScore: 99999, isForwarded: true }})
    
    }

    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      ucapan: global.ucapan,
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, umur, money, age, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send3TemplateButtonImg(m.chat, fla + teks, text.trim(), wm, `Owner`, `${_p}owner`, `Info Command`, `${_p}infocommand`, `Top Fitur`, `${_p}? Top-Fitur`)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(m(enu)?|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Ga turu?"
  if (time >= 4) {
    res = "Sarapan euy"
  }
  if (time > 10) {
    res = "Push rank kuy"
  }
  if (time >= 15) {
    res = "Ngantuk"
  }
  if (time >= 18) {
    res = "Time to turu brutal"
  }
  return res
}
