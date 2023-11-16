import { RetrieveUser } from "../interfaces/RetrieveUser"
import { url } from "../resources/url"

export default async function getUser(userId: string) : Promise<RetrieveUser> {
    const resp = await fetch(`${url}/user/user?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
            }).then(resp => {
                if(resp.ok) {
                    return resp.json()
                }
            }).catch(error => console.log(error))
        
    return resp
}