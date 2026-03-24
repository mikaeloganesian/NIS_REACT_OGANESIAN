import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import type { Pet, PetSpecies } from '../types/Pet';
import { PetCard } from '../components/PetCard/PetCard';
import { EventLog } from '../components/EventLog/EventLog';
import petsData from '../data/pets.json';

export const Dashboard: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies | 'all'>('all');
  const [eventLogOpen, setEventLogOpen] = useState(false);

  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const loadedPets = petsData as Pet[];
      setPets(loadedPets);
      setLoading(false);
    };

    loadPets();
  }, []);

  const filteredPets = useMemo(() => {
    if (selectedSpecies === 'all') {
      return pets;
    }
    return pets.filter((pet) => pet.species === selectedSpecies);
  }, [pets, selectedSpecies]);

  const uniqueSpecies = useMemo(() => {
    const speciesSet = new Set<PetSpecies>(pets.map((pet) => pet.species));
    return Array.from(speciesSet);
  }, [pets]);

  const handleSpeciesChange = useCallback((event: { target: { value: unknown } }) => {
    setSelectedSpecies(event.target.value as PetSpecies | 'all');
  }, []);

  const toggleEventLog = useCallback(() => {
    setEventLogOpen((prev) => !prev);
  }, []);

  return (
    <Box className="dashboard-container">
      <Box className="dashboard-header">
        <h1 className="dashboard-title">Cyber Zoo 2077</h1>
        <Button
          variant="contained"
          startIcon={<MenuIcon />}
          onClick={toggleEventLog}
          sx={{
            backgroundColor: '#2196f3',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          Event Log
        </Button>
      </Box>

      <Box className="dashboard-filters">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="species-filter-label">Filter by Species</InputLabel>
          <Select
            labelId="species-filter-label"
            value={selectedSpecies}
            label="Filter by Species"
            onChange={handleSpeciesChange}
            sx={{
              backgroundColor: '#ffffff',
            }}
          >
            <MenuItem value="all">All Species</MenuItem>
            {uniqueSpecies.map((species) => (
              <MenuItem key={species} value={species}>
                {species.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="dashboard-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Box key={index} className="skeleton-card">
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="rectangular" width="100%" height={40} />
            </Box>
          ))
        ) : filteredPets.length === 0 ? (
          <Box className="empty-state">
            <p>No pets found for selected species.</p>
          </Box>
        ) : (
          filteredPets.map((pet) => <PetCard key={pet.id} pet={pet} />)
        )}
      </Box>

      <EventLog open={eventLogOpen} onClose={toggleEventLog} />
    </Box>
  );
};
