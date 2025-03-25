
import CategoryCard from '@/components/ui/core/CategoryCard';
import SectionHeader from '@/components/ui/core/SectionHeader';
import { getAllCategories } from '@/services/Category'
import { ICategory } from '@/types';
import { useEffect, useState } from 'react'

export default function Category() {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getCategory = async () => {
            const { data } = await getAllCategories();
            setCategories(data)
        };

        getCategory();
    }, []);
    return (
        <div className='my-20 container mx-auto'>
            <SectionHeader title='Category' button='View All' />
            <div className='grid md:grid-cols-6 gap-8 mt-8'>
                {
                    categories?.map((category: ICategory, idx: number) => <CategoryCard key={idx} category={category} />)
                }
            </div>
        </div>
    )
}
