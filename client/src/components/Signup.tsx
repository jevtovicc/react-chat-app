import { useForm } from "react-hook-form";

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

    return (
        <form
            onSubmit={handleSubmit((data) => console.log(data))}
            className="bg-gray-900 text-gray-200 max-w-xl flex flex-col space-y-3 py-4">

            <div className='flex flex-col w-1/2 m-auto'>
                <label htmlFor="firstName" className="text-sm mb-1">First Name*</label>
                <input
                    {...register('firstName', { required: "First Name is required" })}
                    id='firstName'
                    type='text'
                    className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100" />
                {errors.firstName && <small className="text-red-500">{errors.firstName.message}</small>}
            </div>

            <div className='flex flex-col w-1/2 m-auto'>
                <label htmlFor="lastName" className="text-sm mb-1">Last Name*</label>
                <input
                    {...register('lastName', { required: "Last Name is required" })}
                    id='lastName'
                    type='text'
                    className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100" />
                {errors.lastName && <small className="text-red-500">{errors.lastName.message}</small>}
            </div>

            <div className='flex flex-col w-1/2 m-auto'>
                <label htmlFor="username" className="text-sm mb-1">Username*</label>
                <input
                    {...register('username', {
                        required: "Username is required",
                        minLength: { value: 4, message: "Username must be at least 4 characters long" }
                    })}
                    id='username'
                    type='text'
                    className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100" />
                {errors.username && <small className="text-red-500">{errors.username.message}</small>}
            </div>

            <div className='flex flex-col w-1/2 m-auto'>
                <label htmlFor="password" className="text-sm mb-1">Password*</label>
                <input
                    {...register('password', {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters long" }
                    })}
                    id='password'
                    type='password'
                    className="pl-2 py-2 rounded-sm bg-transparent text-gray-100 border border-gray-100" />
                {errors.password ?
                    <small className="text-red-500">{errors.password.message}</small> :
                    <small className="text-gray-500">Minimun 6 characters</small>}
            </div>

            <button className="bg-blue-800 rounded-sm py-2 w-1/2 m-auto">Log in</button>
            <small className="m-auto">Already have an account?{' '}
                <strong
                    onClick={toggleAuthState}
                    className='cursor-pointer hover:underline'>Sign in</strong>
            </small>
        </form>
    )
}

export default Signup
