import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { url } from "../resources/url"
import UserForm from "../components/UserForm"

export default function Register() {
    const navigator = useNavigate()
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: ''
    })
    const [userValidator, setUserValidator] = useState(false)

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
            await fetch(`${url}/user/register`, {
                method: 'POST',
                body: JSON.stringify({
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
                if(resp.ok) navigator("/")
            }).catch(error => console.log(error))
        } else {
            setUserValidator(true)
        }
    }

    return (
        <UserForm
            form={form}
            userValidator={userValidator}
            onChange={handleChange}
            onSubmit={handleSubmit}
            headerText="Opprett en bruker"
            buttonText="Opprett bruker"
            optionalText="Har du allerede en bruker?"
            />
    )
}