import { useEffect, useRef } from 'react';

interface UsePetLifecycleProps {
  energy: number;
  setEnergy: (energy: number) => void;
  intervalSeconds?: number;
}

export const usePetLifecycle = ({
  energy,
  setEnergy,
  intervalSeconds = 5,
}: UsePetLifecycleProps): void => {
  const energyRef = useRef(energy);
  
  // Update ref when energy changes
  useEffect(() => {
    energyRef.current = energy;
  }, [energy]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentEnergy = energyRef.current;
      const newEnergy = Math.max(0, currentEnergy - 5);
      setEnergy(newEnergy);
    }, intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [intervalSeconds, setEnergy]);
};
