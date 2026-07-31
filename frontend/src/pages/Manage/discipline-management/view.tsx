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

const ViewCategoryManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [detailCategory, setDetailCategory] = useState<any>({});

    const [_data, _setData] = useState<any>({});
    const dataCategory = _data;

    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.CATEGORY_MANAGEMENT)
    };
    const setDataCategory = (data: any) => {
        Object.assign(dataCategory, { ...data });
        _setData({ ...dataCategory });
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
            await categoryService.getCategoryById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailCategory(res)
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
        if (detailCategory) {
            setDataCategory({
                name: detailCategory.name,
                description: detailCategory.description,
            });
        };
    }, [detailCategory]);

    const onUpdateCategoryAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await categoryService.updateCategory(
                Number(param.id),
                {
                    name: dataCategory.name,
                    description: dataCategory.description,
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
        <ManageLayout breadcrumb={"Quản lý danh mục"} title={"Xem chi tiết"} redirect={ROUTE_PATH.CATEGORY_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên danh mục"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataCategory.name}
                                        setData={setDataCategory}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Mô tả"}
                                        attribute={"description"}
                                        isRequired={true}
                                        dataAttribute={dataCategory.description}
                                        setData={setDataCategory}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
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
                            onClick={onUpdateCategoryAsync}
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

export default ViewCategoryManagement