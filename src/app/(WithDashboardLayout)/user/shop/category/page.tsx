import ManageCategories from '@/components/modules/shop/category'
import { getAllCategories } from '@/services/Category'

export default async function ProductCategoryPage() {

    const { data } = await getAllCategories();

    return (
        <div>
            <ManageCategories categories={data} />
        </div>
    )
}
