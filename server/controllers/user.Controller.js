const User = require('../models/user.Schema')
const asyncWrapper = require('../middleware/asyncWrapper')

const register = asyncWrapper(async(req, res) => {
    const { username, first_name, last_name, email, password, phone_number, address, role, clientID } = req.body;

    const user = await User.create({ ...req.body })
    res.status(201).json({ status: 'ok', data: user, msg: 'new user registered' })
})

const login = asyncWrapper(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email }) 
    if (!user){ //if no user
        return res.status(400).json({ msg: 'user does not exist'})
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect){ //if password is incorrect
        return res.status(400).json({ msg: 'incorrect password' })
    }

    res.status(200).json({ status: 'ok', data: user, msg: 'login success'})
})

const getAll = asyncWrapper(async(req, res) => {
    const users = await User.find({})
    res.status(200).json({ status: 'ok', data: users })
})

const getByID = asyncWrapper(async(req, res) => {
    const { id:userID } = req.params
    const user = await User.findOne({ _id: userID })
    if (!user) {
        return res.status(400).json({msg: `no user with id ${userID}`}) 
    }
    res.status(200).json({ data: user }) 
})

const getByEmail = asyncWrapper( async (req, res) => {
    const { email } = req.params
    const user = await User.findOne({ email: email })
    if (!user) { //if no token found (either expired or does not exist)
        res.json({ msg: "no user found" });
        return;
    }
    res.status(200).json({ status: 'ok', data: [user]})
})

const getByParams = asyncWrapper( async (req, res) => {
    if (req.query.search){
        const user = await User.find({ first_name: req.query.search})
        if (!user) { //if no token found (either expired or does not exist)
            res.json({ msg: "no user found" });
            return;
        }
        res.status(200).json({ status: 'ok', data: [user]})
    }
    else if(req.query.id){
        const user = await User.findOne({ _id: req.query.id })
        if (!user) {
            return res.status(400).json({msg: `no user with id ${req.query.id}`}) 
        }
        res.status(200).json({ data: user }) 
    }
    else{
        const users = await User.find({})
        res.status(200).json({ status: 'ok', data: users })
    }
    
})

const updateUserInfo = asyncWrapper(async(req, res) => {
    const { id: userID } = req.params;
    const user = await User.findByIdAndUpdate({ _id: userID }, req.body, {
      new:true,
    });
    if (!user) {
      return res.status(404).json({ msg:`No user with id ${userID}` })    
    }
    res.status(200).json({ user }) 
})

const deleteUser = asyncWrapper(async(req, res) => {
    const { id:userID } = req.params;
    const user = await User.findOneAndDelete({ _id: userID });   
    if (!user) {
        return res.status(404).json({ msg:`No user with id ${userID}` })    
    }
    res.status(201).json({ msg:'user deleted', user });  
})

module.exports = {
    register,
    login,
    getAll,
    getByID,
    getByParams,
    getByEmail,
    updateUserInfo,
    deleteUser,
}