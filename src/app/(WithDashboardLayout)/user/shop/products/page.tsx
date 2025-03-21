import ManageProducts from '@/components/modules/shop/products'
import { getAllProducts } from '@/services/Product'
import React from 'react'

export default async function ManageProductsPage() {

  const { data } = await getAllProducts();

  return (
    <div>
      <ManageProducts products={data} />
    </div>
  )
}
