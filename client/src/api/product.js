import axios from "axios"

export const createProduct = async (token, form) => {
    // logic
    return await axios.post('http://localhost:5000/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProducts = async (count) => {
    // logic
    if (count > 0) {
        return await axios.get(`http://localhost:5000/api/products/${count}`)
    } else {
        return await axios.get('http://localhost:5000/api/products')
    }
}

export const readProduct = async (token, productId) => {
    // console.log(productId)
    return await axios.get(`http://localhost:5000/api/product/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteProduct = async (token, productId) => {
    // console.log(productId)
    return await axios.delete(`http://localhost:5000/api/product/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async (token, productId, form) => {
    // console.log(productId)
    return await axios.put(`http://localhost:5000/api/product/${productId}`, form,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const uploadFile = async (token, image) => {
    // logic
    // console.log('from upload', image)
    return await axios.post('http://localhost:5000/api/images', {
        image: image //base64 encoded
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    // console.log(token, image)
}

export const removeFile = async (token, public_id) => {
    // logic
    // console.log('from remove', public_id)
    return await axios.post('http://localhost:5000/api/removeimages', {
        public_id: public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    // console.log(token, image)
}

export const searchFilters = async (arg) => {
    // logic
    return await axios.post('http://localhost:5000/api/search/filters', arg)
}