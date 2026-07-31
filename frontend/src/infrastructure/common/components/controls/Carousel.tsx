import { Carousel } from 'antd'
import { useEffect, useState } from 'react';
import bannerService from '../../../repositories/banner/service/banner.service';
import { configImageURL } from '../../../helper/helper';

const CarouselCommon = () => {
    const [dataBanner, setDataBanner] = useState<Array<any>>([]);

    const getBannerAsync = async () => {
        try {
            await bannerService.getBanner(
                {
                    size: 6
                },
                () => { }
            ).then((response) => {
                if (response) {
                    setDataBanner(response.content)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getBannerAsync().then(() => { })
    }, [])
    return (
        <div className='h-full'>
            <Carousel>
                {
                    dataBanner.map((it, index) => {
                        return (
                            <img key={index} src={configImageURL(it.image?.fileCode)} className='w-full rounded-[4px]' />
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default CarouselCommon