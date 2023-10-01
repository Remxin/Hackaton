'use client'
import styles from "./style.module.css"
import selectData from "./achivments.js"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
interface additional {
    name: string;
    value: number;
}
export default function Additionals({data, setData}:{data:{ [key: string]: additional[]; }, setData:Dispatch<SetStateAction<{ [key: string]: additional[]; }>>}) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
        console.log(e.target.value)
        console.log(e.target.name)
        if (e.target.name === "rozszerzenie" || e.target.name === "kwalifikacja" || e.target.name === "olimpiada") {
            data[e.target.name].push({name: e.target.value, value: 0})
            setData(p => ({ ...data }))
        }
    }
    
    function changeAdditionalNumber(event: ChangeEvent<HTMLInputElement>): void {
        console.log(event.target.name, event.target.value)
        let category: string = JSON.parse(event.target.name).category 
        data[category] = data[category].map(x => x.name == JSON.parse(event.target.name).name?{name: x.name, value: parseInt(event.target.value)}:x)
        setData(p => ({ ...data }))
    }

    return(
        <div className={styles.basicResultsBackground}>
            <h2 className={styles.title}>Wyniki z matury rozszerzonej i pozostałe osiągnięcia:</h2>
            <table style={{margin: "auto"}}>
                <tbody>
                    <tr>
                        <td><span>dodaj rozszerzenie maturalne: </span></td>
                        <td><select onChange={handleChange} className={styles.select} name="rozszerzenie" id="">{selectData.rozszerzenia.map(x=><option key={x}>{x}</option>)}</select></td>
                        <td></td>
                    </tr>
                    {data.rozszerzenie.map((x,i)=><tr key={`rozszerzenie${i}`}>
                        <td>&emsp; {x.name}:</td>
                        <td><input type="number" name={JSON.stringify({name: x.name, category: "rozszerzenie"})} onChange={changeAdditionalNumber} value={x.value} className={styles.numberLongerInput}/>%</td>
                    </tr>)}
                    <tr>
                        <td><span>dodaj egzamin zawodowy: </span></td>
                        <td><select onChange={handleChange} className={styles.select} name="kwalifikacja" id="">{selectData.kwalifikacje.map((x, i)=><option key={i}>{x}</option>)}</select></td>
                    </tr>
                    {data.kwalifikacja.map((x,i)=><tr key={`kwalifikacja${i}`}>
                        <td>&emsp; {x.name}:</td>
                        <td><input type="number" name={JSON.stringify({name: x.name, category: "kwalifikacja"})} onChange={changeAdditionalNumber} value={x.value} className={styles.numberLongerInput}/>%</td>
                    </tr>)}
                    <tr>
                        <td><span>dodaj olimpiadę: </span></td>
                        <td><select onChange={handleChange} className={styles.select} name="olimpiada" id="">{selectData.olimpiady.map(x=><option key={x}>{x}</option>)}</select></td>
                    </tr>
                    {data.olimpiada.map((x,i)=><tr key={`olimpiada${i}`}>
                        <td>&emsp; {x.name}:</td>
                        <td><input type="number" name={JSON.stringify({name: x.name, category: "olimpiada"})} onChange={changeAdditionalNumber} value={x.value} className={styles.numberLongerInput}/>%</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}