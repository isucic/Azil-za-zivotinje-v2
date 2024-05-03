import styles from './Toggle.module.css'

function Toggle({onChange}){
    return (
        <label className={styles.switch}>
            <input type="checkbox" onChange={onChange}/>
            <span className={styles.slider} />
        </label>
    )
}

export default Toggle;