import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { Library } from '../interfaces/Library'
import { Book } from '../interfaces/Book'

interface IColumn {
    title: string
    isClickable: boolean
}

interface IDataTableProps {
    data: Library[]
    columns: IColumn[]
    handleSort: (columnName: string) => void
    showAddToBookshelf?: boolean
    setAsFavorite?: (userId: string, bookId: string, isFavorite: boolean) => void
    deleteFromLibrary?: (userId: string, bookId: string) => void
    userId: string
}

const DataTable: React.FC<IDataTableProps> = ({
    data,
    columns,
    handleSort,
    showAddToBookshelf,
    setAsFavorite,
    deleteFromLibrary,
    userId,
}) => {
    const [modalData, setModalData] = useState<Library | null>(null)

    useEffect(() => {
        const modal = document.getElementById("book_modal") as HTMLDialogElement
        if (modal) {
          modal.showModal()
        }
    }, [modalData])

    const bookModal = (prop: Library) => {
        setModalData(prop)
    }

    const closeModal = () => {
        setModalData(null)
    }

    const columnMapping: Record<string, string> = {
        'Bilde': 'largePicture',
        'Bok-id': 'bookId',
        'Tittel': 'title',
        'Forfatter': 'author',
        'Publisert': 'releaseYear',
        'ISSN': 'issn',
        'Utgiver': 'publisher',
        'Sidetall': 'pages',
        'Favoritt': 'favorite'
    }
      
    return (
        <div>
        <table className="table">
            <thead className="text-gray-900 md:text-1/3 dark:text-white">
            <tr>
                {columns.map((column) => (
                <th key={column.title}>
                    {column.isClickable ? (
                    <button className="text-decoration-line: underline" onClick={() => handleSort(columnMapping[column.title])}>
                        {column.title}
                    </button>
                    ) : (
                        column.title
                    )}
                </th>
                ))}
            </tr>
            </thead>
            <tbody className='outline'>
            {data?.map((item, index) => (
                <tr key={item?.book.bookId} className={`hover:bg-gray-300 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-50'}`} onClick={() => bookModal(item)} >
                {columns.map((column) => (
                <td key={column.title}>
                    {columnMapping[column.title] === 'largePicture' ? (
                    <div className="avatar">
                        <div className="w-20 h-20">
                        {item.book[columnMapping[column.title] as keyof Book] ? (
                            <img src={String(item.book[columnMapping[column.title] as keyof Book])} alt="Book cover" />
                        ) : "Mangler bilde"}
                        </div>
                    </div>
                    ) : columnMapping[column.title] === 'author' ? (
                        <div>
                            {(item.book[columnMapping[column.title] as keyof Book] as string[]).map(author => (
                                <div key={author} className="py-1">{author}</div>
                            ))}
                        </div>
                    ) : columnMapping[column.title] === 'issn' ? (
                        <div>
                            {item.book[columnMapping[column.title] as keyof Book] ? (
                                (item.book[columnMapping[column.title] as keyof Book] as string[]).map(issn => (
                                    <div key={issn} className="py-1">{issn}</div>
                                ))
                            ) : null}
                        </div>
                      ) : setAsFavorite && columnMapping[column.title] === 'favorite' ? (
                    <svg
                        name="favorite"
                        onClick={(e) => {
                        e.stopPropagation()
                        setAsFavorite(userId, item.book.bookId, !item.favorite)
                        }}
                        className="z-10 w-8 h-8 text-yellow-300 ms-2 stroke-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeOpacity={item.favorite ? 0 : 100}
                        fill={item.favorite ? "currentColor" : "none"}
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    ) : (
                    item?.book[columnMapping[column.title]]
                    )}
                </td>
                ))}
                {deleteFromLibrary ? (
                <td>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        deleteFromLibrary(userId, item.book.bookId)
                    }}
                    className="px-2 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                    Slett
                    </button>
                </td>
                ) : null}
            </tr>
            ))}
        </tbody>
        </table>
        <div>
            {modalData && <Modal id="book_modal" showAddToBookshelf={showAddToBookshelf} data={modalData.book} onClose={closeModal} />}
        </div>
        </div>
    )
}

export default DataTable