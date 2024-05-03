const express = require('express')
const router = express.Router();
const provjeriToken = require('../middlewares/provjeriToken')
const provjeriUlogu = require('../middlewares/provjeriUlogu')
const Donacija = require('../models/donacije')
const TipDonacije = require('../models/tipDonacije')

router.get("/", async (req,res) => {
    try {
        const sveDonacije = await Donacija.find({}).populate('tip');
        res.json(sveDonacije);
    } catch (error) {
        res.json(500).send(error.message)
    }
})

router.post("/", provjeriToken, async (req,res) => {
    try {
        console.log(req.body)
        let kategorija;
        if (req.korisnik.role === 'user') {
        kategorija = 'nudi'; 
        } else if (req.korisnik.role === 'admin') {
        kategorija = 'trazi';
        }
        const tipDonacije = await TipDonacije.findOne({ _id: req.body.tip})
        const novaDonacija = new Donacija({...req.body, kategorija: kategorija})
        await novaDonacija.save()
        res.status(200).send("Donacija uspjesno pohranjena")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// imamo mogucnost samo promjene kategorije donacije, zato nije potrebno slati podatke
router.patch("/:id", provjeriToken, async (req,res) => {
    try {
        let novaKategorija;
        const trenutnaDonacija = await Donacija.findById(req.params.id);
        const trenutnaKategorija = trenutnaDonacija.kategorija;
        if (trenutnaKategorija === 'nudi') {
        novaKategorija = 'donirano'; 
        } else if (trenutnaKategorija === 'donirano') {
        novaKategorija = 'trazi';
        } else if (trenutnaKategorija === 'trazi') {
        novaKategorija = 'donirano';
        } else {
        return res.status(400).send("Neispravna trenutna kategorija donacije");
        }
        trenutnaDonacija.kategorija = novaKategorija;
        await Donacija.findByIdAndUpdate(req.params.id, {kategorija: novaKategorija}, {new:true});
        res.status(200).send("Kategorija donacije uspješno promijenjena");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", provjeriToken, provjeriUlogu('admin'), async (req,res) => {
try {
    const donacija = await Donacija.findByIdAndDelete(req.params.id)
    if(!donacija){
    return res.status(404).send('Donacija ne postoji')
    }
    res.send("Donacija izbrisana")
} catch(error) {
    res.status(500).send(error.message)
}
})

router.get("/tip", async (req,res) => {
    try {
      const tipDonacije = await TipDonacije.find();
      res.json(tipDonacije)
    } catch (error) {
      res.json(500).send(error.message)
    }
  })

module.exports = router;