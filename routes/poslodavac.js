var express = require('express');
var parser = require('body-parser');
const mysql = require('mysql');
var router = express.Router();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'evidencija_satnica'
});
con.connect(function(err) {
    if (err) throw err;

});



router.post('/', function(req, res, next) {
    let ime_firme = req.body.ime_firme;
    let sql = 'SELECT * FROM radnik_informacije inner join korisnici on korisnici.id=radnik_informacije.id_korisnika WHERE korisnici.rola="radnik" AND radnik_informacije.ime_firme=?'
    con.query(sql, [ime_firme], function(err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        res.status(200);
        let rezultat = JSON.stringify(result);
        return res.end(rezultat);
    })
});

router.post('/dodajRadnika', function(req, res, next) {

    var ime = req.body.ime;
    var prezime = req.body.prezime;
    var email = req.body.email;
    var lozinka = req.body.lozinka;
    var broj_telefona = req.body.broj_telefona;
    var ime_firme = req.body.ime_firme;
    var satnica = req.body.satnica;
    var rola = "radnik";

    var sql = 'INSERT INTO `korisnici`(`ime`, `prezime`, `email`, `lozinka`, `rola`, `ime_firme`) VALUES (?,?,?,?,?,?)';
    con.query(sql, [ime, prezime, email, lozinka, rola, ime_firme], function(err, result) {
        if (err) {
            console.log(err.errno);
            res.status(200);
            if(err.errno==1062)
            {
                        return res.end("Korisnik sa ovim emajlom vec postoji");
            }
            else
            {
            return res.end(err.message);
            }

        } else {
            var sqlGet = 'SELECT id FROM korisnici where email=?'
            con.query(sqlGet, [email], function(err, result2) {
                if (err) {
                    console.log(err);
                    res.status(500);

                } else {

                    var rezultat=JSON.stringify(result2);
                    rezultat=rezultat.substr(1, rezultat.length-2);
                    rezultat = JSON.parse(rezultat);
                    var id = rezultat["id"];
                    var sql2 = 'INSERT INTO `radnik_informacije`(`broj_telefona`, `ime_firme`, `satnica`,`id_korisnika`) VALUES (?,?,?,?)'
                    con.query(sql2, [broj_telefona, ime_firme, satnica, id], function(err, result) {
                        if (err) {
                            console.log(err);
                            res.status(500);
                            return res.end(err.message);
                        } else {
                            res.status(200);
                            res.end("Uspesno");
                        }
                    })
                }
            })
        }


    })
});

router.post('/izmeniRadnika', function(req, res, next) {
    //var ime=req.body.ime;
    //var prezime=req.body.prezime;
    //var email=req.body.email;
    //var lozinka=req.body.lozinka;
    //var broj_telefona=req.body.broj_telefona;
    //var ime_firme=req.body.ime_firme;
    var satnica=req.body.satnica;
    var id=req.body.id;

    //sql='UPDATE radnik_informacije ri,korisnici k SET ri.broj_telefona=? ,ri.satnica=?,k.ime=? ,k.prezime=?,k.email=?,k.lozinka=? WHERE ri.id_korisnika=? AND k.id=?'
    //[broj_telefona,satnica,ime,prezime,email,lozinka,id,id]
    sql='UPDATE radnik_informacije ri SET ri.satnica=? WHERE ri.id_korisnika=?'
    con.query(sql,[satnica,id], function(err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                return res.end(err.message);
            }
            res.end("Uspesno");
        })

    

});

router.post('/izmeniSopstvenePodatke', function(req, res, next) {

    var ime = req.body.ime;
    var prezime = req.body.prezime;
    var email = req.body.email;
    var lozinka = req.body.lozinka;
    var staro_ime = req.body.staro_ime;
    var ime_firme = req.body.ime_firme;
    var sql2 = 'UPDATE `poslodavac_informacije` SET `ime_firme`=? WHERE ime_firme=?'
    con.query(sql2, [ime_firme, staro_ime], function(err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }

        var sql = 'UPDATE `korisnici` SET `ime`=? ,`prezime`=? ,`email`=? ,`lozinka`=? WHERE ime_firme=? AND rola="poslodavac"';
        con.query(sql, [ime, prezime, email, lozinka, ime_firme], function(err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                return res.end(err.message);
            } else {
                res.status(200);
                res.end("Uspesno");
            }


        })


    })
});

router.post('/obrisiRadnika', function(req, res, next) {


    var email = req.body.email;
    let sql = 'DELETE FROM `korisnici` WHERE email=?';

    con.query(sql, [email], function(err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        res.end("Uspesno");
    })
});

router.post('/upisiSatnicu', function(req, res, next) {

    var idoviRadnika = req.body.idoviRadnika;
    var korisnik_id_poslodavac = req.body.korisnik_id_poslodavac;
    var status = req.body.status;
    var datum = req.body.datum;
    var sati_od_do = req.body.sati_od_do;
    var satniceRadnika = req.body.satniceRadnika;

    var idovi=idoviRadnika.split(',');
    var satnice=satniceRadnika.split(',');

    console.log(sati_od_do);
    sati_od_do=sati_od_do[0]+""+sati_od_do[1]+""+sati_od_do[2]+""+sati_od_do[3]+""+sati_od_do[4]+"/"+sati_od_do[9]+""+sati_od_do[10]+""+sati_od_do[11]+""+sati_od_do[12]+""+sati_od_do[13];

    sql="INSERT INTO `satnice`(`korisnik_id_radnik`, `korisnik_id_poslodavac`, `status`, `datum`, `sati_od_do`, `satnica`) VALUES ";
    for(i=0;i<idovi.length;i++)
    {
        sql+="(";
        sql+="'"+idovi[i]+"',";
        sql+="'"+korisnik_id_poslodavac+"',";
        sql+="'"+status+"',";
        sql+="'"+datum+"',";
        sql+="'"+sati_od_do+"',";
        sql+="'"+satnice[i]+"')";
        if(i+1<idovi.length)
        {
            sql+=",";
        }
    }
    con.query(sql, function(err, result) {
        if (err) {
            console.log(sql);
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        res.end("Uspesno");
    })
});

router.post('/isplatiRadnika', function(req, res, next) {
    var id=req.body.id;
    var status="Isplaceno";

    idiovi=id.split(',');
    console.log(idiovi);
    let sql = 'UPDATE `satnice` SET `status`=? WHERE id IN ( '
    for(i=0;i<idiovi.length;i++)
    {
        sql+=idiovi[i];
        if(i+1<idiovi.length)
        {
            sql+=",";
        }
    }
    sql+=")";
    console.log(sql);
    con.query(sql,[status,id], function(err,result){
        if(err){
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        res.status(200);
        return res.end("Uspesno");
    })
});


module.exports = router;