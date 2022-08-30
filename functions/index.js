const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')

// const config = 
const firebaseConfig = {
    apiKey: "AIzaSyABLh8NQ2VD65yYnlU0O-romXQpF-DVY6o",
    authDomain: "location-picker-miniapp.firebaseapp.com",
    projectId: "location-picker-miniapp",
    storageBucket: "location-picker-miniapp.appspot.com",
    messagingSenderId: "517614445945",
    appId: "1:517614445945:web:d68c6e8c4539fb3425bba8",
    measurementId: "G-957QWFSL81"
};

const globalApp = admin.initializeApp(firebaseConfig)


const express = require('express');
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/location', (req, res) => {
    console.log(req.body)

    admin.firestore(globalApp).collection('locations').add(req.body).then(val => {
        res.status(201).json({
            error: false,
            success: true,
            metadata: val
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: true,
            success: false,
            message: 'Internal Server Error!',
        })
    })

})

exports.app = functions.https.onRequest(app);
