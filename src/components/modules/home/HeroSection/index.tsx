import { Button } from '@/components/ui/button'
import style from './HeroSection.module.css'
import cupImage from '../../../../app/assets/cup-with-headphone.png'
import Image from 'next/image'

export default function HeroSection() {
    return (
        <div className={`${style.banner} container mx-auto rounded-3xl border-2 border-white pt-6`}>
            <div className='grid grid-cols-2 gap-4 items-center mt-12'>
                <div className='pl-12'>
                    <h1 className='text-4xl text-[#0F0E0E] font-extrabold leading-snug'>
                        Don't Miss Out on <br />
                        These Unbeatable Black <br />
                        Friday Deals!
                    </h1>
                    <p className='text-lg text-[#0F0E0EB2] font-medium leading-normal my-5'>Save big this Black Friday with unbeatable deals on tech, home essentials, fashion, and more! Limited stock.</p>
                    <div className='flex gap-3'>
                        <Button className='rounded-full text-xl font-medium text-white/80'>Buy Now</Button>
                        <Button variant={'outline'} className='rounded-full text-xl font-medium'>All Products</Button>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <Image src={cupImage} alt='cupImage' />
                </div>
            </div>

        </div>
    )
}
