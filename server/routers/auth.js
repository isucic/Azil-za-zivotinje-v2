const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();
const Korisnik = require('../models/korisnik')
const provjeriToken = require('../middlewares/provjeriToken')
const provjeriAdmin = require('../middlewares/provjeriAdmin');

router.use(express.json());

const TAJNI_KLJUC = process.env.TAJNI_KLJUC;

router.post("/prijava", async (req,res,next) => {
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
      next(error)
    }
})

const saltRunde = 10
router.post("/registracija", async (req,res,next) => {
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
    next(error)
  }
})

router.get("/role", provjeriToken, provjeriAdmin, async (req,res,next) => {
  try {
    res.json(true)
  } catch (error) {
    next(error)
  }
})

module.exports = router;