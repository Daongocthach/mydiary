import { useEffect, useState } from 'react'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Text, TouchableOpacity, View, ScrollView, TextInput, Alert } from 'react-native'
import { PieChart } from "react-native-gifted-charts"
import { FoodItem } from '@/components/FoodItem'
import { CustomModal } from '@/components/CustomModal'
import { Collapsible } from '@/components/Collapsible'
import { useForm, Controller } from "react-hook-form"
import { CustomDropDown } from '@/components/CustomDropDown'
import { ClockInformation } from '@/components/ClockInformation'
import Toast from 'react-native-toast-message'
import WelcomeScreen from '@/app/welcome'
import useStore from '@/store'
import { FoodTypes } from '@/constants/FoodTypes'
import { FoodItemType } from '@/lib/types'


const foodTypes = Object.entries(FoodTypes).map(([key, value]) => ({
  label: value.name,
  value: key,
}))

const levels = [
  { label: 'Giảm Chậm: 0,25kg/tuần', value: 0, caloriesChange: -250 },
  { label: 'Trung bình: 0,5kg/tuần', value: 1, caloriesChange: -500 },
  { label: 'Nhanh: 0,75kg/tuần', value: 2, caloriesChange: -750 },
  { label: 'Tăng cân: 0,25kg/tuần', value: 3, caloriesChange: 250 },
  { label: 'Tăng cân: 0,5kg/tuần', value: 4, caloriesChange: 500 },
  { label: 'Tăng cân: 1kg/tuần', value: 5, caloriesChange: 1000 },
];



