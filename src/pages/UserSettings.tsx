import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { url } from "../resources/url"
import getUser from "../functions/getUser"
import Navbar from "../components/Navbar"
import UserForm from "../components/UserForm"
import Lockout from "../components/Lockout"

export default function UserSettings() {
    const navigator = useNavigate()
    const userId = localStorage.getItem("userId")
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: ''
    })
    const [userValidator, setUserValidator] = useState(false)

    useEffect(() => {(
        async () => {
            const body = await getUser(String(userId))
            setForm({
                ...form,
                email: body.email,
                username: body.username,
                firstname: String(body?.firstname),
                lastname: String(body?.lastname)
            })
        }
        )()}, []
    )


    useEffect(() => {
        const timer = setTimeout(() => {
          setUserValidator(false)
        }, 6000)
        return () => clearTimeout(timer)
      })

    const handleChange = (e: any) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (form.password === form.confirmPassword) {
            await fetch(`${url}/user/update?userId=${userId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "userId": userId,
                    "username": form.username,
                    "password": form.password,
                    "email": form.email,
                    "firstName": form?.firstname,
                    "lastName": form?.lastname
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(resp => {
                if(resp.ok) navigator("/bookspage")
            }).catch(error => console.log(error))
        } else {
            setUserValidator(true)
        }
    }

    if(userId === "") {
        return(
            <Lockout />
        )
    }

    return (
        <div>
            <Navbar />
            <UserForm
                form={form}
                userValidator={userValidator}
                onChange={handleChange}
                onSubmit={handleSubmit}
                headerText="Rediger brukeren din"
                buttonText="Rediger bruker"
                />
        </div>
    )
}