import ProductBanner from "@/components/modules/products/banner";
import ProductDetails from "@/components/modules/products/productsDetails";
import { getSingleProduct } from "@/services/Product"

export default async function ProductDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params
    const { data: product } = await getSingleProduct(productId);

    return (
        <div className="bg-[#0F0E0E0D]">
            <div className="container mx-auto py-10">
                <ProductBanner title="Product Details" path="Home - Shop - Product Details" />
                <ProductDetails product={product} />
            </div>
        </div>
    )
}
