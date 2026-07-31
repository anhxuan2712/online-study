import { Col, Dropdown, Layout, Menu, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import "../../../assets/styles/components/MainLayout.css";
import profile from "../../../assets/images/avatar.png";
import { ROUTE_PATH } from '../../../core/common/appRouter';
import authService from '../../repositories/auth/service/auth.service';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import DialogConfirmCommon from '../components/modal/dialogConfirm';
import Constants from '../../../core/common/constants';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { BreadcrumbCommon } from './Breadcumb';
import logo from '../../../assets/images/logo.jpg';
import teacherService from '../../repositories/teacher/service/teacher.service';
import { TeacherState } from '../../../core/atoms/teacher/teacherState';
import { DisciplineState } from '../../../core/atoms/discipline/disciplineState';
import { CategoryState } from '../../../core/atoms/category/categoryState';
import categoryService from '../../repositories/category/service/category.service';
import { isTokenStoraged } from '../../utils/storage';
import courseService from '../../repositories/course/service/course.service';
import { CourseState } from '../../../core/atoms/course/courseState';

const { Header, Content, Sider } = Layout;

const ManageLayout = ({ ...props }: any) => {
    const { title, breadcrumb, redirect } = props
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    // const [, setDataPosition] = useRecoilState(PositionState);
    const [dataProfile, setDataProfile] = useState<any>({});
    const [, setProfileState] = useRecoilState(ProfileState);
    const [, setTeacherState] = useRecoilState(TeacherState);
    const [, setDisciplineState] = useRecoilState(DisciplineState);
    const [, setCategoryState] = useRecoilState(CategoryState);
    const [, setCourseState] = useRecoilState(CourseState);

    const navigate = useNavigate();
    const location = useLocation();
    const token = isTokenStoraged();

    const openModalLogout = () => {
        setIsOpenModalLogout(true);
    };

    const closeModalLogout = () => {
        setIsOpenModalLogout(false);
    };

    const onLogOut = async () => {
        setIsOpenModalLogout(false);
        try {
            await authService.logout(
                setLoading
            ).then(() => {
                navigate(ROUTE_PATH.HOME_PAGE);
                window.location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getProfileUser = async () => {
        if (token) {
            try {
                await authService.profile(
                    () => { }
                ).then((response) => {
                    if (response) {
                        setDataProfile(response)
                        setProfileState(
                            {
                                user: response,
                            }
                        )
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if (token) {
            getProfileUser().then(() => { });
        }
    }, [token]);

    const getTeacherAsync = async () => {
        try {
            await teacherService.getTeacher(
                {},
                () => { }
            ).then((response) => {
                if (response) {
                    setTeacherState(
                        {
                            data: response.content,
                        }
                    )
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getTeacherAsync().then(() => { })
    }, [])

    const getDisciplinesAsync = async () => {
        try {
            await teacherService.getTeacher(
                {},
                () => { }
            ).then((response) => {
                if (response) {
                    setDisciplineState(
                        {
                            data: response.content,
                        }
                    )
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getDisciplinesAsync().then(() => { })
    }, [])

    const getCategoryAsync = async () => {
        try {
            await categoryService.getCategory(
                {},
                () => { }
            ).then((response) => {
                if (response) {
                    setCategoryState(
                        {
                            data: response.content,
                        }
                    )
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getCategoryAsync().then(() => { })
    }, [])

    const onGetListCourseAsync = async () => {
        try {
            await courseService.getCourse(
                {},
                setLoading
            ).then((response) => {
                setCourseState(
                    {
                        data: response.content,
                    }
                )
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListCourseAsync().then(() => { });
    }, []);

    const listAction = () => {
        return (
            <Menu className='action-admin'>
                {/* <Menu.Item className='info-admin'>
                    <div className='info-admin-title px-1 py-2 flex align-middle hover:text-[#5e5eff]'>
                        <svg className='mr-1-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="5" r="4" />
                            <path d="M12 9a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
                        </svg>

                        Thông tin cá nhân
                    </div>
                </Menu.Item> */}
                <Menu.Item className='info-admin' onClick={openModalLogout}>
                    <div className='info-admin-title px-1 py-2 flex align-middle hover:text-[#fc5a5a]' >
                        <svg className='mr-1-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        Đăng xuất
                    </div>
                </Menu.Item>
            </Menu>
        )
    };

    return (
        <div className="main-layout">
            <Layout>
                <Row className='header pl-16 pr-16' justify={"space-between"} align={"middle"}>
                    <Col className='flex align-middle'>
                        <div onClick={() => navigate(ROUTE_PATH.HOME_PAGE)} className="flex gap-4 m-auto cursor-pointer" >
                            <img src={logo} alt="" className='w-24' />
                        </div>
                    </Col>
                    <Col>
                        <Row align={"middle"} >
                            <Col className='mr-2 flex flex-col align-bottom'>
                                <div className='user-name'>
                                    {dataProfile?.name}
                                </div>
                            </Col>
                            <Col>
                                <Dropdown overlay={listAction} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <img className='avatar cursor-pointer' width={50} height={50} src={dataProfile.avatar ? dataProfile.avatar : profile} alt='' />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Layout>
                    <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
                        <Menu className='menu'>
                            {Constants.Menu.List.map((it, index) => {
                                return (
                                    <Menu.Item
                                        className={`${location.pathname.includes(it.link) ? "menu-title active" : "menu-title"}`}
                                        key={index} icon={<it.icon />}>
                                        <Link to={it.link}>
                                            {it.label}
                                        </Link>
                                    </Menu.Item>
                                )
                            })}
                        </Menu>
                        <div className='btn-collap flex align-center justify-center pointer'
                            onClick={() => setCollapsed(!collapsed)}
                        > {collapsed ?
                            <DoubleRightOutlined className='text-[#0d9e6d] ' />
                            :
                            <DoubleLeftOutlined className='text-[#0d9e6d] ' />
                            }
                        </div>
                    </Sider>
                    <Layout className='bg-white'>
                        <div className='flex flex-col px-6 py-2'>
                            <BreadcrumbCommon
                                breadcrumb={breadcrumb}
                                title={title}
                                redirect={redirect}
                            />
                        </div>
                        <Content className='content flex flex-col mx-6 mb-2 bg-white'>
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={closeModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            />
        </div>
    )
}

export default ManageLayout