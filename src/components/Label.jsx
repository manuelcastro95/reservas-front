const Label =(props) =>{
    return (
        <label
            {...props}
            className="block text-md leading-6 text-gray-900"
        >
            {props.children}
        </label>
    )
}

export default Label;