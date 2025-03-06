'use client'

import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { regestationSchema } from "./registerValidation";
import Link from "next/link";
import { registeruser } from "@/services/AuthService";
import { toast } from "sonner";

export default function RegisterForm() {

    const form = useForm({
        resolver: zodResolver(regestationSchema)
    });

    const password = form.watch('password');
    const confirmPassword = form.watch('confirmPassword');

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        console.log(data)
        try {
            const res = await registeruser(data);
            if(res?.success){
                toast.success(res?.message)
            }
            else{
                toast.error(res?.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="border-2 bg-gray-300 rounded-2xl max-w-[60%] w-full mx-auto p-5">
            <div className="flex items-center space-x-4 ">
                <Logo />
                <div>
                    <h1 className="text-xl font-semibold">Register</h1>
                    <p className="font-extralight text-sm text-gray-600">
                        Join us today and start your journey!
                    </p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ConfirmPassword</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ''} />
                                </FormControl>
                                {password && password !== confirmPassword ? <FormMessage>Password does not match</FormMessage> : <FormMessage />}
                            </FormItem>
                        )}
                    />

                    <Button
                    disabled={password && password !== confirmPassword}
                    className="mt-5 w-full"
                    type="submit">Register</Button>
                </form>
            </Form>
            <p className="text-sm text-gray-600 text-center my-3">
                Already have an account ?
                <Link href="/login" className="text-primary">
                    Login
                </Link>
            </p>
        </div>
    )
}
