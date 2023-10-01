import styles from './tile.module.css'
import LazyImage from '@/components/lazyImage/LazyImage'

export default function Tile({ id }: { id: string }) {

    return <div className={styles.match}>
        <div className={styles.container}>
            {/* <LazyImage uuid={id} height={100} width={100} /> */}
        </div>
        <div className={styles.container}>
            <h1 className={styles.header}>nazwa_kierunku</h1>
            <p><b>uczelnia:</b> {'fetched uczelnia'}<br />
                <b>miasto:</b> {'fetched lokalizacja'}<br />
                <button className={styles.button}>zobacz detale</button>
            </p>
        </div>
    </div>

}