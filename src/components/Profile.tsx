import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContents}>
      <img src="https://github.com/jamallc.png" alt="profile photo"/>
      <div>
        <strong>Weber Rocha</strong> 
        <p>
          <img src="icons/level.svg" alt="icon level up"/>
          Level 1
        </p>
      </div>
    </div>
  );
}