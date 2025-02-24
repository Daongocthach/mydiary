import { useState } from 'react'
import { View, Text } from 'react-native'
import { ClockInformation } from '@/components/ClockInformation'
// import CarouselCards from '@/components/CarouselCards'

export default function Menu() {

    return (
        <View className="flex-1 items-center relative px-4">
            <ClockInformation />
            <Text className='text-2xl font-bold my-4 text-sky-600'>Thực đơn</Text>

            <View className='mt-4'>
                {/* <CarouselCards /> */}
            </View>

        </View>
    )
}
