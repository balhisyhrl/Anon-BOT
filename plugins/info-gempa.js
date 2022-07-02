let fs = require("fs")
let axios = require("axios")
let fetch = require('node-fetch')
let scrapy = require("node-scrapy")
let { MessageType, Mimetype } = require("@adiwajshing/baileys")
let handler = async(m, { conn, text }) => {
const model = ['tr:nth-child(1) td']
			fetch('https://www.bmkg.go.id/gempabumi/gempabumi-terkini.bmkg').then((res) => res.text()).then((body) => {
				let result = scrapy.extract(body, model)
                
				let waktu = result[1] || "Tidak ada data"
				let lintang = result[2] || "Tidak ada data"
				let bujur = result[3] || "Tidak ada data";
				let magnitudo = result[4] || "Tidak ada data"
				let kedalaman = result[5] || "Tidak ada data"
				let lokasi = result[6] || "Tidak ada data"
                function tsunamis(){
                    if(magnitudo >= 8.0){
                        return 'Peringatan Magnitudo >8.0 Lihat Informasi BMKG Lebih Lanjut'
                    } else{
                        return 'Tidak Diketahui'
                    }
                }
                let tsunami = tsunamis()

				const teks = `*[ INFORMASI GEMPA INDONESIA ]*\n
🕒 Waktu: *${waktu}*
🧭 Bujur: *${bujur}*
🧭 Lintang: *${lintang}*
📡 Magnitudo: *${magnitudo}*
🌋 Kedalaman: *${kedalaman}*
📍 Lokasi: *${lokasi}*
🌊 Berpotensi Tsunami : *${tsunami}*`.trim()
                conn.reply(m.chat, teks, m)
                })
      }
handler.help = ['infogempa']
handler.tags = ['info']
handler.command = /^(infogempa)$/i

module.exports = handler