var express = require('express');
var router = express.Router();
var parser = require('body-parser');
const mysql = require('mysql');

//------------Povezivanje sa bazom
const con = mysql.createConnection({
    host: 'localhost', user: 'root',database: 'evidencija_satnica'

});

con.connect( function(err) {
    if (err) throw err;

});



router.post('/', function(req, res, next) {
    var korisnik_id=req.body.korisnik_id;
    sql="SELECT broj_telefona,satnica FROM radnik_informacije WHERE id_korisnika=?";
    con.query(sql, [korisnik_id], function(err, result) {
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

router.post('/izmeniInformacije', function(req, res, next) {

        var id = req.body.id;
        var ime = req.body.ime;
        var prezime = req.body.prezime;
        var email = req.body.email;
        var lozinka = req.body.lozinka;
        var broj_telefona = req.body.broj_telefona;
    sql="UPDATE korisnici k, radnik_informacije ri SET k.ime=? ,k.prezime=?, k.email=?,k.lozinka=?, ri.broj_telefona=? WHERE k.id=ri.id_korisnika AND k.id=?";
    con.query(sql, [ime,prezime,email,lozinka,broj_telefona,id], function(err, result) {
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
            }
            res.status(200);
            return res.end("Uspesno");
        })
});


module.exports = router;
