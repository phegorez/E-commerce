import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Spinner
} from "@material-tailwind/react";
import useEcomStoreTemp from '../../stores/non-persist/ecom-store'
import useEcomStore from '../../stores/ecom-store'
import { deleteProduct } from '../../api/product';
import { toast } from 'react-toastify'
import { LoaderCircle } from 'lucide-react';


const initialState = {
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: null,
    images: []
}

const ConfirmDialog = ({ openModal, setOpenModal, handleModalOpen, getProductCount }) => {

    // Initial Global State
    // Persistance
    const token = useEcomStore((state) => state.token)

    const getProducts = useEcomStore((state) => state.getProducts)

    // Temp
    const product = useEcomStoreTemp((state) => state.product)

    const [selectedProduct, setSelectedProduct] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirmDelete = async (productId) => {
        setIsLoading(true)
        // console.log(`Delete product ${productId}`)
        try {
            // logic
            const res = await deleteProduct(token, productId)
            console.log(res)
            setOpenModal(!openModal)
            getProducts(getProductCount)
            toast.error('Delete product successfully')
            setIsLoading(false)
        } catch (err) {
            console.error(err)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (product) {
            setSelectedProduct((prevSelectedProduct) => ({
                ...prevSelectedProduct,
                ...product
            }))
        }
    }, [product])

    return (
        <Dialog open={openModal} handler={handleModalOpen}>
            {
                isLoading
                    ? <div className='flex items-center justify-center gap-4 h-52'>
                        <Spinner className="h-12 w-12" />
                        <Typography>Deleting...</Typography>
                    </div>
                    : <div>
                        <DialogHeader>Are you need to delete? {selectedProduct.title}</DialogHeader>
                        <DialogBody>
                            {
                                isLoading
                                    ? <div className='flex items-center justify-center gap-4'>
                                        <LoaderCircle className='w-12 h-12 animate-spin' />
                                        <Typography>Deleting</Typography>
                                    </div>
                                    : <Typography>If you sure to delete please click confirm</Typography>
                            }
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => setOpenModal(!openModal)}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" onClick={() => handleConfirmDelete(selectedProduct.id)}>
                                <span>Confirm</span>
                            </Button>
                        </DialogFooter>
                    </div>
            }
        </Dialog>
    )
}

export default ConfirmDialog