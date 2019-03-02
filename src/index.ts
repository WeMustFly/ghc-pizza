import fs from 'fs'
import archiver from 'archiver'
import Photo from './Photo'
import Slide from './Slide'
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
  'b_lovely_landscapes',
  'c_memorable_moments',
  'd_pet_pictures',
  'e_shiny_selfies',
]
for (let name of names) {
  console.log('Start: ' + name)

  const input = new Inputer(`./data/${name}.txt`, ['N'])
  const photos: Array<Photo> = input.photos
  const slides: Array<Slide> = []

  const photosLength = photos.length

  let tmpVPhoto: Photo|null = null
  for (let i = 0; i < photosLength; i++) {
    const p = photos[i]

    if (p.VH === 'V') {
      if (tmpVPhoto) {
        slides.push(new Slide(tmpVPhoto, p))
        tmpVPhoto = null
      } else {
        tmpVPhoto = p
      }
    } else {
      slides.push(new Slide(p, null))
    }
  }

  const slidesLength = slides.length

  const slidesTags: Array<any> = []
  for (let i = 0; i < slidesLength; i++) {
    const slide = slides[i]

    for (const tag of slide.tags) {
      slidesTags.push([tag, slide])
    }
  }
  slidesTags.sort((t0, t1) => {
    return t0[0] < t1[0]
      ? -1
      : (t0[0] > t1[0] ? 1 : 0)
  })

  const slidesTagsLength = slidesTags.length

  const tags: Array<string> = []
  let tagsLength: number = 0
  for (let i = 0; i < slidesTagsLength; i++) {
    const tag = slidesTags[i][0]

    if (!tagsLength || tags[tagsLength - 1] !== tag) {
      tags.push(tag)
      tagsLength++
    }
  }

  const slidesTagsTable: Array<Array<boolean>> = []

  //console.log(slidesTags)
  //console.log(tags)
  //console.log(slides)

  const b = new Outputer(`./output/${name}.out`, slides)
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