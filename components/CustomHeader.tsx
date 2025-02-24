import { Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from '@/hooks/useColorScheme';

export const CustomHeader = () => {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView className='flex flex-row justify-between px-4 text-center py-4'>
            <TouchableOpacity>
                <Image
                    source={
                        colorScheme === 'light' ? 
                        require('@/assets/images/logo-header.png')
                        : require('@/assets/images/logo-header-dark.png')
                    }
                    style={{ width: 'auto', height: 100 }} resizeMode="contain"
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}


