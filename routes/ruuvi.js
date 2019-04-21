const express = require('express');
const router = express.Router();

const fs = require('fs-extra');
const path = require('path');


const outputDir = './output_data/';
fs.ensureDirSync(outputDir);
const now = new Date();
// const fileName = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}.txt`;
// const fileName = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}${now.getUTCHours()}-${now.getUTCMinutes()}`;
const fileName = 'data.txt';
const tempsFileName = 'temps.txt';



const outputFilePath = path.join(outputDir, fileName);
const tempOutputFile = path.join(outputDir, tempsFileName);
// append to file
const fileStream = fs.createWriteStream(outputFilePath, {flags: 'a'});
const tempsFileStream = fs.createWriteStream(tempOutputFile, {flags: 'a'});


router.post('/', (req, res) => {
    console.log('Ruuvi request received:');
    console.log(req.body);
    //const date = new Date();
    fileStream.write(`${JSON.stringify(req.body)}`);
    tempsFileStream.write(`${req.body.tag.temperature},`);
    fileStream.write('\n');

    res.status(200).send();
});



module.exports = router;