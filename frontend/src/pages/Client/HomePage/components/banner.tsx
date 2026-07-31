import { Col, Row, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import CarouselCommon from '../../../../infrastructure/common/components/controls/Carousel'
import categoryService from '../../../../infrastructure/repositories/category/service/category.service'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '../../../../core/common/appRouter'

const BannerHomePage = () => {
    const [dataCategory, setDataCategory] = useState<Array<any>>([]);

    const getCategoryAsync = async () => {
        try {
            await categoryService.getCategory(
                {
                    size: 6
                },
                () => { }
            ).then((response) => {
                if (response) {
                    setDataCategory(response.content)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getCategoryAsync().then(() => { })
    }, [])


    return (
        <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={8} lg={8} xl={7}>
                <div className='bg-[#FFF] h-full p-4 rounded-[4px] flex flex-col gap-4'>
                    <div
                        className='flex items-center gap-2 cursor-pointer'
                    >
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z" fill="#1e293bb3" />
                            <path d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="#1e293bb3" />
                            <path d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z" fill="#1e293bb3" />
                        </svg>
                        <div className='font-bold text-[17px] text-[#1e293bb3]'>
                            Các khóa học
                        </div>
                    </div>
                    {
                        dataCategory.map((it, index) => {
                            return (
                                <div
                                    key={index}
                                    className='flex items-center gap-2 cursor-pointer'
                                >
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 4.67019V16.7402C22 17.7002 21.22 18.6002 20.26 18.7202L19.93 18.7602C17.75 19.0502 14.39 20.1602 12.47 21.2202C12.21 21.3702 11.78 21.3702 11.51 21.2202L11.47 21.2002C9.54997 20.1502 6.20003 19.0502 4.03003 18.7602L3.73999 18.7202C2.77999 18.6002 2 17.7002 2 16.7402V4.66018C2 3.47018 2.96997 2.57019 4.15997 2.67019C6.25997 2.84019 9.43997 3.90022 11.22 5.01022L11.47 5.16018C11.76 5.34018 12.24 5.34018 12.53 5.16018L12.7 5.05019C13.33 4.66019 14.13 4.27019 15 3.92019C16.31 3.40019 17.77 2.98024 19 2.78024C19.27 2.73024 19.53 2.7002 19.77 2.6802H19.83C21.02 2.5802 22 3.47019 22 4.67019Z" stroke="#1e293bb3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path opacity="0.4" d="M12 5.49023V20.4902" stroke="#1e293bb3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path opacity="0.4" d="M19 2.78027V8.00024L17 6.67023L15 8.00024V3.92023C16.31 3.40023 17.77 2.98027 19 2.78027Z" stroke="#1e293bb3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <Tooltip
                                        title={it.name}
                                        color='#1e293bb3'
                                    >
                                        <Link to={{
                                            pathname: ROUTE_PATH.LIST_COURSE,
                                            search: it.name
                                        }}>
                                            <div className='text-truncate font-semibold text-[14px] text-[#1e293bb3] hover:underline hover:text-[#007bff] transition duration-200'>
                                                {it.name}
                                            </div>
                                        </Link>
                                    </Tooltip>
                                </div>
                            )
                        })
                    }
                </div>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={17}>
                <CarouselCommon />
            </Col>
        </Row>
    )
}

export default BannerHomePage