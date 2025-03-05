import { create } from "zustand"
import { devtools, persist, createJSONStorage } from "zustand/middleware"
import Toast from 'react-native-toast-message'
import { asyncStorage } from "@/store/storage"
import { DiaryType } from "@/lib/types"

type StoreState = {
  isLoading: boolean
  todayDiary: DiaryType | null
  historyDiary: DiaryType[]
  setToDayDiary: (diary: DiaryType) => void
  setHistoryDiary: (diary: DiaryType[]) => void
  clearData: () => void
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        todayDiary: null,
        historyDiary: [],
        setToDayDiary: (diary) => {
          set({ todayDiary: diary })
        },
        setHistoryDiary: (payload) => {
          set({ historyDiary: payload })
        },
        clearData: () => {
          set({ todayDiary: null, historyDiary: [] })
        },
      }),
      {
        name: "mydiary",
        storage: createJSONStorage(() => asyncStorage),
        partialize: (state) => ({
          todayDiary: state.todayDiary,
          historyDiary: state.historyDiary,
        }),
      },
    ),
  ),
)

export default useStore
