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
            className={` flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900 ${className}`}
            >
            {
                options?.map((option) => (
                    <option key={option} value={option} >
                        {option}
                    </option>
                ))
            }
            </select>
        </div>
    )
}

export default React.forwardRef(DropDown)
