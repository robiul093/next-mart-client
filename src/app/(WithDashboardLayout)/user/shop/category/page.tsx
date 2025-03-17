import ManageCategories from '@/components/modules/shop/category'
import { getAllCategory } from '@/services/Category'

export default async function ProductCategoryPage() {

    const { data } = await getAllCategory();

    return (
        <div>
            <ManageCategories categories={data} />

            <div>

            </div>
        </div>
    )
}
