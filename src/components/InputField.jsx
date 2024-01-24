export function InputField({type, name, title, placeholder, onchange}) {
    return (
        <div>
            <label htmlFor={name}>{title}</label>
            <input type={type} name={name} placeholder={placeholder} onChange={onchange}/>
        </div>
    );
};