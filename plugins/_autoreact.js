let handler = async (m, { conn }) => {
	let emot = conn.pickRandom(["๐ฟ", "๐", "๐จ", "๐", "๐", "๐ป", "๐ฆ", "๐ค", "๐ป", "๐ฅ", "๐ฅ", "๐งข","๐","๐","๐","๐คฉ"])
    conn.sendMessage(m.chat, {
    	react: {
    		text: emot,
    		key: m.key
    	}
    })
}
handler.customPrefix = /(bile?k|ban?h|cum?|knt?l|6?|mmk|p|b(a|i)?c?(o|i)?(t|d)?|wibu|p(a)?nt(e)?k|pepe?k)/i
handler.command = new RegExp

module.exports = handler