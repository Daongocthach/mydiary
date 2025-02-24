import { IconSymbol } from '@/components/ui/IconSymbol'
import { ReactNode, useState } from 'react'
import { Text, View, Modal, StyleSheet, Alert, Pressable } from 'react-native'

type CustomModalProps = {
    isError?: boolean
    children: ReactNode
    modalVisible: boolean
    setModalVisible: any
    handle?: any
}

export function CustomModal({
    isError = true,
    children,
    modalVisible,
    setModalVisible,
    handle
}: CustomModalProps) {

    const handleClose = () => {
        setModalVisible(!modalVisible)
    }

    const handleSumbit = () => {
        if (!isError) {
            setModalVisible(!modalVisible)
        }
        handle && handle()
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.')
                setModalVisible(!modalVisible)
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable
                        onPress={handleClose}>
                        <IconSymbol name='xmark.app.fill' size={20} color='gray' />
                    </Pressable>
                    {children}
                    <View className='flex flex-row items-center gap-2 mt-4'>
                        <Pressable onPress={handleClose}>
                            <Text style={{ fontWeight: 500, fontSize: 14, marginRight: 10 }} className='text-gray-500'>
                                Hủy
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleSumbit}>
                            <Text style={styles.textStyle}>Gửi đi</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})