'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"

export const addProduct = async (data: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product`, {
            method: 'POST',
            headers: {
                Authorization: (await cookies()).get('accessToken')!.value
            },
            body: data,
        });

        revalidateTag("updateData")
        return res.json();
    } catch (err: any) {
        return Error(err)
    }
};



export const getAllProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product`, {
        next: {
            tags: ["updateData"]
        }
    });

    return res.json();
};


export const getSingleProduct = async (productId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${productId}`, {
            next: {
                tags: ["updateData"]
            }
        })


        return res.json()
    } catch (err: any) {
        return Error(err)
    }
};


export const UpdateProduct = async (data: FormData, id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: (await cookies()).get('accessToken')!.value
            },
            body: data
        });

        revalidateTag("updateData")
        return res.json()
    } catch (err: any) {
        return Error(err)
    }
};