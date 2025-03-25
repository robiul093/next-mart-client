import { ProductCard } from '@/components/ui/core/FeaturedProductsCard'
import { IProduct } from '@/types'
import React from 'react'
import FilterSidebar from './filterSidebar'

export default function AllProducts({ products }: { products: IProduct[] }) {
    return (
        <div className='flex gap-8 mt-10'>
            <div className='w-[20%]'>
                <FilterSidebar />
            </div>
            <div className='w-[80%]'>
                <div className='grid md:grid-cols-3 gap-8'>
                    {products?.map((product: IProduct, idx: number) => <ProductCard key={idx} product={product} />)}
                </div>
            </div>
        </div>
    )
}
