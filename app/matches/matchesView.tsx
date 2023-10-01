"use client"
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import Tile from './tile'

export default function MatchesView() {

    const router = useRouter()

    const matches: string[] = [
        '74d5bc18-a824-4337-a6b3-a979f8adfa3d',
        '2c9c5b37-f452-46eb-bdc1-ecd830e30c4b',
        '4313f2b-60fe-45dc-8f26-269b4c2900f6'
    ]

    return <div className={styles.matches_view}>
        <h1 className={styles.header}>Your matches:</h1>
        <div className={styles.matches}>
            {matches.map((element, index) => {
                return <Tile id={element} key={index} />
            })}
            <button className={styles.start_swiping} onClick={() => router.push('./swipe')}>Start Swiping</button>
        </div>
    </div>

}