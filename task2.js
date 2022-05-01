const csvFilePath = './csv/nodejs-hw1-ex1.csv'
import csv from 'csvtojson'
import fs from 'fs'

const readStream = fs.createReadStream(csvFilePath)
const writeStream = fs.createWriteStream('./out.txt', 'utf8')

const handleError = () => {
    readStream.destroy()
    writeStream.end('Finished with error...')
}

readStream
    .on('error', handleError)
    .pipe(csv())
    .pipe(writeStream)
    .on('error', handleError)
