import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { auth, firebase } from '../../firebase'

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //       if (user) {
    //         navigation.replace("Home")
    //       }
    //     })
    
    //     return unsubscribe
    //   }, [])

        //Handle Forgot Password
    const onForgotPasswordPress = () => 
    {
        navigation.navigate('ForgotPassword')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Main Menu')
                        // navigation.navigate('HomeScreen', {user}) 
                        // returns to old main menu
                    }, { merge: true }) 
                    .catch(error => {
                        alert(error)
                    });
            })

         
            .catch(error => {
                alert(error)
            })
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style={styles.title}>  Music {'\n'} Royale</Text>
                <Image
                    style={styles.logo}
                    source={require('../../assets/Lobby/Musiclogo.png')} />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                    <Text onPress={onForgotPasswordPress} style={styles.footerLink}>Forgot Password?</Text>    
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}