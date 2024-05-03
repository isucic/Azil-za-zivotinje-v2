const express = require('express')
const router = express.Router();
const provjeriToken = require('../middlewares/provjeriToken')
const provjeriUlogu = require('../middlewares/provjeriUlogu')
const Obavijest = require('../models/obavijesti')

router.use(express.json());

router.get("/", async (req,res) => {
    try {
      const sveObavijesti = await Obavijest.find();
      res.json(sveObavijesti)
    } catch (error) {
      res.json(500).send(error.message)
    }
})

router.post("/", provjeriToken, async (req,res) => {
    try{
      const novaObavijest = new Obavijest({...req.body})
      await novaObavijest.save()
      res.status(200).send("Obavijest uspjesno spremljena")
    } catch (error) {
      res.status(500).send(error.message)
    }
})

router.delete("/:id", provjeriToken, provjeriUlogu('admin'), async (req,res) => {
    try {
      const obavijest = await Obavijest.findByIdAndDelete(req.params.id)
      if(!obavijest){
        return res.status(404).send('Obavijest ne postoji')
      }
      res.send("Obavijest izbrisana")
    } catch(error) {
      res.status(500).send(error.message)
    }
  })


module.exports = router;