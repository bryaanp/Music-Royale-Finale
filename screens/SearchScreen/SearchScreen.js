import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchUserItem from '../../components/search/userItem'
import { queryUsers } from './user'
import styles from './styles'

const SearchScreen = () => {
    const [textInput, setTextInput] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    useEffect(() => {
        console.log(textInput)
        queryUsers(textInput)
            .then(setSearchUsers)
    }, [textInput])

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                onChangeText={setTextInput}
                style={styles.textInput}
                placeholder={'Search User'}
            />
            <FlatList
                data={searchUsers}
                renderItem={({ item }) => <SearchUserItem item={item} />}
                keyExtractor={(item) => item.id}

            />
        </SafeAreaView>
    )
}

export default SearchScreen
