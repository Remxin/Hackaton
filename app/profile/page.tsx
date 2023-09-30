import styles from "./style.module.css"
import Additionals from "./additionals"
export default function Profile() {
    return(
        <div className={styles.background}>
            <div className={styles.nickHeader}>Profil</div>
            <form action="" method="POST">
                <div className={styles.basicResultsBackground}>
                    <h2 className={styles.title}>Dane użytkownika:</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>login: </td>
                                <td><input type="text" className={styles.textInput}/><br /></td>
                            </tr>
                            <tr>
                                <td>e-mail: </td>
                                <td><input type="text" className={styles.textInput} /><br /></td>
                            </tr>
                            <tr>
                                <td>password: </td>
                                <td><input type="password" className={styles.textInput} /><br /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.basicResultsBackground}>
                <h2 className={styles.title}>Wyniki z matury podstawowej:</h2>
                    matematyka: 
                    <input type="number" className={styles.numInput} min="0" max="100" step="1"/>%
                    polski: 
                    <input type="number" className={styles.numInput} min="0" max="100" step="1" />%
                    język obcy: 
                    <input type="number" className={styles.numInput} min="0" max="100" step="1" />%
                </div>
                <Additionals/>
            </form>

        </div>
    )
}