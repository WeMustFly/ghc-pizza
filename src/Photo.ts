export default class Photo {
    ID: number
    VH: string
    M: number
    tags: Array<string>

    constructor(id: number, line: string) {
        const ar = line.split(' ')

        this.ID = id

        this.VH = ar[0]
        this.M = +ar[1]

        this.tags = []
        for (let i = 0; i < this.M; i++) {
            this.tags.push(ar[2 + i])
        }
    }
}