var express = require('express');
const verifyToken = require('../middlewares/authenAccount');
const verifyLogin = require('../middlewares/authenLogin');
const { authAdmin } = require('../middlewares/authenRoleAccount');
var router = express.Router();
const adminController = require('./../controllers/index')

router.route('/account')
    .get(verifyLogin, verifyToken, authAdmin, adminController.getAccount)
    .post(verifyLogin, verifyToken, adminController.addAccount)

router.route('/account/:id')
    .delete(verifyLogin, verifyToken, adminController.deleteAccount)
    .put(verifyLogin, verifyToken, adminController.updateAccount)

router.post('/login', adminController.getLogin)

module.exports = router;