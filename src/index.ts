import fs from 'fs'
import archiver from 'archiver'
import Inputer from './Inputer'
import Outputer from './Outputer'

const oldFiles = fs.readdirSync('./output')
for (let oldFile of oldFiles) {
    if (oldFile === '.gitignore') {
        continue
    }

    fs.unlinkSync('./output/' + oldFile)
}

const names = [
  'a_example',
]
for (let name of names) {
  console.log('Start: ' + name)
  const a = new Inputer(`./data/${name}.in`, ['R', 'C', 'L', 'H'])
  const b = new Outputer(`./output/${name}.out`, a.lines)
  console.log('Finish: ' + name)
}

const output = fs.createWriteStream('./output/src.zip')
const archive = archiver('zip')

archive.pipe(output);
archive.append(fs.createReadStream('./tsconfig.json'), { name: 'tsconfig.json' })
archive.append(fs.createReadStream('./package.json'), { name: 'package.json' })
archive.append(fs.createReadStream('./package-lock.json'), { name: 'package-lock.json' })
archive.directory('src/', 'src')
archive.finalize()

console.log('Zipped!')
