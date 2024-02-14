'use client'
import RegisterForm from '@/components/forms/RegisterForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export default function RegisterPage() {

    const {status, data} = useSession();
    const router = useRouter()

    useEffect(() => {
        if(status === "unauthenticated") router.replace("/");

    }, [status])

    if (status === 'authenticated')
   
    return (
        <div className="grid place-items-center ">
            <h1 className='mb-3 text-2xl font-bold'>Sing up </h1>
            <RegisterForm/>
        </div>
    );

    return <div>Loading... </div>;
}
