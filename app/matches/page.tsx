import MatchesView from './matchesView'
import styles from './page.module.css'
import Tile from './tile'
import UserInfo from './userInfo'

export default function Page() {

    return <div className={styles.wrapper}>
        <UserInfo />
        <MatchesView />
    </div>

}