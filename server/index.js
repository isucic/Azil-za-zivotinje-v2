const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config();

const donacijeRouter = require('./routers/donacije')
const zivotinjeRouter = require('./routers/zivotinje')
const obavijestiRouter = require('./routers/obavijesti')
const authRouter = require('./routers/auth')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors());

app.use('/zivotinje', zivotinjeRouter)
app.use('/donacije', donacijeRouter)
app.use('/obavijesti', obavijestiRouter)
app.use('/', authRouter)


//Spajanje na bazu
mongoose.connect('mongodb://127.0.0.1:27017/azil', {
  family: 4
});
// Instanca konekcije na bazu
const db = mongoose.connection;
// Upravljanje događajima
db.on('error', (error) => {
    console.error('Greška pri spajanju:', error);
});
db.once('open', function() {
  console.log('Spojeni smo na MongoDB bazu');
});


// //MIDDLEWARE ZA PROVJERU COOKIJA
// const provjeriCookie = (cookieName) => (req,res,next) => {
//   if (req.cookies && req.cookies[cookieName]){
//     // console.log(req.cookies[cookieName])
//     next();
//   } else {
//     res.status(401).json({ error: 'Unauthorized'})
//   }
// }

// app.post("/odjava", async (req,res) => {
//   try {
//     res.clearCookie("accessToken")
//     res.status(200).send("Odjava uspješna")
//   } catch (error) {
//     res.status(500).send(error.message)
//   }
// })

// app.get("/prijava-check", provjeriCookie('accessToken'), (req,res) => {
//   res.status(200).json({message: "Korisnik je logiran"})
// })

// app.get("/provjera-cookies", provjeriCookie('accessToken'), (req,res) => {
//   res.status(200).json({ message: 'Dozvoljen pristup podatku '})
// })

app.get("/", (req,res) => {
    res.send("Pozdrav od Express poslužitelja!")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server sluša zahtjeve na portu ${PORT}`)
})