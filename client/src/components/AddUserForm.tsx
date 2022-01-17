import { useState } from "react";
import { useAppDispatch } from "../store/hooks";

interface Props {
    onSubmit: (username: string) => void
}

function AddUserForm({ onSubmit }: Props) {

    const [inputValue, setInputValue] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit(inputValue);
    }

    return (
        <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full">
                    <label className="text-gray-400 text-sm mb-1">Username or Email</label>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        className="px-3 py-2 rounded-md bg-transparent text-gray-300 border border-gray-700"
                        placeholder="Search..." />
                </div>
                <div className="text-right">
                    <button className="bg-blue-700 text-gray-200 p-3 rounded-md mt-4"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg></button>
                </div>
            </form>
        </div>
    )
}

export default AddUserForm;
