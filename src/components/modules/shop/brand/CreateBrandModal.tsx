'use client'

import { Button } from "@/components/ui/button"
import NMImageUploader from "@/components/ui/core/NMImageUploader"
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createBrand } from "@/services/Brand"
import { useState } from "react"
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export function CreateBrandModal() {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const form = useForm();

    const { formState: { isSubmitting } } = form;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data)
        try {
            const formData = new FormData();

            formData.append('data', JSON.stringify(data));
            formData.append('logo', imageFiles[0] as File);

            const res = await createBrand(formData)
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
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Brand</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Product Brand</DialogTitle>

                </DialogHeader>
                <FormProvider {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>



                        <div className="flex justify-center items-center gap-5">

                            {/* <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="h-36 w-72"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}



                            {imageFiles.length > 0 ? (
                                <ImagePreviewer
                                    setImageFiles={setImageFiles}
                                    imagePreview={imagePreview}
                                    setImagePreview={setImagePreview}
                                    className="mt-8"
                                />

                            ) : (
                                <div className="mt-8">
                                    <NMImageUploader
                                        setImageFiles={setImageFiles}
                                        setImagePreview={setImagePreview}
                                        label="Upload Icon"
                                        className=""
                                    />
                                </div>
                            )}

                        </div>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />

                        <Button
                            className="mt-5 w-full"
                            type="submit">{isSubmitting ? 'creating...' : 'Create Brand'}</Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}
