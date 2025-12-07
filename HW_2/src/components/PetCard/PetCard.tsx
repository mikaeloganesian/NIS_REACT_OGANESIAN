import React, { useReducer, useCallback, useRef, useEffect, memo } from 'react';
import type { Pet, PetState, PetMood } from '../../types/Pet';
import { useEventLog } from '../../context/EventContext';
import { usePetLifecycle } from '../../hooks/usePetLifecycle';
import { ActionButton } from '../PetActions/ActionButton.styled';
import styles from './PetCard.module.scss';

interface PetCardProps {
  pet: Pet;
}

type PetReducerAction = 
  | { type: 'FEED'; payload?: number }
  | { type: 'LEVEL_UP' }
  | { type: 'CHEER' }
  | { type: 'RESET' }
  | { type: 'SET_ENERGY'; payload: number }
  | { type: 'SET_MOOD'; payload: PetMood };

const petReducer = (state: PetState, action: PetReducerAction): PetState => {
  switch (action.type) {
    case 'FEED':
      return {
        ...state,
        energy: Math.min(100, state.energy + (action.payload || 20)),
      };
    case 'LEVEL_UP':
      return {
        ...state,
        level: state.level + 1,
      };
    case 'CHEER':
      const newMood: PetMood = 
        state.mood === 'inactive' ? 'sad' :
        state.mood === 'sad' ? 'neutral' :
        state.mood === 'neutral' ? 'content' :
        state.mood === 'content' ? 'happy' :
        'happy';
      return {
        ...state,
        mood: newMood,
      };
    case 'RESET':
      return {
        ...state,
        energy: state.originalEnergy,
        mood: state.originalMood,
        level: state.originalLevel,
      };
    case 'SET_ENERGY':
      return {
        ...state,
        energy: action.payload,
      };
    case 'SET_MOOD':
      return {
        ...state,
        mood: action.payload,
      };
    default:
      return state;
  }
};

const PetCardComponent: React.FC<PetCardProps> = ({ pet }) => {
  const { addEvent } = useEventLog();
  const avatarRef = useRef<HTMLDivElement>(null);

  const initialState: PetState = {
    ...pet,
    originalEnergy: pet.energy,
    originalMood: pet.mood,
    originalLevel: pet.level,
  };

  const [state, dispatch] = useReducer(petReducer, initialState);

  const handleFeed = useCallback(() => {
    dispatch({ type: 'FEED', payload: 20 });
    addEvent(`${pet.name} was fed! Energy +20`);
  }, [pet.name, addEvent]);

  const handleLevelUp = useCallback(() => {
    dispatch({ type: 'LEVEL_UP' });
    addEvent(`${pet.name} leveled up! New level: ${state.level + 1}`);
  }, [pet.name, state.level, addEvent]);

  const handleCheer = useCallback(() => {
    dispatch({ type: 'CHEER' });
    addEvent(`${pet.name} was cheered! Mood improved`);
  }, [pet.name, addEvent]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
    addEvent(`${pet.name} was reset to original state`);
  }, [pet.name, addEvent]);

  const setEnergy = useCallback((energy: number) => {
    dispatch({ type: 'SET_ENERGY', payload: energy });
  }, []);

  const setMood = useCallback((mood: PetMood) => {
    dispatch({ type: 'SET_MOOD', payload: mood });
  }, []);

  usePetLifecycle({
    energy: state.energy,
    setEnergy,
    intervalSeconds: 5,
  });

  // Update mood immediately when energy changes significantly
  useEffect(() => {
    if (state.energy === 0) {
      setMood('inactive');
    } else if (state.energy <= 20) {
      setMood('sad');
    } else if (state.energy <= 40) {
      setMood('neutral');
    } else if (state.energy <= 70) {
      setMood('content');
    } else {
      setMood('happy');
    }
  }, [state.energy, setMood]);

  useEffect(() => {
    if (avatarRef.current) {
      const moodColors: Record<PetMood, string> = {
        happy: '#4caf50',
        content: '#8bc34a',
        neutral: '#ff9800',
        sad: '#f44336',
        inactive: '#9e9e9e',
      };

      avatarRef.current.style.boxShadow = `0 0 20px ${moodColors[state.mood]}`;
    }
  }, [state.mood]);

  const isDisabled = state.energy === 0 || state.mood === 'inactive';

  const moodStyle: React.CSSProperties = {
    borderColor: 
      state.mood === 'happy' ? '#4caf50' :
      state.mood === 'content' ? '#8bc34a' :
      state.mood === 'neutral' ? '#ff9800' :
      state.mood === 'sad' ? '#f44336' :
      '#9e9e9e',
  };

  return (
    <div className={styles.card} style={moodStyle}>
      <div 
        ref={avatarRef} 
        className={styles.avatar}
        style={{
          opacity: isDisabled ? 0.5 : 1,
        }}
      >
        {state.avatar}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{state.name}</h3>
        <p className={styles.species}>{state.species}</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Level:</span>
            <strong>{state.level}</strong>
          </div>
          <div className={styles.stat}>
            <span>Energy:</span>
            <strong>{state.energy}%</strong>
          </div>
          <div className={styles.stat}>
            <span>Mood:</span>
            <strong className={styles.mood}>{state.mood}</strong>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <ActionButton
          onClick={handleFeed}
          disabled={isDisabled}
          variant="feed"
        >
          Feed
        </ActionButton>
        <ActionButton
          onClick={handleLevelUp}
          disabled={isDisabled}
          variant="levelup"
        >
          Level Up
        </ActionButton>
        <ActionButton
          onClick={handleCheer}
          disabled={isDisabled}
          variant="cheer"
        >
          Cheer
        </ActionButton>
        <ActionButton
          onClick={handleReset}
          disabled={false}
          variant="reset"
        >
          Reset
        </ActionButton>
      </div>
    </div>
  );
};

export const PetCard = memo(PetCardComponent);
