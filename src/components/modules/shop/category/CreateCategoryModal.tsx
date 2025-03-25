'use client'

import { Button } from "@/components/ui/button"
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { crateCategory } from "@/services/Category";
import { useState } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


export default function CreateCategoryModal() {

    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const form = useForm(
        // { resolver: zodResolver(loginSchema)}
    );

    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data)
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            formData.append("icon", imageFiles[0] as File);

            const res = await crateCategory(formData);
            console.log(res)
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
                <Button>Create Category</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Product Category</DialogTitle>
                </DialogHeader>

                <FormProvider {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>


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

                        <div className="flex justify-center items-center gap-5">

                            <FormField
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
                            />



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

                        <Button
                            className="mt-5 w-full"
                            type="submit">{isSubmitting ? 'creating...' : 'Create Caregory'}</Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>

    )
}
