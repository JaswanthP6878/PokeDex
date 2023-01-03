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
        req.session.userID = Founduser._id;
        req.session.username = Founduser.username;
        // console.log(req.session);
        req.flash('success', `welcome back ${Founduser.username}`)
        res.redirect('/pokemons');
    } else {
        res.send('access denied!');
    }
})

router.get('/logout', (req, res) => {
    console.log(res.locals);
    req.session.destroy();
    res.redirect('/');
})


router.get('/fake', (req, res) => {
    res.render('test');
})



export default router;