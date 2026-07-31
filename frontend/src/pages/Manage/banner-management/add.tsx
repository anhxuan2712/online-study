import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import UploadImage from '../../../infrastructure/common/components/input/upload-image';
import bannerService from '../../../infrastructure/repositories/banner/service/banner.service';

const AddBannerManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

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

    const onAddBannerAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await bannerService.addBanner({
                image: avatar,
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
        <ManageLayout breadcrumb={"Quản lý ảnh quảng cáo"} title={"Thêm ảnh quảng cáo"} redirect={ROUTE_PATH.BANNER_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='flex flex-col gap-4'>
                                <div>
                                    <div className='legend-title'>Thêm mới ảnh</div>
                                    <UploadImage
                                        attributeImg={""}
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
                            onClick={onAddBannerAsync}
                            classColor="green"
                            icon={null}
                            title={'Thêm mới'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default AddBannerManagement