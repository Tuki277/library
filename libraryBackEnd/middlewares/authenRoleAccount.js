const jwt = require('jsonwebtoken')
const sql = require('./../config/database')

exports.authAdmin = (req, res, next) => {
    const token = req.headers['authorization']
    const tokenData = token.slice(7)
    req.data = tokenData
    const key = jwt.verify(tokenData, 'token')
    sql.query('SELECT * FROM account WHERE id = ? ', key.id, (err, rows, fields) => {
        if (rows[0].role === "admin") {
            next()
        } else {
            res.status(401).json({ message : 'not permission' })
        }
    })
}

exports.authUser = (req, res, next) => {
    const token = req.headers['authorization']
    const tokenData = token.slice(7)
    req.data = tokenData
    const key = jwt.verify(tokenData, 'token')
    sql.query('SELECT * FROM account WHERE id = ? ', key.id, (err, rows, fields) => {
        if (rows[0].role === "staff" || rows[0].role === "admin") {
            next()
        } else {
            res.status(401).json({ message : 'not permission' })
        }
    })
}