'use client'

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const FilterSidebar = () => {
    const [price, setPrice] = useState([50]);
    const ratings = [5, 4, 3, 2, 1];

    return (
        <aside className="w-64 p-4 bg-white shadow rounded-lg">
            {/* Price Filter */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Filter By Price</h3>
                <div className="flex gap-2 mb-2">
                    <input type="number" placeholder="Min" className="w-full p-1 border rounded" />
                    <input type="number" placeholder="Max" className="w-full p-1 border rounded" />
                </div>
                <Slider value={price} onValueChange={setPrice} max={1000} step={10} className="w-full mt-6 mb-2 cursor-pointer" />
                <p className="text-sm text-gray-500">${price}</p>
            </div>

            {/* Product Types */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Product Types</h3>
                {[
                    "Laptops & Accessories", "Computers & PC", "Speakers & Headset",
                    "Keyboards & Mouse", "Camera", "Video Recording",
                    "Tablets", "Table Lights"
                ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <Label htmlFor={type} className="text-sm cursor-pointer">{type}</Label>
                    </div>
                ))}
            </div>

            {/* Brands */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Brands</h3>
                {["HP (15)", "Apple (20)", "Dell (14)", "Asus (11)", "Camera"].map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <Label htmlFor={brand} className="text-sm cursor-pointer">{brand}</Label>
                    </div>
                ))}
            </div>

            {/* Ratings */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Rating</h3>
                {ratings.map((rating) => (
                    <div key={rating} className="flex items-center space-x-2 mb-1">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center text-sm cursor-pointer">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={14} className={i < rating ? "text-orange-400" : "text-gray-300"} />
                            ))}
                        </Label>
                    </div>
                ))}
            </div>

            {/* Availability */}
            <div>
                <h3 className="font-semibold mb-2">Availability</h3>
                {["In Stock", "Pre Order", "Upcoming"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                        <Checkbox id={status} />
                        <Label htmlFor={status} className="text-sm cursor-pointer">{status}</Label>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default FilterSidebar;
