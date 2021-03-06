import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}
interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  levelUp: () => void;
  startNewChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ 
  children, 
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const [activeChallenge, setActiveChallende] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengeCompleted', String(challengeCompleted))
  }, [level, currentExperience, challengeCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallende(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallende(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallende(null);
    setChallengeCompleted(challengeCompleted + 1)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengeCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
