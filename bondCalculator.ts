import { Atom, AtomPosition } from '../types/crystal';

export interface Bond {
  start: AtomPosition;
  end: AtomPosition;
  type: 'A-O' | 'B-O';
}

const calculateDistance = (pos1: AtomPosition, pos2: AtomPosition): number => {
  const dx = Math.abs(pos1.x - pos2.x);
  const dy = Math.abs(pos1.y - pos2.y);
  const dz = Math.abs(pos1.z - pos2.z);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const calculateBonds = (atoms: Atom[]): Bond[] => {
  const bonds: Bond[] = [];
  const oxygenAtoms = atoms.filter(atom => atom.element === 'O');
  const bSiteAtom = atoms.find(atom => atom.element === 'Ti');
  const aSiteAtoms = atoms.filter(atom => ['Sr', 'Ba', 'Ca'].includes(atom.element));

  if (!bSiteAtom) return bonds;

  // Add B-site to oxygen bonds
  oxygenAtoms.forEach(oxygen => {
    const distance = calculateDistance(oxygen.position, bSiteAtom.position);
    if (distance <= 0.7) { // Threshold for B-O bonds
      bonds.push({
        start: oxygen.position,
        end: bSiteAtom.position,
        type: 'B-O'
      });
    }
  });

  // Add A-site to oxygen bonds
  aSiteAtoms.forEach(aSiteAtom => {
    oxygenAtoms.forEach(oxygen => {
      const distance = calculateDistance(oxygen.position, aSiteAtom.position);
      if (distance <= 0.9) { // Threshold for A-O bonds
        bonds.push({
          start: oxygen.position,
          end: aSiteAtom.position,
          type: 'A-O'
        });
      }
    });
  });

  return bonds;
};