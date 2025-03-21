import ManageBrands from '@/components/modules/shop/brand'
import { getAllBrands } from '@/services/Brand'
import React from 'react'

export default async function ProductBrandPage() {
    const { data } = await getAllBrands();
    
    return (
        <div>
            <ManageBrands brands={data} />
        </div>
    )
}
