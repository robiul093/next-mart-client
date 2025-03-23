'use client'

import { Button } from "../button"


export default function SectionHeader({ title, button }: { title: string, button: string }) {
    return (
        <div className='flex justify-between items-center container mx-auto'>
            <h2 className='text-3xl font-bold text-[#0F0E0E] capitalize'>{title}</h2>
            <Button variant={'outline'} className='text-lg font-medium rounded-full capitalize border border-[#0F0E0E1A]'> {button} </Button>
        </div>
    )
}
