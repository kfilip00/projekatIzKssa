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



router.get('/', function(req, res, next) {
    res.end("UspesnoPovezivanje");

});

router.post('/prijava', function(req, res, next) {
    var email=req.body.email;
    var lozinka=req.body.lozinka;
    let sql = 'SELECT * FROM korisnici where email=? and lozinka=?'
    con.query(sql,[email,lozinka], function(err,result){
        if(err){
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        res.status(200);
        let rezultat=JSON.stringify(result);
        return res.end(rezultat);
    })
});

router.post('/ucitajSatnice', function(req, res, next) {
    var id=req.body.id;
    let sql = 'SELECT * FROM satnice where korisnik_id_radnik=?'
    con.query(sql,[id], function(err,result){
        if(err){
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        res.status(200);
        let rezultat=JSON.stringify(result);
        return res.end(rezultat);
    })
});

router.post('/izmeniSatnicu', function(req, res, next) {
    var id=req.body.id;
    var status=req.body.status;
    var sati_od_do=req.body.sati_od_do;

    sati_od_do=sati_od_do[0]+""+sati_od_do[1]+""+sati_od_do[2]+""+sati_od_do[3]+""+sati_od_do[4]+"/"+sati_od_do[9]+""+sati_od_do[10]+""+sati_od_do[11]+""+sati_od_do[12]+""+sati_od_do[13];


    let sql = 'UPDATE `satnice` SET `status`=?,`sati_od_do`=? WHERE id=? '
    con.query(sql,[status,sati_od_do,id], function(err,result){
        if(err){
            console.log(err);
            res.status(500);
            return res.end(err.message);
        }
        console.log(sql);
        console.log(id+","+status+","+sati_od_do);
        res.status(200);
        return res.end("Uspesno");
    })
});

router.post('/prihvatiSatnicu', function(req, res, next) {
    var id=req.body.id;
    var status="Upisano";
    let sql = 'UPDATE `satnice` SET `status`=? WHERE id=? '
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
