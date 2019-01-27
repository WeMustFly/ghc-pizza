export default class Inputer {
    private fs = require('fs')
    private _data: string
    private _lines: Array<string>
    private _variables: any

    constructor (fileName: string, keys: Array<string>) {
        this._data = this.fs.readFileSync(fileName, 'utf8')

        this._lines = this._data.split('\n')

        this._variables = {}
        const firstLine = this._lines.shift()
        this._lines.pop()

        if (firstLine) {
            const values: Array<number> = firstLine.split(' ').map(v => +v)
            values.map((v,i) => this._variables[keys[i]] = v)
        }
    }

    get lines(): Array<string> {
        return this._lines
    }

    get variables(): any {
        return this._variables
    }
}