import { Button } from '@/components/ui/button'
import { IProduct } from '@/types'
import { Star, StarIcon, StarsIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ProductDetails({ product }: { product: IProduct }) {
    return (
        <div className='grid md:grid-cols-2 gap-3 border-2 p-3 rounded-3xl my-8'>
            <div className='rounded-2xl px-3'>
                <div>
                    <Image
                        src={product?.imageUrls[0]}
                        width={500}
                        height={500}
                        alt='product image'
                        className='w-full' />
                </div>
                <div className='grid grid-cols-3 justify-between items-center mt-3'>
                    <div className=''>
                        <Image
                            src={product?.imageUrls[0]}
                            width={180}
                            height={180}
                            alt='product image' />
                    </div>
                    <div>
                        <Image
                            src={product?.imageUrls[0]}
                            width={180}
                            height={180}
                            alt='product image' />
                    </div>
                    <div>
                        <Image
                            src={product?.imageUrls[0]}
                            width={180}
                            height={180}
                            alt='product image' />
                    </div>
                </div>
            </div>

            {/* details content */}
            <div className='border-2 bg-white p-8 rounded-3xl'>
                <h2>{product?.name}</h2>
                <p>{product?.description}</p>
                <div className='flex justify-between items-center text-[14px] my-4'>
                    <p className='flex items-center gap-2 bg-[#1F1F1F0D] rounded-full px-4 py-2'>
                        <Star className='fill-yellow-400' />
                        {product?.ratingCount}
                        <span>Rating</span>
                    </p>
                    <p className='bg-[#1F1F1F0D] rounded-full px-4 py-2'>(720+ Reviews)</p>
                    <p className='bg-[#1F1F1F0D] rounded-full px-4 py-2'>1092+ Sold</p>
                    <p className='bg-[#1F1F1F0D] rounded-full px-4 py-2'>Brand: Apple</p>
                </div>

                <div>
                    {
                        product?.offerPrice ? (<div className='flex gap-5 items-center  border-y py-3'>
                            <p className='text-lg font-semibold'>
                                Price: {product?.offerPrice} $
                            </p>
                            <del><p className='font-semibold text-yellow-400'>
                                Price: {product?.price} $
                            </p></del>
                        </div>
                        ) : (
                            <p className='text-lg font-semibold'>
                                Price: {product?.price} $
                            </p>
                        )
                    }
                </div>

                <div className='flex justify-between items-center my-4'>
                    <p>Quantaty: - 3 + </p>
                    <p>Stock Abailable: {product?.stock}</p>
                </div>

                <div>
                    <Button variant={'outline'} className='w-full rounded-full mt-5'>Add to cart</Button>
                </div>
                <div>
                    <Button className='w-full rounded-full mt-3 mb-4'>Add to cart</Button>
                </div>

                <div>
                    <p className='text-center mt-5'>Any problem with this products? <span className='font-semibold'>Report Products</span></p>
                </div>
            </div>
        </div>
    )
}
