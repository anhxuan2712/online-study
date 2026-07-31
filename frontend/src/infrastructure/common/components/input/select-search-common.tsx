import { SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import "../../../../assets/styles/components/input.css"
type Props = {
    placeholder: string,
    value: string
    onChange: any,
    disabled: boolean,
    listDataOfItem: Array<any>
}
export const SelectSearchCommon = (props: Props) => {
    const {
        placeholder,
        value,
        onChange,
        disabled,
        listDataOfItem
    } = props;
    return (
        <div className='input-common'>
            <Select
                showSearch
                allowClear={true}
                showArrow
                disabled={disabled}
                listHeight={120}
                onChange={onChange}
                getPopupContainer={trigger => trigger.parentNode}
                className='w-full'
                size={"middle"}
                value={value ? value : ""}
                placeholder={placeholder}
            >
                {
                    listDataOfItem && listDataOfItem.length && listDataOfItem.map((item, index) => {
                        return (
                            <Select.Option
                                key={index}
                                value={item.name}
                                title={item.name}
                            >
                                {item.name}
                            </Select.Option>
                        )
                    })
                }
            </Select>
        </div>
    )
}
