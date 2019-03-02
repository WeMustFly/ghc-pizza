import Photo from './Photo'

export default class Inputer {
    private fs = require('fs')
    private _data: string
    private _photos: Array<Photo>
    private _variables: any

    constructor (fileName: string, keys: Array<string>) {
        this._data = this.fs.readFileSync(fileName, 'utf8')

        const lines = this._data.split('\n')

        this._variables = {}
        const firstLine = lines.shift()
        lines.pop()

        if (firstLine) {
            const values: Array<number> = firstLine.split(' ').map(v => +v)
            values.map((v,i) => this._variables[keys[i]] = v)
        }

        this._photos = []
        for (let id in lines) {
            const line = lines[id]
            this._photos.push(new Photo(+id, line))
        }
    }

    get photos(): Array<Photo> {
        return this._photos
    }

    get variables(): any {
        return this._variables
    }
}