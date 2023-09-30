"use client"

import { useRouter } from 'next/navigation';
import Button from './button';
import styles from './landing_page.module.css'
import Image from 'next/image'

export default function Home() {

  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        {/* <Image src={'/assets'}></Image> */}
        <h1>Studier</h1>
      </header>
      <div className={styles.main}>
        <h2>Don't choose your future.</h2>
        <h2>Let your future choose you.</h2>
        <div className={styles.buttons}>
          <Button text='sign in' onClick={() => { router.push('./login') }}></Button>
          <Button text='explore' onClick={() => console.log('route to explore')}></Button>
        </div>
      </div>
    </div >
  );
}
