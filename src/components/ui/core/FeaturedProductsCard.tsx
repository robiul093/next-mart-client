
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
import Link from "next/link"

export function ProductCard({ product }: { product: IProduct }) {
    return (
        <Card className="">
            <CardHeader>
                <Image
                    width={300}
                    height={200}
                    src={product?.imageUrls?.[0] ||
                        'https://cdn3.iconfinder.com/data/icons/it-and-user-interface/48/default-image_icon-64.png'} alt="Featured Product"
                    className="w-full object-cover aspect-[6/4]"
                />
            </CardHeader>
            <CardContent className="flex-grow">
                <Link href={`/products/${product?._id}`}>
                    <CardTitle className="">{product?.name.length > 18 ? product?.name.slice(0, 15) + '...' : product?.name}</CardTitle>
                </Link>
                <div className="flex justify-between items-center mt-2">
                    <div>
                        {
                            product?.offerPrice ? (
                                <div className="flex gap-2 items-center">
                                    <span className="font-semibold text-orange-400"> ${product?.offerPrice.toFixed(2)}</span>
                                    <del><p className="text-xs font-semibold">${product?.price.toFixed(2)}</p></del>
                                </div>
                            ) : (<p>${product?.price.toFixed(2)}</p>)
                        }
                    </div>
                    <p className="flex justify-center items-center gap-2"><Star className="text-yellow-600" />5.00</p>
                </div>
                <div className="flex justify-between items-center mt-4 mb-2">
                    <Button variant={"outline"} className="rounded-full font-medium w-full mr-3">Add to cart</Button>
                    <Button variant={"outline"} className="rounded-full font-medium"><Heart /></Button>
                </div>
                <Button variant={"outline"} className="w-full text-primary rounded-full hover:bg-primary hover:text-white">Buy Now</Button>
            </CardContent>
        </Card>
    )
}
