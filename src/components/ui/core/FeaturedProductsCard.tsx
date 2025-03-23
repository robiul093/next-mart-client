
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { IProduct } from "@/types"
import { Heart, Star } from "lucide-react"
import Image from "next/image"

export function ProductCard({ product }: { product: IProduct }) {
    return (
        <Card className="">
            <CardHeader>
                <Image width={300} height={200} src={product?.imageUrls?.[0] || 'https://cdn3.iconfinder.com/data/icons/it-and-user-interface/48/default-image_icon-64.png'} alt="Featured Product" />
            </CardHeader>
            <CardContent>
                <CardTitle className="">Create project</CardTitle>
                <div className="flex justify-between items-center mt-2">
                    <p>Price: ${product?.price}</p>
                    <p className="flex justify-center items-center gap-2"><Star className="text-yellow-600" />5.00</p>
                </div>
                <div className="flex justify-between items-center mt-4 mb-2">
                    <Button variant={"outline"} className="rounded-full font-medium w-full mr-3">Add to cart</Button>
                    <Button variant={"outline"} className="rounded-full font-medium"><Heart /></Button>
                </div>
                <Button className="w-full">Buy Now</Button>
            </CardContent>
        </Card>
    )
}
