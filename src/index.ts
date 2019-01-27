import * as fs from 'fs'

fs.readFile('./data/a_example.in', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
