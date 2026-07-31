import React from 'react'
import { configGender, configImageURL } from '../../../../infrastructure/helper/helper';
import Constants from '../../../../core/common/constants';
import { Col, Row, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../../core/common/appRouter';
import noAvatar from "../../../../assets/images/no-avatar.png"
type Props = {
    listTeacher: Array<any>;
}
const TeacherList = (props: Props) => {
    const { listTeacher } = props
    const navigate = useNavigate();
    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.DETAIL_TEACHER).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <Row gutter={[15, 15]}>
            {
                listTeacher.map((it, index) => {
                    return (
                        <Col
                            xs={24} sm={12} md={8} lg={6}
                            key={index}
                        >
                            <div className='bg-[#fff] shadow-sm p-4 rounded-[4px] flex flex-col gap-4 border-[1px] border-[#d7d7d7] cursor-pointer h-full'
                                onClick={() => onNavigate(it.id)}
                            >
                                <div>
                                    <img src={configImageURL(it.image?.fileCode) || noAvatar} alt="" className='w-full' />
                                </div>
                                <Tooltip
                                    title={it.user?.name}
                                    color='#1e293bb3'
                                >
                                    <div className='text-truncate text-[14px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200'>
                                        {configGender(it.sex)}: {it.user?.name}
                                    </div>
                                </Tooltip>
                                <p className='text-[14px] font-semibold'>{it.level}</p>
                                <p className='text-truncate-3 text-[14px]'>{it.discipline?.name}</p>
                            </div>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default TeacherList