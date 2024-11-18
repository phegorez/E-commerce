import React, { useState, useEffect } from 'react'
import useEcomStore from '../../stores/ecom-store'
import { Input, Typography, Checkbox, Collapse, Card, CardBody, Button } from "@material-tailwind/react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const SearchCard = () => {
    //Global state
    const products = useEcomStore((state) => state.allProduct)
    const categories = useEcomStore((state) => state.categories)

    //Global functions
    const getProduct = useEcomStore((state) => state.getProducts)
    const getCategory = useEcomStore((state) => state.getCategories)
    const getProductByFilter = useEcomStore((state) => state.getProductsByFilter)
    const convertToCurrency = useEcomStore((state) => state.convertToCurrency)

    //Component state
    const [text, setText] = useState('')
    const [selectedCategorise, setSelectedCategorise] = useState([])
    const [prices, setPrices] = useState([1000, 30000])
    const [ok, setOk] = useState(false)

    // collapse controller
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);


    // step 1 search text
    useEffect(() => {
        // logic

        const delay = setTimeout(() => {
            if (text) {
                getProductByFilter({
                    query: text
                })
            } else {
                getProduct()
            }
        }, 300);

        return () => clearTimeout(delay)
    }, [text]);

    // step 2 search by category
    const handleCheck = (e) => {
        // logic
        console.log(e.target.value)
        const categoryInCheck = e.target.value
        const inState = [...selectedCategorise]

        const findCheck = inState.indexOf(categoryInCheck)

        if (findCheck === -1) {
            inState.push(categoryInCheck)
        } else {
            inState.splice(findCheck, 1)
        }

        setSelectedCategorise(inState)

        if (inState.length > 0) {
            getProductByFilter({ category: inState })
        } else {
            getProduct()
        }
    }

    // step 3 search by price
    useEffect(() => {
        getProductByFilter({ price: prices })
    }, [ok])
    const handlePrice = (value) => {
        setPrices(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    // on compoment render
    useEffect(() => {
        getCategory()
    }, []);

    return (
        <div>
            <Typography className='text-xl font-bold mb-4'>Search Product</Typography>

            {/* search by text */}
            <Input
                onChange={(e) => setText(e.target.value)}
                label="Search Product..."
                className='border rounded-md w-full mb-4 px-2'
                type='text'
            />

            <hr />

            {/* search by price*/}
            <div className="w-full my-4">
                {/* slider */}
                <Typography className='font-bold'>Search by price</Typography>
                <div>
                    <div className='flex justify-between'>
                        <Typography className='text-sm'>Min : {convertToCurrency(prices[0])}</Typography>
                        <Typography className='text-sm'>Max : {convertToCurrency(prices[1])}</Typography>
                    </div>
                    <Slider
                        onChange={handlePrice}
                        className='my-2'
                        range
                        min={0}
                        max={100000}
                        defaultValue={[1000, 30000]}
                    />
                </div>
            </div>

            <hr />

            <div>
                <Button onClick={toggleOpen} className='w-full flex justify-center items-center gap-2'>
                    <Typography className='text-sm'>Category Product</Typography>
                    {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </Button>

                <Collapse open={open}>
                    <Card className="my-4 mx-auto w-full">
                        <CardBody className='p-2'>
                            {
                                categories.map((category, index) =>
                                    <div key={index} className='flex gap-2'>
                                        <Checkbox
                                            onChange={handleCheck}
                                            label={category.name}
                                            value={category.id}
                                        />
                                    </div>
                                )
                            }
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        </div>
    )
}

export default SearchCard