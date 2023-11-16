export interface Book {
    bookId: string
    title: string
    author: string[]
    smallPicture: string
    largePicture: string
    releaseYear: number
    issn: string[]
    publisher: string
    pages: number
    [key: string]: string | string[] | number
}