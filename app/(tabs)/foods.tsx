import { useState } from 'react'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Text, TouchableOpacity, View, ScrollView, TextInput, Alert } from 'react-native'
import { FoodItem } from '@/components/FoodItem'
import { CustomModal } from '@/components/CustomModal'
import { FoodTypes } from '@/constants/FoodTypes'
import { useForm, Controller } from "react-hook-form"
import { CustomDropDown } from '@/components/CustomDropDown'
import { ClockInformation } from '@/components/ClockInformation'
import Toast from 'react-native-toast-message'
import useStore from '@/store'
import { FoodItemType } from '@/lib/types'

const foodTypes = Object.entries(FoodTypes).map(([key, value]) => ({
  label: value.name,
  value: key,
}))

export default function Foods() {
  const { addFood, editFood, deleteFood, foodList } = useStore()
  const [modalVisible, setModalVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editFoodItem, setEditFoodItem] = useState<FoodItemType>()
  const [type, setType] = useState('fastfood')
  const {
    control,
    handleSubmit,
    reset,
    setValue,
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
    try {
      if (isEdit && editFoodItem) {
        editFood({
          ...editFoodItem,
          ...data,
          type,
          calories: data.carbsWeight * 4 + data.proteinsWeight * 4 + data.fatsWeight * 9,
        })
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Sửa thực phẩm thành công',
          visibilityTime: 2000,
          autoHide: true,
        })
      }
      else {
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
      }
      reset()
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: 'Thêm thực phẩm thất bại, vui lòng thử lại!',
        visibilityTime: 2000,
        autoHide: true,
      })
    }

  }
  const handleSelectFood = (item: FoodItemType) => {
    setEditFoodItem(item)
    setIsEdit(true)
    setValue('name', item.name)
    setValue('carbsWeight', item.carbsWeight.toString())
    setValue('proteinsWeight', item.proteinsWeight.toString())
    setValue('fatsWeight', item.fatsWeight.toString())
    setType(item.type)
    console.log(item.type)
    setModalVisible(true)
  }
  const handleAddFood = () => {
    setIsEdit(false)
    setModalVisible(true)
    reset()
  }
  const handleDeleteFood = () => {
    Alert.alert(
      'Xóa thực phẩm',
      'Bạn chắc chắn muốn xóa?',
      [
        {
          text: 'Không',
          style: 'cancel'
        },
        {
          text: 'Xóa',
          onPress: () => {
            if (editFoodItem) {
              deleteFood(editFoodItem.id)
              Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Xóa thực phẩm thành công',
                visibilityTime: 2000,
                autoHide: true,
              })
              setModalVisible(false)
            }
          }
        }
      ]
    )
  }
  return (
    <View className='flex-1 mb-20 items-center relative px-4'>
      <ClockInformation />
      <ScrollView>
        {foodList.map((item, index) => (
          <TouchableOpacity onPress={() => handleSelectFood(item)} key={index}>
            <FoodItem {...item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <CustomModal
        isError={Object.keys(errors).length !== 0}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handle={handleSubmit(onSubmit)}
      >
        <View>
          <Text className='text-xl font-bold'>{isEdit ? 'Sửa thực phẩm' : 'Thêm thực phẩm'}</Text>
          <Text className='text-gray-500'>Nhập thông tin chi tiết để {isEdit ? 'sửa thực phẩm mẫu' : 'thêm thực phẩm mới'}</Text>
          {isEdit &&
            <TouchableOpacity
              onPress={handleDeleteFood}
              className='bg-[#2196F3] p-2 rounded mt-2 flex flex-row items-center justify-center gap-2'
            >
              <IconSymbol name="delete.left.fill" size={24} color="white" />
              <Text className='text-white font-bold'>Xóa thực phẩm</Text>
            </TouchableOpacity>
          }
          <View className='mt-2'>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="h-12 flex-row items-center border-b border-sky-600 rounded w-full mb-2 bg-slate-50">
                  <TextInput
                    className="flex-1 p-3"
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
        onPress={handleAddFood}
      >
        <IconSymbol name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}