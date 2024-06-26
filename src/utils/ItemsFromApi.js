import sendRequestFunc from './sendRequestFunc'
import {BASEURL} from './URL'

export async function ItemsFromApi(){
    const response = await sendRequestFunc(`${BASEURL}/getAllItems`,'GET')
    if(response.statusCode === 200){
        return response.allItems;
    }
}