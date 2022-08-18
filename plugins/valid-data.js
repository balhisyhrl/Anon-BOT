const nusantaraValid = require("nusantara-valid")

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (/nik/.test(command)) {
        if(!text) throw `Contoh : ${usedPrefix}${command} 737xxxxxxxxx`
        let { status, nik, sex, province} = await getNIK(text)
        if(status == false) throw `NIK TIDAK VALID`
        let NIKisVALID = `*───「 DATA VALIDATOR 」───*
NIK : ${nik}
STATUS : VALID
GENDER : ${sex}
PROVINSI : ${province}

*───「 NOMOR INDUK KEPENDUDUKAN 」───*`
        await conn.reply(m.chat, NIKisVALID, m)
    } else if (/nomorhp|nohp/.test(command)) {
        if(!text) throw `Contoh : ${usedPrefix}${command} 6281xxxxxxx`
        let { status, number, onWA, provider} = await getNOHP(text)
        if(status == false) throw `NO HP TIDAK VALID`
            let NOHPisVALID = `*───「 DATA VALIDATOR 」───*
NO HP : ${number}
STATUS : VALID
TERDAFTAR WHATSAPP : ${onWA}
Provider : ${provider}

*───「 NOMOR HP 」───*`
        await conn.reply(m.chat, NOHPisVALID, m)
}

}
handler.help = ['nik','nomorhp']
handler.tags = ['sptools','update']
handler.command = /^(nik|(nomorhp|nohp))$/i
  
module.exports = handler

async function onWA(id){
    let [OnWA] = await conn.onWhatsApp(id.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    if(OnWA) {
        try{
            let bio = await conn.fetchStatus(id.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
            let UserBIO = bio.status
            return { 
                ONWA: true,
                exists: `YES\nLink : https://wa.me/${id} \nNAMA WA : ${await conn.getName(id.replace(/[^0-9]/g, '') + '@s.whatsapp.net')}\nBIO : ${UserBIO}`
            }
        } catch {
            return { 
                ONWA: true,
                exists: `YES\nLink : https://wa.me/${id} \nNAMA WA : ${await conn.getName(id.replace(/[^0-9]/g, '') + '@s.whatsapp.net')}\nBIO : Private`
            }
        }

    } else {
        return {
            ONWA: false,
            exists: `NO`
        }
    }
}

async function getNIK(NIK){
    let getDataNIK = nusantaraValid.isValidNIK(`${NIK}`)
    if(getDataNIK) {
        let object = nusantaraValid.getDataNIK(`${NIK}`)
        return {
            status: true,
            nik: object.nik,
            sex: object.sex,
            province: object.province.name
        }
    } else {
        return {
            status: false,
            msg: `NIK TIDAK VALID`
        }
    }
}

async function getNOHP(NOHP){
    let filterNOHP = NOHP.replace(/[^0-9]/g, '')
    let getDataNOHP = nusantaraValid.isValidCellularNumber(`${filterNOHP}`)
    let { exists, ONWA } = await onWA(filterNOHP)
    if(getDataNOHP) {
        let object = nusantaraValid.getDataCellularNumber(`${filterNOHP}`)
        return {
            status: true,
            onWA: exists,
            number: object.number,
            provider: object.provider.key + ` - ` + object.provider.name
        }
    } else {
        return {
            status: false,
            msg: `NO HP TIDAK VALID`
        }
    }
}


