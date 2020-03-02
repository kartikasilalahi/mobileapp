import React,{Component} from 'react';
import style from './../style/style'
import { View, Image, Text, ScrollView, AsyncStorage } from 'react-native';
import { Header, Button, Input, Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from './../support/apiUrl';

class Add extends Component {
    state = {
        caption : '', 
        image: null, 
        loading: false, 
        error: ''
    }

    onBtnSelectGaleryPress= async()=>{
        try {
            var img =await ImagePicker.openPicker({
                width: 700,
                height: 700,
                cropping: true,
                mediaType: 'photo'
            })
            this.setState({ image: img })    
        } catch (error) {
            console.log(error)
        }

    }
    
    onBtnOpenCameraPress = () => {
        ImagePicker.openCamera({
            width: 700,
            height: 700,
            cropping: true
        }).then(img => {
            this.setState({ image: img })
        }).catch(cancel => {
            console.log(cancel)
        });
    }

    render() { 
        return (
            <View style={{flex:1}}>
                <Header
                    leftComponent={{
                        text:'Select Image',
                        style: { color: 'black', fontSize: 18, fontWeight: '700' } 
                    }}
                    leftContainerStyle={{ flex: 3 }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25,
                        elevation: 2
                    }}
                />
                <ScrollView>
                    <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                        <Button
                            icon={
                                <Icon
                                    name="photo-library"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Select from Gallery"
                            onPress={this.onBtnSelectGaleryPress}
                            containerStyle={{ marginBottom : 15 }}
                            buttonStyle={{ backgroundColor: 'black' }}
                        />
                        <Button
                            icon={
                                <Icon
                                    name="photo-camera"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Open Camera"
                            onPress={this.onBtnOpenCameraPress}
                            buttonStyle={{ backgroundColor: 'black' }}
                        />
                        <Input
                            placeholder='Caption'
                            onChangeText={(text) => this.setState({ caption: text })}
                            value={this.state.caption}
                        />
                    </View>
                    <View style={{ marginHorizontal: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Image 
                            source={{ uri: this.state.image ? this.state.image.path : null }} 
                            style={{ height: 350, width: '100%' }} 
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
 
export default Add;
