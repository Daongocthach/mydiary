import { create } from "zustand"
import { devtools, persist, createJSONStorage } from "zustand/middleware"
import Toast from 'react-native-toast-message'
import { asyncStorage } from "@/store/storage"
import { BodyDataType, FoodItemType, FoodDailyItemType } from "@/lib/types"
import { FoodSamples } from "@/constants/FoodSamples"

type DataBMR = {
  bmr: number
  tdde: number
  bodyData: BodyDataType
}

type StoreState = {
  isLoading: boolean
  isLoggedIn: boolean
  todayCalories: number
  todayFoodList: FoodDailyItemType[]
  historyFoodList: FoodDailyItemType[]
  weekHistoryCalories: number[]
  foodList: FoodItemType[]
  bmr: number | null
  tdde: number | null
  bodyData: BodyDataType | {}
  signUp: (payload: { userName: string, displayName: string, password: string }) => void
  signIn: (payload: any, navigation: any) => void
  signOut: () => void
  addFood: (payload: FoodItemType) => void
  editFood: (payload: FoodItemType) => void
  deleteFood: (payload: string) => void
  saveData: (payload: DataBMR) => void
  removeData: () => void
  resetOnToday: () => void
  addTodayFood: (payload: FoodDailyItemType) => void
  editTodayFood: (payload: FoodDailyItemType) => void
  removeTodayFood: (payload: string) => void
  addHistoryFood: (payload: FoodDailyItemType) => void
  removeHistoryFood: (payload: string) => void
  editHistoryFood: (payload: FoodDailyItemType) => void
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        isLoggedIn: false,
        todayCalories: 0,
        bmr: null,
        tdde: null,
        bodyData: {},
        foodList: FoodSamples,
        todayFoodList: [],
        historyFoodList: [],
        weekHistoryCalories: [
          0, 0, 0, 0, 0, 0, 0
        ],
        addTodayFood: (payload: FoodDailyItemType) => {
          set((state) => ({
            todayFoodList: [...state.todayFoodList, payload],
            todayCalories: state.todayCalories + payload.calories,
            weekHistoryCalories: state.weekHistoryCalories.map((item, index) => {
              if (new Date().getDay() === 1 && index !== new Date().getDay()) {
                return 0
              }
              return index === new Date().getDay() ? item + payload.calories : item
            })
          }))
        },
        removeTodayFood: (payload: string) => {
          set((state) => ({
            todayFoodList: state.todayFoodList.filter((item) => item.id !== payload),
            todayCalories: state.todayCalories - (state.todayFoodList.find((item) => item.id === payload)?.calories || 0),
            weekHistoryCalories: state.weekHistoryCalories.map((item, index) => 
              index === new Date().getDay() ? item - (state.todayFoodList.find((item) => item.id === payload)?.calories || 0) : item)
          }))
        },
        editTodayFood: (payload: FoodDailyItemType) => {
          set((state) => ({
            todayFoodList: state.todayFoodList.map((item) => item.id === payload.id ? payload : item),
            todayCalories: state.todayCalories - (state.todayFoodList.find((item) => item.id === payload.id)?.calories || 0) + payload.calories,
            weekHistoryCalories: state.weekHistoryCalories.map((item, index) =>
              index === new Date().getDay() ? item - (state.todayFoodList.find((item) => item.id === payload.id)?.calories || 0) + payload.calories : item)
          }))
        },
        addHistoryFood: (payload: FoodDailyItemType) => {
          set((state) => ({
            historyFoodList: [...state.historyFoodList, payload]
          }))
        },
        removeHistoryFood: (payload: string) => {
          set((state) => ({
            historyFoodList: state.historyFoodList.filter((item) => item.id !== payload)
          }))
        },
        editHistoryFood: (payload: FoodDailyItemType) => {
          set((state) => ({
            historyFoodList: state.historyFoodList.map((item) => item.id === payload.id ? payload : item)
          }))
        },
        addFood: (payload: FoodItemType) => {
          set((state) => ({
            foodList: [...state.foodList, payload]
          }))
          Toast.show({ type: 'success', text1: 'Thành công', text2: 'Thêm thực phẩm thành công' })
        },
        editFood: (payload: FoodItemType) => {
          set((state) => ({
            foodList: state.foodList.map((item) => item.id === payload.id ? payload : item)
          }))
          Toast.show({ type: 'success', text1: 'Thành công', text2: 'Sửa thực phẩm thành công' })
        },
        deleteFood: (payload: string) => {
          set((state) => ({
            foodList: state.foodList.filter((item) => item.id !== payload)
          }))
          Toast.show({ type: 'success', text1: 'Thành công', text2: 'Xóa thực phẩm thành công' })
        },
        saveData(payload) {
          set({
            bmr: payload.bmr,
            tdde: payload.tdde,
            bodyData: payload.bodyData
          })
          Toast.show({ type: 'success', text1: 'Lưu thông tin thành công', text2: 'Ứng dụng đã sẵn sàng!' })
        },
        resetOnToday() {
          set({
            todayCalories: 0,
            todayFoodList: []
          })
        },
        removeData() {
          set({
            bmr: null,
            tdde: null,
            bodyData: {},
            foodList: FoodSamples,
            todayCalories: 0,
            todayFoodList: [],
            historyFoodList: []
          })
          Toast.show({ type: 'success', text1: 'Xóa thông tin thành công', text2: 'Vui lòng nhập lại để tiếp tục sử dụng!' })
        },
        signUp: async (payload) => {
          Toast.show({ type: 'success', text1: 'Đăng ký thành công', text2: 'Đăng nhập để tiếp tục!' })
        },
        signIn: async (payload) => {
          Toast.show({ type: 'success', text1: 'Đăng nhập thành công', text2: 'Chào mừng trở lại!' })
        },
        signOut: () => {
          Toast.show({ type: 'success', text1: 'Đăng xuất thành công', text2: 'Đăng nhập để đồng bộ đám mây!' })
        },

      }),
      {
        name: "calogo",
        storage: createJSONStorage(() => asyncStorage),
        partialize: (state) => ({
          isLoggedIn: state.isLoggedIn,
          bmr: state.bmr,
          tdde: state.tdde,
          bodyData: state.bodyData,
          foodList: state.foodList,
          todayFoodList: state.todayFoodList,
          todayCalories: state.todayCalories,
          historyFoodList: state.historyFoodList,
          weekHistoryCalories: state.weekHistoryCalories
        }),
      },
    ),
  ),
)

export default useStore
