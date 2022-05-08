const csvFilePath = './csv/nodejs-hw1-ex1.csv'
const txtFilePath = './out.txt'
import csv from 'csvtojson'
import fs from 'fs'

const readStream = fs.createReadStream(csvFilePath)
const writeStream = fs.createWriteStream(txtFilePath, 'utf8')

const handleError = (error) => {
    readStream.destroy()
    csv().destroy()
    console.error(error.message)
}

readStream
    .on('error', (error) => handleError(error))
    .pipe(csv({
        colParser: {
            "Amount": "omit",
            "Price": "number",
        },
        checkType: true
    }))
    .subscribe((json) => {
        console.log(json);
    })
    .pipe(writeStream)
    .on('error', (error) => handleError(error))
