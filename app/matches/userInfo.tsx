"use client"

import { useRef, useState, useEffect } from 'react'
import styles from './userInfo.module.css'
import Profile from '@/components/matura/profile'

export default function UserInfo() {

    const [view, setView] = useState<'maturaForm' | 'main' | 'rating'>('main')
    const [universities, setUniversities] = useState<Array<string>>([])
    const getCookieValue = () => {
        let cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            if (cookie.split('=')[0] === 'universities') {
                if (cookie.split('=')[1] === '') return
                return JSON.parse(cookie.split('=')[1])
            }
        }
    }

    useEffect(() => {
        const data = getCookieValue()
        if (data != undefined) {
            setUniversities(data)
        }
    }, [])

    // const {} = useFetchUserData()

    const inputRef = useRef<HTMLInputElement>(null)

    const addUniversity = () => {
        if (inputRef.current === null) return
        const university_name = inputRef.current.value
        if (university_name === '') return
        let data = getCookieValue()
        if (!Array.isArray(data)) data = []
        data.push(university_name)
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 2);
        const expires = expirationDate.toUTCString();
        document.cookie = 'universities=' + JSON.stringify(data) + ';expires=' + expires
        setUniversities(data)
    }

    let matura

    const info_view = <div>
        <p>
            <b>name: </b>username<br />
            <b>email: </b>email<br />
        </p>
        <div className='flex justify-between mt-4'>
            <div className='w-1/2 text-center border-dashed border-2 p-4 rounded-xl'>
                <b>matura score</b><br />
                {matura === undefined ?
                    <>
                        <p className='text-left p-4'>add your matura score to see if you can make it to your dream university</p>
                        <button className={styles.button} onClick={() => setView('maturaForm')}>add matura score</button>
                    </>
                    :
                    <>
                        matura_score
                        <button className={styles.button} onClick={() => setView('maturaForm')}>edit matura score</button>
                    </>

                }
            </div>
            <div className='w-1/2 text-center border-dashed border-2 p-4 rounded-xl'>
                <b>your universities</b><br />
                <ul className='list-disc w-4 relative left-1/2 -translate-x-2/4'>
                    {universities.map((el, index) => {
                        return <li key={index}>{el}</li>
                    })}
                </ul>
                <br />
                {universities.length === 0 &&
                    <p className='text-left p-4'>here you can add universities that you attended to</p>
                }
                <input className={styles.input} ref={inputRef} type="text" /><br />
                <button className={styles.button} onClick={addUniversity}>add university</button><br />
                <button className={styles.button}>rate your universities</button><br />
            </div>
        </div>
    </div>

    return <div className={styles.user_info_whole_view}>
        <h1 className={styles.header}>User info:</h1>
        <div className={styles.user_info}>
            {view === 'maturaForm' && <><button onClick={() => setView('main')}>...go back</button><Profile /></>}
            {view === 'main' && info_view}
            {view === 'rating' && <></>}
        </div>
    </div>
}