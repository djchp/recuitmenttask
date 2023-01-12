import axios from "axios"


const getMax = async() => {
    const data = await axios.get(`https://reqres.in/api/products`)
    const total = data.data.total
    const total_pages= data.data.total_pages
    const result = {total, total_pages}
    return result 
}

export default getMax