import { Button } from 'antd'
import React from 'react'
import "../../../../assets/styles/components/button.css"
type Props = {
    classColor: "blue" | "gradient" | "grey" | "black" | "orange" | "green",
    onClick: Function,
    icon?: any,
    title: string,
    disabled?: boolean
}
export const ButtonCommon = (props: Props) => {
    const {
        classColor,
        onClick,
        icon,
        title,
        disabled = false
    } = props;
    return (
        <div className='button-common'>
            <Button
                className={classColor}
                onClick={() => onClick()}
                icon={icon}
                disabled={disabled}
            >
                {title}
            </Button>
        </div>
    )
}
