import { useForm } from "react-hook-form";

type FormValues = {
    username: string;
    password: string;
}

interface Props {
    toggleAuthState: () => void
}

function Login({ toggleAuthState }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    return (
        <form
            onSubmit={handleSubmit((data) => console.log(data))}
            className="bg-gray-900 text-gray-200 max-w-xl flex flex-col space-y-3 py-4">

            <div className='flex flex-col w-1/2 m-auto'>
                <label htmlFor="username" className="text-sm mb-1">Username</label>
                <input
                    {...register('username', { required: "Username is required" })}
                    id='username'
                    type='text'
                    className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100 focus:border-transparent" />
                {errors.username && <small className="text-red-500">{errors.username.message}</small>}
            </div>

            <div className='flex flex-col w-1/2 m-auto'>
                <label htmlFor="password" className="text-sm mb-1">Password</label>
                <input
                    {...register('password', { required: "Password is required" })}
                    id='password'
                    type='password'
                    className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100 focus:border-transparent" />
                {errors.password && <small className="text-red-500">{errors.password.message}</small>}
            </div>

            <button className="bg-blue-800 hover:bg-blue-700 rounded-sm py-2 w-1/2 m-auto">Log in</button>
            <small className="m-auto">Don't have an account?{' '}
                <strong
                    onClick={toggleAuthState}
                    className='cursor-pointer hover:underline'>Sign up</strong>
            </small>
        </form >
    )
}

export default Login
