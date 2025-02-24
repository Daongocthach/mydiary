import React, { useState } from "react"
import { Dropdown } from "react-native-element-dropdown"
import { StyleSheet } from "react-native"

type CustomDropDownProps = {
    selects: { label: string, value: string }[]
    select: string
    setSelect: (note: string) => void
    isDisabled?: boolean
    isSearch?: boolean
    placeholder?: string
}

export function CustomDropDown({
    selects,
    select,
    setSelect,
    isDisabled = false,
    isSearch,
    placeholder
}: CustomDropDownProps) {
    const [isFocus, setIsFocus] = useState(false)
    return (
        <Dropdown
            disable={isDisabled}
            style={{
                ...styles.dropdown,
                minHeight: 40,
                borderColor: '#0284c7',
                borderWidth: isFocus ? 2 : 1,
                borderRadius: 15,
                backgroundColor: '#f8fafc'
            }}
            placeholderStyle={{
                ...styles.placeholderStyle,
                color: isFocus ? '#0284c7' : '#888',
            }}
            selectedTextStyle={{
                ...styles.selectedTextStyle,
                color: '#0284c7',
            }}
            containerStyle={{ backgroundColor: 'white'}}
            itemTextStyle={{ color: '#6b7280' }}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={{
                ...styles.iconStyle,
                tintColor: isDisabled ? '#999' : '#0284c7',
            }}
            data={selects}
            maxHeight={250}
            search={isSearch}
            searchPlaceholder={"Nhập để tìm kiếm"}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={select}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
                setSelect(item.value)
                setIsFocus(false)
            }}
        />
    )
}


const styles = StyleSheet.create({
    dropdown: {
        height: 44,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 2,
        paddingHorizontal: 8,
        width: "100%",
    },
    placeholderStyle: {
        fontSize: 13,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: '#6b7280'
    },
})