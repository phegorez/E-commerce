import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from '@material-tailwind/react'
import { ShoppingCart } from 'lucide-react'
import useEcomStore from '../../stores/ecom-store'
const ProductCard = ({ product }) => {

    // Global functions
    const actionAddToCart = useEcomStore((state) => state.actionAddToCart)
    const convertToCurrency = useEcomStore((state) => state.convertToCurrency)
    return (
        <Card className="w-52">
            <CardHeader shadow={false} floated={false} className="rounded-xl h-full transition-all hover:scale-110">
                {
                    product.images.length > 0
                        ? <img
                            className='w-full h-full object-cover rounded-lg shadow-md'
                            src={product.images[0].url}
                        />
                        : <img
                            className='rounded-lg shadow-md'
                            src='https://placehold.co/96'
                        />
                }
            </CardHeader>
            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                        {product.title}
                    </Typography>
                </div>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                >
                    {product.description}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    onClick={() => actionAddToCart(product)}
                    ripple={false}
                    fullWidth={true}
                    className="flex items-center justify-center gap-2 bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    <ShoppingCart />
                    <Typography className='font-bold text-[10px]'>{convertToCurrency(product.price)}</Typography>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard