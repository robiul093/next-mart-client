import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/core/FeaturedProductsCard";
import { getAllFlashSell } from "@/services/FlashSell";
import { IProduct } from "@/types";
import { useEffect, useState } from "react";
import Countdown from "./CountDown";

export default function FlashSell() {

    const [flashProducts, setFlashProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const getFeaturedProduct = async () => {
            const { data } = await getAllFlashSell();
            setFlashProducts(data)
        };
        getFeaturedProduct();
    }, [])
    console.log(flashProducts);
    return (
        <div className="my-20 container mx-auto">
            <div className='flex justify-between items-center container mx-auto'>
                <div className="flex items-center gap-8">
                    <h2 className='text-3xl font-bold text-[#0F0E0E] capitalize'>Flash Deals</h2>
                    <Countdown />
                </div>
                <Button variant={'outline'} className='text-lg font-medium rounded-full capitalize border border-[#0F0E0E1A]'> All Collection </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 items-center justify-between gap-4 mt-10'>
                {flashProducts?.map((product: IProduct, idx: number) => <ProductCard key={idx} product={product} />)}
            </div>
        </div>
    )
}
