import React from 'react';
import ReactDom from 'react-dom'
import { CaronaRoot } from './CaronaRoot';
// import { ensureFColor } from '../Imports'
import { ImportGoogleFont } from '../Helper';
import { DeWonder, WonderRequest } from '../../srcFunctions/common/WonderData';
import './Project3Styles.css'

import { promiseDefault, XmlToJson } from '../../srcFunctions/common/FBF_Helpers';
import { WonderClient } from './WonderClient';
import { ensureBristolImports } from 'bristolboard';
import { Database } from '../../srcFunctions/common/WonderData/WonderDataImports';

import * as FirebaseStorage from 'firebase/storage'
import { initializeApp } from "firebase/app";



const firebaseConfig = {
    apiKey: "AIzaSyB6sxpDxkJBe0NH1fxELf0sIBv0Hkj-CTg",
    authDomain: "gdsn3-22.firebaseapp.com",
    projectId: "gdsn3-22",
    storageBucket: "gdsn3-22.appspot.com",
    messagingSenderId: "313682922460",
    appId: "1:313682922460:web:b1518f7872c162c0559d19",
    measurementId: "G-WP9L26XNR0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = FirebaseStorage.getStorage(firebaseApp);

if (typeof window != "undefined") {
    window['FirebaseStorage'] = FirebaseStorage
    // window['firebaseFile'] = firebaseFile
    // window['downloadFirebaseFile'] = downloadFirebaseFile
    // window['uploadFirebaseFile'] = uploadFirebaseFile
    // window['firebaseFileExists'] = firebaseFileExists
}
// import * as soda from 'soda-js'
ensureBristolImports();
ImportGoogleFont('Ubuntu:wght@400;700')

window['WonderRequest'] = WonderRequest;
window['WonderClient'] = WonderClient
window['DeWonder'] = DeWonder;
window['database'] = new Database({
    async readFile<T>(path: string): Promise<T | { error: string }> {
        if (path.startsWith('./')) {
            path = path.substring(2)
        }
        if (path.startsWith('/')) {
            path = path.substring(1)
        }


        let reference = FirebaseStorage.ref(firebaseStorage,"data/" +  path)
        let url = await promiseDefault(FirebaseStorage.getDownloadURL(reference), "NOT_FOUND")
        if (url == "NOT_FOUND") {
            return { error: "File doesn't exist: " + path }
        } 
        let resp = await fetch(url)
        let blob = await resp.blob()
        let result = await blob.text();
        //await fetch(`http://${location.hostname}:5001/gdsn3-22/us-central1/Data/${path}`)
        let resultJson = JSON.parse(result)//await result.json()
        console.log(`Client got file ${path}`, resultJson)
        return resultJson;
    },
    async writeFile<T>(path: string, data: T | string): Promise<'success' | string> {
        let reference = FirebaseStorage.ref(firebaseStorage, "data/" + path);

        return new Promise((acc)=>{FirebaseStorage.uploadString(reference, typeof data == 'string' ? data : JSON.stringify(data)).then(()=>acc('success')).catch(err=>{acc(JSON.stringify(err))})})
        
    },
    async exists(path: string) {
        if (path.startsWith('./')) {
            path = path.substring(2)
        }
        if (path.startsWith('/')) {
            path = path.substring(1)
        }
        let reference = FirebaseStorage.ref(firebaseStorage,"data/" + path)
        let url = await promiseDefault(FirebaseStorage.getDownloadURL(reference), "NOT_FOUND")
        return (url != "NOT_FOUND")

        // return firebaseFileExists(path);
        // let result = await fetch(`http://${location.hostname}:5001/gdsn3-22/us-central1/DataExists/${path}`)
        // let resultText = await result.text()
        // console.log(`Checking if ${path} exists`)
        // return resultText.toLowerCase() == 'true'
    }
})

window['XmlToJson'] = XmlToJson
// window["sodaConsumer"] = new soda.Consumer("explore.data.gov")
let mainContainer = document.getElementById('root')
if (!mainContainer) {
    mainContainer = document.createElement('div');
    document.body.append(mainContainer);
    mainContainer.style.position = 'absolute'
    mainContainer.style.left = '0px'
    mainContainer.style.right = '0px'
    mainContainer.style.top = '0px'
    mainContainer.style.bottom = '0px'
}
document.body.style.overflowY = 'hidden'
mainContainer.style.overflowY = 'hidden'
ReactDom.render(<CaronaRoot />, mainContainer);
