import { Alert, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IconSymbol } from '@/components/ui/IconSymbol';
import useStore from '@/store';
import { HelloWave } from './HelloWave';

export const CustomHeader = () => {
    const { clearData } = useStore();
    const handleClearData = () => {
        Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa dữ liệu không?', [
            { text: 'Hủy', style: 'cancel' },
            { text: 'Xóa', style: 'destructive', onPress: () => clearData() },
        ]);
    }

    return (
        <SafeAreaView className='flex flex-row justify-between items-center px-4 text-center py-4'>
            <TouchableOpacity>
                <Image
                    source={require('@/assets/images/logo-header.png')}
                    style={{ width: 250, height: 100 }} resizeMode="contain"
                />
            </TouchableOpacity>
            <HelloWave />
        </SafeAreaView>
    )
}


