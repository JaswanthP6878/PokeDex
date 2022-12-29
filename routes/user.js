import express from 'express';
const router = express.Router();
import User from '../models/user.js'

router.post('/', async (req, res) => {
    const { user } = req.body;
    const newUser = new User({username: user.username, password : user.password});
    const data = await newUser.save();
    res.send(data);
})

router.get('/new', (req, res) => {
    res.render('Auth/signup');
})

router.get('/login', (req, res) => {
    res.render('Auth/login');
})
router.post('/login', async (req, res) => {
    const { user } = req.body;
    const Founduser = await User.findOne({username: user.username});
    if(Founduser.password === user.password){
        res.redirect('/pokemons');
    } else {
        res.send('access denied!');
    }
})
export default router;