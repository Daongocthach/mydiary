import { PropsWithChildren, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

import { IconSymbol } from '@/components/ui/IconSymbol'
import { useColorScheme } from '@/hooks/useColorScheme'

export function Collapsible({ children, title, isTrue }: PropsWithChildren & { title: string, isTrue?: boolean }) {
  const [isOpen, setIsOpen] = useState(isTrue ? true :false)
  const theme = useColorScheme() ?? 'light'

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Text className='text-sky-600' style={{ fontSize: 15, fontWeight: 600, marginRight: 5 }}>- {title}</Text>
        <IconSymbol name={isOpen ? 'chevron.up.2' : 'chevron.down.2'} size={20} color={'#0284c7'} />
      </TouchableOpacity>
      {isOpen && <View>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
