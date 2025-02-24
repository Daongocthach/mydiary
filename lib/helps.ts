import AsyncStorage from '@react-native-async-storage/async-storage'

export function getRandomColor() {
  const colors =
    [
      'gray',
      '#00B2EE',
      '#CD6839',
      'purple',
      '#00EE76',
      '#A2B5CD',
      '#F08080',
      'orange',
      '#8968CD',
      '#CDB7B5',
      '#CD853F',
      '#EE6363',
      '#EE1289',
      '#EE30A7',
      '#A020F0',
      '#6C7B8B',
      '#8B1A1A'
    ]
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
