import { StyleSheet, Platform, Switch, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { Collapsible } from '@/components/Collapsible'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { HelloWave } from '@/components/HelloWave'
import { Link, router } from 'expo-router'
import useStore from '@/store'

export default function Settings() {
  const { removeData } = useStore()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const handleDelete = () => {
    Alert.alert('Xóa thông tin BMR', 'Bạn chắc chắn muốn xóa?', [
      {
        text: 'Không',
        style: 'cancel'
      },
      {
        text: 'Xóa',
        onPress: () => {
          removeData()
        }
      }
    ])
  }
  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn chắc chắn muốn đăng xuất?', [
      {
        text: 'Không',
        style: 'cancel'
      },
      {
        text: 'Đăng xuất',
        onPress: () => {
          router.push('/login')
        }
      }
    ])
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="gearshape.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer} className='flex flex-row gap-2'>
        <ThemedText type="title">Cài đặt</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>Chào mừng bạn đến trung tâm cài đặt.</ThemedText>
      <ThemedView className='flex flex-col gap-6'>
        <Collapsible title="Thông tin tài khoản">
          <ThemedView className='ml-3 flex flex-col gap-4 my-4'>
            <Link href='/login' className='flex flex-row items-center gap-2'>
              <ThemedView className='flex flex-row items-center gap-2'>
                <IconSymbol name="arrow.right.circle.fill" size={20} color={'#64748b'} />
                <ThemedText type="default" className='text-slate-500'>Đăng nhập</ThemedText>
              </ThemedView>
            </Link>
            <Link href='/signup' className='flex flex-row items-center gap-2'>
              <ThemedView className='flex flex-row items-center gap-2'>
                <IconSymbol name="person.badge.plus.fill" size={20} color={'#64748b'} />
                <ThemedText type="default" className='text-slate-500'>Đăng ký</ThemedText>
              </ThemedView>
            </Link>
            <Link href='/reset-password' className='flex flex-row items-center gap-2'>
              <ThemedView className='flex flex-row items-center gap-2'>
                <IconSymbol name="key.fill" size={20} color={'#64748b'} />
                <ThemedText type="default" className='text-slate-500'>Đổi mật khẩu</ThemedText>
              </ThemedView>
            </Link>
            <TouchableOpacity className='flex flex-row items-center gap-2' onPress={handleLogout}>
              <IconSymbol name="arrow.left.circle.fill" size={20} color={'#64748b'} />
              <ThemedText type="default" className='text-slate-500'>Đăng xuất</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity className='flex flex-row items-center gap-2' onPress={handleDelete}>
              <IconSymbol name="delete.left.fill" size={20} color={'#64748b'} />
              <ThemedText type="default" className='text-slate-500'>Xóa thông tin BMR</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </Collapsible>
        <Collapsible title="Chế độ sáng tối">
          <ThemedView className='text-sky-600 flex flex-row items-center gap-1 ml-3 mt-4'>
            <IconSymbol name="sun.max.fill" size={20} color={'#64748b'} />
            <IconSymbol name="moon.fill" size={20} color={'#64748b'} />
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ true: '#D0D0D0', false: '#D0D0D0' }}
              thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : '#64748b'}
            />
          </ThemedView>
        </Collapsible>
        <Collapsible title="Một số thông tin cần thiết">
          <ThemedText className='ml-3 text-slate-500 mt-4'>
            Email: ngocthach752@gmail.com
          </ThemedText>
          <ThemedText className='ml-3 text-slate-500 mt-4'>
            Calories=(Carb×4)+(Protein×4)+(Fat×9)
          </ThemedText>
          <ThemedText className='ml-3 text-slate-500 mt-4'>
            Nam: BMR = (10 x Cân Nặng(kg)) + (6,25 x Chiều Cao(cm)) – (5 x Tuổi) + 5.
          </ThemedText>
          <ThemedText className='ml-3 text-slate-500 mt-4'>
            Nữ: BMR = (10 x Cân Nặng(kg)) + (6,25 x Chiều cao(cm)) – (5 x Tuổi) – 161.
          </ThemedText>
          <ThemedText className='ml-3 text-slate-500 mt-4'>
            TDEE = BMR × Hệ số vận động (1.2-1.9)
          </ThemedText>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
