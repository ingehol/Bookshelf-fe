import React from 'react'
import { addToBookshelf } from '../functions/addToBookshelf'
import { Book } from '../interfaces/Book'

interface ModalProps {
    id: string
    data: Book
    onClose: () => void
    showAddToBookshelf?: boolean
}

const Modal: React.FC<ModalProps> = ({ data, id, onClose, showAddToBookshelf }) => {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box w-fit h-fit flex flex-column text-gray-700 bg-gray-100 space-x-4 md:space-x-2">
                <img src={data?.largePicture} className="object-contain px-2" alt="Mangler bilde"/>
                <div className="flex-column">
                <h3 className="font-bold text-lg">{data?.title}</h3>
                <div className="flex-grow border-t border-gray-400"></div>
                <p className="text-md">Skrevet av:</p>
                    {data.author?.map((author) => {
                        return <p className="text-sm py-0.5">{author}</p>
                    })}
                <div className="flex-grow border-t border-gray-400"></div>
                <p className="text-md">Info:</p>
                <p className="py-auto text-sm">{`Publisert: ${data?.releaseYear}`}</p>
                <p className="py-auto text-sm">{`Publisert av: ${data?.publisher}`}</p>
                <p className="py-auto text-sm">{`Sidetall: ${data?.pages}`}</p>
                {data?.issn ? <p className="text-sm py-0.5">{`ISSN: ${data.issn}`}</p> : null}
                <p className="py-auto text-sm">{`Bok-id: ${data?.bookId}`}</p>
                <div className="space-x-2 bottom-4 pt-16">
                    {showAddToBookshelf && (
                    <button
                        onClick={() => addToBookshelf(String(localStorage.getItem("userId")), data)}
                        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-1 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Legg til bokhylle
                    </button>
                    )}
                </div>
            </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>Lukk</button>
            </form>
        </dialog>
    )
}

export default Modal
