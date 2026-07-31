import { useEffect, useState } from "react";
import "../../../assets/styles/components/MainLayout.css";
import authService from "../../repositories/auth/service/auth.service";
import FooterClient from "./Footer";
import HeaderClient from "./Header";
import { useRecoilState } from "recoil";
import { ProfileState } from "../../../core/atoms/profile/profileState";
import { isTokenStoraged } from "../../utils/storage";
import { MyCourseState } from "../../../core/atoms/myCourse/myCourseState";
import categoryService from "../../repositories/category/service/category.service";
import { CategoryState } from "../../../core/atoms/category/categoryState";
const LayoutClient = ({ ...props }: any) => {
    const [dataProfile, setDataProfile] = useState<any>({});
    const [, setProfileState] = useRecoilState(ProfileState);
    const [, setMyCourseState] = useRecoilState(MyCourseState);
    const [, setCategoryState] = useRecoilState(CategoryState);

    const token = isTokenStoraged();
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
            getProfileUser().then(() => { })
        }
    }, [token])

    const getMyCourse = async () => {
        if (token) {
            try {
                await authService.myCourse(
                    {
                        size: 1000
                    },
                    () => { }
                ).then((response) => {
                    if (response) {
                        setMyCourseState(
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
    }
    useEffect(() => {
        if (token) {
            getMyCourse().then(() => { })
        }
    }, [token])

    const getCatrgoryAsync = async () => {
        try {
            await categoryService.getCategory(
                {
                },
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
        getCatrgoryAsync().then(() => { })
    }, [token])

    return (
        <div className="main-layout-client">
            <HeaderClient />
            <div className="container-layout-client">
                {/* <div className="overlay"></div> */}
                <div className="content-layout-client flex flex-col scroll-auto">
                    <div>
                        {props.children}
                    </div>
                </div>
                <FooterClient />
            </div>
        </div>

    )
}

export default LayoutClient