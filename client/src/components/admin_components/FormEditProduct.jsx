import React, { useState, useEffect } from 'react'
import useEcomStore from '../../stores/ecom-store'
import { toast } from 'react-toastify'
import { readProduct, updateProduct } from '../../api/product'
import { CirclePlus } from 'lucide-react';
import { Input, Select, Option, Button, Typography } from "@material-tailwind/react";
import UploadImage from './uploadImage';
import { useParams, useNavigate } from 'react-router-dom'
import useEcomStoreTemp from '../../stores/non-persist/ecom-store';

const initialState = {
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: null,
    images: []
}

const FormEditProduct = () => {

    // initialize global state
    // persistance 
    const token = useEcomStore((state) => state.token)
    const categories = useEcomStore((state) => state.categories)
    const getCategories = useEcomStore((state) => state.getCategories)

    // temp
    const product = useEcomStoreTemp((state) => state.product)
    const getProductById = useEcomStoreTemp((state) => state.getProductById)

    // console.log(products)

    // component state
    const [form, setForm] = useState(initialState)

    const { id } = useParams()
    const navigate = useNavigate()

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
                const res = await updateProduct(token, id, form)
                // console.log(res)
                toast.success(`Update ${res.data.title} Successfully`)
                navigate('/admin/product')
            } catch (err) {
                console.error(err)
            }
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
    }, [])

    useEffect(() => {
        // logic
        getProductById(token, id)
    }, [token, id])

    useEffect(() => {
        // logic
        if (product) {
            setForm((prevForm) => ({ ...prevForm, ...product }));
        }
    }, [product])

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div className='flex items-center justify-between'>
                <Typography className='font-bold'>Product Management</Typography>
            </div>
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
                            const selectedValue = element.props.value;
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
                        className='bg-blue-500 flex items-center justify-center gap-2'
                        type='submit'
                    >
                        <CirclePlus />
                        <Typography className='font-bold'>Update Product</Typography>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FormEditProduct