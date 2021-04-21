const verifyLogin = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    console.log(req.header['authorization'])
    if ( typeof bearerHeader === 'undefined') {
        res.status(200).json({ message : 'Not logged'})
    } else {
        next()
    }
}

module.exports = verifyLogin