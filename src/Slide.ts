import Photo from './Photo'

export default class Slide {
    photo1: Photo
    photo2: Photo|null

    constructor(photo1: Photo, photo2: Photo|null) {
        this.photo1 = photo1
        this.photo2 = photo2
    }

    get tags(): Array<string> {
        const tags: Array<string> = []

        this.photo1.tags.map(t => tags.push(t))
        this.photo1.tags.filter(t => !(t in tags)).map(t => tags.push(t))

        return tags
    }
}