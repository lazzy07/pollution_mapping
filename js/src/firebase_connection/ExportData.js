import mongoose from "mongoose";
import DatabaseConnection from "../database/Database"
const firebase =require("firebase");

export const sendSensorData = () => {
  DatabaseConnection.getSensorData().then((data) => {
    var config = {
      apiKey: "AIzaSyBoYFEArk2kHqldJB5jlpWVXTivXGXJi4s",
      authDomain: "pollution-mapping-kandy.firebaseapp.com",
      databaseURL: "https://pollution-mapping-kandy.firebaseio.com",
      projectId: "pollution-mapping-kandy",
      storageBucket: "pollution-mapping-kandy.appspot.com",
      messagingSenderId: "511565171864"
    };
    firebase.initializeApp(config);

    var db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    data.map(elem => {
      let saveElem = elem;
      saveElem.time = String(saveElem.time);
      let save = JSON.parse(JSON.stringify(saveElem));
      db.collection("sensor_data").add(save).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      }).catch(error => {
        console.error("Error adding document: ", error);
      })
    })
  });
}

export const sendImageData = () => {
  DatabaseConnection.getImageData().then((data) => {
    var config = {
      apiKey: "AIzaSyBoYFEArk2kHqldJB5jlpWVXTivXGXJi4s",
      authDomain: "pollution-mapping-kandy.firebaseapp.com",
      databaseURL: "https://pollution-mapping-kandy.firebaseio.com",
      projectId: "pollution-mapping-kandy",
      storageBucket: "pollution-mapping-kandy.appspot.com",
      messagingSenderId: "511565171864"
    };
    firebase.initializeApp(config);

    var db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    data.map((elem, index) => {
      let saveElem = elem;
      saveElem.time = String(saveElem.time);
      let save = JSON.parse(JSON.stringify(saveElem));
      db.collection("image_data").add(save).then(docRef => {
        console.log("Document written with ID: ", docRef.id + " index : " + index);
      }).catch(error => {
        console.error("Error adding document: ", error);
      })
    })
  })
}