import { Select } from 'antd';
import React from 'react'
import { Controller } from 'react-hook-form';
import { Container, FormGroup, Label } from 'reactstrap';

const SelectElement = ({ id, label, control, data, errors, icon, suffix }) => {
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
                                <Select
                                    {...field}
                                    id={id}
                                    value={field.value || null}
                                    options={data}
                                    className='w-100'
                                    style={{ height: 38, borderRadius: 10 }}
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
    )
}

export default SelectElement
