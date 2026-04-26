import { Switch } from 'antd';
import { Controller } from 'react-hook-form';
import { FormGroup, Label } from 'reactstrap';

const SwitchElement = ({ control, errors, label, id, checkedChildren, unCheckedChildren, disabled, onChangeExtra }) => {
    return (
        <FormGroup>
            <Label className="text-secondary mb-0" htmlFor={id}>
                {label}
            </Label>
            <Controller
                name={id}
                control={control}
                render={({ field }) => (
                    <div className="switch-element">
                        <Switch
                            id={id}
                            checked={!!field.value}
                            onChange={(checked) => {
                                field.onChange(checked);
                                onChangeExtra && onChangeExtra(checked);
                            }}
                            checkedChildren={checkedChildren}
                            unCheckedChildren={unCheckedChildren}
                            disabled={disabled}
                        />
                    </div>
                )}
            />
            {errors[id] && (
                <small className="ml-1 text-danger">{errors[id].message}</small>
            )}
        </FormGroup>
    );
};

export default SwitchElement;
