import axios from "axios"

export const createCategory = async (token, name) => {
    // logic
    return await axios.post('http://localhost:5000/api/category', name, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async () => {
    // logic
    return await axios.get('http://localhost:5000/api/category')
}

export const deleteCategory = async (token, id) => {
    // logic
    return await axios.delete(`http://localhost:5000/api/category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}