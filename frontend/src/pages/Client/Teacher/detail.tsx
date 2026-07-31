import React, { useEffect, useState } from 'react'
import LayoutClient from '../../../infrastructure/common/Layouts/Client-Layout'
import teacherService from '../../../infrastructure/repositories/teacher/service/teacher.service';
import { useParams } from 'react-router-dom';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { Col, Row } from 'antd';
import { configImageURL } from '../../../infrastructure/helper/helper';
import noAvatar from "../../../assets/images/no-avatar.png"
import Constants from '../../../core/common/constants';

const DetailTeacherPage = () => {
    const [detailTeacher, setDetailTeacher] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [activePageIndex, setActivePageIndex] = useState<number>(1)
    const param = useParams();

    const onGetTeacherByIdAsync = async () => {
        try {
            await teacherService.getTeacherById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailTeacher(res.teacher);
            })
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        onGetTeacherByIdAsync().then(_ => { });
    }, []);
    return (
        <LayoutClient>
            <div className='flex flex-col gap-6'>
                <div className='bg-[#FFF] px-28 py-6'>
                    <Row gutter={[40, 40]}>
                        <Col xs={24} lg={12}>
                            <img src={configImageURL(detailTeacher.image?.fileCode) || noAvatar} alt="" className='w-full h-full' />
                        </Col>
                        <Col xs={24} lg={12}>
                            <div className='flex flex-col gap-2 py-4 '>
                                <div className='flex flex-row'>
                                    <div className='bg-[#0070ba] shadow-lg px-10 py-4 text-[18px] font-semibold text-[#ffffff] uppercase -ml-20'>
                                        Thông tin giáo viên
                                    </div>
                                </div>
                                <div className='border-b-[1px] border-b-[#d4d4d4] pb-3'>
                                    <p className='text-[15px] font-semibold text-[#1e293be3]'>Họ và tên:</p>
                                    <p className='text-[16px]  text-[#1e293be3] uppercase'>{detailTeacher.user?.name}</p>
                                </div>
                                <div className='border-b-[1px] border-b-[#d4d4d4] pb-3'>
                                    <p className='text-[15px] font-semibold text-[#1e293be3]'>Đại học:</p>
                                    <p className='text-[16px]  text-[#1e293be3] uppercase'>{detailTeacher.level}</p>
                                </div>
                                <div className='border-b-[1px] border-b-[#d4d4d4] pb-3'>
                                    <p className='text-[15px] font-semibold text-[#1e293be3]'>Chuyên ngành:</p>
                                    <p className='text-[16px]  text-[#1e293be3] uppercase'>{detailTeacher.discipline}</p>
                                </div>
                                <div className='border-b-[1px] border-b-[#d4d4d4] pb-3'>
                                    <p className='text-[15px] font-semibold text-[#1e293be3]'>Email:</p>
                                    <p className='text-[16px]  text-[#1e293be3]'>{detailTeacher.user?.email}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='bg-[#fff1da] padding-teacher flex flex-col gap-6'>
                    <p className='text-center font-semibold text-[20px]'>NHỮNG CÂU CHUYỆN THÚ VỊ</p>
                    <Row align={"middle"}>
                        <Col xs={24} lg={12} xl={8} xxl={10}>
                            <div className='flex flex-col h-full'>
                                <img src={configImageURL(detailTeacher.image?.fileCode) || noAvatar} alt="" className='' />
                            </div>
                        </Col>
                        <Col xs={24} lg={12} xl={16} xxl={14}>
                            <div className='bg-[#fef7a4] py-4 px-8 shadow-lg margin-teacher flex flex-col h-full'>
                                {
                                    activePageIndex == 1
                                        ?
                                        <div dangerouslySetInnerHTML={{ __html: detailTeacher.story }} />
                                        :
                                        activePageIndex == 2
                                            ?
                                            <div dangerouslySetInnerHTML={{ __html: detailTeacher.achievements }} />
                                            :
                                            <div dangerouslySetInnerHTML={{ __html: detailTeacher.styleTeaching }} />
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row
                        gutter={[10, 10]}
                        justify={"center"}
                        align={"middle"}
                    >
                        {Constants.TabInfoTeacher.List.map((_, index) => (
                            <Col key={index}>
                                <div
                                    className="page-dot cursor-pointer"
                                    style={
                                        index === activePageIndex
                                            ? { opacity: 1, background: "#FE7524" }
                                            : {}
                                    }
                                    onClick={() => setActivePageIndex(index)}
                                ></div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default DetailTeacherPage