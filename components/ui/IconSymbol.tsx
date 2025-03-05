// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolWeight } from 'expo-symbols'
import React from 'react'
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native'

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'gearshape.fill': 'settings',
  'person.fill': 'person',
  'chart.bar.fill': 'bar-chart',
  'takeoutbag.and.cup.and.straw.fill': 'fastfood',
  'eye.fill': 'visibility',
  'eye.slash.fill': 'visibility-off',
  'plus': 'add',
  'cup.and.saucer.fill': 'local-cafe',
  'applelogo': 'emoji-food-beverage',
  'carrot.fill': 'local-florist',
  'fish.fill': 'set-meal',
  'carton.fill': 'icecream',
  'birthday.cake.fill': 'cake',
  'bowl.fill': 'ramen-dining',
  'baguette': 'lunch-dining',
  'arrow.triangle.turn.up.right.diamond': 'soup-kitchen',
  'snowflake': 'ac-unit',
  'leaf.fill': 'eco',
  'bell.badge.slash': 'notifications-none',
  'chevron.right.2': 'chevron-right',
  'dot.square.fill': 'square',
  'flame.fill': 'local-fire-department',
  'xmark.app.fill': 'close',
  'chevron.up.2': 'expand-less',
  'chevron.down.2': 'expand-more',
  'trophy': 'emoji-events',
  "exclamationmark.triangle": "warning",
  "leaf.circle.fill": "energy-savings-leaf",
  'clock.arrow.circlepath': 'query-builder',
  'circle.dotted.circle': 'radio-button-checked',
  'moon.fill': 'nights-stay',
  'sun.max.fill': 'wb-sunny',
  'arrow.right.circle.fill': 'login',
  'arrow.left.circle.fill': 'logout',
  'key.fill': 'password',
  'person.badge.plus.fill': 'person-add',
  'delete.left.fill': 'delete',
  'chevron.left.2': 'chevron-left',
  'fork.knife': 'restaurant',
  'wineglass.fill': 'wine-bar',
  'cup.and.heat.waves.fill': 'coffee',
  'drop.fill': 'water-drop',
  'grass': 'grass',
  'takeoutbag.and.cup.and.straw': 'ramen-dining',
  'book.fill': 'menu-book',
  'clock.fill': 'history',
  'pencil.circle.fill': 'edit',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>

export type IconSymbolName = keyof typeof MAPPING

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />
}
