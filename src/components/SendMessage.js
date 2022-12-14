import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'

const style = {
    // form: `h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0`,
    form:`max-w-[728px] w-full fixed bg-gray-800 h-14 flex z-10 items-center bottom-0`,
    input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
    button: `w-[20%] bg-green-500 h-14`,
  };

const SendMessage = ({scroll}) => {
    const [input, setInput] = useState('')
    const sendMessage = async (e) => {
        e.preventDefault()
        if(input === ''){
            alert('No message to be sent')
            return
        }
        const {uid, displayName} = auth.currentUser
        await addDoc(collection(db, 'messages'), {
            text: input,
            name: displayName,
            uid,
            timestamp:serverTimestamp()
        })
        setInput('')
        scroll.current.scrollIntoView({behavior: 'smooth'})
    }
  return (
    <div className='mt-[3rem]'>
    <form onSubmit={sendMessage} className={style.form}>
        <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type='text' placeholder='Message' />
        <button className={style.button} type='submit'>Send</button>
    </form>
    </div>
  )
}

export default SendMessage