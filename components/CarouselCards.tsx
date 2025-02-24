import React from 'react'
import { View } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { ITEM_WIDTH, SLIDER_WIDTH } from '@/components/CarouselCardItem'


const CarouselCards = () => {
  const isCarousel = React.useRef(null)
  const data = [
    {
      title: 'Thực đơn 1200 calo',
      imgUrl: require('@/assets/images/thuc-don-1200-calo.jpg'),
    },
    {
      title: 'Thực đơn thuần Việt',
      imgUrl: require('@/assets/images/thuc-don-thuan-viet.jpg'),
    },
    {
      title: 'Thực đơn thuần chay',
      imgUrl: require('@/assets/images/thuc-don-thuan-chay.jpg'),
    },
  ]
  return (
    <View className="h-72">
      <Carousel
        layout="default"
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.5}
        loop={true}
        useScrollView={true}
      />
    </View>
  )
}

export default CarouselCards