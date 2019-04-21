const express = require('express');
const router = express.Router();
const axios = require('axios');

const fs = require('fs-extra');
const readLine = require('readline');
const path = require('path');

// some documentation
// https://documentation.image-charts.com/
// https://documentation.image-charts.com/line-charts/#examples_1
// https://documentation.image-charts.com/reference/chart-axis/

const dataFilePath = path.join('./output_data', 'temps.txt');

const basePath = 'https://image-charts.com/chart?';

const type = '&cht=ls';
const displayNumber = '&chxt=y';
const data = '&chd=t:20,19,19,17,16,15,15,14,12,20,10,9,9,-20,0,10';
const size = '&chs=700x300';
const something = '&chds=-100,100';
const xValues = '&chxr=0,-40,40';

// ${}
router.get('/', (req, res) => {
    console.log('Image requested');
    /*
    const reader = readLine.createInterface({
        input: fs.createReadStream(dataFilePath)
    });
    const jsons = [];
    reader.on('line', function(line) {
        try{
            const json = JSON.parse(line);
            jsons.push(json);
        }  catch(error) {
            // no-op
        }
    });
    console.log('jsons got:');
    console.log(jsons);
    */
    let fileData = fs.readFileSync(dataFilePath, 'utf-8');

    console.log('got file data');
    console.log(fileData);
    // remove trailing comma if exists
    const lastSymbol = fileData[fileData.length-1];
    if (lastSymbol === ',') {
       fileData = fileData.slice(0, -1);
    }
    const indexOfLastComma = fileData.lastIndexOf(',');
    const lastRecord = fileData.substr(indexOfLastComma + 1, fileData.length-1);
    const urlData = `&chd=t:${fileData}`;
    const imageUrl = `${basePath}${type}${urlData}${size}${xValues}${displayNumber}${something}`;
    const resHtml = `
            <html lang="en">
            <head>
            <title>Tomi's weather station</title>
            </head>
                <body>
                    <img src="${imageUrl}" alt="Temperature"></div>
                </body>
                <p>
                    Latest recorded temperature: ${lastRecord}
                </p>
            </html>
        `;
    res.send(resHtml);



    /*axios.get(imageUrl)
        .then(response => {
            console.log('got image from image-charts');
            // console.log(response.data);
            //res.render(response.data);
            //res.writeHead(200, {
            //    'Content-Type': 'image/png'
            //});
            //res.sendFile()
            // jotain res.pipe hommia
        })
        .catch(error => {
            console.log('error while fetching image');
            console.log(error);
            res.status(500).send();
        });

    */

});

module.exports = router;