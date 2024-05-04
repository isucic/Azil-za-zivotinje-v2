const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();
const Korisnik = require('../models/korisnik')
const provjeriToken = require('../middlewares/provjeriToken')
const provjeriUlogu = require('../middlewares/provjeriUlogu');
const provjeriAdmin = require('../middlewares/provjeriAdmin');

router.use(express.json());

const TAJNI_KLJUC = process.env.TAJNI_KLJUC;

router.post("/prijava", async (req,res) => {
    try {
      const korisnikBaza = await Korisnik.findOne({ username: req.body.username})
      if(korisnikBaza && await bcrypt.compare(req.body.password, korisnikBaza.password)){
        const token = jwt.sign(
          { username: korisnikBaza.username, role: korisnikBaza.role},
          TAJNI_KLJUC,
          { expiresIn: '1h'}
        )
        res.status(200).send({token, message: "Prijava uspješna"})
      } else {
        res.status(401).send('Neispravni podaci za prijavu')
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
})

const saltRunde = 10
router.post("/registracija", async (req,res) => {
  try {
    const hashLozinka = await bcrypt.hash(req.body.password, saltRunde)
    const noviKorisnik = new Korisnik({...req.body, password: hashLozinka})
    await noviKorisnik.save()
    const token = jwt.sign(
      { username: noviKorisnik.username, role: noviKorisnik.role },
      TAJNI_KLJUC,
      { expiresIn: '1h'}
    )
    res.status(200).send({token, message: "Korisnik uspješno registriran"})
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get("/role", provjeriToken, provjeriAdmin, async (req,res) => {
  try {
    res.json(true)
  } catch (error) {
    res.status(403).send(`Došlo je do greške pri provjeri uloge admina korisnika`)
  }
})

module.exports = router;