"use client"

import { useRouter } from "next/navigation";
import Button from "./button";
import styles from "./landing_page.module.css"
import Image from "next/image"

export default function Home() {

  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}></div>
      <div className={styles.hello}>
        <h2>Dont choose your future.</h2>
        <h2>Let your future choose you.</h2>
        <div className={styles.buttons}>
          <Button text="sign in" onClick={() => router.push("./login")}></Button>
          <Button text="explore" onClick={() => router.push("./swipe")}></Button>
        </div>
      </div>
    </div >
  );
}
