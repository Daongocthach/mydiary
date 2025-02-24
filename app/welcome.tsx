import { useState } from 'react'
import { HelloWave } from '@/components/HelloWave'
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { useForm, Controller } from "react-hook-form"
import { RadioButton } from 'react-native-paper'
import { Firework } from '@/components/Firework'
import Toast from 'react-native-toast-message'
import useStore from '@/store'
import { GenderType, IntensiveType } from '@/lib/types'

export default function WelcomeScreen() {
  const { saveData } = useStore()
  const [gender, setGender] = useState<GenderType>('male')
  const [intensity, setIntensity] = useState<IntensiveType>('medium')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      height: "",
      weight: "",
      age: "",
    },
  })

  const onSubmit = (data: any) => {
    const weight = parseFloat(data.weight)
    const height = parseFloat(data.height)
    const age = parseInt(data.age, 10)

    if (!weight || !height || !age) return

    let bmr = gender === "male"
      ? 66 + (13.75 * weight) + (5 * height) - (6.76 * age)
      : 655 + (9.56 * weight) + (1.85 * height) - (4.68 * age)

    const activityMultipliers = {
      inactive: 1.2,
      low: 1.375,
      medium: 1.55,
      high: 1.725,
      super: 1.9
    }

    const tdee = bmr * activityMultipliers[intensity]

    saveData({
      bmr,
      tdde: tdee,
      bodyData: {
        height,
        weight,
        age,
        gender,
        intensive: intensity
      }
    })
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Dữ liệu đã được lưu',
      visibilityTime: 2000,
      autoHide: true,
    })
  }


  return (
    <View className="max-h-[500px] items-center relative px-4">
      <ProgressSteps
        activeStepIconBorderColor="#3b82f6"
        completedStepIconColor="#3b82f6"
        activeLabelColor="#3b82f6"
        completedProgressBarColor="#3b82f6"
        activeStepNumColor="#3b82f6"
        disabledStepIconColor="#e2e8f0"
        labelColor='#475569'
        disabledStepNumColor='#3b82f6'
        completedLabelColor='#3b82f6'
      >
        <ProgressStep
          label="Bước đầu tiên"
          buttonNextText='Tiếp theo'
          buttonNextTextColor='#3b82f6'
        >
          <ScrollView className='mt-10'>
            <HelloWave />
            <Text className="text-2xl font-bold text-center text-slate-600">
              Chào mừng bạn đến với ứng dụng của chúng tôi
            </Text>
            <Text className="text-lg text-center mt-4">
              Ứng dụng
              <Text className='font-bold'> hoàn toàn miễn phí </Text>
              giúp bạn
              <Text className='font-bold text-blue-500'> theo dõi lượng calo tiêu thụ </Text>
              và cung cấp một số thực phẩm phù hợp với nhu cầu của bạn
            </Text>
            <Text className="text-lg text-center mt-4">
              Chúng tôi cần thu thập một số thông tin về cơ thể của bạn để sử dụng ứng dụng. Nhấn nút
              <Text className='font-bold text-blue-500'> "Tiếp theo" </Text>
              để bắt đầu
            </Text>
          </ScrollView>
        </ProgressStep>
        <ProgressStep
          label="Bước thứ 2"
          buttonNextText='Tiếp theo'
          buttonNextTextColor='#3b82f6'
          buttonPreviousText='Quay lại'
          buttonPreviousTextColor='#3b82f6'
          buttonNextDisabled={Object.keys(errors).length !== 0}
        >
          <ScrollView>
            <Text className="text-2xl font-bold text-center text-slate-600 mb-4">
              Nhập thông tin BMR
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="flex-row items-center border-b border-sky-600 rounded w-full">
                  <TextInput
                    className="flex-1"
                    placeholder="Chiều cao"
                    keyboardType="numeric"
                    placeholderTextColor="#888"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <Text className="text-gray-500">(cm)</Text>
                </View>
              )}
              name="height"
            />
            {errors.height && <Text className='mb-2 text-red-500'>Chiều cao không được để trống</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="flex-row items-center border-b border-sky-600 rounded w-full">
                  <TextInput
                    className='flex-1'
                    placeholder="Cân nặng (kg)"
                    keyboardType='numeric'
                    placeholderTextColor="#888"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <Text className="text-gray-500">(kg)</Text>
                </View>
              )}
              name="weight"
            />
            {errors.weight && <Text className='mb-2 text-red-500'>Cân nặng không được để trống</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="flex-row items-center border-b border-sky-600 rounded w-full">
                  <TextInput
                    className='flex-1'
                    placeholder="Tuổi của bạn"
                    keyboardType='numeric'
                    placeholderTextColor="#888"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <Text className="text-gray-500">(tuổi)</Text>
                </View>
              )}
              name="age"
            />
            {errors.age && <Text className='mb-2 text-red-500'>Tuổi của bạn không được để trống</Text>}
            <View className='w-full items-start'>
              <Text className="text-lg text-center mt-4 mb-2 text-blue-500 font-semibold">
                - Giới tính
              </Text>
              <View className='flex flex-row items-center gap-2'>
                <RadioButton
                  value="male"
                  status={gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('male')}
                  color='#3b82f6'
                />
                <Text className="text-base text-center text-blue-500 font-semibold">Nam  🧔🏻‍♂️</Text>
              </View>
              <View className='flex flex-row items-center gap-2'>
                <RadioButton
                  value="female"
                  status={gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('female')}
                  color='#3b82f6'
                />
                <Text className="text-base text-center text-blue-500 font-semibold">Nữ     👩🏻‍🦰</Text>
              </View>
              <Text className="text-lg text-center mt-4 mb-2 text-blue-500 font-semibold">
                - Chọn hoạt động đúng nhất với bạn
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className='flex flex-col items-center gap-2 bg-blue-100 p-4 rounded-xl'>
                  <RadioButton
                    value="inactive"
                    status={intensity === 'inactive' ? 'checked' : 'unchecked'}
                    onPress={() => setIntensity('inactive')}
                    color='#3b82f6'
                  />
                  <Text className="text-3xl">🧘🏻‍♂️</Text>
                  <Text className="text-base text-center text-blue-500 font-semibold">Ít hoạt động</Text>
                </View>
                <View className='flex flex-col items-center gap-2 ml-4 bg-blue-100 p-4 rounded-xl'>
                  <RadioButton
                    value="low"
                    status={intensity === 'low' ? 'checked' : 'unchecked'}
                    onPress={() => setIntensity('low')}
                    color='#3b82f6'
                  />
                  <Text className="text-3xl">🧘🏻‍♂️</Text>
                  <Text className="text-base text-center text-blue-500 font-semibold">Ít thể dục</Text>
                </View>
                <View className='flex flex-col items-center gap-2 ml-4 bg-blue-100 p-4 rounded-xl'>
                  <RadioButton
                    value="medium"
                    status={intensity === 'medium' ? 'checked' : 'unchecked'}
                    onPress={() => setIntensity('medium')}
                    color='#3b82f6'
                  />
                  <Text className="text-3xl">🧍🏻‍♂️</Text>
                  <Text className="text-base text-center text-blue-500 font-semibold">Vừa phải</Text>
                </View>
                <View className='flex flex-col items-center gap-2 ml-4 bg-blue-100 p-4 rounded-xl'>
                  <RadioButton
                    value="high"
                    status={intensity === 'high' ? 'checked' : 'unchecked'}
                    onPress={() => setIntensity('high')}
                    color='#3b82f6'
                  />
                  <Text className="text-3xl">🚶🏻‍♂️</Text>
                  <Text className="text-base text-center text-blue-500 font-semibold">Năng động</Text>
                </View>
                <View className='flex flex-col items-center gap-2 ml-4 bg-blue-100 p-4 rounded-xl'>
                  <RadioButton
                    value="super"
                    status={intensity === 'super' ? 'checked' : 'unchecked'}
                    onPress={() => setIntensity('super')}
                    color='#3b82f6'
                  />
                  <Text className="text-3xl">🏋🏻‍♂️</Text>
                  <Text className="text-base text-center text-blue-500 font-semibold">Cường độ cao</Text>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </ProgressStep>
        <ProgressStep
          label="Kết thúc"
          buttonPreviousText='Quay lại'
          buttonPreviousTextColor='#3b82f6'
          buttonFinishTextColor='#3b82f6'
          buttonFinishText='Hoàn tất'
          onSubmit={handleSubmit(onSubmit)}
        >
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Firework />
            <Text className="text-lg text-center mt-4">
              Chúc mừng bạn đã hoàn tất việc nhập thông tin cơ bản. Nhấn nút
              <Text className='font-bold text-blue-500'> "Hoàn tất" </Text>
              để lưu thông tin.
            </Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  )
}
