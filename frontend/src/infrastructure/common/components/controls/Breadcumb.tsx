import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons';

type Props = {
    title: string,
    breadcrumb: string,
    redirect: string
}
export const BreadcrumbCommon = (props: Props) => {
    const { title, breadcrumb, redirect } = props;
    const navigate = useNavigate();
    const onNavigate = () => {
        navigate(redirect);
    }
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div>
                    <Breadcrumb separator={<CaretRightOutlined />} className='flex items-center'>
                        <Breadcrumb.Item onClick={onNavigate} className='text-[14px] text-[#1e293bb3] cursor-pointer'>{breadcrumb}</Breadcrumb.Item>
                        <Breadcrumb.Item className='text-[14px] text-[#2a70b8]'>{title}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        </div>
    )
}
