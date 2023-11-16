import { useCallback, useEffect, useRef, useState } from "react"
import getBooks from "../functions/getBooks"
import { Book } from "../interfaces/Book"
import Navbar from "../components/Navbar"
import { BookQuery } from "../interfaces/BookQuery"
import DataTable from "../components/DataTable"
import { Library } from "../interfaces/Library"
import Lockout from "../components/Lockout"

export default function Bookspage() {
    const userId = localStorage.getItem("userId")
    const [books, setBooks] = useState<Book[]>([])
    const [sortField, setSortField] = useState("")
    const [order, setOrder] = useState("asc")
    const [form, setForm] = useState<BookQuery>({
        search: undefined,
        page: 0,
        size: 10
    })

    const ref = useRef<HTMLDialogElement>(null)
    useCallback(() => {
        ref.current?.showModal()
    }, [ref])

    useEffect(() => {(
        async () => {
            const _body = await getBooks()
            setBooks(_body)
        }
        )()}, []
    )

    const navigate = async (next: number) => {
        setForm(({
            ...form,
            page: form.page + next
        }))
        const bookValues = await getBooks(form.search, form.page + next, form.size)
        setBooks(bookValues)
    }

    const handleChange = (e: any ) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const search = await getBooks(form?.search, form?.page, form?.size)
        setBooks(search)
    }

    const handleSort = (columnName: string) => {
        const sortOrder = columnName === sortField && order === "asc" ? "desc" : "asc"
        const asc = sortOrder === "asc" ? 1 : -1
        setSortField(columnName)
        setOrder(sortOrder)
        const sortedItems = [...books].sort((a, b) => {
            return String(a[columnName]).localeCompare(String(b[columnName]), 'en', {numeric: true}) * asc
        })
        setBooks(sortedItems)
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
      ]

    const data: Library[] = books.map((book) => ({
        book,
        favorite: false,
        hasRead: false,
        readDate: undefined
    }))

    return(
        <div>
        <Navbar />
        <div className="overflow-x-auto dark:mt-2 flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 md:text-1/3 dark:text-white">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 bg-white">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div>
            <form className="flex flex-row">
                <input name="search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Søk her..." onChange={handleChange} />
                <input name="size" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-2/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" placeholder="Antall per side" onChange={handleChange} />
                <button type="submit" onClick={handleSubmit} className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-small rounded-lg text-sm p-2.5 w-1/12 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Søk</button>
            </form>
            </div>
            <DataTable
                columns={columns}
                data={data}
                handleSort={handleSort}
                userId={userId as string}  
                showAddToBookshelf                      
            />
            <nav>
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <a key="decrement" onClick={() => navigate(-1)} className="flex items-center justify-center px-3 h-12 w-22 underline ms-0 leading-tight text-primary-700 bg-white border border-e-0 border-primary-500 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{`<< Forrige`}</a>
                    </li>
                    <li>
                        <a key="increment" onClick={() => navigate(1)} className="flex items-center justify-center px-3 h-12 w-22 underline leading-tight text-primary-700 bg-white border border-primary-500 rounded-e-lg hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{`Neste >>`}</a>
                    </li>
                </ul>
            </nav>
            </div>
            </div>
        </div>
        </div>
    )
}