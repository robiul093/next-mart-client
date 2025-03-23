'use client'

import Logo from '@/app/assets/svgs/Logo'
import { Button } from '@/components/ui/button'
import NMImageUploader from '@/components/ui/core/NMImageUploader'
import ImagePreviewer from '@/components/ui/core/NMImageUploader/ImagePreviewer'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { getAllBrands } from '@/services/Brand'
import { getAllCategories } from '@/services/Category'
import { addProduct, UpdateProduct } from '@/services/Product'
import { IBrand, ICategory, IProduct } from '@/types'
import React, { useEffect, useState } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function UpdateProductForm({ product }: { product: IProduct }) {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const [categories, setCategories] = useState<ICategory[] | []>([]);
    const [brands, setBrands] = useState<IBrand[] | []>([]);

    const form = useForm({
        defaultValues: {
            name: product?.name || "",
            price: product?.price || "",
            category: product?.category || "",
            brand: product?.brand || "",
            stock: product?.stock || "",
            weight: product?.weight || "",
            description: product?.description || "",
            availableColors: product?.availableColors.map(color => ({ value: color })) || [{ value: '' }],
            keyFeatures: product?.keyFeatures.map(feature => ({ value: feature })) || [{ value: '' }],
            specification: Object.entries(product?.specification || {}).map(
                ([key, value]) => ({ key, value })
            ) || [{ key: "", value: "" }],
        }
    });



    const { formState: { isSubmitting } } = form;


    const { append: appendColors, fields: colorFields } = useFieldArray({
        control: form.control,
        name: 'availableColors'
    });
    const addColor = () => {
        appendColors({ value: '' })
    }


    const { append: appendFeatures, fields: featureFields } = useFieldArray({
        control: form.control,
        name: 'keyFeatures'
    });
    const addFeature = () => {
        appendFeatures({ value: "" })
    };


    const { append: appendSpec, fields: specFields } = useFieldArray({
        control: form.control,
        name: "specification"
    });
    const addSpec = () => {
        appendSpec({ key: "", value: "" })
    };


    useEffect(() => {
        const fetchData = async () => {
            const [categoriesData, brandsData] = await Promise.all([
                getAllCategories(),
                getAllBrands(),
            ]);

            setCategories(categoriesData.data);
            setBrands(brandsData.data);
        }


        fetchData();
    }, [])


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log('raw data => ', data);
        const availableColors = data.availableColors?.map((color: { value: string }) => color.value)
        const keyFeatures = data.keyFeatures?.map((feature: { value: string }) => feature.value)

        const specification: { [key: string]: string } = {};
        data.specification.forEach(
            (item: { key: string; value: string }) =>
                (specification[item.key] = item.value)
        );


        const modifiedData = {
            ...data,
            availableColors,
            keyFeatures,
            specification,
            price: parseFloat(data?.price),
            stock: parseInt(data?.stock),
            weight: parseFloat(data?.weight),
        };
        console.log('modified data => ', modifiedData);

        const formData = new FormData();
        formData.append("data", JSON.stringify(modifiedData))

        if (imageFiles.length === 0) {
            console.warn("No images found!");
        } else {
            for (const image of imageFiles) {
                console.log("Appending image:", image.name);
                formData.append("images", image);
            }
        }


        console.log('formData => ', formData);

        try {
            const res = await UpdateProduct(formData, product?._id);
            console.log(res);
            if (res.success) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        } catch (err: any) {
            console.error(err)
        }
    }

    return (
        <div className="border-2 bg-gray-300 rounded-2xl max-w-[60%] w-full mx-auto p-5 space-y-7">
            <div className="flex items-center space-x-4 ">
                <Logo />
                <h2 className='text-xl font-bold'>Update Product</h2>
            </div>
            {/* <Separator /> */}

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center border-t-2 border-b-2 py-3 my-5">
                        <p className="text-primary font-bold text-xl">Basic Information</p>
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-4'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-4'>
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.name}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                categories?.map(category => <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>)
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brands</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.name}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                brands?.map(category => <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>)
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-4'>
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weight</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="h-36"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <div className="flex justify-between items-center border-t border-b py-3 my-5">
                            <p className="text-primary font-bold text-xl">Images</p>
                        </div>
                        <div className="flex gap-4 ">
                            <NMImageUploader
                                setImageFiles={setImageFiles}
                                setImagePreview={setImagePreview}
                                label="Upload Image"
                                className="w-fit mt-0 bg-white rounded-md hover:bg-white/70"
                            />
                            <ImagePreviewer
                                className="flex flex-wrap gap-4"
                                setImageFiles={setImageFiles}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center border-t border-b py-3 my-5">
                            <p className="text-primary font-bold text-xl">Available Colors</p>
                            <Button type='button' onClick={addColor}>+</Button>
                        </div>

                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-4'>
                            {
                                colorFields?.map((colorsField, idx) => <div key={colorsField.id}>
                                    <FormField
                                        control={form.control}
                                        name={`availableColors.${idx}.value`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Color {idx + 1}</FormLabel>
                                                <FormControl>
                                                    <Input {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>)
                            }

                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center border-t border-b py-3 my-5">
                            <p className="text-primary font-bold text-xl">Key Features</p>
                            <Button type='button' onClick={addFeature}>+</Button>
                        </div>

                        {
                            featureFields?.map((featuresField, idx) => <div key={featuresField.id}>
                                <FormField
                                    control={form.control}
                                    name={`keyFeatures.${idx}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Key Features {idx + 1}</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>)
                        }
                    </div>

                    <div>
                        <div className="flex justify-between items-center border-t border-b py-3 my-5">
                            <p className="text-primary font-bold text-xl">Specification</p>
                            <Button type='button' onClick={addSpec}>+</Button>
                        </div>

                        {
                            specFields?.map((setImageFile, idx) => <div key={idx}>
                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-4'>
                                    <FormField
                                        control={form.control}
                                        name={`specification.${idx}.key`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Feature Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`specification.${idx}.value`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Feature Description</FormLabel>
                                                <FormControl>
                                                    <Input {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>)
                        }
                    </div>

                    <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
                        {isSubmitting ? "Product Updating..." : "Update Product"}
                    </Button>
                </form>
            </FormProvider>
        </div>
    )
};