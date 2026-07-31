import { Button, Upload, UploadProps, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { MessageError } from '../controls/MessageError';
import { configImageURL, validateFields } from '../../../helper/helper';

type Props = {
    label: string,
    attributeFile: any,
    setVideo: Function,
    setFileUrl: Function,
    attribute: string,
    isRequired: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
}

function UploadFileCommon(props: Props) {
    const {
        label,
        attributeFile,
        setVideo,
        setFileUrl,
        setValidate,
        validate,
        isRequired,
        attribute,
        submittedTime
    } = props;

    const [value, setValue] = useState<any>();
    const [valueCheckValidate, setValueCheckValidate] = useState<any>();

    const handleFileChange = (event: any) => {
        setValueCheckValidate(event.target.files[0]);
        setVideo(event.target.files[0]);
        setValue("")
    };

    useEffect(() => {
        if (attributeFile) {
            setValue(configImageURL(attributeFile))
        }
        else {
            setValue(attributeFile)
        }
    }, [attributeFile])

    const labelLower = label?.toLowerCase();

    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !valueCheckValidate, setValidate, validate, !valueCheckValidate ? `Vui lòng tải ${labelLower}` : "");
        }
    };

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);

    return (
        <div>
            <div className='mb-4 input-common'>
                <div className='title mb-2'>
                    <span>
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </div>
                <div className="">
                    <input type="file" id="file" onChange={handleFileChange} placeholder='Tải file' />
                    {
                        value
                        &&
                        <div className='text-[15px] text-[#1e293be2] mt-2'>
                            {value}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default UploadFileCommon;
