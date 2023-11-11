import React, {useId} from 'react'

function DropDown({
    options,
    label,
    className,
    ...props
},ref) {
    const id = useId();
    return (
        <div className="w-full md:w-1/3">
            {
                label && <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor={id}>
                    {label}
                </label>
            }
            <select
            {...props}
            id={id}
            ref={ref}
            className={` inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${className}`}
            >
            {
                options?.map((option) => (
                    <option key={options} value={option} >
                        {option}
                    </option>
                ))
            }
            </select>
        </div>
    )
}

export default React.forwardRef(DropDown)
