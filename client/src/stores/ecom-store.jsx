import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from '../api/category'
import { listProducts, searchFilters } from "../api/product";
import _ from 'lodash'

const ecomStore = (set, get) => ({
    user: null,
    token: null,
    categories: [],
    allProduct: [],
    carts: [],
    actionAddToCart: (product) => {
        const carts = get().carts
        const updateCart = [...carts, { ...product, count: 1 }]

        // step Uniqe
        const uniqe = _.uniqWith(updateCart, _.isEqual)
        // console.log('Click add in zustand', updateCart)
        // console.log('Click add in zustand', uniqe)

        set({
            carts: uniqe
        })
    },
    actionUpdateQuantity: (productId, newQuantity) => {

        // update quantity
        set((state) => ({
            carts: state.carts.map((cart) =>
                cart.id === productId
                    ? {...cart, count: Math.max(1, newQuantity)}
                    : cart
            )
        }))
    },
    actionRemoveProductFromCart: (productId) => {

        // remove from cart
        set((state) => ({
            carts: state.carts.filter((cart) => cart.id !== productId)
        }))
    },
    getTotalPrice: () => {
        const carts = get().carts
        const totalPrice = carts.reduce((total, product) => total + product.price * product.count, 0)
        return totalPrice
    },
    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:5000/api/login', form)
        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    },
    getCategories: async () => {
        try {
            const res = await listCategory()
            set({
                categories: res.data
            })
        } catch (err) {
            console.log(err.response)
        }
    },
    getProducts: async (count) => {
        try {
            const res = await listProducts(count)
            set({
                allProduct: res.data
            })
        } catch (err) {
            console.log(err.response)
        }
    },
    getProductsByFilter: async (arg) => {
        try {
            const res = await searchFilters(arg)
            set({
                allProduct: res.data
            })
        } catch (err) {
            console.log(err.response)
        }
    },
    convertToCurrency: (price) => {
        let THbath = new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
        })
        return THbath.format(price)
    },
})

const userPersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage)
}

const useEcomStore = create(persist(ecomStore, userPersist))

export default useEcomStore