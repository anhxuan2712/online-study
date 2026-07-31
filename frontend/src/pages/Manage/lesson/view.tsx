import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import InputSelectAPICommon from '../../../infrastructure/common/components/input/select-api-common';
import { useRecoilValue } from 'recoil';
import { CourseState } from '../../../core/atoms/course/courseState';
import UploadVideo from '../../../infrastructure/common/components/input/upload-video';
import TextEditorCommon from '../../../infrastructure/common/components/input/text-editor';
import lessonService from '../../../infrastructure/repositories/lesson/service/lesson.service';
import CheckBoxCommon from '../../../infrastructure/common/components/input/checkbox-common';
import UploadFileCommon from '../../../infrastructure/common/components/input/upload-file';

const ViewLessonManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [detailLesson, setDetailLesson] = useState<any>({});
    const [document, setDocument] = useState(null);
    const [video, setVideo] = useState(null);
    const dataCourseState = useRecoilValue(CourseState).data;

    const [_data, _setData] = useState<any>({});
    const dataLesson = _data;

    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.LESSON_MANAGEMENT)
    };
    const setDataLesson = (data: any) => {
        Object.assign(dataLesson, { ...data });
        _setData({ ...dataLesson });
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
            await lessonService.GetLessonById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailLesson(res.lession)
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
        if (detailLesson) {
            setDataLesson({
                name: detailLesson.name,
                course: detailLesson.course?.id,
                description: detailLesson.description,
                lessionDocument: detailLesson.lessionDocument?.fileCode,
                lessionVideo: detailLesson.lessionVideo?.fileCode,
                publicDocument: detailLesson.publicDocument
            });
        };
    }, [detailLesson]);

    const onUpdateCategoryAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await lessonService.UpdateLesson(
                Number(param.id),
                {
                    name: dataLesson.name,
                    course: dataLesson.course,
                    description: dataLesson.description,
                    lessionDocument: document || dataLesson.lessionDocument,
                    lessionVideo: video || dataLesson.lessionVideo,
                    publicDocument: dataLesson.publicDocument
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
        <ManageLayout breadcrumb={"Quản lý bài giảng"} title={"Xem chi tiết"} redirect={ROUTE_PATH.LESSON_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên bài giảng"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataLesson.name}
                                        setData={setDataLesson}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectAPICommon
                                        label={"Khóa học"}
                                        attribute={"course"}
                                        isRequired={true}
                                        dataAttribute={dataLesson.course}
                                        setData={setDataLesson}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={dataCourseState}
                                    />
                                </Col>
                                <Col span={24}>
                                    <UploadFileCommon
                                        label={"Video"}
                                        attributeFile={dataLesson.lessionVideo}
                                        setVideo={setVideo}
                                        setFileUrl={() => { }}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        isRequired={true}
                                        attribute={'lessionVideo'}
                                    />
                                </Col>
                                <Col span={24}>
                                    <UploadFileCommon
                                        label={"Tài liệu"}
                                        attributeFile={dataLesson.lessionDocument}
                                        setVideo={setDocument}
                                        setFileUrl={() => { }}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        isRequired={true}
                                        attribute={'lessionDocument'}
                                    />
                                </Col>
                                <Col span={24}>
                                    <CheckBoxCommon
                                        label={'Tài liệu công khai'}
                                        attribute={'publicDocument'}
                                        setData={setDataLesson}
                                        dataAttribute={dataLesson.publicDocument}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        isRequired={true}
                                        disabled={false}
                                    />
                                </Col>
                                <Col span={24}>
                                    <TextEditorCommon
                                        label={'Mô tả'}
                                        id={"description"}
                                        attribute={'description'}
                                        setData={setDataLesson}
                                        dataAttribute={dataLesson.description}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        isRequired={true} />
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

export default ViewLessonManagement