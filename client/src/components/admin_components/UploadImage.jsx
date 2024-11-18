import React, { useState } from 'react'
import { Input, Spinner } from "@material-tailwind/react"
import { toast } from 'react-toastify'
import Resizer from "react-image-file-resizer"
import { uploadFile, removeFile } from '../../api/product'
import useEcomStore from '../../stores/ecom-store'
import { CircleX, LoaderCircle } from 'lucide-react';

const UploadImage = ({ form, setForm }) => {

    // component state
    const [isLoading, setIsLoading] = useState(false)
    // const [uploadFile, setUpLoadFile ] = useState(null)

    // global state
    const token = useEcomStore((state) => state.token)

    // logic
    const handleOnChange = (e) => {
        // logic
        setIsLoading(true)
        const files = Array.from(e.target.files)
        if (files) {
            setIsLoading(true)
            let allFiles = form.images // empty array []

            for (let file of files) {
                // console.log(file)

                //validate file
                const fileType = file.type
                if (!fileType.includes('image')) {
                    toast.error(`File ${file.name} is not image`)
                    continue
                }
                // image resize
                Resizer.imageFileResizer(
                    file,
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    async (data) => {
                        // endpoint backend
                        try {
                            const res = await uploadFile(token, data)
                            toast.success('Uploaded image Successfully')
                            allFiles.push(res.data)
                            setForm((prevForm) => ({
                                ...prevForm,
                                images: allFiles
                            }))
                            setIsLoading(false)
                            // console.log(res)
                        } catch (err) {
                            console.error(err)
                            setIsLoading(false)
                        }
                        // uploadFile(token, data)
                        // .then((res) => {
                        //     console.log(res)
                        // })
                        // .catch((err) => {
                        //     console.log(err)
                        // })
                    },
                    'base64'
                )
            }
        }
    }

    const handleRemove = async (public_id) => {
        // console.log(public_id)
        setIsLoading(true)
        const images = form.images
        try {
            const res = await removeFile(token, public_id)
            // console.log(res)
            const filterImages = images.filter((image, index) => {
                // console.log(image)
                return image.public_id !== public_id
            })
            // console.log(filterImages)
            setForm((prevForm) => ({
                ...prevForm,
                images: filterImages
            }))
            setIsLoading(false)
            toast.error(res.data.message)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    // console.log(form)
    // console.log(form.images)

    return (
        <div className='my-4'>

            <div className='mx-4 my-4'>

                {
                    isLoading
                        ? <Spinner className="h-12 w-12" />
                        : <div className='flex gap-4 '>
                            {/* Image */}
                            {form.images.map((image, index) => (
                                <div key={index} className='relative'>
                                    <img
                                        className='w-36 h-36 hover:scale-105'
                                        src={image.url}
                                        alt="uploadedImage"
                                    />
                                    <div
                                        className='absolute top-0 right-0 bg-red-500 hover:bg-red-300 p-1 rounded-md cursor-pointer'
                                        onClick={() => handleRemove(image.public_id)}
                                    >
                                        <CircleX color='white' width={14} height={14} />
                                    </div>
                                </div>

                            ))}
                        </div>
                }


            </div>

            <div>
                <Input
                    label="Product Image"
                    type='file'
                    name='images'
                    multiple
                    onChange={handleOnChange}
                />
            </div>


        </div>
    )
}

export default UploadImage