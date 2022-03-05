import React, { useState } from 'react'

function modal() {
    const [show, setShow] = useState(false)
    return (
        <>
            {/* <button type="button"
                onClick={() => setShow(!show)}
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            >x</button> */}
            {
                !show && (
                    <div className='bg-slate-200 flex justify-center  ' >
                        < div className="modal fade fixed h-96 overflow-x-hidden overflow-y-auto" >
                            <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
                                <div
                                    className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                                            liked by
                                        </h5>
                                        <button type="button"
                                            onClick={() => setShow(!show)}
                                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                        >x</button>
                                    </div>
                                    <div className="modal-body relative p-4">
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                        <p>This content should appear at the bottom after you scroll.</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <button type="button"
                onClick={() => setShow(!show)}
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            >show</button>
        </>
    )
}
export default modal
