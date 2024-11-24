import React from 'react';
import { Controller } from 'react-hook-form';
import { FormGroup, Input, Label, Container } from 'reactstrap';

const InputElement = ({ control, errors, label, icon, type, placeholder, id, suffix, value }) => {
    return (
        <FormGroup>
            <Label className="text-secondary mb-0" htmlFor={id}>
                {label}
            </Label>
            <Controller
                name={id}
                control={control}
                render={({ field }) => {
                    return (
                        <Container className="position-relative p-0 m-0">
                            <div className="input-element">
                                {icon}
                                <Input
                                    {...field}
                                    id={id}
                                    value={field.value || value || ""}
                                    className={errors[id] ? "bg-transparent border-danger border-1" : "bg-transparent"}
                                    type={type}
                                    placeholder={placeholder}
                                />
                                {suffix}
                            </div>
                        </Container>
                    );
                }}
            />
            {errors[id] && (
                <small className="ml-1 text-danger">{errors[id].message}</small>
            )}
        </FormGroup>
    );
};

export default InputElement;
