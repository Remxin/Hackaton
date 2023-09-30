import styles from "./style.module.css"
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className={styles.header}>
      <Image
        src="/assets/logo3.png"
        width={200}
        height={200}
        alt="logo"
      />
      <a href="/profile" className={styles.navText}>Profil</a>
      <text className={styles.navText}>PL/EN</text>
    </nav>
  )
}

