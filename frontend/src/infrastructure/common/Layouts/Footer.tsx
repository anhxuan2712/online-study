import React from 'react'
import logo from "../../../assets/images/logo.jpg"
import "../../../assets/styles/components/MainLayout.css";

const FooterClient = () => {
    return (
        <div className='bg-[#FFF] py-4'>
            <div className='footer-common footer-layout-client'>
                <img src={logo} alt=""
                    className='w-32'
                />
                <p className='text-[13px] text-[#1e293bb3]'>Khóa học chất lượng nhất đang hiện có tại Việt Nam</p>
                <p className='text-[12px] text-[#1e293bb3]'>Nơi hội tụ những nhân tài tương lai</p>
            </div>
        </div>
    )
}

export default FooterClient