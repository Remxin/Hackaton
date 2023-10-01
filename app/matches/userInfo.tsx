import styles from './userInfo.module.css'

export default function UserInfo() {

    return <div className={styles.user_info_whole_view}>
        <h1 className={styles.header}>User info:</h1>
        <div className={styles.user_info_wrapper}></div>
    </div>

}