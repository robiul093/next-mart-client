
import { ProductCard } from '@/components/ui/core/FeaturedProductsCard'
import SectionHeader from '@/components/ui/core/SectionHeader'
import { getAllProducts } from '@/services/Product'
import { IProduct } from '@/types';
import { useEffect, useState } from 'react'

export default function FeaturedProduct() {

    const [products, setProducts] = useState();

    useEffect(() => {
        const getFeaturedProduct = async () => {
            const { data } = await getAllProducts();
            setProducts(data)
        };
        getFeaturedProduct();
    }, [])

    return (
        <div className='bg-[#FFFFFF99] py-20'>
            <div className='container mx-auto'>
                <SectionHeader title="Fratured Products" button='All Collection' />
                <div className='flex justify-between gap-4 mt-10'>
                    {Array(4).fill(products?.[0]).map((product: IProduct, idx: number) => <ProductCard key={idx} product={product} />)}
                </div>
            </div>
        </div>
    )
}
