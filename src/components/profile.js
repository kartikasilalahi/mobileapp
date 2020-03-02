import React from 'react';
import { Text, View, Platform, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Header, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { API_URL } from '../support/apiUrl'



const Profile = ({ navigation, user }) => {

    return (
        <View>
            <Header
                leftComponent={{
                    text: user.username,
                    style: { color: 'black', fontSize: 18, fontWeight: '700' }
                }}
                leftContainerStyle={{ flex: 4 }}
                rightComponent={{
                    icon: 'menu',
                    color: 'black',
                    onPress: () => navigation.toggleDrawer()
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                    marginTop: Platform.OS === 'ios' ? 0 : -25,
                    borderWidth: 0.5
                }}
            />
            <ScrollView>
                <ListItem
                    leftAvatar={{
                        source: {
                            uri: `${API_URL}${user.profileimage}`,
                            size: 'large'
                        }
                    }}
                    title={user.displayname}
                    subtitle={`Instagrin ${user.role}`}
                />
            </ScrollView>
        </View>
    )
}


const mapStateToProps = ({ auth, post }) => {
    var user = auth.user ? auth.user : { id: 0, displayname: '', profileimage: '' }
    var listPost = post.postList.filter((item, index) => {
        return user.id === item.userId
    })
    return {
        user,
        listPost
    }
}

export default connect(mapStateToProps)(Profile)