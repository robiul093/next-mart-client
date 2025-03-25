'use client'

import { deletCategory } from '@/services/Category';
import CreateCategoryModal from './CreateCategoryModal'
import { NMTable } from '@/components/ui/core/NMTable'
import { ICategory } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

type TCategoriesProps = {
    categories: ICategory[];
}

export default function ManageCategories({ categories }: TCategoriesProps) {

    const handleDelete = async (data: ICategory) => {
        
        try {
            const res = await deletCategory(data._id)
            // console.log(res);

            if (res.success) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        } catch (err: any) {
            console.error(err.message)
        }
    }

    const columns: ColumnDef<ICategory>[] = [
        {
            accessorKey: "name",
            header: () => <div>Category Name</div>,
            cell: ({ row }) => (
                <div>
                    <Image
                        src={row.original?.icon}
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
                <h2 className='font-bold'>Manage Categories</h2>
                <CreateCategoryModal />
            </div>
            <NMTable data={categories} columns={columns} />
        </div>
    )
}
