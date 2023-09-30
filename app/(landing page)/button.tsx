import styles from './button.module.css'

export default function Button({ text, onClick }: { text: string, onClick: () => void }) {

    return <div className={styles.button} onClick={onClick}>
        <p>
            {text}
        </p>
    </div>

}