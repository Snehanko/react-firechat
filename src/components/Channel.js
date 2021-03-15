import React, { useEffect, useState } from "react";
import '../Style/Channel.css'

import Messege from "./Messege";
import { Button,Form } from "semantic-ui-react";
import "../styles.css"

//Firebase App
import firebase from "firebase/app"
import "firebase/firestore"


const Channel=({user=null,db=null})=>{
    const [messeges,setMessege]=useState([]);
    const [newMessege,setNewMessege]=useState('');

    const {uid,displayName,photoURL}=user;

    useEffect(()=>{
        if(db){
            const unsubscribe=db.collection('messeges').orderBy('createdAt').limit(100).onSnapshot(querySnapshot=>{
                const data=querySnapshot.docs.map(doc=>({
                    ...doc.data(),
                    id: doc.id
                }))

                //Update state
                setMessege(data);
            });
            //Detach Listener
            return unsubscribe;
        }
    },[db])

    const handleOnChange= e =>{
        setNewMessege(e.target.value);
    }

    const handleOnSubmit=e=>{
        e.preventDefault();

        if(db){
            console.log(firebase.firestore.FieldValue)
            db.collection('messeges').add(
               { text:newMessege,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
    }

    return (
        <div className='Channel'>
         <ul style={{listStyleType: "none" }} >
            {messeges.map(messeges=>(
                <li key={messeges.id}><Messege {...messeges}/></li>
            ))}
         </ul>
          <Form onSubmit={handleOnSubmit}>
                 <Form.Field> 
                     <input type="text"
                      value={newMessege} 
                      onChange={handleOnChange}
                      placeholder="Type your messege here..."
                      className="messege" />
                 </Form.Field>
                    <Button type="submit" style={{textAlign:"center"}}>Submit</Button>
             </Form>
        </div>
    );
}

export default Channel;