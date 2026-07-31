import React, { useEffect, useState } from 'react'
import LayoutClient from '../../../infrastructure/common/Layouts/Client-Layout'
import { Col, Row } from 'antd'
import lessonService from '../../../infrastructure/repositories/lesson/service/lesson.service';
import { configImageURL } from '../../../infrastructure/helper/helper';
import { useNavigate, useParams } from 'react-router-dom';
import CommentLesson from './components/comment';
import commentService from '../../../infrastructure/repositories/comment/service/comment.service';
import Constants from '../../../core/common/constants';
import DescriptionLesson from './components/description';
import { isTokenStoraged } from '../../../infrastructure/utils/storage';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { MyCourseState } from '../../../core/atoms/myCourse/myCourseState';

const DetailLessonPage = () => {
    const [detailLesson, setDetailLesson] = useState<any>({});
    const [listComment, setListComment] = useState<Array<any>>([]);

    const [idReply, setIdReply] = useState<number>(0);
    const [replyChange, setReplyChange] = useState("");
    const [commentChange, setCommentChange] = useState("");
    const [tab, setTab] = useState(1);
    const [videoURL, setVideoURL] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isTeacher, setIsTeacher] = useState<boolean>(false);

    const dataProfile = useRecoilValue(ProfileState).user;
    const myCourse = useRecoilValue(MyCourseState).data;

    const param = useParams();
    const token = isTokenStoraged();
    const navigate = useNavigate();

    const onGetLessonByIdAsync = async () => {
        try {
            await lessonService.GetLessonById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailLesson(res.lession);
                setListComment(res?.comments);
                setVideoURL(res?.lession?.lessionVideo.fileCode
                )
            })
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        onGetLessonByIdAsync().then(_ => { });
    }, []);

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
                        lession: {
                            id: Number(param.id)
                        }
                    },
                    onGetLessonByIdAsync,
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
                    onGetLessonByIdAsync,
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
        if (detailLesson?.course) {
            const condition = myCourse.filter(it => it.course?.id === detailLesson?.course?.id)
            if (condition.length > 0 || detailLesson.publicDocument || isAdmin || isTeacher) {
                return
            }
            else if (condition.length == 0) {
                navigate(ROUTE_PATH.LIST_COURSE)
            }

        }
    }, [myCourse, detailLesson, dataProfile])

    return (
        <LayoutClient>
            <div className='flex flex-col gap-6 bg-[#FFF] px-4 py-5'>
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
                            <p className='text-[24px] font-semibold text-[#2a70b8]'>{detailLesson.name} </p>
                            <p className='text-[14px] font-semibold text-[#1e293bb3]'>Khóa: {detailLesson.course?.name} </p>
                            <div className='flex gap-1 items-center text-[16px] font-semibold'>
                                <p className='text-[#1e293bb3]'>Giáo viên:</p>
                                <p className='text-[#2a70b8]'>{detailLesson.course?.teacher?.user?.name} </p>
                            </div>
                            <div className='flex gap-1 items-center text-[16px] font-semibold'>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[25, 10]} className='border-b-[1px] border-b-[#1e293b54]'>
                    {
                        Constants.TabLesson.List.map((it, index) => {
                            return (
                                <Col key={index} onClick={() => setTab(it.value)}>
                                    <div className={`${tab == it.value && "text-[#2a70b8] border-b-[3px] border-b-[#2a70b8]"} text-[15px] font-semibold text-[#1e293bb3] py-2 cursor-pointer`}>{it.label}</div>
                                </Col>
                            )
                        })
                    }
                </Row>
                <DescriptionLesson
                    tab={tab}
                    detailLesson={detailLesson} />
                <CommentLesson
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
            <FullPageLoading isLoading={loading} />
        </LayoutClient>

    )
}

export default DetailLessonPage