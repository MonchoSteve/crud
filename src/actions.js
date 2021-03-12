import {firebaseApp} from './firebase'
import firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const getCollection = async(collection) =>{
    const result = { statusResponse : false, data: null, error: null}
    try{
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))    
        result.statusResponse = true
        result.data = arrayData
    }catch(error){

        result.error = error

    }

    return result
}

export const addDocument = async(collection, data)=>{
    const result = {statusResponse : false, data: null, error: null}
    try{
        const response = await db.collection(collection).add(data)
        result.data = { id: response.id}
        result.statusResponse = true
        result.data = response 
    }catch(error){
        result.error = error
    }
    return result
}

export const updateDocument = async(collection, id, data)=>{
    const result = {statusResponse : false, data: null, error: null}

    try {

        const response = await db.collection(collection).doc(id).update(data)
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }

    return result
}

export const deleteDocument = async(collection, id, data)=>{

    const result ={statusResponse: false, data: null, error: null}

    try {
        
        const result = await db.collection(collection).doc(id).delete(data)
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }

    return result
}