const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/file/', (req, res) => {
    console.log('Ruuvi request received:');
    console.log(req.body.data);
    const date = new Date();
    fileStream.write(`${date.toString()} ${req.body.data}`);
    fileStream.write('\n');
    res.status(200).send();
});





router.get('/chart'), (req, res) => {
    res.render(chartFile);
};



module.exports = router;
