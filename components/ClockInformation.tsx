import { IconSymbol } from '@/components/ui/IconSymbol'
import { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

export function ClockInformation() {
    const [currentTime, setCurrentTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])
    const formattedDate = currentTime.toLocaleDateString('en-GB')
    const hours = currentTime.getHours().toString().padStart(2, '0')
    const minutes = currentTime.getMinutes().toString().padStart(2, '0')
    const seconds = currentTime.getSeconds().toString().padStart(2, '0')
    return (
        <View className='flex flex-row items-center mt-4 text-slate-600 p-4 rounded-3xl bg-sky-600' style={{ backgroundColor: '#e2e8f0' }}>
            <IconSymbol name='clock.arrow.circlepath' size={20} color='#475569' />
            <Text style={{ fontSize: 14, fontWeight: 500, color: '#475569', marginLeft: 10 }}>{formattedDate} - </Text>
            <Text style={{ fontSize: 14, fontWeight: 500, color: '#475569' }}>{hours}:{minutes}:{seconds}</Text>
        </View>
    )
}
