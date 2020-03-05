import React, { useEffect } from 'react';
import { Text, View } from 'react-native'
import { Header, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { onUserLogout } from '../redux/actions'
import { CommonActions } from '@react-navigation/native'

const Settings = ({ user, screenprops, onUserLogout }) => {

    useEffect(() => {
        if (!user) {
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Login' }
                ]
            })
            screenprops.dispatch(resetAction)

        }
    })

    // const onLogout = () => {
    //     console.log(screenprops)
    // }

    return (
        <View>
            <Header
                placement="left"
                centerComponent={{
                    text: 'Settings',
                    style: { color: 'black', fontSize: 18, fontWeight: '700' }
                }}
                leftComponent={{
                    icon: 'arrow-back',
                    color: 'black',
                    onPress: () => screenprops.goBack()
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                    elevation: 2,
                    marginTop: Platform.OS === 'ios' ? 0 : -25
                }}
            />
            <Button
                title="Log Out"
                containerStyle={{
                    marginVertical: 15,
                    marginHorizontal: 15,
                    borderWidth: 0.5,
                    borderColor: 'gray'
                }}
                buttonStyle={{ borderColor: 'gray' }}
                titleStyle={{ color: 'black' }}
                type='outline'
                onPress={() => onUserLogout()}
            />
        </View>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps, { onUserLogout })(Settings)