const express = require('express')
const router = express.Router();
const provjeriToken = require('../middlewares/provjeriToken')
const provjeriUlogu = require('../middlewares/provjeriUlogu')
const Zivotinja = require('../models/zivotinje')
const VrstaZivotinje = require('../models/vrstaZivotinje')

router.get("/", async (req,res) => {
    try {
      const sveZivotinje = await Zivotinja.find({})
      const zivotinjeZaNaziv = await Promise.all(
        sveZivotinje.map(async (zivotinja) => {
          const vrstaZivotinje = await VrstaZivotinje.findById(zivotinja.vrsta)
          return {
            _id: zivotinja._id,
            ime: zivotinja.ime,
            vrsta: vrstaZivotinje.naziv,
            photo: zivotinja.photo,
            cip: zivotinja.cip,
            godine: zivotinja.godine,
            pregled: zivotinja.pregled,
            opis: zivotinja.opis,
            udomljen: zivotinja.udomljen
          }
        })
      )
      res.json(zivotinjeZaNaziv)
    } catch (error) {
      res.status(500).send(error.message)
    }
})

router.post("/", provjeriToken, provjeriUlogu("admin"), async (req,res) => {
    const zivotinja = {
      ime: req.body.ime,
      vrsta: req.body.vrsta,
      photo: req.body.photo,
      cip: req.body.cip,
      godine: req.body.godine,
      opis: req.body.opis,
      pregled: req.body.pregled,
      udomljen: false
    }
    try {
      const vrstaZivotinje = await VrstaZivotinje.findOne({ naziv: req.body.vrsta })
      const novaZivotinja = new Zivotinja({...zivotinja})
      await novaZivotinja.save()
      res.status(200).send("Zivotinja uspjesno spremljena")
    } catch (error) {
      res.status(500).send(error.message)
    }
})

router.patch("/:id", provjeriToken, provjeriUlogu("admin"), async (req,res) => {
    try {
      // console.log(req.body)
      let novaZivotinja;
      if (req.body.vrsta) {
        let vrstaId;
        if (mongoose.Types.ObjectId.isValid(req.body.vrsta)){
          vrstaId = req.body.vrsta
        } else {
          const vrsta = await VrstaZivotinje.findOne({ naziv: req.body.vrsta })
          if(!vrsta){
            return res.status(400).send("Vrsta nije pronađena")
          }
          vrstaId = vrsta._id;
        }
        novaZivotinja = await Zivotinja.findByIdAndUpdate(req.params.id, { ...req.body, vrsta: vrstaId }, { new: true }).populate('vrsta');
      } else {
        novaZivotinja = await Zivotinja.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('vrsta')
      }
        if(!novaZivotinja) {
          return res.status(400).send("Nemogućnost promjene informacije životinje")
        }
        res.json(novaZivotinja)
    } catch (error) {
      res.status(500).send(error.message)
    }
})

router.patch("/udomi/:id", provjeriToken, async (req,res) => {
    try {
      await Zivotinja.findByIdAndUpdate(req.params.id, { udomljen: req.body.udomljen }, { new: true }).populate('vrsta');
      res.status(200).send("Status udomiteljstva uspješno promijenjen");
    } catch (error) {
      res.status(500).send(error.message);
    }
})

router.get("/tip", async (req,res) => {
  try {
    const vrsteZivotinja = await VrstaZivotinje.find()
    res.json(vrsteZivotinja)
  } catch (error) {
    res.json(500).send(error.message)
  }
})

module.exports = router;