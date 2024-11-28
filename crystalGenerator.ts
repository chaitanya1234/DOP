import { CrystalStructure, Atom } from '../types/crystal';
import { calculateProperties } from './propertyCalculator';

const elementColors = {
  O: '#ff0000',  // Red for oxygen
  Ti: '#4a4a4a', // Grey for titanium
  Sr: '#00ff00', // Green for strontium
  Ba: '#0000ff', // Blue for barium
  Ca: '#ffff00', // Yellow for calcium
};

export const generatePerovskiteStructure = (
  asite: 'Sr' | 'Ba' | 'Ca' = 'Sr',
  bsite: 'Ti' = 'Ti',
  latticeConstant: number = 3.905
): CrystalStructure => {
  const atoms: Atom[] = [];

  // A-site cations at all corners
  const corners = [
    [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0],
    [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]
  ];
  
  corners.forEach(([x, y, z]) => {
    atoms.push({
      element: asite,
      position: { x, y, z },
      color: elementColors[asite]
    });
  });

  // B-site cation at body center
  atoms.push({
    element: bsite,
    position: { x: 0.5, y: 0.5, z: 0.5 },
    color: elementColors[bsite]
  });

  // Oxygen atoms at all face centers
  const faceCenters = [
    // XY faces (z = 0 and z = 1)
    [0.5, 0.5, 0], [0.5, 0.5, 1],
    // XZ faces (y = 0 and y = 1)
    [0.5, 0, 0.5], [0.5, 1, 0.5],
    // YZ faces (x = 0 and x = 1)
    [0, 0.5, 0.5], [1, 0.5, 0.5]
  ];

  faceCenters.forEach(([x, y, z]) => {
    atoms.push({
      element: 'O',
      position: { x, y, z },
      color: elementColors.O
    });
  });

  const properties = calculateProperties(asite);

  return {
    atoms,
    latticeConstant,
    ...properties
  };
};