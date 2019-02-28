export default class Outputer {
    private fs = require('fs')

    constructor (fileName: string, lines: Array<string>) {
        this.fs.writeFileSync(fileName, lines.join('\n'), 'utf8')
    }
}