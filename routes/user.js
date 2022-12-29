import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('hit the post route');
})

router.get('/new', (req, res) => {
    res.render('Auth/login');
})



export default router;