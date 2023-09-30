import styles from "./style.module.css"
import Image from 'next/image'

export default function Navbar() {
  return (

    <nav className={`${styles.nav} h-full`}>
          <Image
      src="/assets/logo4.png"
      alt="logo"
    />
      <a href="/profile"className={styles.navText}>Profil</a>
    
      <text className={styles.navText}>PL/EN</text>
    </nav>
  )
}

