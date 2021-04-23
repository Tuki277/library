const sql = require('./../config/database')
const jwt = require('jsonwebtoken')

exports.addAccount = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role
    jwt.verify(req.token, 'token', (err, rows) => {
        if ( err ) {
            res.status(401).json({ message : "Token wrong" })
        } else {
            sql.query('INSERT INTO account (username, password, role) VALUES (?, ?, ?)', [username, password, role], (err, rows, fields) => {
                if (err) {
                    res.status(500).json({ err : err })
                } else {
                    res.status(201).json({ success: true })
                }
            })
        }
    })
}

exports.getAccount = (req, res, next) => {
    jwt.verify(req.token, 'token', (err, auth) => {
        if ( err ) {
            res.status(401).json({ message : "Token wrong" })
        } else {
            sql.query('SELECT * FROM account', (err, rows, fields) => {
                if ( err ) {
                    res.status(500).json({ err : 'server error' })
                } else {
                    res.status(200).json({ data : rows })
                }
            })
        }
    })
}

exports.deleteAccount = (req, res, next) => {
    const id = req.params.id
    jwt.verify(req.token, 'token', (err, auth) => {
        if ( err ) {
            res.status(401).json({ err : 'server error' })
        } else {
            sql.query('DELETE FROM account where ID = ?', id, (err, rows, fields) => {
                if (err) {
                    res.status(500).json({ err : "delete error"})
                } else {
                    res.status(200).json({ success : true })
                }
            })
        }
    })
}

exports.updateAccount = (req, res, next) => {
    const id = req.params.id
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role
    jwt.verify(req.token, 'token', (err, auth) => {
        if ( err ) {
            res.status(500).json({ err : "server error"})
        } else {
            sql.query('UPDATE account SET username = ?, password = ?, role = ? WHERE id = ?', [username, password, role, id], (err, rows, fields) => {
                if ( err ) {
                    res.status(500).json({ err : 'loi server' })
                } else {
                    res.status(200).json({ success : true })
                }
            })
        }
    })
}

exports.getLogin = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    sql.query('SELECT * FROM account WHERE username = ? AND password = ?', [username, password], (err, rows, fields) => {
        if ( rows.length > 0) {
            console.log(rows[0].id)
            const token = jwt.sign({ id: rows[0].id}, 'token')
            res.status(200).json({ message: "login success",
                                   token : token})
        } else {
            res.status(200).json({ message: "login fail"})
        }
    })
}

exports.getAccountByStaff = (req, res, next) => {
    jwt.verify(req.token, 'token', (err, auth) => {
        if ( err ) {
            res.status(401).json({ message : 'Token wrong'})
        } else {
            sql.query('SELECT * FROM account WHERE role = "user"', (err, rows, fields) => {
                if ( err ) {
                    res.status(500).json({ err : 'server error' })
                } else {
                    res.status(200).json({ data : rows })
                }
            })
        }
    })
}

exports.addAccountByStaff = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role
    jwt.verify(req.token, 'token', (err, auth) => {
        if ( err ) {
            res.status(401).json({ message : 'Token wrong'})
        } else {
            if (role === 'admin') {
                res.status(200).json({ message : 'NOT Create admin account'})
            } else {
                sql.query('INSERT INTO account (username, password, role) VALUES (?, ?, ?)', [username, password, role], (err, rows, fields) => {
                    if (err) {
                        res.status(500).json({ err : err })
                    } else {
                        res.status(201).json({ success: true })
                    }
                })
            }
        }
    })
}

exports.updateAccountByStaff = (req, res, next) => {
    console.log('router update')
    const id = req.params.id
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role
    jwt.verify(req.token, 'token', (err, auth) => {
        if ( err ) {
            res.status(500).json({ err : "server error"})
        } else {
            if ( role === 'admin') {
                res.status(200).json({ message : 'NOT Update role admin'})
            } else {
                sql.query('UPDATE account SET username = ?, password = ?, role = ? WHERE id = ?', [username, password, role, id], (err, rows, fields) => {
                    if ( err ) {
                        res.status(500).json({ err : 'loi server' })
                    } else {
                        res.status(200).json({ success : true })
                    }
                })
            }
        }
    })
}

exports.deleteAccountByStaff = (req, res, next) => {
    const id = req.params.id
    jwt.verify(req.token, 'token', (err, auth) => {
        if ( err ) {
            res.status(401).json({ err : 'server error' })
        } else {
            sql.query('DELETE FROM account where ID = ?', id, (err, rows, fields) => {
                if (err) {
                    res.status(500).json({ err : "delete error"})
                } else {
                    res.status(200).json({ success : true })
                }
            })
        }
    })
}