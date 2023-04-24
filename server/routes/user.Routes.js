const express = require('express')
const router = express.Router()

const {
    register,
    login,
    getAll,
    getByID,
    getByParams,
    getByEmail,
    updateUserInfo,
    deleteUser,
} = require('../controllers/user.Controller')

router.post('/user/register', register)

router.post('/users/create', register)

router.post('/user/login', login)



router.get('/user/:id', getByID)

router.get('/users', getByParams)

router.get('/email/:email', getByEmail)

router.patch('/user/:id', updateUserInfo)

router.delete('/user/:id',deleteUser)

// router.get('/users',getAll)

module.exports = router