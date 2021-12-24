var express = require('express');
var parser = require('body-parser');
const mysql = require('mysql');
var router = express.Router();

//------------Povezivanje sa bazom
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'evidencija_satnica'
});
con.connect(function(err) {
    if (err) throw err;
});



router.get('/', function(req, res, next) {
    let sql = 'SELECT * FROM poslodavac_informacije where ime_firme!="admin"'
    con.query(sql, function(err, result) {
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

router.post('/dodajPoslodavca', function(req, res, next) {

    let ime_firme = req.body.ime_firme;
    var pretplacen_do = req.body.pretplacen_do;
    var moze_da_koristi = req.body.moze_da_koristi;
    let sql = 'INSERT INTO `poslodavac_informacije`( `ime_firme`, `moze_da_koristi`) VALUES (?,?)';
    let vrednosti = [ime_firme, moze_da_koristi];
    con.query(sql, vrednosti, function(err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }

        var ime = req.body.ime;
        var prezime = req.body.prezime;
        var email = req.body.email;
        var lozinka = req.body.lozinka;
        let ime_firme = req.body.ime_firme;
        var rola = "poslodavac";

        let sql = 'INSERT INTO `korisnici`( `ime`, `prezime`, `email`, `lozinka`, `rola`,`ime_firme`) VALUES (?,?,?,?,?,?)';

        con.query(sql, [ime, prezime, email, lozinka, rola, ime_firme], function(err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                return res.end(err.message);
            }
            res.end("Uspesno");


        })

    })
});

router.post('/izmeniPoslodavca', function(req, res, next) {

    let ime_firme = req.body.ime_firme;
    var pretplacen_do = req.body.pretplacen_do;
    var moze_da_koristi = req.body.moze_da_koristi;
    let ime_firme_staro = req.body.ime_firme_staro;
    let sql = 'UPDATE `poslodavac_informacije` SET `ime_firme`=? ,`moze_da_koristi`=? WHERE `ime_firme`=?';
    let vrednosti = [ime_firme, moze_da_koristi, ime_firme_staro];
    con.query(sql, vrednosti, function(err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        var ime = req.body.ime;
        var prezime = req.body.prezime;
        var email = req.body.email;
        var lozinka = req.body.lozinka;
        let ime_firme = req.body.ime_firme;
        let ime_firme_staro = req.body.ime_firme_staro;
        var rola = "poslodavac";

        let sql = 'UPDATE `korisnici` SET `ime`=? ,`prezime`=? ,`email`=? ,`lozinka`=? ,`rola`=? ,`ime_firme`=? WHERE `ime_firme`=?';

        con.query(sql, [ime, prezime, email, lozinka, rola, ime_firme, ime_firme], function(err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                return res.end(err.message);
            }
            res.end("Uspesno");
        })



    })

});

router.post('/obrisiPoslodavca', function(req, res, next) {


    var ime_firme = req.body.ime_firme;
    let sql = 'DELETE FROM `poslodavac_informacije` WHERE ime_firme=?';

    con.query(sql, [ime_firme], function(err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        res.end("Uspesno");
    })
});

router.post('/ucitajPodatkeOPoslodavcu', function(req, res, next) {

    var ime_firme = req.body.ime_firme;
    let sql = 'SELECT k.ime,k.prezime,k.email,k.lozinka,k.ime_firme,p.moze_da_koristi FROM korisnici k,poslodavac_informacije p WHERE p.ime_firme=? AND  k.ime_firme=p.ime_firme';

    con.query(sql, [ime_firme], function(err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        res.end(JSON.stringify(result));
    })
});

module.exports = router;