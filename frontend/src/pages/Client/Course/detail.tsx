import React, { useEffect, useState } from 'react'
import LayoutClient from '../../../infrastructure/common/Layouts/Client-Layout'
import { Col, Input, Row, Tooltip } from 'antd'
import { configGender, configImageURL, convertDateShow, formatCurrencyVND } from '../../../infrastructure/helper/helper'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import Constants from '../../../core/common/constants'
import { BreadcrumbCommon } from '../../../infrastructure/common/components/controls/Breadcumb'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import courseService from '../../../infrastructure/repositories/course/service/course.service'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { useParams } from 'react-router-dom'
import DialogConfirmCommon from '../../../infrastructure/common/components/modal/dialogConfirm'
import { SendOutlined } from '@ant-design/icons'
import { isTokenStoraged } from '../../../infrastructure/utils/storage'
import commentService from '../../../infrastructure/repositories/comment/service/comment.service'
import InfoCourse from './components/info'
import DescriptionCourse from './components/description'
import LessonCourse from './components/lesson'
import CommentCourse from './components/comment'
import { useRecoilValue } from 'recoil'
import { MyCourseState } from '../../../core/atoms/myCourse/myCourseState'
import { ProfileState } from '../../../core/atoms/profile/profileState'

const DetailCourse = () => {
    const [tab, setTab] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [detailCourse, setDetailCourse] = useState<any>({});
    const [detailTeacher, setDetailTeacher] = useState<any>({});
    const [detailSuggestion, setDetailSuggestion] = useState<Array<any>>([]);
    const [listComment, setListComment] = useState<Array<any>>([]);
    const [listLesson, setListLesson] = useState<Array<any>>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(Constants.PaginationClientConfigs.Size);
    const [idReply, setIdReply] = useState<number>(0);
    const [replyChange, setReplyChange] = useState("");
    const [commentChange, setCommentChange] = useState("");

    const [videoURL, setVideoURL] = useState<string>("");
    const [isOpenModalBuyCourse, setIsOpenModalBuyCourse] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isTeacher, setIsTeacher] = useState<boolean>(false);
    const dataProfile = useRecoilValue(ProfileState).user;

    const param = useParams();
    const token = isTokenStoraged();
    const myCourse = useRecoilValue(MyCourseState).data;

    const [checkMyCourse, setCheckMyCourse] = useState<boolean>(false);

    useEffect(() => {
        dataProfile?.roles?.map((it: any) => {
            if (it.name == "ADMIN") {
                setIsAdmin(true)
            }
            else if (it.name == "TEACHER") {
                setIsTeacher(true)
            }
        })
    }, [dataProfile]);

    useEffect(() => {
        myCourse.filter(it => {
            if (it.course?.id == param.id) {
                setCheckMyCourse(true)
            }
        })
    }, [myCourse])
    const onGetCourseByIdAsync = async () => {
        try {
            await courseService.getCourseById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailCourse(res?.course);
                setVideoURL(res.course?.courseVideo?.fileCode);
                setDetailSuggestion(res?.suggestions);
                setDetailTeacher(res.course?.teacher);
                setListComment(res?.commentPComments);
                setTotal(res?.comments?.totalElements);
                setListLesson(res?.lessions)
            })
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        onGetCourseByIdAsync().then(_ => { });
    }, []);

    const openModalBuyCourse = () => {
        setIsOpenModalBuyCourse(true);
    };

    const onCloseModalBuyCourse = () => {
        setIsOpenModalBuyCourse(false);
    };

    const onBuyCourseAsync = async () => {
        try {
            await courseService.buyCourse(
                Number(param.id),
                () => { },
                setLoading
            ).then((response) => {
                onCloseModalBuyCourse();
                window.open(response.payUrl, '_blank');
            })
        }
        catch (error) {
            console.error(error)
        };
    };

    const onOpenReply = (id: number) => {
        setIdReply(id);
        setReplyChange("");
    };

    const onCommentAsync = async () => {
        if (commentChange && token) {
            try {
                await commentService.addComment(
                    {
                        content: commentChange,
                        course: {
                            id: Number(param.id)
                        }
                    },
                    onGetCourseByIdAsync,
                    setLoading
                ).then((response) => {
                    if (response) {
                        setCommentChange("")
                    }
                })
            }
            catch (error) {
                console.error(error)
            };
        }
    };

    const onReplyAsync = async () => {
        if (replyChange && token) {
            try {
                await commentService.addComment(
                    {
                        content: replyChange,
                        parentComment: {
                            id: idReply
                        }
                    },
                    onGetCourseByIdAsync,
                    setLoading
                ).then((response) => {
                    if (response) {
                        setReplyChange("")
                    }
                })
            }
            catch (error) {
                console.error(error)
            };
        }
    };

    return (
        <LayoutClient>
            <div className='detail-lesson flex flex-col gap-6 bg-[#FFF] px-4 py-5'>
                <BreadcrumbCommon
                    title={detailCourse.name}
                    breadcrumb={'Trang chủ'}
                    redirect={ROUTE_PATH.HOME_PAGE}
                />
                <InfoCourse
                    videoURL={videoURL}
                    detailCourse={detailCourse}
                    detailTeacher={detailTeacher}
                    openModalBuyCourse={openModalBuyCourse}
                    checkMyCourse={checkMyCourse}
                    isAdmin={isAdmin}
                    isTeacher={isTeacher}
                />
                <Row gutter={[25, 10]} className='border-b-[1px] border-b-[#1e293b54]'>
                    {
                        Constants.TabCourse.List.map((it, index) => {
                            return (
                                <Col key={index} onClick={() => setTab(it.value)}>
                                    <div className={`${tab == it.value && "text-[#2a70b8] border-b-[3px] border-b-[#2a70b8]"} text-[15px] font-semibold text-[#1e293bb3] py-2 cursor-pointer`}>{it.label}</div>
                                </Col>
                            )
                        })
                    }
                </Row>

                <DescriptionCourse
                    tab={tab}
                    detailCourse={detailCourse}
                    detailTeacher={detailTeacher}
                    detailSuggestion={detailSuggestion}
                />

                <LessonCourse
                    listLesson={listLesson}
                    checkMyCourse={checkMyCourse}
                    setIsOpenModalBuyCourse={setIsOpenModalBuyCourse}
                    isAdmin={isAdmin}
                    isTeacher={isTeacher}
                />
                <CommentCourse
                    commentChange={commentChange}
                    setCommentChange={setCommentChange}
                    onCommentAsync={onCommentAsync}
                    listComment={listComment}
                    replyChange={replyChange}
                    setReplyChange={setReplyChange}
                    onReplyAsync={onReplyAsync}
                    idReply={idReply}
                    onOpenReply={onOpenReply}
                />
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn mua khóa học này?"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đồng ý"}
                visible={isOpenModalBuyCourse}
                handleCancel={onCloseModalBuyCourse}
                handleOk={onBuyCourseAsync}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    )
}

export default DetailCourse