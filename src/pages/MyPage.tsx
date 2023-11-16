import Navbar from "../components/Navbar"
import { useCallback, useEffect, useRef, useState } from "react"
import getMyLibrary from "../functions/getMyLibrary"
import { Library } from "../interfaces/Library"
import { url } from "../resources/url"
import DataTable from "../components/DataTable"
import Lockout from "../components/Lockout"

export default function MyPage() {
    const userId = localStorage.getItem("userId") as string
    const [sortField, setSortField] = useState("")
    const [order, setOrder] = useState("asc")
    const [library, setLibrary] = useState<Library[]>([])

    useEffect(() => {(
        async () => {
            const lib = await getMyLibrary(userId)
            setLibrary(lib)
        }
        )()}, []
    )

    const ref = useRef<HTMLDialogElement>(null)
    useCallback(() => {
        ref.current?.showModal()
    }, [ref])

    const handleSort = (columnName: string) => {
        if(!library) return
        const sortOrder = columnName === sortField && order === "asc" ? "desc" : "asc"
        const asc = sortOrder === "asc" ? 1 : -1
        setSortField(columnName)
        setOrder(sortOrder)
        const sortedItems = [...library].sort((a, b) => {
            return String(a.book[columnName]).localeCompare(String(b.book[columnName]), 'en', {numeric: true}) * asc
        })
        setLibrary(sortedItems)
    }

    const setAsFavorite = (userId: string, bookId: string, isFavorite: boolean) => {
        fetch(`${url}/bookshelf/setFavorite?userId=${userId}&bookId=${bookId}&isFavorite=${isFavorite}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
        }).then(resp => {
            if(resp.ok) {
                setLibrary([...library].map(book =>
                    book.book.bookId === bookId ?
                    Object.assign(book, {favorite: isFavorite}) :
                    book
                ))
            }
        }).catch(error => console.log(error))
    }

    const deleteFromLibrary = (userId: string, bookId: string) => {
        fetch(`${url}/bookshelf/delete?userId=${userId}&bookId=${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
        }).then(resp => {
            if(resp.ok) {
                setLibrary(
                    [...library].filter(function(book) { 
                        return book.book.bookId !== bookId 
                    })
                )
            }
        }).catch(error => console.log(error))
    }

    if(userId === "") {
        return(
            <Lockout />
        )
    }

    const columns = [
        { title: 'Bilde', isClickable: false },
        { title: 'Bok-id', isClickable: false },
        { title: 'Tittel', isClickable: true },
        { title: 'Forfatter', isClickable: true },
        { title: 'Publisert', isClickable: true },
        { title: 'ISSN', isClickable: true },
        { title: 'Utgiver', isClickable: true },
        { title: 'Sidetall', isClickable: true } ,
        { title: 'Favoritt', isClickable: false }
      ]

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="overflow-x-auto dark:mt-2 flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 md:text-1/3 dark:text-white">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 bg-white">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <DataTable
                    columns={columns}
                    data={library}
                    handleSort={handleSort}
                    setAsFavorite={setAsFavorite}
                    deleteFromLibrary={deleteFromLibrary}
                    userId={userId}
                    />
                </div>
                </div>
            </div>
        </div>
    )
}