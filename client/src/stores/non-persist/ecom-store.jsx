import axios from "axios";
import { create } from "zustand";
import { readProduct } from '../../api/product'

const ecomStoreTemp = (set) => ({
    product: null,
    getProductById: async (token, productId) => {
        try {
            // logic
            const res = await readProduct(token, productId)
            // console.log('res from backend', res)
            set({
                product: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
})

const useEcomStoreTemp = create(ecomStoreTemp)

export default useEcomStoreTemp