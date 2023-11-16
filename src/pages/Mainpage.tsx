import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginFormData } from '../interfaces/LoginFormData'
import { url } from "../resources/url"
import Alert from '../components/Alert'

export default function Mainpage() {
    const navigator = useNavigate()
    const [form, setForm] = useState<LoginFormData>({
        username: '',
        password: '',
    })
    const [userValidator, setUserValidator] = useState(false)
    
    useEffect(() => {
        const timer = setTimeout(() => {
          setUserValidator(false)
        }, 6000)
        return () => clearTimeout(timer)
      })

    const handleChange = (e: any ) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await fetch(`${url}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                "username": form.username,
                "password": form.password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        }).then(resp => {
            if(resp.ok) {
                resp.json().then(data => {
                    localStorage.setItem('userId', data?.userId)
                    navigator("/bookspage", {
                        state: {
                            userId: data?.userId
                        }
                    })
                }
                )
            } else {
                setUserValidator(true)
            }
        }).catch(error => console.log(error))
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Bokhyllen</h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brukernavn:</label>
                                    <input type="text" name="username" id="username" onChange={handleChange} required={true} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passord:</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" onChange={handleChange} required={true} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <button type="submit" onClick={handleSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Logg inn</button>
                                <div className="flex items-center justify-between">
                                    <a href="/register" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Opprett en bruker</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    {userValidator ? (
                        <Alert text="Feil brukernavn eller passord." />
                    ) : null}
                </div>
            </section>
        </div>
    )
}