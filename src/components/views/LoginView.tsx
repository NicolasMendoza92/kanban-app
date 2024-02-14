import LoginGoogle from "../buttons/LoginGoogle";
import LoginCredentialsForm from "../forms/LoginCredentialsForm";

export default function LoginView() {
    return (
        <div className='flex flex-col w-64 items-center justify-center pt-8 text-center gap-4 m-auto '>
            <LoginGoogle/>
            <LoginCredentialsForm/>
        </div>

    )
}
