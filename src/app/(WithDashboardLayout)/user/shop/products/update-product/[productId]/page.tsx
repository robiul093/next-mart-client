import UpdateProductForm from "@/components/modules/shop/products/UpdateProductForm";
import { getSingleProduct } from "@/services/Product";

export default async function UpdateProductPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const { data } = await getSingleProduct(productId);
    console.log(productId, data);
    return (
        <div>
            <UpdateProductForm product={data} />
        </div>
    )
}
