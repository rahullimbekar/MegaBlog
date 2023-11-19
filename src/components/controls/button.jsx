import React from 'react'


export default function Button ({
    children,
    type="button",
    bgColor = "bg-yellow-600",
    textColor="text-white",
    className="",
    ...props
}) {
    return(
        <button
            type={type}
            className={` ${bgColor} ${textColor} ${className} rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 `} {...props}>
            {children}
        </button>
    );
}


