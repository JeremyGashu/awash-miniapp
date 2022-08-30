const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')
const { parse } = require('json2csv');
const path = require('path')

const fields = ['name', 'region', 'city', 'woreda', 'hoseNo', 'type'];
const opts = { fields };

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
app.use('/download', express.static(path.join(__dirname, 'public')))

const fileType = 'text/plain'


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

app.get('/location', async (req, res) => {
    try {
        admin.firestore(globalApp).collection('locations').get().then(results => {
            let data = results.docs.map(doc => doc.data())
            const csv = parse(data, opts);
            res.attachment('locations.csv')
            res.type('txt')
            res.send(csv)

        }).catch(err => {
            res.status(500).json({ msg: 'Error' })
            console.error(err);
        })


    } catch (err) {

    }

})

exports.app = functions.https.onRequest(app);
