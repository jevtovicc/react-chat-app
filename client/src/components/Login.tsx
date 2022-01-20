import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { clearError, login } from "../store/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type FormValues = {
    username: string;
    password: string;
}

interface Props {
    toggleAuthState: () => void
}

function Login({ toggleAuthState }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const error = useAppSelector(state => state.auth.error)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearError())
    }, [])

    return (
        <form
            onSubmit={handleSubmit((data) => dispatch(login({ username: data.username, password: data.password })))}
            className="bg-gray-900 text-gray-200 py-4 h-screen flex flex-col items-center justify-center">
            {error && <p className="text-sm text-center bg-red-900 text-gray-300 mb-4 p-4 rounded-sm shadow-xl">{error}</p>}
            <div className="flex flex-col space-y-3">
                <div className='flex flex-col m-auto'>
                    <label htmlFor="username" className="text-sm mb-1">Username</label>
                    <input
                        {...register('username', { required: "Username is required" })}
                        id='username'
                        type='text'
                        autoComplete="off"
                        className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100 focus:border-transparent" />
                    {errors.username && <small className="text-red-500">{errors.username.message}</small>}
                </div>

                <div className='flex flex-col m-auto'>
                    <label htmlFor="password" className="text-sm mb-1">Password</label>
                    <input
                        {...register('password', { required: "Password is required" })}
                        id='password'
                        type='password'
                        className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100 focus:border-transparent" />
                    {errors.password && <small className="text-red-500">{errors.password.message}</small>}
                </div>

                <button className="bg-blue-800 hover:bg-blue-700 rounded-sm py-2 w-full m-auto">Log in</button>
                <small className="m-auto">Don't have an account?{' '}
                    <strong
                        onClick={toggleAuthState}
                        className='cursor-pointer hover:underline'>Sign up</strong>
                </small>
            </div>

        </form >
    )
}

export default Login
