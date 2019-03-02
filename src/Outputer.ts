import Slide from './Slide'

export default class Outputer {
    private fs = require('fs')

    constructor (fileName: string, slides: Array<Slide>) {
        let output = '' + slides.length

        for (const slide of slides) {
            output += '\n'

            output += '' + slide.photo1.ID

            if (slide.photo2) {
                output += ' ' + slide.photo2.ID
            }
        }

        this.fs.writeFileSync(fileName, output, 'utf8')
    }
}