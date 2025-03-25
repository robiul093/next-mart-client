import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import { getAllCategories } from "@/services/Category";
import { getAllProducts } from "@/services/Product";
import { ICategory } from "@/types";

export default async function AllProductsPage() {

    const { data: categories } = await getAllCategories();
    const { data: products } = await getAllProducts();
    console.log(products);

    return (
        <div className="bg-[#0F0E0E0D]">
            <div className="container mx-auto py-10">
                <ProductBanner title="All Products" path="Home - Shop" />
                <h2 className="text-[#0F0E0E] text-2xl font-extrabold mt-8">Featured Collection</h2>

                <div className='grid md:grid-cols-6 gap-8 mt-8'>
                    {
                        categories?.map((category: ICategory, idx: number) => <CategoryCard key={idx} category={category} />)
                    }
                </div>

                <div>
                    <AllProducts products={products} />
                </div>
            </div>
        </div>
    )
}
