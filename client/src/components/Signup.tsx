import { useForm } from "react-hook-form";
import { signup } from "../store/features/AuthSlice";
import { useAppDispatch } from "../store/hooks";

type FormValues = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

interface Props {
    toggleAuthState: () => void
}

function Signup({ toggleAuthState }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const dispatch = useAppDispatch();

    function handleSignup(data: FormValues) {
        dispatch(signup({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            password: data.password
        }));
    }

    return (
        <form
            onSubmit={handleSubmit(data => handleSignup(data))}
            className="bg-gray-900 text-gray-200 flex flex-col space-y-3 py-4 h-screen items-center justify-center">

            <div className="flex flex-col space-y-3">
                <div className='flex flex-col m-auto'>
                    <label htmlFor="firstName" className="text-sm mb-1">First Name*</label>
                    <input
                        {...register('firstName', { required: "First Name is required" })}
                        id='firstName'
                        type='text'
                        className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100 focus:border-transparent" />
                    {errors.firstName && <small className="text-red-500">{errors.firstName.message}</small>}
                </div>

                <div className='flex flex-col m-auto'>
                    <label htmlFor="lastName" className="text-sm mb-1">Last Name*</label>
                    <input
                        {...register('lastName', { required: "Last Name is required" })}
                        id='lastName'
                        type='text'
                        className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100 focus:border-transparent" />
                    {errors.lastName && <small className="text-red-500">{errors.lastName.message}</small>}
                </div>

                <div className='flex flex-col m-auto'>
                    <label htmlFor="username" className="text-sm mb-1">Username*</label>
                    <input
                        {...register('username', {
                            required: "Username is required",
                            minLength: { value: 4, message: "Username must be at least 4 characters long" }
                        })}
                        id='username'
                        type='text'
                        autoComplete="off"
                        className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100 focus:border-transparent" />
                    {errors.username && <small className="text-red-500">{errors.username.message}</small>}
                </div>

                <div className='flex flex-col m-auto'>
                    <label htmlFor="password" className="text-sm mb-1">Password*</label>
                    <input
                        {...register('password', {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters long" }
                        })}
                        id='password'
                        type='password'
                        className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100 focus:border-transparent" />
                    {errors.password ?
                        <small className="text-red-500">{errors.password.message}</small> :
                        <small className="text-gray-500">Min. 6 characters</small>}
                </div>

                <button className="bg-blue-800 hover:bg-blue-700 rounded-sm py-2 m-auto w-full">Sign Up</button>
                <small className="m-auto">Already have an account?{' '}
                    <strong
                        onClick={toggleAuthState}
                        className='cursor-pointer hover:underline'>Log in</strong>
                </small>
            </div>

        </form>
    )
}

export default Signup
