import { IconSymbol } from '@/components/ui/IconSymbol'
import { Text, View } from 'react-native'
import { FoodTypes } from '@/constants/FoodTypes'
import { getRandomColor } from '@/lib/helps'

type FoodItemProps =
    {
        isSample?: boolean
        isStatistic?: boolean
        name: string
        carbsWeight: number
        proteinsWeight: number
        fatsWeight: number
        calories: number
        time?: string
        type?: string
    }

export function FoodItem({
    isSample = false,
    isStatistic = false,
    type,
    name,
    carbsWeight,
    proteinsWeight,
    fatsWeight,
    calories,
    time
}: FoodItemProps) {
    return (
        <View style={{ borderColor: '#e2e8f0' }} className='flex-row items-center justify-between p-4 border-b w-full'>
            <View className='flex flex-row gap-2 items-center text-slate-700'>
                <View className='flex flex-row items-center gap-2'>
                    <IconSymbol name={'dot.square.fill'} size={10} color={getRandomColor()} />
                    {!(isSample || isStatistic) && <IconSymbol name={FoodTypes[type as keyof typeof FoodTypes].icon} size={35} color={'#0284c7'} />}
                </View>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: 600 }} className='text-sky-600'>{name}</Text>
                    <View className='flex flex-row items-center gap-1'>
                        <Text style={{ fontSize: 12, fontWeight: 500, color: '#555' }}>{carbsWeight}g - </Text>
                        <Text style={{ fontSize: 12, fontWeight: 500, color: '#555' }}>{proteinsWeight}g - </Text>
                        <Text style={{ fontSize: 12, fontWeight: 500, color: '#555' }}>{fatsWeight}g</Text>
                    </View>
                </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: 600, color: '#0284c7' }}>{time ? new Date(time).toLocaleTimeString() : ''}</Text>
            <View className='flex flex-row gap-1'>
                <Text style={{ fontSize: 15, fontWeight: 600, color: '#0284c7' }}>{calories}</Text>
                <IconSymbol name={'flame.fill'} size={20} color={'#0284c7'} />
                {(isSample || isStatistic) && <IconSymbol name='chevron.right' size={20} color={'#0284c7'} />}
            </View>
        </View>
    )
}