import { useState } from 'react';
import { View, SectionList, Text, TouchableOpacity, SectionListData, TextInput, Alert } from 'react-native';
import { ClockInformation } from '@/components/ClockInformation';
import { CustomModal } from '@/components/CustomModal';
import { BarChart } from 'react-native-gifted-charts';
import { IconSymbol } from '@/components/ui/IconSymbol';
import useStore from '@/store';
import { format } from 'date-fns';
import { DiaryType } from '@/lib/types';
import Toast from 'react-native-toast-message';
import { Colors } from '@/constants/Colors';

const groupByDate = (data: any[]) => {
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  return Object.entries(grouped).map(([title, data]) => ({ title, data: data as readonly any[] }));
};

export default function HistoryScreen() {
  const { setToDayDiary, historyDiary, setHistoryDiary } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editContent, setEditContent] = useState("");

  const groupedData: readonly SectionListData<any, { title: string; data: unknown; }>[] = groupByDate(historyDiary || []);
  const today = format(new Date(), 'yyyy-MM-dd');
  const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const weekDiaryCount = daysOfWeek.map((_, index) => {
    return historyDiary?.some((d) => new Date(d.date).getDay() === index && d.content.trim() !== '') ? 1 : 0;
  });


  const barData = weekDiaryCount.map((count, index) => ({
    value: 1,
    label: daysOfWeek[index],
    frontColor: count > 0 ? Colors.light.primary : '#D3D3D3',
  }));

  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };


  const handleDeleteItem = (date: string) => {
    Alert.alert('Xác nhận', `Bạn có chắc chắn muốn xóa nhật ký ngày ${date}?`, [
      {
        text: 'Hủy',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: () => {
          if (today === date) {
            setToDayDiary({ date, content: '' });
          }
          setHistoryDiary(historyDiary.filter((item) => item?.date !== date));
          Toast.show({ type: 'success', text1: `Nhật ký ngày ${date} đã được xóa` });
        },
      },
    ]);
  }
  const handleOpenModal = (item: DiaryType) => {
    setModalVisible(true);
    setSelectedDate(item?.date);
    setEditContent(item?.content);
  }
  const handleEditDiary = () => {
    const newDiary = { date: selectedDate, content: editContent };
    setHistoryDiary(historyDiary.map((item) => (item.date === selectedDate ? newDiary : item)));
    Toast.show({ type: 'success', text1: 'Nhật ký đã được cập nhật' });
    setModalVisible(false);
  }

  return (
    <View className='flex-1 items-center px-4'>
      <ClockInformation />
      <View className='mt-4'>
        <BarChart
          barWidth={22}
          noOfSections={2}
          barBorderRadius={4}
          frontColor='lightgray'
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
      <View className='w-full'>
        <SectionList
          contentContainerStyle={{ marginTop: 10, paddingBottom: 50 }}
          sections={groupedData}
          keyExtractor={(item, index) => item.date + index}
          renderSectionHeader={({ section: { title } }) => (
            <View className='flex flex-row justify-between items-center mt-4'>
              <TouchableOpacity onPress={() => toggleSection(title)} className='flex flex-row items-center gap-2'>
                <IconSymbol name='circle.dotted.circle' size={15} color={Colors.light.primary} />
                <Text className="text-lg font-bold text-violet-500">{`Ngày ${title}`}</Text>
                <IconSymbol name={expandedSections[title] ? 'chevron.up.2' : 'chevron.down.2'} size={20} color={Colors.light.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { handleDeleteItem(title) }}>
                <IconSymbol name='xmark.app.fill' size={20} color={Colors.light.primary} />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={<View style={{ height: 300 }} />}
          renderItem={({ item, section }) =>
            expandedSections[section.title] ? (
              <View className='flex flex-row justify-between items-center'>
                <Text className='flex-1 p-6'>{item.content}</Text>
                <TouchableOpacity onPress={() => { handleOpenModal(item) }}>
                  <IconSymbol name='pencil.circle.fill' size={20} color={Colors.light.primary} />
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      </View>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handle={handleEditDiary}
      >
        <View>
          <Text className="text-lg font-bold text-violet-500">{`Ngày ${selectedDate}`}</Text>
          <TextInput
            className='border p-4 my-2 h-96 w-72 border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-xl'
            multiline
            numberOfLines={10}
            value={editContent}
            onChangeText={setEditContent}
            placeholder='Nhập nội dung nhật ký...'
            placeholderTextColor='#9CA3AF'
            textAlignVertical='top'
          />
        </View>
      </CustomModal>
    </View>
  );
}