'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { NMTable } from '@/components/ui/core/NMTable'
import { IProduct } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Edit, Eye, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import DiscountModal from './DiscountModal'


export default function ManageProducts({ products }: { products: IProduct[] }) {
    const router = useRouter();
    const [selectProducts, setSelectProducts] = useState<string[] | []>([]);
    console.log(selectProducts);

    const columns: ColumnDef<IProduct>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value)
                        if (value) {
                            setSelectProducts((pre) => [...pre, row?.original?._id])
                        }
                        else {
                            setSelectProducts(selectProducts.filter(id => id !== row.original._id))
                        }
                    }}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,

        },
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
            cell: ({ row }) => <span>{`${row?.original?.price} $`}</span>
        },
        {
            accessorKey: "offerPrice",
            header: () => <div>Offer Price</div>,
            cell: ({ row }) => <span>{row?.original?.offerPrice || "0"}</span>
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
                <div className='flex justify-between items-center gap-3'>
                    <DiscountModal selectProducts={selectProducts} setSelectProducts={setSelectProducts}/>
                    <Button onClick={() => router.push(`/user/shop/products/add-product`)}>Add Product <Plus /></Button>
                </div>
            </div>

            <div>
                <NMTable data={products} columns={columns} />
            </div>
        </div>
    )
}
