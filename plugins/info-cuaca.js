const axios = require('axios')
const translate = require('translate-google-api')
const defaultLang = 'id'
const tld = 'cn'
let handler = async (m, { conn, text  , usedPrefix, command })=>{
if(!text) throw `🇲🇨 berikan nama tempat atau lokasi\n🇬🇧 please provide place or location name\nContoh :\n${usedPrefix + command} Jakarta`

    try{
        const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`)
        const res = await response

        /*const name = res.data.name
        const Country = res.data.sys.country
        const Weather= res.data.weather[0].description
        const Temperature = res.data.main.temp + '°C'
        const Minimum_Temperature= res.data.main.temp_min + '°C'
        const Maximum_Temperature= res.data.main.temp_max + '°C'
        const Humidity= res.data.main.humidity + '%'
        const Wind= res.data.wind.speed + 'km/h'
        let translateid = await translate(synopsis, {
    tld,
    to: 'id',
})
        translateid[0] */
        let translateid = await translate(res.data.weather[0].description, {
            tld,
            to: 'id',
        })
        conn.reply(m.chat,`*[ INFORMASI CUACA ]*\n
🌸 Place : ${res.data.name}
📍 Country : ${res.data.sys.country}
🌈 Weather : ${res.data.weather[0].description}
🎋 Temperature : ${res.data.main.temp + '°C'}
🔅 Minimum Temperature : ${res.data.main.temp_min + '°C'}
🔆 Maximum Temperature : ${res.data.main.temp_max + '°C'}
☔ Humidity : ${res.data.main.humidity + '%'}
🌬️ Wind : ${res.data.wind.speed + 'km/h'}

[INDONESIAN VERSION 🇲🇨]
🌸 Tempat : ${res.data.name}
📍 Negara : ${res.data.sys.country}
🌈 Cuaca : ${translateid[0]}
🎋 Temperatur : ${res.data.main.temp + '°C'}
🔅 Temperatur Minimum : ${res.data.main.temp_min + '°C'}
🔆 Temperatur Maximum : ${res.data.main.temp_max + '°C'}
☔ Kelembapan : ${res.data.main.humidity + '%'}
🌬️ Angin : ${res.data.wind.speed + 'km/h'}
`.trim(),m)
    }catch(e){
throw '🇲🇨 lokasi tidak ditemukan\n🇬🇧 location not found' 
//console.log(e)
    }
}

handler.help = ['infocuaca <kota>']
handler.tags = ['info']
handler.command = /^(infocuaca|cuaca|weather)$/i

module.exports = handler

//from https://github.com/Aiinne/Aine-MD/blob/main/plugins/cuaca.js