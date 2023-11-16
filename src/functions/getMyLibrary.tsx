import { Library } from "../interfaces/Library"
import { url } from "../resources/url"

export default async function getMyLibrary(userId: string) : Promise<Library[]> {
    const resp = await fetch(`${url}/bookshelf/getLibrary?userId=${userId}`, {
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