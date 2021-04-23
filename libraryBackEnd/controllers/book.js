const sql = require('./../config/database')

exports.addCategory = (req, res, next) => {
    const name = req.body.name
    sql.query('INSERT INTO categorybook (name) VALUES (?)', name, (err, rows, fields) => {
        if ( err ) {
            res.status(500).json({ message : err })
        } else {
            res.status(201).json({ success : true })
        }
    })
}

exports.getCategory = (req, res, next) => {
    sql.query('SELECT * FROM categorybook', (err, rows, fields) => {
        if ( err ) {
            res.status(500).json({ message : err })
        } else {
            res.status(200).json({ data : rows })
        }
    })
}

exports.deleteCategory = (req, res, next) => {
    const id = req.params.id
    sql.query('DELETE FROM booklist WHERE id_category = ?', id, (err, rows, fields) => {
        if ( err ) {
            res.status(500).json({ message : err })
        } else {
            sql.query('DELETE FROM categorybook WHERE id = ?', id, (err, rows, fields) => {
                if ( err ) {
                    res.status(500).json({ message : err })
                } else {
                    res.status(200).json({ success : true })
                }
            })
        }
    })
}

exports.updateCategory = (req, res, next) => {
    const id = req.params.id
    const name = req.body.name
    sql.query('UPDATE categorybook SET name = ? WHERE id = ?', [name, id], (err, rows, fields) =>{
        if ( err ) {
            res.status(500).json({ message : err })
        } else {
            res.status(200).json({ success : true })
        }
    })
}

exports.addBook = (req, res, next) => {
    const id_category = req.body.id_category
    const name = req.body.name
    const image = req.body.image
    const detail = req.body.detail
    const price = req.body.price
    const priceToBuy = req.body.priceToBuy
    sql.query('INSERT INTO booklist ( id_category, name, image, detail, price, priceToBuy) VALUES (?, ?, ?, ?, ?, ?)',
    [id_category, name, image, detail, price, priceToBuy], (err, rows, fields) => {
        if ( err ) {
            res.status(500).json({ message : err })
        } else {
            res.status(201).json({ success : true })
        }
    })
}

exports.getAllBook = (req, res, next) => {
    console.log(req.query.page)
    const PAGE_SKIP = 5
    const page = req.query.page
    if ( page ) {
        const skip = ( page - 1 ) * PAGE_SKIP
        sql.query('SELECT * FROM booklist LIMIT 5 OFFSET ?', skip, (err, rows, fields) => {
            if ( err ) {
                res.status(500).json({ message : err })
            } else {
                res.status(200).json({ data : rows })
            }
        })
    } else {
        sql.query('SELECT * FROM booklist', (err, rows, fields) => {
            if ( err ) {
                res.status(500).json({ message : err })
            } else {
                res.status(200).json({ data : rows })
            }
        })
    }
}

exports.getBook = (req, res, next) => {
    const id = req.params.id
    sql.query('SELECT * FROM booklist WHERE id = ?', id, (err, rows, fields) => {
        if ( err ) {
            res.status(500).json({ message: err })
        } else {
            res.status(200).json({ data : rows })
        }
    })
}

exports.updateBook = (req, res, next) => {
    const id = req.params.id
    const id_category = req.body.id_category
    const name = req.body.name
    const image = req.body.image
    const detail = req.body.detail
    const price = req.body.price
    const priceToBuy = req.body.priceToBuy
    sql.query('UPDATE booklist SET id_category = ?, name = ?, image = ?, detail = ?, price = ?, priceToBuy = ? WHERE id = ?', 
    [id_category, name, image, detail, price, priceToBuy, id], (err, rows, fields) => {
        if ( err ) {
            res.status(500).json({ message : err })
        } else {
            res.status(200).json({ success: true })
        }
    })
}

exports.deleteBook = (req, res, next) => {
    const id = req.params.id
    sql.query('DELETE FROM booklist WHERE id = ?', id, (err, rows, fields) => {
        if ( err ) {
            res.status(500).json({ message : err })
        } else {
            res.status(200).json({ success: true })
        }
    })
}

exports.getBookByCategory = (req, res, next) => {
    const id = req.params.id
    sql.query('SELECT c.*, b.* FROM categorybook c, booklist b WHERE c.id = b.id_category AND c.id = ?', id, (err, rows, fields) => {
        if ( err ) {
            res.status(500).json({ message : err })
        } else {
            res.status(200).json({ data : rows })
        }
    })
}