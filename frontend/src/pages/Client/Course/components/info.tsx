import { Col, Row } from 'antd'
import { configImageURL, formatCurrencyVND } from '../../../../infrastructure/helper/helper';
import { ButtonCommon } from '../../../../infrastructure/common/components/button/button-common';
type Props = {
    videoURL: string,
    detailCourse: any,
    detailTeacher: any,
    openModalBuyCourse: Function,
    checkMyCourse: boolean,
    isAdmin: boolean,
    isTeacher: boolean,

}
const InfoCourse = (props: Props) => {
    const {
        videoURL,
        detailCourse,
        detailTeacher,
        openModalBuyCourse,
        checkMyCourse,
        isAdmin,
        isTeacher

    } = props;

    return (
        <Row gutter={[25, 20]}>
            <Col span={14}>
                {
                    videoURL?.length
                    &&
                    <video style={{ width: "100%", height: "100%" }} controls>
                        <source
                            src={configImageURL(videoURL)}
                            type="video/mp4"
                        />
                    </video>
                }

            </Col>
            <Col span={10}>
                <div className='flex flex-col gap-2'>
                    <p className='text-[24px] font-semibold text-[#2a70b8]'>{detailCourse.name} </p>
                    {/* <p className='text-[14px] font-semibold text-[#1e293bb3]'>(Còn lại {detailCourse.remain} khóa) </p> */}
                    <div className='flex gap-1 items-center text-[16px] font-semibold'>
                        <p className='text-[#1e293bb3]'>Giáo viên:</p>
                        <p className='text-[#2a70b8]'>{detailTeacher?.user?.name} </p>
                    </div>
                    <div className='flex gap-1 items-center text-[24px] font-semibold text-[#d63939]'>
                        <p>Giá:</p>
                        <p>{formatCurrencyVND(String(detailCourse.cost))} </p>
                        <p>/</p>
                        <p>khóa</p>
                    </div>
                    <div className='flex'>
                        <ButtonCommon
                            classColor={'orange'}
                            onClick={openModalBuyCourse}
                            title={`${checkMyCourse ? 'Bạn đã mua khóa này' : 'Mua ngay'}`}
                            disabled={isAdmin || isTeacher || checkMyCourse}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default InfoCourse