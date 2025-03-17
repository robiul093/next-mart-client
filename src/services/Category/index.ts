'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"
import { toast } from "sonner";


export const crateCategory = async (data: FormData) => {
    console.log(data)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`, {
            method: 'POST',
            headers: {
                Authorization: (await cookies()).get('accessToken')!.value
            },
            body: data
        });

        revalidateTag("CATEGORY")
        return res.json();
    } catch (err: any) {
        return Error(err)
    }
};


export const getAllCategory = async () => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")!.value;

        if (!accessToken) {
            toast.warning('AccessToken is messing')
            throw new Error("Access token is missing");
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`, {
            method: 'GET',
            headers: {
                Authorization: accessToken
            },
            next: {
                tags: ["CATEGORY"],
            }
        });

        const data = await res.json();
        if (!data) {
            throw new Error('No data rechives')
        }

        return data;
    } catch (err: any) {
        console.log(err);
        return Error(err)
    }
};



export const deletCategory = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: (await cookies()).get('accessToken')!.value,
            },

        });

        revalidateTag('CATEGORY');
        return res.json
    } catch (err: any) {
        return Error(err)
    }
};