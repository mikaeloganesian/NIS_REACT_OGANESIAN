export type PetMood = 'happy' | 'content' | 'neutral' | 'sad' | 'inactive';

export type PetSpecies = 'cyber-wolf' | 'data-dragon' | 'quantum-cat' | 'neural-bear' | 'matrix-fox';

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  mood: PetMood;
  energy: number;
  level: number;
  avatar: string;
}

export interface PetAction {
  type: 'FEED' | 'LEVEL_UP' | 'CHEER' | 'RESET';
  payload?: number;
}

export interface PetState extends Pet {
  originalEnergy: number;
  originalMood: PetMood;
  originalLevel: number;
}
