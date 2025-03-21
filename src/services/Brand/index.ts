'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"

export const createBrand = async (data: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brand`, {
            method: 'POST',
            headers: {
                Authorization: (await cookies()).get('accessToken')!.value,
            },
            body: data
        });

        revalidateTag("BRAND")
        return res.json();
    } catch (err: any) {
        return Error(err)
    }
};


export const getAllBrands = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brand`, {
            next: {
                tags: ["BRAND"]
            }
        });

        return res.json()
    } catch (err: any) {
        return Error(err)
    }
}