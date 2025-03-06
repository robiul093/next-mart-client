'use server'

import { IUser } from "@/types";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registeruser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await res.json();

        if (result.success) {
            (await cookies()).set('accessToken', result.data.accessToken)
        }

        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const loginuser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await res.json();
        
        if (result.success) {
            (await cookies()).set('accessToken', result.data.accessToken)
        }

        return result;
    } catch (error: any) {
        return Error(error)
    }
};


export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    let decode = null;

    if (accessToken) {
        decode = jwtDecode<JwtPayload & IUser>(accessToken);
        return decode;
    } else {
        return null
    }

};


export const logout =async () =>{
    (await cookies()).delete('accessToken');
}