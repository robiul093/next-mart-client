import { ICategory } from "@/types";
import Image from "next/image";


export default function CategoryCard({ category }: { category: ICategory }) {
    return (
        <div className="bg-white opacity-60 rounded-xl border-2 border-white p-6">
            <div className="flex flex-col justify-center items-center">
                <Image
                    width={100}
                    height={100}
                    src={category?.icon ||
                        'https://cdn3.iconfinder.com/data/icons/it-and-user-interface/48/default-image_icon-64.png'} alt="Category img"
                    className="w-full object-cover aspect-[4/3]"
                />
                <p className="text-sm mt-3 text-[#0F0E0E]">{category?.name}</p>
            </div>
        </div>
    )
}
