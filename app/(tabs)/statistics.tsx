import { useState } from 'react'
import { View, SectionList, Text, TouchableOpacity, ScrollView } from 'react-native'
import { FoodItem } from '@/components/FoodItem'
import { ClockInformation } from '@/components/ClockInformation'
import { BarChart } from "react-native-gifted-charts"
import { IconSymbol } from '@/components/ui/IconSymbol'
import { FoodDailyItemType } from '@/lib/types'
import useStore from '@/store'

type GroupedFood = {
  title: string
  data: FoodDailyItemType[]
}




const groupByDate = (data: FoodDailyItemType[]): GroupedFood[] => {
  const grouped = data.reduce<{ [key: string]: FoodDailyItemType[] }>((acc, item) => {
    const date = new Date(item.time).toLocaleDateString('vi-VN')
    if (!acc[date]) acc[date] = []
    acc[date].push(item)
    return acc
  }, {})

  return Object.entries(grouped).map(([title, data]) => ({ title, data }))
}

export default function Statistics() {
  const { historyFoodList, weekHistoryCalories } = useStore()
  const groupedData = groupByDate(historyFoodList)
  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

  const barData = weekHistoryCalories.map((calories, index) => {
    const frontColor = ['#177AD5', '#177AD5', '#177AD5'][index] || ''
  
    return {
      value: calories, 
      label: daysOfWeek[index], 
      frontColor: frontColor, 
    }
  })
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>(() => {
    const firstTitle = groupedData.length > 0 ? groupedData[0].title : null
    return firstTitle ? { [firstTitle]: true } : {}
  })

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <View className="flex-1 items-center relative px-4">
      <ClockInformation />
      <View className='mt-4'>
        <BarChart
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="lightgray"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
      <View className='w-full'>
        <SectionList
          contentContainerStyle={{ marginTop: 10 }}
          sections={groupedData}
          keyExtractor={(item, index) => item.name + index}
          renderSectionHeader={({ section: { title } }) => (
            <TouchableOpacity onPress={() => toggleSection(title)} className="mt-4 flex flex-row items-center gap-2">
              <IconSymbol name="circle.dotted.circle" size={15} color="#0284c7" />
              <Text className="text-lg font-bold text-sky-600">{`Ngày ${title}`}</Text>
              <IconSymbol name={expandedSections[title] ? 'chevron.up.2' : 'chevron.down.2'} size={20} color="#0284c7" />
            </TouchableOpacity>
          )}
          renderItem={({ item, section }) =>
            expandedSections[section.title] ? (
              <FoodItem key={item.id} {...item} />
            ) : null
          }
        />
      </View>
    </View>
  )
}
