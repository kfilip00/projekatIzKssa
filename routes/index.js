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

module.exports = router;
