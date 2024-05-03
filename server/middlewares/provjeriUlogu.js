// MIDDLEWARE ZA PROVJERU ULOGE
const provjeriUlogu = (uloga) => (req,res,next) => {
    if (req.korisnik && req.korisnik.role === uloga) {
      next()
    } else {
      res.status(403).send(`Zabranjen pristup . vaša uloga jee ${req.korisnik.role} `)
    }
  }

  module.exports = provjeriUlogu;