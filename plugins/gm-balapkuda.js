
let handler = async (m, { conn, usedPrefix, participants }) => {
    conn.level = global.db.data.users[m.sender]
    if(global.db.data.users[m.sender].kuda == 0) throw `Kamu tidak punya kuda :(`
      conn.fight = conn.fight ? conn.fight : {}
      const delay = time => new Promise(res=>setTimeout(res,time));
    
      if (typeof conn.fight[m.sender] != "undefined" && conn.fight[m.sender] == true) return m.reply(`*Tidak bisa melakukan balapan lagi karena kuda anda sedang balapan.*`)
    
      let users = participants.map(u => u.id)
      var lawan
        lawan = users[Math.floor(users.length * Math.random())]
      while (typeof global.db.data.users[lawan] == "undefined" || lawan == m.sender){
        lawan = users[Math.floor(users.length * Math.random())]
      }
    
      let lamaPertarungan = getRandom(5,15)
    
      m.reply(`*Kamu* (Kuda level ${global.db.data.users[m.sender].kuda}) menantang *${conn.getName(lawan)}* (Kuda level ${global.db.data.users[lawan].kuda}) dan sedang dalam balapan sengit.\n\nTunggu ${lamaPertarungan} menit lagi dan lihat kuda siapa yg menang.`)
    
      conn.fight[m.sender] = true
    
      await delay(1000 * 60 * lamaPertarungan)
    
      let alasanKalah = ['Noob','Cupu','Kurang hebat','Malas latihan','Capek']
      let alasanMenang = ['Hebat','Pro','Kuat','Legenda balapan kuda','Sangat Pro','Rajin Latihan']
    
      let kesempatan = []
      for (i=0;i<global.db.data.users[m.sender].kuda;i++) kesempatan.push(m.sender)
      for (i=0;i<global.db.data.users[lawan].kuda;i++) kesempatan.push(lawan)
    
      let pointPemain = 0
      let pointLawan = 0
      for (i=0;i<10;i++){
        unggul = getRandom(0,kesempatan.length-1)
        if (kesempatan[unggul] == m.sender) pointPemain += 1
        else pointLawan += 1
      }
    
      if (pointPemain > pointLawan){
        let hadiah = (pointPemain - pointLawan) * 100000
        global.db.data.users[m.sender].money += hadiah
        //global.db.data.users[m.sender].tiketcoin += 1
        m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*Kamu* (Kuda level ${global.db.data.users[m.sender].kuda}) MENANG melawan *${conn.getName(lawan)}* (Kuda level ${global.db.data.users[lawan].kuda}) karena kuda kamu ${alasanMenang[getRandom(0,alasanMenang.length-1)]}\n\nHadiah Rp. ${hadiah.toLocaleString()}`)
      }else if (pointPemain < pointLawan){
        let denda = (pointLawan - pointPemain) * 1000000
        global.db.data.users[m.sender].money -= denda
        //global.db.data.users[m.sender].tiketcoin += 1
        m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*Kamu* (Kuda level ${global.db.data.users[m.sender].kuda}) KALAH melawan *${conn.getName(lawan)}* (Kuda level ${global.db.data.users[lawan].kuda}) karena kuda kamu ${alasanKalah[getRandom(0,alasanKalah.length-1)]}\n\nUang kamu berkurang Rp. ${denda.toLocaleString()}`)
      }else {
        m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\nHasil imbang kak, ga dapet apa apa 😂`)
      }
    
      delete conn.fight[m.sender]
    }
    handler.help = ['balapkuda']
    handler.tags = ['game']
    handler.command = /^(balapkuda|balapankuda)$/i
    handler.group = true
    
    module.exports = handler
    
    function getRandom(min,max){
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random()*(max-min+1)) + min
    }