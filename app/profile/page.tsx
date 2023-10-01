"use client"
import styles from "./style.module.css"
import Additionals from "./additionals"
import { useEffect, useState } from "react"
import { appConstants } from "@/constants/app";
import { useUserContext } from "@/contexts/UserContext";
interface additional {
    name: string;
    value: number;
}
export default function Profile() {
  const [fetchData, setFetchData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const {user} = useUserContext()
  const [num, setNum] = useState(0)
  useEffect(() => {
      setIsLoading(true);
      setIsError(false);
      // fetch(`${appConstants.appIP}` + `/user/${user.id}`, {
      fetch(`${appConstants.appIP}` + `/api/user/87e36282-d56d-4dfb-b96c-2767c76a2766`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setFetchData(result);
            let arr:{id: string, subjectName: string, percent: number}[] = result.data.maturaScore
            let doubles: string[] = []
            arr.forEach(x=>{
                if(!doubles.includes(JSON.stringify({percent: x.percent, subjectName: x.subjectName}))){
                    doubles.push(JSON.stringify({percent: x.percent, subjectName: x.subjectName}))
            }
            })
            console.log(doubles)
            doubles.forEach(h=>{
                let x = JSON.parse(h)
                let {type, name} = JSON.parse(x.subjectName)
                setNum(num+1)
                console.log(num)
                switch(type){
                    case "podstawa":
                        switch(name){
                            case "matematyka": setMat(""+x.percent); break
                            case "polski": setPol(""+x.percent); break
                            case "angielski": setAng(""+x.percent); break
                        }break
                    default:
                        if(num<doubles.length)
                        data[type].push({name, value: x.percent})
                
            }
            })
          },
          (error) => {
            setIsError(error);
            //   setLoading(false);
          }
        )
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }, []);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mat, setMat] = useState("")
    const [pol, setPol] = useState("")
    const [ang, setAng] = useState("")
    const [data, setData] = useState<{[key:string]:additional[]}>({rozszerzenie: [], kwalifikacja: [], olimpiada: []})
    const onSubmit = (e: any) => {
        e.preventDefault();
        let fetchDataLocal = {name,email,password,examBasic:{mat,pol,ang},additionals:data}
        let arr = [
            {name: JSON.stringify({type: "podstawa", name: "matematyka"}), percent: mat},
            {name: JSON.stringify({type: "podstawa", name: "polski"}), percent: pol},
            {name: JSON.stringify({type: "podstawa", name: "angielski"}),percent: ang},
        ]
        data.rozszerzenie.forEach(x=>{
            arr.push({name: JSON.stringify({type: "rozszerzenie", name: x.name}), percent: x.value.toString()})
        })
        data.kwalifikacja.forEach(x=>{
            arr.push({name: JSON.stringify({type: "kwalifikacja", name: x.name}), percent: x.value.toString()})
        })
        data.olimpiada.forEach(x=>{
            arr.push({name: JSON.stringify({type: "olimpiada", name: x.name}), percent: x.value.toString()})
        })
        let options: {} = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(arr)
          } 
        fetch(`${appConstants.appIP}` + `/api/user/87e36282-d56d-4dfb-b96c-2767c76a2766`, options)
            .then((res) => res.json())
            .then(
              (result) => {
                
                alert("poszło")
              },
              (error) => {
                setIsError(error);
                //   setLoading(false);
              }
            )
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
        alert(JSON.stringify(arr, null,2))
    }
    return(
        <div>
        <form onSubmit={onSubmit} method="POST">
        <div className={styles.background}>
            <div className={styles.nickHeader}>Profil</div>
                <div className={styles.basicResultsBackground}>
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
                </div>
                <div className={styles.basicResultsBackground}>
                <h2 className={styles.title}>Wyniki z matury podstawowej:</h2>
                <div style={{textAlign: "center"}}>
                    matematyka: 
                    <input type="number" onChange={(e)=>{setMat(e.target.value)}} value={mat} className={styles.numInput} min="0" max="100" step="1"/>%
                    polski: 
                    <input type="number" onChange={(e)=>{setPol(e.target.value)}} value={pol} className={styles.numInput} min="0" max="100" step="1" />%
                    język obcy: 
                    <input type="number" onChange={(e)=>{setAng(e.target.value)}} value={ang} className={styles.numInput} min="0" max="100" step="1" />%
                    </div>
                </div>
                <Additionals data={data} setData={setData}/>
        </div>
                <input type="submit" value="zapisz zmiany" className={styles.submit}/>
            </form>

        </div>
    )
}