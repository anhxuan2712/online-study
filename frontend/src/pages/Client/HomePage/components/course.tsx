import { Col, Row, Tooltip } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../../core/common/appRouter';
import { ShowStarCommon } from '../../../../infrastructure/common/components/controls/ShowStar';
import { configImageURL, formatCurrencyVND } from '../../../../infrastructure/helper/helper';
import Constants from '../../../../core/common/constants';

type Props = {
    listCourse: Array<any>;
}
const CourseList = (props: Props) => {
    const { listCourse } = props
    const navigate = useNavigate();
    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.DETAIL_COURSE).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <Row gutter={[15, 15]}>
            {
                listCourse.map((it, index) => {
                    return (
                        <Col
                            xs={24} sm={12} md={8} lg={6}
                            key={index}
                        >
                            <div className='bg-[#fff] shadow-sm p-4 rounded-[4px] flex flex-col gap-4 border-[1px] border-[#d7d7d7] cursor-pointer h-full'
                                 onClick={() => onNavigate(it.id)}
                            >
                                <div className='w-full h-[50%]'>
                                    <img src={configImageURL(it.courseImage?.fileCode)} alt="" className='w-full h-full' />
                                </div>
                                <Tooltip
                                    title={it.name}
                                    color='#1e293bb3'
                                >
                                    <div className='text-truncate text-[13px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200'>{it.name}</div>
                                </Tooltip>
                                <div>
                                    <ShowStarCommon
                                        star={5}
                                    />
                                </div>
                                <div className='flex gap-1 items-center text-[14px] font-semibold text-[#d63939] '>
                                    <p>Giá:</p>
                                    <p>{formatCurrencyVND(String(it.cost))} </p>
                                </div>
                            </div>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default CourseList