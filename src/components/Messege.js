import React from "react"
import {formatRelative} from 'date-fns'

import '../Style/App.css'

// import { Message } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'

const Messege=({
    createdAt=null,
    text='',
    displayName='',
    photoURL='',

})=>{
    return (<div className='Messeges'>

           <Card className="display-messege"
             header={photoURL?(
                     <img src={photoURL} alt="Avatar" width={45} height= {45} />
                    ): null}
             meta={displayName? <p>{displayName}</p>: null}
             description={<div>
               {createdAt?.seconds?(
                <span>
                    {formatRelative(new Date(createdAt.seconds*1000), new Date())}
                </span>
                ): null}
             <p>{text}</p>
             </div>}
            />

        {/* {photoURL?(
            <img src={photoURL} alt="Avatar" width={45} height= {45} />
        ): null}
        <Message positive>
           {displayName? <p>{displayName}</p>: null}
             {
               createdAt?.seconds?(
                <span>
                    {formatRelative(new Date(createdAt.seconds*1000), new Date())}
                </span>
                ): null
              }
             <p>{text}</p>
         </Message> */}

        {/* {displayName? <p>{displayName}</p>: null}
        {
            createdAt?.seconds?(
                <span>
                    {formatRelative(new Date(createdAt.seconds*1000), new Date())}
                </span>
            ): null
        }
        <p>{text}</p> */}
    </div> 
      
    )
}

export default Messege;