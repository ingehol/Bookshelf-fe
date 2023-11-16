import { Book } from "../interfaces/Book"

export default async function getBooks(searchTerm?: string, page?: number, size?: number) : Promise<Book[]> {
    const resp = await fetch(`https://api.nb.no/catalog/v1/items?q=${searchTerm}&searchType=TEXT_SEARCH&page=${page}&filter=bøker&size=${size}`)
    .then((response) => {return response.json()})
    .then((json) => {
        const bookArray: Book[] = []
        json._embedded.items.map((item : any) =>
            bookArray.push({
                bookId: item?.id,
                title: item.metadata?.title,
                author: item.metadata?.creators ?? ["Ukjent"],
                smallPicture: item._links?.thumbnail_small?.href ? item._links.thumbnail_small.href : null,
                largePicture: item._links?.thumbnail_large?.href ? item._links.thumbnail_large.href : null,
                releaseYear: item.metadata?.originInfo?.issued,
                issn: item.metadata?.identifiers?.issn ?? null,
                publisher: item.metadata?.originInfo?.publisher ?? "Ukjent" ,
                pages: item.metadata?.pageCount
            })
        )
        return bookArray
    })
    .catch((error) => {
        console.log(error)
    }) as Book[]
    return resp
}