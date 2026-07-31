import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import "../../../../assets/styles/components/input.css"
type Props = {
    placeholder: string,
    value: string
    onChange: any,
    disabled: boolean,
}
export const InputSearchCommon = (props: Props) => {
    const {
        placeholder,
        value,
        onChange,
        disabled,
    } = props;
    return (
        <div className='input-common'>
            <Input
                className='w-100'
                size={"middle"}
                value={value ? value : ""}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                prefix={<SearchOutlined className='icon-search text-[16px] text-[#1e293bb3] font-semibold ' />}
            />
        </div>
    )
}
