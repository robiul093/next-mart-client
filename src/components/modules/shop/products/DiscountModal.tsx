'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createFlashSell } from "@/services/FlashSell";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


export default function DiscountModal({ 
    selectProducts, setSelectProducts}: 
    { selectProducts: string[], setSelectProducts: Dispatch<SetStateAction<string[] | []>> }) {

    const form = useForm(
        // { resolver: zodResolver(loginSchema)}
    );

    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const flashSellData = {
            products: [...selectProducts],
            discountPercentage: parseFloat(data?.discountPercentage)
        }

        try {
            const res = await createFlashSell(flashSellData)

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
                <Button disabled={!selectProducts.length}>Add Flash Sell</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Flash Sell</DialogTitle>
                </DialogHeader>

                <FormProvider {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>


                        <FormField
                            control={form.control}
                            name="discountPercentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discount Percentage</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={isSubmitting}
                            className="mt-5 w-full"
                            type="submit">{isSubmitting ? 'creating...' : 'Create Flash Sell'}</Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>

    )
}
