"use client"
import styles from "./style.module.css"
import Additionals from "./additionals"
import { useState } from "react"
interface additional {
    name: string;
    value: number;
}
export default function Profile() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mat, setMat] = useState("")
    const [pol, setPol] = useState("")
    const [ang, setAng] = useState("")
    const [data, setData] = useState<{ [key: string]: additional[] }>({ rozszerzenie: [], kwalifikacja: [], olimpiada: [] })
    const onSubmit = (e: any) => {
        e.preventDefault();
        let fetchData = { name, email, password, examBasic: { mat, pol, ang }, additionals: data }
        alert(JSON.stringify(fetchData, null, 2))
    }
    return (
        <div>
            <form onSubmit={onSubmit} method="POST">
                <div className={styles.background}>
                    {/* <div className={styles.nickHeader}>Profil</div> */}
                    {/* <div className={styles.basicResultsBackground}>
                    <h2 className={styles.title}>Dane użytkownika:</h2>
                    <table style={{margin: "auto"}}>
                        <tbody>
                            <tr>
                                <td>login: </td>
                                <td><input type="text" className={styles.textInput} onChange={(e)=>{setName(e.target.value)}} value={name}/><br /></td>
                            </tr>
                            <tr>
                                <td>e-mail: </td>
                                <td><input type="text" onChange={(e)=>{setEmail(e.target.value)}} value={email} className={styles.textInput} /><br /></td>
                            </tr>
                            <tr>
                                <td>password: </td>
                                <td><input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} className={styles.textInput} /><br /></td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
                    <div className={styles.basicResultsBackground}>
                        <h2 className={styles.title}>Wyniki z matury podstawowej:</h2>
                        <div style={{ textAlign: "center" }}>
                            matematyka:
                            <input type="number" onChange={(e) => { setMat(e.target.value) }} value={mat} className={styles.numInput} min="0" max="100" step="1" />%
                            polski:
                            <input type="number" onChange={(e) => { setPol(e.target.value) }} value={pol} className={styles.numInput} min="0" max="100" step="1" />%
                            język obcy:
                            <input type="number" onChange={(e) => { setAng(e.target.value) }} value={ang} className={styles.numInput} min="0" max="100" step="1" />%
                        </div>
                    </div>
                    <Additionals data={data} setData={setData} />
                </div>
                <input type="submit" value="zapisz zmiany" className={styles.submit} />
            </form>

        </div>
    )
}