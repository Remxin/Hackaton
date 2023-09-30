import styles from "./style.module.css"
export default function Additionals() {
    return(
        <div className={styles.basicResultsBackground}>
            <h2 className={styles.title}>Wyniki z matury rozszerzonej i pozostałe osiągnięcia:</h2>
            <table>
                <tbody>
                    <tr>
                        <td><span>dodaj rozszerzenie maturalne: </span></td>
                        <td><select className={styles.select} name="" id="">{}</select></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><span>dodaj egzamin zawodowy: </span></td>
                        <td><select className={styles.select} name="" id="">{}</select></td>
                    </tr>
                    <tr>
                        <td><span>dodaj olimpiadę: </span></td>
                        <td><select className={styles.select} name="" id="">{}</select></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}