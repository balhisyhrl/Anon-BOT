let handler = async (m, { conn, args, usedPrefix, command }) => {
    if(!args) throw `Contoh : ${usedPrefix + command} Grup Keren`
    if(args.join(" ").length > 500) throw 'Deskripsi terlalu panjang'
    await conn.groupUpdateDescription(m.chat, `${args.join(" ")}`);
     m.reply('Sukses mengganti deskripsi group')
   }
   
   handler.help = ['setdeskgroup <text>']
   handler.tags = ['group']
   handler.command = /^set(desk|deskripsi|deskripsigc|deskripsigroup|deskripsigrup|deskgc)?$/i
   handler.group = true
   handler.admin = true
   handler.botAdmin = true
   
   module.exports = handler