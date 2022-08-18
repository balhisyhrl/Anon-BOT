let handler = async (m, { conn, usedPrefix }) => {
conn.sendButton(m.chat, `
╭─「 *DONASI* 」
│ > Ingin donasi ke BOT?
│ > Paypal : https://paypal.me/balhisyhrl
│ > Dana : 085156299020
│ > Gopay : 085156299020
│ > Perfect Money : U39360574
│ _Hasil donasi akan dipakai untuk membuat BOT ONLINE 24 JAM_
╰────
╭─「 *NOTE* 」
│ > _Tidak ada paksaan untuk kalian berdonasi~_
│ > _Berapapun jumlahnya silahkan berdonasi~_
╰────

「 *Total Donasi Yang Masuk : Rp. 170.000* 」
`.trim(), wm, 'Menu', usedPrefix + 'menu', m)
}
handler.help = ['donasi']
handler.tags = ['about']
handler.command = /^dona(te|si)$/i

module.exports = handler
