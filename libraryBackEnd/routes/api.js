var express = require('express');
const verifyToken = require('../middlewares/authenAccount');
const verifyLogin = require('../middlewares/authenLogin');
const { authAdmin, authUser } = require('../middlewares/authenRoleAccount');
var router = express.Router();
const adminController = require('./../controllers/index')
const bookController = require('./../controllers/book')

//admin
router.route('/account')
    .get(verifyLogin, verifyToken, authAdmin, adminController.getAccount)
    .post(verifyLogin, verifyToken, adminController.addAccount)

router.route('/account/:id')
    .delete(verifyLogin, verifyToken, adminController.deleteAccount)
    .put(verifyLogin, verifyToken, adminController.updateAccount)

//staff
router.route('/accountstaff')
    .get(verifyLogin, verifyToken, authUser, adminController.getAccountByStaff)
    .post(verifyLogin, verifyToken, authUser, adminController.addAccountByStaff)

router.route('/accountstaff/:id')
    .put(verifyLogin, verifyToken, authUser, adminController.updateAccountByStaff)
    .delete(verifyLogin, verifyToken, authUser, adminController.deleteAccountByStaff)

router.post('/login', adminController.getLogin)

router.route('/category')
    .get(bookController.getCategory)
    .post(bookController.addCategory)

router.route('/category/:id')
    .delete(bookController.deleteCategory)
    .put(bookController.updateCategory)

router.route('/book')
    .get(bookController.getAllBook)
    .post(bookController.addBook)

router.route('/book/:id')
    .get(bookController.getBook)
    .delete(bookController.deleteBook)
    .put(bookController.updateBook)

router.get('/category/:id/book', bookController.getBookByCategory)



module.exports = router;