/*
Made by https://github.com/balhisyhrl
*/
/*const { promises: fs } = require('fs')
const { join } = require('path')
const { braillefy } = require('img2braille')
const tmp = join(__dirname, '../tmp')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let ar = ['biasa', 'invert', 'dither','test']
  let er = `
┌「 *Pilihan* 」
${ar.map(v => '├ ' + v).join`\n`}
└────
Contoh:
${usedPrefix}${command} invert
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Kirim/balas gambar dengan perintah ${usedPrefix}toascii`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
    //let q = m.quoted ? m.quoted : m
    //if (!/^image/.test(q.mimetype)) throw `balas gambarnya dengan perintah ${usedPrefix + command}`
    let filename = join(tmp, + new Date + '.png')
    await fs.writeFile(filename, await q.download())
    if(text == 'biasa'){
        const asciiOpts = {
            dither: false,
            invert: false,
        }
        m.reply(await braillefy(filename, 30, asciiOpts)+'\nNote : Hanya terlihat pada bidang chat yang cukup lebar')
    }
    else if(text == 'invert'){
        const asciiOpts = {
            dither: false,
            invert: true,
        }
        m.reply(await braillefy(filename, 30, asciiOpts)+'\nNote : Hanya terlihat pada bidang chat yang cukup lebar')
    }
    else if(text == 'dither'){
        const asciiOpts = {
            dither: true,
            invert: false,
        }
        m.reply(await braillefy(filename, 30, asciiOpts)+'\nNote : Hanya terlihat pada bidang chat yang cukup lebar')
    }
    else if(text == 'test'){
        m.reply(await asciify(filename, {
            fit:    'original',
            width:  200,
            height: 100
          })+'\nNote : Hanya terlihat pada bidang chat yang cukup lebar')
    }
    await fs.unlink(filename)
}

handler.help = ['toascii <opsi> <media>']
handler.tags = ['sptools','update']
handler.command = /^(toascii)$/i

module.exports = handler */