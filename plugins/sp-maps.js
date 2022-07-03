let imageToBase64 = require('image-to-base64');
let axios = require("axios");
let handler = async(m, { conn, text }) => {

  await m.reply(wait)
let str = `
*Hasil Pencarian Daerah :*
${text}
`.trim()

    axios.get('https://mnazria.herokuapp.com/api/maps?search=' + text)
    .then((res) => {
      imageToBase64(res.data.gambar)
        .then(
          (ress) => {
            let buf = Buffer.from(ress, 'base64')

     conn.sendFile(m.chat, buf, 'peta.jpg', str, m)
        })
    })
}

handler.help = ['peta <wilayah>']
handler.tags = ['internet','sptools','update']
handler.command = /^(peta|map)$/i

module.exports = handler