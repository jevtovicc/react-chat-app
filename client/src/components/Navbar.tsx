function Navbar() {
    return (
        <header className="bg-gray-900 text-gray-100 py-4 px-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input
                        type='text'
                        placeholder="Search..."
                        className="bg-transparent border-gray-800 p-2 rounded-sm text-sm outline-none" />
                </div>
                <button className="border-2 border-gray-700 rounded-sm p-1 text-gray-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></button>
            </div>
        </header>
    )
}

export default Navbar
