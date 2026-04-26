import { Controller } from 'react-hook-form';
import { Container, FormGroup, Input, Label } from 'reactstrap';

const InputElement = ({ control, errors, label, icon, type, placeholder, id, suffix, value, onChangeExtra, className }) => {
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
                                    value={field.value ?? ""}
                                    className={`${className} ${errors ? "bg-transparent border-danger border-1" : "bg-transparent"}`}
                                    type={type}
                                    placeholder={placeholder}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        onChangeExtra && onChangeExtra(e.target.value)
                                    }}
                                />
                                {suffix}
                            </div>
                        </Container>
                    );
                }}
            />
            {errors && (
                <small className="ml-1 text-danger">{errors}</small>
            )}
        </FormGroup>
    );
};

export default InputElement;
