import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,  FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './mainLobby_styles';
import { db, auths, firebase } from '../../firebase'
import SendMessage from './SendMessage';
import { useNavigation } from '@react-navigation/core';
import { useNavigate } from 'react-router-dom';
import ToolBar from '../MainScreen/ToolBar';



export default function LobbyScreen(props) {
    const username = props.extraData.username
    const id = props.extraData.id
    const navigation = useNavigation()

    const findOnPress = () => {
        navigation.navigate("Find Lobby")
      }

      const mp3OnPress = (id) => {
        navigation.navigate("MP3")
    }

    const QuizOnPress = () => {
        navigation.navigate("Quiz")
    }

    const createOnPress = () => {
        db.collection('Lobby').doc(id).set({
            id: id,
            player: [username],
            privacy: false,
            password: '',
            name: username + ' Lobby',
            owner: username,
        })
        navigation.navigate("Create Lobby")
    }

    return(

        // <View style={styles.container}>

            <SafeAreaView
            // Logo
                style={{ flex: 1, width: '100%', marginBottom: -25}}
                keyboardShouldPersistTaps="always">
                <View style={styles.container}>

                <Text style={styles.title}>  Music {'\n'} Royale</Text>
                <Image
                    style={styles.logo}
                    source={require('../../assets/Lobby/Musiclogo.png')} />

                {/* Buttons  */}
                {/* <View style={styles.container}> */}
                    <TouchableOpacity  style={styles.button} onPress={() => QuizOnPress()}>
                        <Image style={styles.button}
                            source={require('../../assets/Lobby/buttonBackground.png')}/>
                        <Text style={styles.buttontext}>Quiz </Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button} onPress = {() => mp3OnPress()}>
                        <Image style={styles.button}
                            source={require('../../assets/Lobby/buttonBackground.png')}/>
                        <Text style={styles.buttontext}>Music Player</Text>
                    </TouchableOpacity>
                    

                    {/* Called the toolbar screen  */}
                    <ToolBar colorStatus={[true,true,true]}/>

                    {/* footnote
                    <Image style={styles.footnote}
                        source={require('../../assets/Lobby/footnote.png')}>
                    </Image>
                    <View style={styles.footnote}> 

                    </View> */}
                </View>
            </SafeAreaView>
        // </View>
    )
}