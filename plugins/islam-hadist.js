let fetch = require('node-fetch')
let handler = async (m, { usedPrefix, command, args }) => {
let ar = ['abu-daud', 'ahmad', 'bukhari', 'darimi', 'ibnu-majah', 'nasai', 'malik', 'muslim']
  let er = `
┌「 *Pilihan* 」
├ abu-daud 1 - 4590
├ ahmad 1 - 26363
├ bukhari 1 - 7008
├ darimi 1 - 3367
├ ibnu-majah 1 - 4331
├ nasai 1 - 5662
├ malik 1 - 1594
├ muslim 1 - 5362
└────

Contoh:
${usedPrefix + command} bukhari 1
${usedPrefix + command} abu-daud 1
`.trim()

  if (!args[0]) throw er
  if (!ar.includes(args[0])) throw er
  if (!args[1]) throw `Hadist yang ke berapa?
Contoh: ${usedPrefix + command} ${args[0]} 1`
    try {
        let res = await fetch(`https://islamic-api-indonesia.herokuapp.com/api/data/json/hadith/${args[0]}`)
        let json = await res.json()
        let { number, arab, id } = json.find(v => v.number == args[1])
        m.reply(`
Hadist riwayat ${args[0]} No. ${number}

${arab}

${id}
`.trim())
    } catch (e) {
        throw `_*Error!*_`
    }
}
handler.help = ['hadist']
handler.tags = ['islam']
handler.command = /^(hadist?)$/i
module.exports = handler