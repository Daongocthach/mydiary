import React from 'react'
import { Pressable, Text, StyleSheet, Image, Dimensions } from 'react-native'

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }: { item: any, index: number }) => {
  return (
    <Pressable style={styles.container} key={index} onPress={() => {}}>
      <Image
        source={item.imgUrl}
        style={styles.image}
      />
      <Text style={styles.header}>{item.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 10,
    shadowColor: '#1f2937',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 1,
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 8,
  },
  header: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '500',
    paddingTop: 10,
    textAlign: 'center',
  },
})

export default CarouselCardItem