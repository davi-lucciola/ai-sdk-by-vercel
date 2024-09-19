import styles from './chat.module.css'
import { IconSend } from "../Icons"

export const ChatForm = () => {
    return (<form className={styles.form}>
        <input 
            className={styles.input} 
            placeholder="Digite sua mensagem..."
            required
        />
        <button  className={styles.btn}>
            <IconSend />
        </button>
    </form>)
}