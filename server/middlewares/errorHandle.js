const errorHandle = (err, req, res, next) => {
    const odgovor = process.env.NODE_ENV === "production" ? "Dogodila se greška" : err.stack
    res.status(500).send(odgovor)
}

module.exports = errorHandle