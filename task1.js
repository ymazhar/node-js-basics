import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', function(line ){
    const reverseLine = line.split('').reverse().join('')

    rl.output.write(reverseLine)
})





