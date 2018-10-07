import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({quality: 0.1, base64: true});
      photo = {
        ...photo,
        uploaded: false,
      }
      this.setState({photo})
    }
  };

  uploadPic = () => {
    if(this.state.photo){
      if(this.state.photo.uploaded){
        alert("Already uploaded");
      }else{
        this.props.uploadPicToServer(this.state.photo);
        this.setState({
          photo: {
            ...this.state.photo,
            uploaded: true
          }
        })
      }
    }else{
      alert("No pic")
    }
  }

  showPhoto = () => {
    if(this.state.photo){
      return <Image style={{width:null, height:"100%"}} source={{uri: this.state.photo.uri}}/>
    }else{
      return <View/>
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center'
              }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.snap();
                  }}>
                  <Text
                    style={{ fontSize: 22, marginBottom: 20, color: 'white' }}>
                    {' '}Take Pic{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.uploadPic();
                  }}>
                  <Text
                    style={{ fontSize: 22, marginBottom: 20, color: 'white' }}>
                    {' '}Upload Pic{' '}
                  </Text>
                </TouchableOpacity>
            </View>
          </Camera>
          <View style={{flex: 0.2}}>
            {this.showPhoto()}
          </View>
        </View>
      );
    }
  }
}