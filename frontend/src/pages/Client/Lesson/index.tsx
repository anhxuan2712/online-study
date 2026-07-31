import React, { useEffect, useState } from 'react'
import LayoutClient from '../../../infrastructure/common/Layouts/Client-Layout'
import lessonService from '../../../infrastructure/repositories/lesson/service/lesson.service'
import { PaginationCommon } from '../../../infrastructure/common/components/pagination/Pagination'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { Col, Row, Tooltip } from 'antd'
import noAvatar from "../../../assets/images/no-avatar-product.jpg"
import Constants from '../../../core/common/constants'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import { useNavigate } from 'react-router-dom'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import { InputSearchCommon } from '../../../infrastructure/common/components/input/input-search-common'

let timeout: any
const LessonPage = () => {
    const [listLesson, setListLesson] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(Constants.PaginationClientConfigs.Size);
    const [searchText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onGetListLessonAsync = async ({ name = "" }) => {
        const param = {
            page: currentPage - 1,
            size: pageSize,
            keyword: name,
        }
        try {
            await lessonService.GetLessonPublic(
                param,
                setLoading
            ).then((res) => {
                setListLesson(res.content)
                setTotal(res.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onSearch = async () => {
        await onGetListLessonAsync({ name: searchText });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);

    };

    useEffect(() => {
        onGetListLessonAsync({ name: searchText }).then(_ => { });
    }, [currentPage, pageSize]);
    const onChangePage = async (value: any) => {
        setCurrentPage(value)
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
    }

    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.DETAIL_LESSON).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }

    return (
        <LayoutClient>
            <div className='flex flex-col gap-6'>
                <div className='bg-[#FFF] px-3 py-5 rounded-[4px] flex flex-col gap-2'>
                    <p className='font-bold text-[13px] text-[#1e293bb3]'>Tìm kiếm bài giảng</p>
                    <Row gutter={[10, 10]} align={"middle"} justify={"space-between"}>
                        <Col xs={24} sm={18} md={20} lg={20}>
                            <InputSearchCommon
                                placeholder={'Tìm kiếm theo tên bài giảng'}
                                value={searchText}
                                onChange={onChangeSearchText}
                                disabled={false}
                            />
                        </Col>
                        <Col xs={24} sm={6} md={4} lg={4} className=''>
                            <ButtonCommon
                                classColor={'orange'}
                                onClick={onSearch}
                                title={'Tìm kiếm'}
                            />
                        </Col>
                    </Row>
                </div>
                <Row gutter={[15, 15]}>
                    {
                        listLesson.map((it, index) => {
                            return (
                                <Col
                                    xs={24} sm={12} md={8} lg={6}
                                    key={index}
                                >
                                    <div className='bg-[#fff] shadow-sm p-4 rounded-[4px] flex flex-col gap-4 border-[1px] border-[#d7d7d7] cursor-pointer h-full'
                                        onClick={() => onNavigate(it.id)}
                                    >
                                        <div>
                                            <img src={it.user?.avatar || noAvatar} alt="" className='w-full' />
                                        </div>
                                        <Tooltip
                                            title={it.user?.name}
                                            color='#1e293bb3'
                                        >
                                            <div className='text-truncate text-[14px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200'>
                                                {it.name}
                                            </div>
                                        </Tooltip>
                                        <p className='text-[14px] font-semibold'>{it.course?.teacher?.user?.name}</p>
                                        <p className='text-truncate-3 text-[14px]'>{it.course?.name}</p>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
                <div className='flex flex-col'>
                    <PaginationCommon
                        total={total}
                        currentPage={currentPage}
                        onChangePage={onChangePage}
                        pageSize={pageSize}
                        onChangeSize={onPageSizeChanged}
                        disabled={false}
                        isClient={true}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default LessonPage