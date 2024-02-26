import React from "react";
import "./RegisterInput.scss";

const RegisterInput = ({labelName, name, type, placeholder, onChange, value,autoComplete}) => (
    <label className='styledLabel'>
        {labelName}
        <input className='styledInput'
               name={name}
               type={type}
               placeholder={placeholder}
               onChange={onChange}
               value={value}
               autoComplete={autoComplete}
        />
    </label>
)

export default RegisterInput;
