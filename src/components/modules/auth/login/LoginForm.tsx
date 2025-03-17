'use client'

// import ReCAPTCHA from "react-google-recaptcha";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Link from "next/link";
import { loginuser } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirectPath');
    const form = useForm({
        resolver: zodResolver(loginSchema)
    });

    // const handelRecaptcha = (value: string | null) => {
    //     console.log(value)
    // }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data)
        try {
            const res = await loginuser(data);
            console.log(data, res)
            if (res?.success) {
                toast.success(res?.message);
                if (redirect) {
                    router.push(redirect)
                }
                else{
                    router.push('/profile')
                }
            }
            else {
                toast.error(res?.message)
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="border-2 bg-gray-300 rounded-2xl max-w-[60%] w-full mx-auto p-5 space-y-7">
            <div className="flex items-center space-x-4 ">
                <Logo />
                <div>
                    <h1 className="text-xl font-semibold">Login</h1>
                    <p className="font-extralight text-sm text-gray-600">
                        Join us today and start your journey!
                    </p>
                </div>
            </div>

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>


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

                    {/* <div className="mt-3">
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY || ''}
                            onChange={handelRecaptcha} />
                    </div> */}

                    <Button
                        className="mt-5 w-full"
                        type="submit">Login</Button>
                </form>
            </Form>
            <p className="text-sm text-gray-600 text-center my-3">
                Do not have an account ?
                <Link href="/register" className="text-primary">
                    Register
                </Link>
            </p>
        </div>
    )
}
