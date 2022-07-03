/*
Made by https://github.com/balhisyhrl
*/
const imageToBase64 = require('image-to-base64')
const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')

let handler = async (m, { conn, command, usedPrefix }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Kirim gambar yang ingin diubah ke base64 dengan caption *${usedPrefix}${command}* atau reply medianya`
    let media = await q.download()
    let isTele = /image\/(png|jpe?g|gif|webp)|video\/mp4/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)
    imageToBase64(link).then((response) => {
        conn.reply(m.chat, response, m)
    }).catch((error) => {
        conn.reply(m.chat, response, m)
    })
}

handler.help = ['imgb64 <media>']
handler.tags = ['tools', 'sptools']
handler.command = /^imgb64?$/i

module.exports = handler