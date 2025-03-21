'use server'

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

        return res.json();
    } catch (err: any) {
        return Error(err)
    }
};



export const getAllProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product`);
    
    return res.json();
};