export default function HomeScreen() {
  const { bmr, tdde, todayFoodList, foodList, todayCalories, addFood, addTodayFood, addHistoryFood } = useStore()
  const [level, setLevel] = useState(0)
  const goal = tdde ? tdde + levels[level].caloriesChange : 0
  const pieData = [
    { value: todayCalories, color: '#177AD5' },
    { value: goal - todayCalories, color: 'lightgray' }
  ]
  const [modalVisible, setModalVisible] = useState(false)
  const [type, setType] = useState('fastfood')
  const [selectedFoodList, setSelectedFoodList] = useState<FoodItemType[]>([])
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      carbsWeight: "",
      proteinsWeight: "",
      fatsWeight: "",
    },
  })
  const onSubmit = (data: any) => {
    addFood({
      ...data,
      type,
      id: Math.random().toString(36).substring(7),
      calories: data.carbsWeight * 4 + data.proteinsWeight * 4 + data.fatsWeight * 9,
    })
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Thêm thực phẩm thành công',
      visibilityTime: 2000,
      autoHide: true,
    })
    reset()
  }
  const handleRemoveSelectedFood = (id: string) => {
    Alert.alert('Loại thực phẩm này', 'Bạn chắc chắn muốn loại thực phẩm này khỏi danh sách?', [
      {
        text: 'Không',
        style: 'cancel'
      },
      {
        text: 'Xóa',
        onPress: () => {
          setSelectedFoodList(selectedFoodList.filter((food) => food.id !== id))
        }
      }
    ])
  }
  const handleAddMeal = () => {
    if (selectedFoodList.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Chưa chọn thực phẩm nào',
        visibilityTime: 2000,
        autoHide: true,
      })
    }
    else {
      selectedFoodList.forEach((food) => {
        addTodayFood({ ...food, time: new Date().toISOString() });
        addHistoryFood({ ...food, time: new Date().toISOString() });
      })
      setSelectedFoodList([])
      setModalVisible(false)
    }
  }
  return (
    <View className='flex-1 items-center relative px-4'>
      {bmr ?
        <View className='flex-1 mb-20 items-center relative px-4'>
          <ClockInformation />
          <Text className='text-2xl font-bold my-4 text-sky-600'>Hôm nay</Text>
          <View className='flex flex-row gap-8'>
            <PieChart
              donut
              radius={80}
              innerRadius={60}
              data={pieData}
              showGradient
              centerLabelComponent={() => {
                return <View className='flex flex-row items-center'>
                  <Text style={{ fontSize: 20, color: '#0284c7', fontWeight: 600 }}>
                    {todayCalories.toFixed(0)}
                  </Text>
                  <IconSymbol name='flame.fill' size={20} color='#0284c7' />
                </View>
              }}
            />
            <View className='flex-1 border border-slate-300 rounded-3xl p-4 justify-center flex flex-col gap-2'>
              <View className='flex flex-row gap-2 items-center text-slate-700'>
                <IconSymbol name={'trophy'} size={25} color={'#0284c7'} />
                <View>
                  <Text style={{ fontSize: 13, fontWeight: 600 }} className='text-sky-600'>Mục tiêu</Text>
                  <Text style={{ fontSize: 10, fontWeight: 500, color: '#555' }}>
                    {goal.toFixed(0)} calories
                  </Text>
                </View>
              </View>
              <View className='flex flex-row gap-2 items-center text-slate-700'>
                <IconSymbol name={'leaf.circle.fill'} size={25} color={'#0284c7'} />
                <View>
                  <Text style={{ fontSize: 13, fontWeight: 600 }} className='text-sky-600'>Cần thiết</Text>
                  <Text style={{ fontSize: 10, fontWeight: 500, color: '#555' }}>{tdde?.toFixed(0)} calories</Text>
                </View>
              </View>
              <View className='flex flex-row gap-2 items-center text-slate-700'>
                <IconSymbol name={'exclamationmark.triangle'} size={25} color={'#0284c7'} />
                <View>
                  <Text style={{ fontSize: 13, fontWeight: 600 }} className='text-sky-600'>Khuyến cáo</Text>
                  <Text style={{ fontSize: 10, fontWeight: 500, color: '#555' }}>{levels[level].label}</Text>
                </View>
              </View>
              <View className='flex flex-row gap-4 items-center justify-center'>
                <TouchableOpacity onPress={() => setLevel(level - 1 > 0 ? level - 1 : 0)}>
                  <IconSymbol name={'chevron.left.2'} size={20} color={'#0284c7'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLevel(level + 1 < 6 ? level + 1 : level)}>
                  <IconSymbol name={'chevron.right.2'} size={20} color={'#0284c7'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView className='mt-4'>
            {todayFoodList.map((item, index) => (
              <FoodItem key={index} {...item} />
            ))}
          </ScrollView>
          <CustomModal
            isError={Object.keys(errors).length !== 0}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handle={handleAddMeal}
          >
            <View>
              <Text className='text-xl font-bold'>Thêm bữa ăn</Text>
              <Text className='text-gray-500'>Chọn thực phẩm bạn muốn thêm vào bữa ăn</Text>
              <View className='mt-4'>
                <Collapsible title="Chọn thực phẩm có sẵn">
                  <ScrollView className='max-h-36'>
                    {foodList.map((item, index) => (
                      <TouchableOpacity onPress={() => setSelectedFoodList([...selectedFoodList, item])} key={index}>
                        <FoodItem isSample {...item} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Collapsible>
              </View>
              <View className='mt-4'>
                <Collapsible title="Nhập mới">
                  <ScrollView className='max-h-44'>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View className="h-12 flex-row items-center border-b border-sky-600 rounded w-full mb-2 bg-slate-50">
                          <TextInput
                            className='flex-1 p-3'
                            placeholder="Tên thực phẩm"
                            placeholderTextColor="#888"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        </View>
                      )}
                      name="name"
                    />
                    {errors.name && <Text className='mb-2 text-red-500'>Tên thực phẩm không được để trống</Text>}
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View className="h-12 flex-row items-center border-b border-sky-600 rounded w-full mb-2 bg-slate-50">
                          <TextInput
                            className="flex-1 p-3"
                            placeholder="Nhập lượng tinh bột (carbs)"
                            keyboardType="numeric"
                            placeholderTextColor="#888"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                          <Text className="text-gray-500">(g)</Text>
                        </View>
                      )}
                      name="carbsWeight"
                    />
                    {errors.carbsWeight && <Text className='mb-2 text-red-500'>Lượng tinh bột/đường không được để trống.</Text>}
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View className="h-12 flex-row items-center border-b border-sky-600 rounded w-full mb-2 bg-slate-50">
                          <TextInput
                            className="flex-1 p-3"
                            placeholder="Nhập lượng proteins"
                            keyboardType="numeric"
                            placeholderTextColor="#888"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                          <Text className="text-gray-500">(g)</Text>
                        </View>
                      )}
                      name="proteinsWeight"
                    />
                    {errors.proteinsWeight && <Text className='mb-2 text-red-500'>Lượng proteins không được để trống.</Text>}
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View className="h-12 flex-row items-center border-b border-sky-600 rounded w-full mb-2 bg-slate-50">
                          <TextInput
                            className="flex-1 p-3"
                            placeholder="Nhập lượng chất béo (fats)"
                            keyboardType="numeric"
                            placeholderTextColor="#888"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                          <Text className="text-gray-500">(g)</Text>
                        </View>
                      )}
                      name="fatsWeight"
                    />
                    {errors.fatsWeight && <Text className='mb-2 text-red-500'>Lượng chất béo không được để trống.</Text>}
                    <CustomDropDown
                      selects={foodTypes}
                      select={type}
                      setSelect={setType}
                      placeholder='Chọn loại thực phẩm'
                      isSearch
                    />
                    <TouchableOpacity
                      onPress={handleSubmit(onSubmit)}
                      className='bg-[#2196F3] p-2 rounded mt-2 flex flex-row items-center justify-center gap-2'
                    >
                      <IconSymbol name="delete.left.fill" size={24} color="white" />
                      <Text className='text-white font-bold'>Thêm mới</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </Collapsible>
                <View className='mt-4'>
                  <Collapsible title="Thực phẩm đã chọn" isTrue>
                    <ScrollView className='max-h-36'>
                      {selectedFoodList.length < 1 ?
                        <View className='flex-1 justify-center items-center h-28'>
                          <Text className='text-gray-500'>Chưa chọn thực phẩm nào!</Text>
                        </View>
                        : selectedFoodList.map((item, index) => (
                          <TouchableOpacity
                            onPress={() => handleRemoveSelectedFood(item.id)}
                            key={index}
                          >
                            <FoodItem  {...item} />
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                  </Collapsible>
                </View>
              </View>
            </View>
          </CustomModal>
          <TouchableOpacity
            className="absolute bottom-5 right-5 bg-blue-500 p-4 rounded-full shadow-lg"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={() => setModalVisible(true)}
          >
            <IconSymbol name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
        : <WelcomeScreen />
      }
    </View>
  )
}

