import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from "./components/Camera"
import openSocket from "socket.io-client";

import { CONNECTION_URL } from "./constants";

const socket = openSocket(CONNECTION_URL,{
  transports: ['websocket']
});
export default class App extends React.Component {

  // componentWillMount(){
  //   socket.emit("ADD_CAMERA");
  // }

  componentDidMount(){
    socket.on("connect", ()=> {
      socket.emit("ADD_CAMERA");
    })
  }

  uploadPicToServer = (pic) => {
    if(socket){
      console.log("Pic Uploaded");
      socket.emit("UPLOAD_PIC", pic)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera uploadPicToServer={this.uploadPicToServer}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
