'use client'

import { Button } from '@/components/ui/button'
import { NMTable } from '@/components/ui/core/NMTable'
import { IProduct } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Edit, Eye, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function ManageProducts({ products }: { products: IProduct[] }) {
    const router = useRouter()
    console.log(products);
    const columns: ColumnDef<IProduct>[] = [
        {
            accessorKey: "name",
            header: () => <div>Product Name</div>,
            cell: ({ row }) => (<div className='flex items-center space-x-3'>
                <Image

                    src={row.original?.imageUrls[0]}
                    alt={row.original.name}
                    width={40}
                    height={40}
                    className='w-8 h-8 rounded-full'
                />
                <p>{row?.original?.name}</p>
            </div>)
        },
        {
            accessorKey: "category",
            header: () => <div>Category</div>,
            cell: ({ row }) => (<div>
                <span>{row?.original?.category?.name}</span>
            </div>)
        },
        {
            accessorKey: "brand",
            header: () => <div>Brand</div>,
            cell: ({ row }) => (<div>
                <span>{row?.original?.brand?.name}</span>
            </div>)
        },
        {
            accessorKey: "stock",
            header: () => <div>Stock</div>,
            cell: ({ row }) => (<span>{row?.original?.stock}</span>)
        },
        {
            accessorKey: "price",
            header: () => <div>Price</div>,
            cell: ({ row }) => <span>{row?.original?.price}</span>
        },
        {
            accessorKey: 'null',
            header: () => <div>Action</div>,
            cell: ({ row }) => <div className='flex space-x-3'>
                <button title='view' className='text-gray-500 hover:text-blue-500'>
                    <Eye className='w-5 h-5' />
                </button>
                <Link href={`/user/shop/products/update-product/${row?.original?._id}`} title='view' className='text-gray-500 hover:text-blue-500'>
                    <Edit className='w-5 h-5' />
                </Link>
                <button title='view' className='text-gray-500 hover:text-red-500'>
                    <Trash2 className='w-5 h-5' />
                </button>
            </div>
        }
    ]
    return (
        <div>
            <div className='flex justify-between items-center my-5'>
                <h2>Manage Products</h2>
                <Button onClick={() => router.push(`/user/shop/products/add-product`)}>Add Product <Plus /></Button>
            </div>

            <div>
                <NMTable data={products} columns={columns} />
            </div>
        </div>
    )
}
