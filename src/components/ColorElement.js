import { ColorPicker } from 'antd';
import { FormGroup, Label } from 'reactstrap';

const ColorElement = ({ label, value, onChangeExtra }) => {
    return (
        <FormGroup>
            <div><Label className="text-secondary mb-0">{label}</Label></div>
            <ColorPicker
                showText
                className='mt-2'
                value={value}
                onChange={(color) => {
                    const hex = color.toHexString()
                    onChangeExtra?.(hex)
                }}
            />
        </FormGroup>
    )
}

export default ColorElement