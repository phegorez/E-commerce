import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    IconButton
} from '@material-tailwind/react'
import { Minus, Plus, Trash2, XCircle } from 'lucide-react'
import useEcomStore from '../../stores/ecom-store'

const CartCard = () => {

    //Globals state
    const carts = useEcomStore((state) => state.carts)

    //Global Functions
    const totalPrice = useEcomStore((state) => state.getTotalPrice)
    const convertToCurrency = useEcomStore((state) => state.convertToCurrency)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProductFromCart = useEcomStore((state) => state.actionRemoveProductFromCart)

    // component state
    const [fee, setFee] = useState(50)

    return (
        <div>
            <Typography className='text-2xl font-bold'>Cart</Typography>
            {/* border */}

            {carts.map((cartProduct, index) =>
                <Card className="my-2 w-full relative p-2" key={index}>
                    <CardBody>
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <img src={cartProduct.images[0].url} alt="cart-image" className='rounded-md w-16 h-16 object-fit border' />
                                <div>
                                    <Typography color="blue-gray" className="text-md font-medium">{cartProduct.title}</Typography>
                                    <Typography color="blue-gray" className="text-sm font-medium">{cartProduct.description}</Typography>
                                </div>
                            </div>
                        </div>
                        <XCircle
                            onClick={() => actionRemoveProductFromCart(cartProduct.id)}
                            color='gray'
                            size='20'
                            className='cursor-pointer absolute top-2 right-2'
                        />
                    </CardBody>
                    <CardFooter className="pt-0 w-full flex items-center justify-between">

                        <div className='flex items-center gap-2'>
                            <IconButton
                                size='sm'
                                className='h-10'
                                onClick={() => actionUpdateQuantity(cartProduct.id, cartProduct.count - 1)}
                            >
                                <Minus size={10} />
                            </IconButton>
                            <input
                                type="number"
                                className='border p-1 rounded-md w-12 text-center'
                                value={cartProduct.count}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            <IconButton
                                size='sm'
                                className='h-10'
                                onClick={() => actionUpdateQuantity(cartProduct.id, cartProduct.count + 1)}
                            >
                                <Plus size={10} />
                            </IconButton>
                        </div>
                        <Typography>{convertToCurrency(cartProduct.price)}</Typography>
                    </CardFooter>
                </Card>
            )}

            <div className='flex justify-between my-4'>
                <Typography className=''>Delivery Fee</Typography>
                <Typography className=''>{convertToCurrency(fee)}</Typography>
            </div>
            <div className='flex justify-between my-4'>
                <Typography className=''>Total</Typography>
                <Typography className=''>{convertToCurrency(totalPrice() + fee)}</Typography>
            </div>
            <Button className='w-full'>Place order</Button>
        </div>
    )
}

export default CartCard