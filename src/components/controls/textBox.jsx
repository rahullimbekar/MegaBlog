import React,{useId} from "react";

const TextBox = React.forwardRef( function TextBox({
    label,
    type="text",
    className="",
    required="",
    ...props
}, ref){
    const id = useId();
    return (
        <div > 
            {
                label && <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={id}
            >
                {label}
            </label>
            }
            <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type= {type}
                ref={ref}
                {...props}
                id={id}
            ></input>
            <p className="mt-1 text-xs text-gray-500">{required}</p>
        </div>
    )
})

export default TextBox