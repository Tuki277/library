var mysql = require('mysql')

const connect = mysql.createConnection ({
    host : process.env.HOST,
    user : 'root',
    port : process.env.PORT,
    password : process.env.PASSWORD,
    database : 'library'
})

connect.connect((err) => {
    if (err){
        console.log('database connect fail')
    }
    else {
        console.log('database has connected')
    }
})

module.exports = connect