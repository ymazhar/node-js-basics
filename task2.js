const csvFilePath = './csv/nodejs-hw1-ex1.csv'
const txtFilePath = './out.txt'
import csv from 'csvtojson'
import fs from 'fs'

const readStream = fs.createReadStream(csvFilePath)
const writeStream = fs.createWriteStream(txtFilePath, 'utf8')

const handleError = (error) => {
    console.error(error.message)
    readStream.destroy()
    csv().destroy()
    writeStream.end()
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
    .on('error', (error) => handleError(error))
    .subscribe((json) => {
        Object.entries(json).forEach(([key]) => {
            const oldKey = key
            const newKey = oldKey.toLowerCase()
            json[newKey] = json[oldKey]
            delete json[oldKey]
        })
    })
    .pipe(writeStream)
    .on('error', (error) => handleError(error))
