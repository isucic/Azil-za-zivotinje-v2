// MIDDLEWARE ZA PROVJERU ADMINA
const provjeriAdmin =  (req,res,next) => {
    if (req.korisnik && req.korisnik.role === 'admin') {
      next()
    } else if (req.korisnik && req.korisnik.role === 'user'){
       res.json(false)
    } else
      res.send("Korisnik nije ni admin ni user")
  }

  module.exports = provjeriAdmin;