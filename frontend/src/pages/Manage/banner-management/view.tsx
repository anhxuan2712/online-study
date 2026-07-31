import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import categoryService from '../../../infrastructure/repositories/category/service/category.service';
import UploadImage from '../../../infrastructure/common/components/input/upload-image';
import bannerService from '../../../infrastructure/repositories/banner/service/banner.service';

const ViewBannerManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [detailBanner, setDetailBanner] = useState<any>({});
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [detailImg, setDetailImg] = useState(null);

    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.BANNER_MANAGEMENT)
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onGetCategoryByIdAsync = async () => {
        try {
            await bannerService.getBannerById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailBanner(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetCategoryByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailBanner) {
            setDetailImg(detailBanner.image?.fileCode)
        };
    }, [detailBanner]);

    const onUpdateBannerAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await bannerService.updateBanner(
                Number(param.id),
                {
                    image: avatar || detailImg,
                },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <ManageLayout breadcrumb={"Quản lý danh mục"} title={"Xem chi tiết"} redirect={ROUTE_PATH.BANNER_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='flex flex-col gap-4'>
                                <div>
                                    <div className='legend-title'>Thêm mới ảnh</div>
                                    <UploadImage
                                        attributeImg={detailImg}
                                        imageUrl={imageUrl}
                                        setAvatar={setAvatar}
                                        setImageUrl={setImageUrl}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        isRequired={true}
                                        attribute={'image'}
                                        label={'Ảnh'}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col'>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onBack}
                            classColor="black"
                            icon={null}
                            title={'Quay lại'}
                        />
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onUpdateBannerAsync}
                            classColor="green"
                            icon={null}
                            title={'Cập nhật'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default ViewBannerManagement