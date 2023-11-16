import { Book } from "./Book"

export interface Library {
    book: Book
    favorite: boolean
    hasRead: boolean
    readDate?: Date
}