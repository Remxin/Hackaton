"use client"

import { useState } from 'react'
import styles from './userInfo.module.css'

export default function UserInfo() {

    const [view, setView] = useState<'maturaForm' | 'main' | 'rating'>('main')
    // const {} = useFetchUserData()
    let matura
    let universities = []

    const info_view = <div>
        <p>
            <b>name: </b>username<br />
            <b>email: </b>email<br />
        </p>
        <div className='flex justify-between mt-4'>
            <div className='w-1/2 text-center'>
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
            <div className='w-1/2 text-center'>
                <b>your universities</b><br />
                {universities.length === 0 &&
                    <p className='text-left p-4'>here you can add universities that you attended to</p>
                }
                <input className={styles.input} type="text" /><br />
                <button className={styles.button}>add university</button><br />
                <button className={styles.button}>rate your universities</button><br />
            </div>
        </div>
    </div>

    return <div className={styles.user_info_whole_view}>
        <h1 className={styles.header}>User info:</h1>
        <div className={styles.user_info}>
            {view === 'maturaForm' && <></>}
            {view === 'main' && info_view}
            {view === 'rating' && <></>}
        </div>
    </div>
}