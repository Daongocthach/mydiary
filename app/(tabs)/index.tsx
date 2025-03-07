import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, useWindowDimensions, KeyboardAvoidingView, ScrollView, } from 'react-native';
import useStore from '@/store';
import Toast from 'react-native-toast-message';
import { format } from 'date-fns';
import { ClockInformation } from '@/components/ClockInformation';
import { IconSymbol } from '@/components/ui/IconSymbol';

const HomeScreen = () => {
  const [showPassword, setShowPassword] = useState(true);
  const { todayDiary, historyDiary, setToDayDiary, setHistoryDiary } = useStore();
  const [content, setContent] = useState(todayDiary?.content || '');
  const windowHeight = useWindowDimensions().height;
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (todayDiary?.date !== today) {
      setToDayDiary({ date: today, content: '' });
    }
    setContent(todayDiary?.content || '');
  }, [todayDiary]);

  const handleSaveDiary = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const newDiary = { date: today, content };

    const isExisting = historyDiary?.some((item) => item.date === today);

    if (isExisting) {
      setHistoryDiary(
        historyDiary.map((item) => (item.date === today ? newDiary : item))
      );
      Toast.show({ type: 'success', text1: 'Nhật ký đã được cập nhật' });
    } else {
      setHistoryDiary([...(historyDiary || []), newDiary]);
      Toast.show({ type: 'success', text1: 'Nhật ký đã được lưu' });
    }

    setToDayDiary(newDiary);
  };


  return (
    <View className='flex-1 items-center px-4'>
        <ClockInformation />
        <View className='relative my-4 w-full'>
          <TextInput
            style={{ height: windowHeight - 350 }}
            className={`border pl-5 pr-10 py-5 my-2 border-gray-300 rounded-lg bg-gray-50 text-xl
              ${showPassword ? 'text-gray-700' : 'text-gray-100'}`}
            multiline
            numberOfLines={10}
            value={content}
            onChangeText={setContent}
            placeholder='Nhập nội dung nhật ký...'
            placeholderTextColor='#9CA3AF'
            textAlignVertical='top'
          />
          <TouchableOpacity
            className='absolute right-2 top-7'
            onPress={() => setShowPassword(!showPassword)}
          >
            <IconSymbol name={showPassword ? 'eye.fill' : 'eye.slash.fill'} size={25} color="#8968CD" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className='bg-[#8968CD] p-3 rounded-lg shadow-md w-full'
          onPress={handleSaveDiary}
        >
          <Text className='text-center text-white font-bold text-lg'>Lưu</Text>
        </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
