import fs from 'fs'
import archiver from 'archiver'
import Inputer from './Inputer'
import Outputer from './Outputer'

const a = new Inputer('./data/b_small.in', ['R', 'C', 'L', 'H'])
console.log(a.variables)
console.log(a.lines)
const b = new Outputer('./output/b_small.out', a.lines)

const output = fs.createWriteStream('./output/src.zip')
const archive = archiver('zip')

archive.pipe(output);

// append a file from stream
archive.append(fs.createReadStream('./tsconfig.json'), { name: 'tsconfig.json' })
archive.append(fs.createReadStream('./package.json'), { name: 'package.json' })
archive.append(fs.createReadStream('./package-lock.json'), { name: 'package-lock.json' })
archive.directory('src/', 'src')
archive.finalize()
