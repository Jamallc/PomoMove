import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContents}>
      <img src="https://github.com/jamallc.png" alt="profile photo" />
      <div>
        <strong>Weber Rocha</strong>
        <p>
          <img src="icons/level.svg" alt="icon level up" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
