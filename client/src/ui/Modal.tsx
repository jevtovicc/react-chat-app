import { ReactNode } from "react";

interface Props {
    onClose: () => void,
    children: ReactNode
}

function Modal({ onClose, children }: Props) {

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity cursor-pointer" aria-hidden="true" onClick={onClose}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-gray-900 rounded-md text-left w-full overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg">
                    {children}
                </div>
            </div>
        </div >)
}

export default Modal;
