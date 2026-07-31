import { Col, Input, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { convertDateShow } from '../../../../infrastructure/helper/helper';
import { isTokenStoraged } from '../../../../infrastructure/utils/storage';
import avatar from "../../../../assets/images/avatar.png"

type Props = {
    commentChange: string,
    setCommentChange: Function,
    onCommentAsync: Function,
    listComment: Array<any>,
    replyChange: string,
    setReplyChange: Function,
    onReplyAsync: Function,
    idReply: number,
    onOpenReply: Function,
}
const CommentCourse = (props: Props) => {
    const {
        commentChange,
        setCommentChange,
        onCommentAsync,
        listComment,
        replyChange,
        setReplyChange,
        onReplyAsync,
        idReply,
        onOpenReply,
    } = props;
    const token = isTokenStoraged();
    const [parentComment, setParentComment] = useState<Array<any>>([]);
    const [childComment, setChildComment] = useState<Array<any>>([]);

    useEffect(() => {

    }, [])
    return (
        <div className='flex flex-col gap-4'>
            <div className='border-b-[1px] border-b-[#d4d4d4] pb-3'>
                <Row >
                    <Col span={8}>
                        <div className='text-[16px] font-semibold text-[#1e293be3]'>
                            Bình luận
                        </div>
                    </Col>
                    <Col span={16}>
                        <p className='text-[16px] font-semibold text-[#1e293be3] mb-2'>Viết bình luận</p>
                        <div className='flex items-center gap-4'>
                            <Input value={commentChange} onChange={(e) => setCommentChange(e.target.value)} placeholder='Bình luận của bạn' />
                            <Tooltip
                                title={`${token ? "Gửi bình luận" : "Vui lòng đăng nhập để bình luận"}`}
                                color='#1e293bb3'
                            >
                                <div onClick={() => onCommentAsync()}>
                                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${token ? "cursor-pointer" : "cursor-not-allowed"}`}>
                                        <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#2a70b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
            </div>
            {
                listComment && listComment.length
                    ?
                    listComment.map((it, index) => {
                        return (
                            <div className='border-b-[1px] border-b-[#d4d4d4] pb-3'>
                                <Row key={index}>
                                    <Col span={8}>
                                        <div className='flex items-start gap-3 '>
                                            <div>
                                                <img src={it.parentComment?.user?.avatar || avatar} alt="" className='w-20 h-20 rounded-[50px]' />
                                            </div>
                                            <div>
                                                <div className='text-[15px] text-[#1e293bb3] font-semibold'>{it.parentComment?.user?.name}</div>
                                                <div className='text-[12px] text-[#2a70b8] font-semibold'>{it.parentComment?.user?.username}</div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <div className='flex flex-col gap-2'>
                                            <div className='text-[15px] text-[#1e293bb3] font-semibold'>
                                                {it.parentComment?.content}
                                            </div>
                                            <div className='text-[12px] text-[#2a70b8] font-semibold'>
                                                {convertDateShow(it.parentComment?.createdDate)}
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                {
                                                    it.childComments?.map((item: any, indexX: number) => (
                                                        <Row key={indexX} className='border-b-[1px] border-b-[#d4d4d4] pb-2'>
                                                            <Col span={8}>
                                                                <div className='flex items-start gap-3'>
                                                                    <div>
                                                                        <img src={item?.user?.avatar || avatar} alt="" className='w-8 h-8 rounded-[50px]' />
                                                                    </div>
                                                                    <div>
                                                                        <div className='text-[13px] text-[#1e293bb3] font-semibold'>{item?.user?.name}</div>
                                                                        <div className='text-[10px] text-[#2a70b8] font-semibold'>{item?.user?.username}</div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col span={16}>
                                                                <div className='text-[13px] text-[#1e293bb3] font-semibold'>
                                                                    {item?.content}
                                                                </div>
                                                                <div className='text-[10px] text-[#2a70b8] font-semibold'>
                                                                    {convertDateShow(item?.createdDate)}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    ))
                                                }
                                            </div>
                                            {
                                                token &&
                                                <div className='flex items-center gap-1 cursor-pointer' onClick={() => onOpenReply(it.parentComment?.id)}>
                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#2a70b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <div className='text-[12px] text-[#2a70b8] font-semibold'>
                                                        Phản hồi
                                                    </div>
                                                </div>
                                            }

                                            <div>
                                                {
                                                    idReply == it.parentComment?.id &&
                                                    <div className='flex items-center gap-4'>
                                                        <Input value={replyChange} onChange={(e) => setReplyChange(e.target.value)} placeholder='Trả lời bình luận' />
                                                        <Tooltip
                                                            title={`${token ? "Gửi phản hồi" : "Vui lòng đăng nhập để phản hồi"}`}
                                                            color='#1e293bb3'
                                                        >
                                                            <div onClick={() => onReplyAsync()}>
                                                                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${token ? "cursor-pointer" : "cursor-not-allowed"}`}>
                                                                    <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#2a70b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                            </div>
                                                        </Tooltip>
                                                    </div>

                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                    :
                    <div className='text-[16px] font-semibold text-[#1e293be3] text-center py-2'>
                        Chưa có bình luận !!!
                    </div>
            }
        </div>
    )
}

export default CommentCourse