import { Col, Modal, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { MyCourseState } from '../../../core/atoms/myCourse/myCourseState';
import { configImageURL, formatCurrencyVND } from '../../helper/helper';
import { ShowStarCommon } from '../components/controls/ShowStar';
import authService from '../../repositories/auth/service/auth.service';
import { isTokenStoraged } from '../../utils/storage';
import { PaginationCommon } from '../components/pagination/Pagination';
import { InputSearchCommon } from '../components/input/input-search-common';
import { ButtonCommon } from '../components/button/button-common';
import Constants from '../../../core/common/constants';

type Props = {
    // handleOk: Function,
    handleCancel: Function,
    visible: boolean,
    loading?: boolean,
    setLoading: Function
}

const MyCourseModal = (props: Props) => {
    const { handleCancel, visible, loading, setLoading } = props;
    const [dataMyCourse, setDataMyCourse] = useState<Array<any>>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");

    const token = isTokenStoraged();
    let timeout: any

    const getMyCourseAsync = async ({ name = "", size = pageSize, page = currentPage }) => {
        if (token) {
            const param = {
                page: page - 1,
                size: size,
                keyword: name,
            }
            try {
                await authService.myCourse(
                    param,
                    setLoading
                ).then((response) => {
                    if (response) {
                        setDataMyCourse(response.content)
                        setTotal(response.totalElements)
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }
    }
    const onSearch = async (name = "", size = pageSize, page = 1,) => {
        await getMyCourseAsync({ name: name, size: size, page: page });
    };


    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1).then(_ => { });
    }

    useEffect(() => {
        if (token) {
            onSearch().then(() => { })
        }
    }, [token])
    return (
        <Modal
            key={"f-0"}
            centered
            visible={visible}
            closable={false}
            footer={false}
            onCancel={() => handleCancel()}
            width={"70%"}
        >
            <div className='flex flex-col gap-4 bg-[#f5f7fb] px-4 py-8'>
                <div className='bg-[#FFF] px-3 py-5 rounded-[4px] flex flex-col border-l-4 border-[#0d9e6d]'>
                    <div className='text-[18px] text-[#1e293bb3] font-semibold uppercase'>
                        Khóa học đã mua
                    </div>
                </div>

                <div className='bg-[#FFF] px-3 py-5 rounded-[4px] flex flex-col gap-2'>
                    <p className='font-bold text-[13px] text-[#1e293bb3]'>Tìm kiếm khóa học</p>
                    <Row gutter={[10, 10]} align={"middle"} justify={"space-between"}>
                        <Col xs={24} sm={18} md={20} lg={20}>
                            <InputSearchCommon
                                placeholder={'Tìm kiếm theo tên khóa học'}
                                value={searchText}
                                onChange={onChangeSearchText}
                                disabled={false}
                            />
                        </Col>
                        <Col xs={24} sm={6} md={4} lg={4} className=''>
                            <ButtonCommon
                                classColor={'orange'}
                                onClick={() => { }
                                } title={'Tìm kiếm'}
                            />
                        </Col>
                    </Row>
                </div>

                <div className='bg-[#FFF] px-3 py-5 rounded-[4px]'>
                    <Row gutter={[15, 15]}>
                        {
                            dataMyCourse.map((it, index) => {
                                return (
                                    <Col
                                        xs={24} sm={12} md={8} lg={6}
                                        key={index}
                                    >
                                        <div className='bg-[#fff] shadow-sm p-4 rounded-[4px] flex flex-col gap-4 border-[1px] border-[#d7d7d7] cursor-pointer h-full'
                                        // onClick={() => onNavigate(it.id)}
                                        >
                                            <div>
                                                <img src={configImageURL(it.course?.courseImage?.fileCode)} alt="" className='w-full h-full' />
                                            </div>
                                            <Tooltip
                                                title={it.course?.name}
                                                color='#1e293bb3'
                                            >
                                                <div className='text-truncate text-[13px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200'>{it.course?.name}</div>
                                            </Tooltip>
                                            <div>
                                                <ShowStarCommon
                                                    star={5}
                                                />
                                            </div>
                                            <div className='flex gap-1 items-center text-[14px] font-semibold text-[#d63939] '>
                                                <p>Giá:</p>
                                                <p>{formatCurrencyVND(String(it.course?.cost))} </p>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
                <div className='bg-[#FFF] px-3 py-5 rounded-[4px]'>
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
        </Modal>
    )
}

export default MyCourseModal