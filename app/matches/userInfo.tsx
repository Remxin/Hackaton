"use client"

import { useRef, useState, useEffect } from 'react'
import styles from './userInfo.module.css'
import Profile from '@/components/matura/profile'
import useFetch from '../hooks/useFetch'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'

export default function UserInfo() {

    const [view, setView] = useState<'maturaForm' | 'main' | 'rating'>('main')
    const [universities, setUniversities] = useState<Array<string>>([])
    const [userData, setUserData] = useState<{ name: string, email: string }>({ name: '', email: '' })

    const router = useRouter()

    const getCookieValue = (value: string) => {
        // let cookies =useCookies()
        // for (let cookie of cookies) {
        //     if (cookie.split('=')[0] === value) {
        //         let value = cookie.split('=')[1]
        //         if (value === '') return
        //         value = value.replace('3%40', '@')
        //         try {
        //             value = JSON.parse(value)
        //             return value
        //         } catch (error) {
        //             return value
        //         }
        //     }
        // }
    }

    console.log(userData);

    const url = '/api/user/by_email/' + getCookieValue('user_email')
    console.log(url);
    const { data } = useFetch(url)

    useEffect(() => {

        console.log(data);
        if (data === null || data.data === null || data.data.name === null || data.data.email === null) return
        if (typeof data.data.name != 'string' || typeof data.data.email != 'string') return

        setUserData({ name: data.data.name, email: data.data.email })
    }, [data])

    useEffect(() => {
        const data = getCookieValue('universities')
        if (data != undefined && Array.isArray(data)) {
            setUniversities(data)
        }
    }, [])


    const inputRef = useRef<HTMLInputElement>(null)

    const addUniversity = () => {
        if (inputRef.current === null) return
        const university_name = inputRef.current.value
        if (university_name === '') return
        let data = getCookieValue('universities')
        if (data === undefined) return
        if (!Array.isArray(data)) return
        // data.push(university_name)
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 2);
        const expires = expirationDate.toUTCString();
        document.cookie = 'universities=' + JSON.stringify(data) + ';expires=' + expires
        setUniversities(data)
    }

    let matura

    const info_view = <div>
        <p>
            <b>name: </b>{userData.name}<br />
            <b>email: </b>{userData.email}<br />
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
                <p>
                    {universities.map((el) => {
                        return <>{el}<br /></>
                    })}
                </p>
                <br />
                {universities.length === 0 &&
                    <p className='text-left p-4'>here you can add universities that you attended to</p>
                }
                <input className={styles.input} ref={inputRef} type="text" /><br />
                <button className={styles.button} onClick={addUniversity}>add university</button><br />
                <button className={styles.button} onClick={() => router.push('./opinions')}>rate your universities</button><br />
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