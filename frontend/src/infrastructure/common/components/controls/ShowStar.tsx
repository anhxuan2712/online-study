type Props = {
    star: number
}
export const ShowStarCommon = (props: Props) => {
    const { star } = props
    const stars = [];
    for (let i = 0; i < star; i++) {
        stars.push(
            <li key={i}>
                <svg width="14px" height="14px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#FFAC33" d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834a1.97 1.97 0 0 1-2.312-.008a1.971 1.971 0 0 1-.721-2.194l3.034-9.792l-8.062-5.681a1.98 1.98 0 0 1-.708-2.203a1.978 1.978 0 0 1 1.866-1.363L12.947 13l3.179-9.549a1.976 1.976 0 0 1 3.749 0L23 13l10.036.015a1.975 1.975 0 0 1 1.159 3.566l-8.062 5.681l3.034 9.792a1.97 1.97 0 0 1-.72 2.194a1.957 1.957 0 0 1-1.16.379z"></path></svg>
            </li>
        );
    }
    return (
        <ul className="flex gap-1 items-center">
            {stars}
            {
                !star && <li><i className="fa fa-star-half"></i></li>
            }
            <li className="text-[12px] text-[#626976]">|</li>
            {
                star ? <li className="text-[12px] text-[#626976]">Đánh giá {star} sao</li> : ""
            }
        </ul>
    )
}
//fa fa-star-half