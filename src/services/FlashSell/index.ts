'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type TDataProp = {
    products: string[],
    discountPercentage: number
}

export const createFlashSell = async (data: TDataProp) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/flash-sale`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: (await cookies()).get('accessToken')!.value,
            },
            body: JSON.stringify(data),
        });

        revalidateTag("FlashSell")
        revalidateTag("product")
        return res.json();
    } catch (err: any) {
        return Error(err)
    }
}
export const getAllFlashSell = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/flash-sale`, {
            next: {
                tags: ["FlashSell"]
            }
        })

        return res.json();
    } catch (err: any) {
        return Error(err)
    }
}