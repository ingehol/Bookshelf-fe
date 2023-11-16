import { Book } from "../interfaces/Book"
import { url } from "../resources/url"

const addToBookshelf = async (userId: string, modalData: Book) => {
    try {
      const response = await fetch(`${url}/bookshelf/add?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify({
          bookId: modalData?.bookId,
          title: modalData?.title,
          author: modalData?.author,
          smallPicture: modalData?.smallPicture,
          largePicture: modalData?.largePicture,
          releaseYear: modalData?.releaseYear,
          issn: modalData?.issn,
          publisher: modalData?.publisher,
          pages: modalData?.pages,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        (document.getElementById('book_modal') as HTMLDialogElement).close()
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  export { addToBookshelf }
  