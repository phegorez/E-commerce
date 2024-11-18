import React, { useEffect, useState } from 'react'
import { createCategory, listCategory, deleteCategory } from '../../api/category'
import useEcomStore from '../../stores/ecom-store'
import { toast } from 'react-toastify';
import { CircleX,CirclePlus  } from 'lucide-react';
import { Input, List, ListItem, Typography } from "@material-tailwind/react";

const FormCategory = () => {
    // logic
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    // const [categories, setCategories] = useState([])

    const categories = useEcomStore((state) => state.categories)
    const getCategories = useEcomStore((state) => state.getCategories)

    const handleSubmit = async (e) => {
        // logic
        e.preventDefault()

        if (!name) {
            toast.warning('Please fill in the form')
            return false
        }

        try {
            const res = await createCategory(token, { name })
            toast.success(`Add category ${res.data.category?.name} successful`)
            getCategories()
            setName('')
        } catch (err) {
            console.log(err.response)
            toast.error(err.response.data.message)
        }
    }

    const handleDelete = async (id) => {
        // logic
        try {
            await deleteCategory(token, id)
            toast.success('Delete Success')
            getCategories()
        } catch (err) {
            console.log(err.response)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <Typography>Category Management</Typography>
            <form className='my-4 flex justify-between gap-2' onSubmit={handleSubmit}>
                <Input
                    onChange={(e) => setName((prevName) => prevName = e.target.value)}
                    type="text"
                    className='border w-full'
                    value={name}
                    label="Add category"
                />
                <button
                    type='submit'
                    className='bg-green-400 hover:bg-green-500 rounded text-white p-2'
                >
                    <CirclePlus />
                </button>
            </form>
            <hr />

            <ul className='list-none'>
                {
                    categories.map((category, index) =>
                        <li
                            className='flex items-center justify-between my-2'
                            key={index}
                        >
                            <span className='capitalize font-bold flex items-center gap-2'>
                                <h1>{category.name}</h1>
                                <h2 className='text-sm text-gray-300'>#{category.id}</h2>
                            </span>

                            <button
                                onClick={() => handleDelete(category.id)}
                                className='bg-red-400 hover:bg-red-500 p-2 rounded'
                            >
                                <CircleX color='white' />
                            </button>
                        </li>
                    )
                }

            </ul>
        </div>
    )
}

export default FormCategory