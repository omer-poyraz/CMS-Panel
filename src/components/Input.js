import React from 'react'
import { Container, FormGroup, Input, Label } from 'reactstrap'

const InputElement = ({ label, icon, type, placeholder, name, value, defaultValue, onchange, suffix }) => {
    return (
        <FormGroup>
            <Label className='text-secondary mb-0'>{label}</Label>
            <Container className='position-relative p-0 m-0'>
                <div className='input-element'>
                    {icon}
                    <Input
                        className='bg-transparent'
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onchange}
                    />
                    {suffix}
                </div>
            </Container>
        </FormGroup>
    )
}

export default InputElement
