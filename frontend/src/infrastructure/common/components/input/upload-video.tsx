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

function UploadVideo(props: Props) {
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

    const [value, setValue] = useState<any>([]);

    useEffect(() => {
        if (attributeFile) {
            setValue(configImageURL(attributeFile))
        }
        else {
            setValue(attributeFile)
        }
    }, [attributeFile])

    const propsVideo: UploadProps = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        multiple: false,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setVideo(info.file.originFileObj);
                // setValue(info.file.originFileObj);
            }
            // if (info.file.status === 'done') {
            //     message.success(`${info.file.name} tải lên thành công`);
            // } else if (info.file.status === 'error') {
            //     message.error(`${info.file.name} tải lên không thành công`);
            // }
        }, beforeUpload(file) {
            setValue([]);
            const isFileTypeValid = true; // Bạn có thể kiểm tra loại file ở đây nếu cần
            if (!isFileTypeValid) {
                message.error('Chỉ chấp nhận loại file nhất định!');
            }
            const isLt50M = file.size / 1024 / 1024 < 50; // Giới hạn kích thước file là 50MB
            if (!isLt50M) {
                message.error('File phải nhỏ hơn 50MB!');
            }
            return isFileTypeValid && isLt50M;
        },
        defaultFileList: [value], // Đặt file mặc định

    };

    console.log("value", value);

    const labelLower = label?.toLowerCase();

    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng tải ${labelLower}` : "");
        }
    };

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);
    console.log('value', value);

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
                    <Upload {...propsVideo} >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>
    );
}

export default UploadVideo;
