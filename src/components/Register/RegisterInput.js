import React from "react";
import "./RegisterInput.scss";

const RegisterInput = ({labelName, name, type, placeholder, onChange, value,}) => (
    <label className='styledLabel'>
        {labelName}
        <input className='styledInput'
               name={name}
               type={type}
               placeholder={placeholder}
               onChange={onChange}
               value={value}
        />
    </label>
)

export default RegisterInput;
