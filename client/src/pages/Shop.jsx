import React, { useEffect, useState } from 'react'
import { Typography, Card } from '@material-tailwind/react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../stores/ecom-store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'
const Shop = () => {

    //Global state
    const products = useEcomStore((state) => state.allProduct)

    //Global functions
    const getProduct = useEcomStore((state) => state.getProducts)

    //Component state
    const [getProductCount, setProductCount] = useState(0)

    useEffect(() => {
        getProduct(getProductCount)
    }, [getProductCount])
    return (
        <div className='flex'>
            {/* search bar */}
            <div className='w-1/4 p-4 h-screen bg-gray-200'>
                <SearchCard />
            </div>

            {/* product */}
            <div className='w-1/2 p-4 h-screen overflow-y-auto'>
                <Typography className='text-2xl font-bold mb-4'>
                    All Products
                </Typography>

                <div className='flex flex-wrap gap-4'>
                    {/* Product Card */}
                    {products.map((product, index) =>
                        <ProductCard product={product} key={index} />
                    )}
                    {/* Product Card */}
                </div>
            </div>

            {/* cart */}
            <div className='w-1/4 p-4 bg-gray-200 h-screen overflow-y-auto'>
                <CartCard />
            </div>
        </div>
    )
}

export default Shop