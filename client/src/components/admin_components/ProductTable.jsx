import React, { useState } from 'react'
import { CircleX, Edit, PackageOpen } from 'lucide-react';
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom'


const tableHeader = ['#', 'Image', 'Title', 'Description', 'Category', 'Price (฿)', 'Quantity', 'Sold', 'Updated At', 'Action']

const ProductTable = ({ products, convertToCurrency, handleModalOpen }) => {

    return (
        <Card className="h-full w-full overflow-scroll">
            {products.length > 0
                ? <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {tableHeader.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            const isLast = index === products.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={product.id}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {
                                            product.images.length > 0
                                                ? <img
                                                    className='w-24 h-24 rounded-lg shadow-md'
                                                    src={product.images[0].url}
                                                />
                                                : <img
                                                    className='rounded-lg shadow-md'
                                                    src='https://placehold.co/96'
                                                />
                                        }
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {product.title}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {product.description}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal capitalize"
                                        >
                                            {product.category.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {convertToCurrency(product.price)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {product.quantity}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {product.sold}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {product.updatedAt}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className='flex flex-col gap-2 items-center'>
                                            <Link
                                                to={`/admin/product/${product.id}`}
                                                className="font-medium bg-light-blue-500 p-1 rounded"
                                            >
                                                <Edit color='white' />
                                            </Link>
                                            <Button
                                                onClick={() => handleModalOpen(product.id)}
                                                className="font-medium bg-red-500 p-1 rounded"
                                            >
                                                <CircleX color='white' />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                : <Card className='flex items-center justify-center gap-4 bg-gray-300 h-screen'>
                    <Typography className='text-white font-bold'>
                        Empty Products
                    </Typography>
                    <PackageOpen className=' w-24 h-24' color='white'/>
                </Card>
            }

        </Card>
    )
}

export default ProductTable