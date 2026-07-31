import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../../core/common/appRouter';
import Constants from '../../../../core/common/constants';
import freeIcon from '../../../../assets/images/free-icon.png'
import { CaretDownFilled, CaretRightFilled, PlayCircleFilled } from '@ant-design/icons';
type Props = {
    listLesson: Array<any>;
    checkMyCourse: boolean;
    setIsOpenModalBuyCourse: Function;
    isAdmin: boolean,
    isTeacher: boolean,
}
const LessonCourse = (props: Props) => {
    const {
        listLesson,
        checkMyCourse,
        setIsOpenModalBuyCourse,
        isAdmin,
        isTeacher
    } = props;
    const navigate = useNavigate();
    const [listTabOpen, setListTabOpen] = useState<Array<number>>([])

    const onNavigate = (id: any, publicDocument: boolean) => {
        if (checkMyCourse || publicDocument || isAdmin || isTeacher) {
            navigate(`${(ROUTE_PATH.DETAIL_LESSON).replace(`${Constants.UseParams.Id}`, "")}${id}`);
        }
        else {
            setIsOpenModalBuyCourse(true)
        }
    }

    const onTabList = (index: number) => {
        setListTabOpen([
            ...listTabOpen,
            index
        ])
        if (listTabOpen.includes(index)) {
            setListTabOpen(prev => prev.filter(it => it !== index))
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[16px] text-[#ffffff] font-semibold bg-[#0d9e6d] p-2'>Bài giảng</div>
            {
                listLesson && listLesson.length
                    ?
                    listLesson.map((it, index) => {
                        return (
                            <div
                                key={index}
                                className='border-b-[1px] border-b-[#d4d4d4] pb-2 flex flex-col gap-2 lesson-detail'
                            >
                                <div
                                    onClick={() => onTabList(index)}
                                    className='flex justify-between items-center bg-[#f1f1f1] px-2 py-1 cursor-pointer'
                                >
                                    <div className='flex items-center gap-2' >
                                        <div className='border-2 border-[#0d9e6d] rounded-[50px] w-4 h-4'></div>
                                        <div className='text-[16px] text-[#1e293bb3] font-semibold'>
                                            {it.name}
                                        </div>
                                        <img src={it.publicDocument && freeIcon} alt="" />
                                    </div>
                                    <CaretRightFilled className={`${listTabOpen.includes(index) ? 'show' : ''} icon-rotation`} />
                                </div>

                                <div
                                    className={`px-4 side-tab ${listTabOpen.includes(index) ? "show" : ""}`}>
                                    <div className='border-l-[1px] border-l-[#0d9e6d] px-4 flex flex-col gap-3'>
                                        <div
                                            className='flex items-center gap-2 cursor-pointer'
                                            onClick={() => onNavigate(it.id, it.publicDocument)}
                                        >
                                            <div className='text-[16px] text-[#6399bd] font-semibold'>
                                                Xem video bài giảng
                                            </div>
                                            <PlayCircleFilled style={{ color: "#8cbfe1", }} />
                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <div className='text-[16px] text-[#6399bd] font-semibold'>
                                                Mô tả ngắn về bài giảng:
                                            </div>
                                            <div className='bg-[#f1f1f1] px-3 py-2'>
                                                <div dangerouslySetInnerHTML={{ __html: it.description }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className='text-[16px] font-semibold text-[#1e293be3] text-center py-2'>
                        Chưa có bài giảng !!!
                    </div>
            }
        </div>
    )
}

export default LessonCourse