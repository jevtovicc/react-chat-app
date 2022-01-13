interface Props {
    onClick: () => void
}

function Navbar({ onClick }: Props) {
    return (
        <header className="bg-gray-900 text-gray-100 py-4 px-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center w-full">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input
                        type='text'
                        placeholder="Search..."
                        className="bg-transparent border-gray-800 p-2 rounded-sm text-sm outline-none w-full" />
                </div>
                <div className="text-right">
                    <button onClick={onClick} className="bg-blue-700 text-gray-200 p-2 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg></button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
