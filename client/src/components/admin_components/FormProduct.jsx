import React, { useState, useEffect } from 'react'
import useEcomStore from '../../stores/ecom-store'
import useEcomStoreTemp from '../../stores/non-persist/ecom-store'
import { toast } from 'react-toastify'
import { createProduct } from '../../api/product'
import { CirclePlus, CircleX, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { Input, Select, Option, Button, Card, Collapse, Typography } from "@material-tailwind/react";
import UploadImage from './uploadImage';
import { Link } from 'react-router-dom'
import ProductTable from './ProductTable';
import ConfirmDialog from './ConfirmDialog';

const initialState = {
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: null,
    images: []
}

const tableHeader = ['#', 'Image', 'Title', 'Description', 'Category', 'Price (฿)', 'Quantity', 'Sold', 'Updated At', 'Action']


const FormProduct = () => {

    // initialize global state
    // persistent
    const token = useEcomStore((state) => state.token)
    const categories = useEcomStore((state) => state.categories)
    const products = useEcomStore((state) => state.allProduct)


    // function
    const getCategories = useEcomStore((state) => state.getCategories)
    const getProducts = useEcomStore((state) => state.getProducts)
    const convertToCurrency = useEcomStore((state) => state.convertToCurrency)
    const getProductById = useEcomStoreTemp((state) => state.getProductById)


    // console.log(products)

    // component state
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        categoryId: null,
        images: []
    })
    const [getProductCount, setProductCount] = useState(20)

    //Modal Controller
    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = async (productId) => {
        await getProductById(token, productId)
        setOpenModal(!openModal)
    }

    //Collapse Controller
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);

    const handleOnchange = (e) => {
        // console.log(e.target.name, e.target.value)

        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectionChange = (categoryId) => {
        setForm((prevForm) => ({
            ...prevForm,
            categoryId: categoryId
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // validate form
        if (formValidate()) {
            // console.log(form)

            try {
                const res = await createProduct(token, form)
                // console.log(res)
                toast.success(`Added ${res.data.title} Successfully`)
                getProducts(getProductCount)
            } catch (err) {
                console.error(err)
            }

            // clear form
            setForm(initialState)
        }

    }

    const formValidate = () => {
        let isValid = true

        if (!form.title) {
            toast.warning('Title is required')
            isValid = false
        }

        if (!form.description) {
            toast.warning('Description is required')
            isValid = false
        }

        if (!form.price) {
            toast.warning('Price is required')
            isValid = false
        }

        if (!form.quantity) {
            toast.warning('Quantity is required')
            isValid = false
        }

        if (!form.categoryId === null) {
            toast.warning('Category is required')
            isValid = false
        }

        return isValid
    }

    useEffect(() => {
        // logic
        getCategories()
        getProducts(getProductCount)
    }, [getProductCount])
    // console.log('products', products)


    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div className='flex items-center justify-between'>
                <Typography className='font-bold'>Product Management</Typography>
                <Button onClick={toggleOpen} className='flex items-center gap-2'>
                    <p>Add new product</p>
                    {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </Button>
            </div>
            <Collapse open={open}>
                <form onSubmit={handleSubmit} id='myForm'>
                    <div className='flex flex-col gap-4 mt-2'>
                        <Input
                            value={form.title}
                            onChange={handleOnchange}
                            type='text'
                            name='title'
                            className='border w-full'
                            label='Title'
                        />
                        <Input
                            value={form.description}
                            onChange={handleOnchange}
                            type='text'
                            name='description'
                            className='border w-full'
                            label='Description'
                        />
                        <Input
                            value={form.price}
                            onChange={handleOnchange}
                            type='number'
                            name='price'
                            className='border w-full'
                            label='Price'
                        />
                        <Input
                            value={form.quantity}
                            onChange={handleOnchange}
                            type='number'
                            name='quantity'
                            className='border w-full'
                            label='Quantity'
                        />

                        <Select label='Select Category' className='border capitalize' selected={(element) => {
                            if (element) {
                                // const selectedValue = element.props.value;
                                // console.log('Selected Value:', selectedValue);
                                return element.props.name;
                            }
                        }
                        }
                            onChange={handleSelectionChange}
                            animate={{
                                mount: { y: -0 },
                                unmount: { y: -125 },
                            }}
                        >
                            {categories.map((category) => (
                                <Option
                                    key={category.id}
                                    className='capitalize'
                                    value={category.id.toLocaleString()}
                                    name={category.name}
                                >
                                    {category.name}
                                </Option>
                            ))}
                        </Select>

                        {/* upload image */}
                        <UploadImage form={form} setForm={setForm} />

                        <Button
                            className='bg-green-500 flex items-center justify-center gap-2'
                            type='submit'
                        >
                            <CirclePlus />
                            <Typography>Add Product</Typography>
                        </Button>
                    </div>
                </form>
            </Collapse>

            <br />
            <hr />
            <br />

            <ProductTable products={products} convertToCurrency={convertToCurrency} handleModalOpen={handleModalOpen} />
            <ConfirmDialog openModal={openModal} setOpenModal={setOpenModal} handleModalOpen={handleModalOpen} getProductCount={getProductCount} />

        </div>
    )
}

export default FormProduct