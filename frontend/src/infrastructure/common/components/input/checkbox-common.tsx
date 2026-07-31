import React, { useEffect, useState } from 'react';
import { Checkbox, Input } from 'antd';
import "../../../../assets/styles/components/input.css"
import { validateFields } from '../../../helper/helper';
import { validateCMND, validateEmail, validatePhoneNumber } from '../../../helper/validate';
import { MessageError } from '../controls/MessageError';
type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: any,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
}
const CheckBoxCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        disabled = false,
        validate,
        setValidate,
        submittedTime
    } = props;
    const [value, setValue] = useState<boolean>(false);

    const onChange = (value: any) => {
        setValue(value.target.checked || false);
        setData({
            [attribute]: value.target.checked || false
        });
    };

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    return (
        <div>
            <div className='mb-4 input-common'>
                <div className='title mb-2'>
                    <span>
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </div>
                <div>
                    <Checkbox
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        checked={value}
                    >{
                            value
                                ?
                                <div>Công khai</div>
                                :
                                <div>Không công khai</div>
                        }
                    </Checkbox>
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>
    )
};
export default CheckBoxCommon;