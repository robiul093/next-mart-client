'use client'

import React from 'react'
import { CreateBrandModal } from './CreateBrandModal'
import { NMTable } from '@/components/ui/core/NMTable';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { IBrand } from '@/types';

export default function ManageBrands({ brands }: { brands: IBrand }) {
    console.log('props => ', brands);
    const handleDelete = async (brand: IBrand) => {

    }

    const columns: ColumnDef<IBrand>[] = [
        {
            accessorKey: "name",
            header: () => <div>Category Name</div>,
            cell: ({ row }) => (
                <div>
                    <Image
                        src={row.original?.logo}
                        alt={row.original.name}
                        width={40}
                        height={40}
                        className='w-8 h-8 rounded-full'
                    />
                    <span>{row.original.name}</span>
                </div>
            )
        },
        {
            accessorKey: 'isActive',
            header: () => <div>isActive</div>,
            cell: ({ row }) => {
                <div>
                    {row.original.isActive ? (
                        <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">True</p>
                    ) : (
                        <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">False</p>
                    )}
                </div>
            }
        },
        {
            accessorKey: "action",
            header: () => <div>Action</div>,
            cell: ({ row }) => (
                <button
                    className="text-red-500"
                    title="Delete"
                    onClick={() => handleDelete(row.original)}
                >
                    <Trash className="w-5 h-5" />
                </button>
            ),
        },
    ]

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg font-bold'>Manage Brands</h2>
                <CreateBrandModal />
            </div>

            <NMTable data={brands} columns={columns} />
        </div>
    )
}
