import { useRef } from 'react';
import { Sphere, Cylinder } from '@react-three/drei';
import { CrystalStructure } from '../types/crystal';
import { calculateBonds } from '../utils/bondCalculator';
import * as THREE from 'three';

interface CrystalModelProps {
  structure: CrystalStructure;
}

export default function CrystalModel({ structure }: CrystalModelProps) {
  const groupRef = useRef();

  const scale = structure.latticeConstant;
  const bondRadius = 0.03;
  const atomRadii = {
    O: 0.15,    // Oxygen atoms
    Ti: 0.2,    // B-site cation
    Sr: 0.25,   // A-site cations
    Ba: 0.25,
    Ca: 0.25
  };

  const bonds = calculateBonds(structure.atoms);

  return (
    <group ref={groupRef}>
      {/* Render atoms */}
      {structure.atoms.map((atom, index) => (
        <Sphere
          key={`atom-${index}`}
          args={[atomRadii[atom.element], 32, 32]}
          position={[
            atom.position.x * scale,
            atom.position.y * scale,
            atom.position.z * scale
          ]}
        >
          <meshStandardMaterial
            color={atom.color}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      ))}

      {/* Render bonds */}
      {bonds.map((bond, index) => {
        const start = new THREE.Vector3(
          bond.start.x * scale,
          bond.start.y * scale,
          bond.start.z * scale
        );
        const end = new THREE.Vector3(
          bond.end.x * scale,
          bond.end.y * scale,
          bond.end.z * scale
        );

        const distance = start.distanceTo(end);
        const position = start.clone().lerp(end, 0.5);
        const direction = end.clone().sub(start);
        const rotation = new THREE.Quaternion();
        const up = new THREE.Vector3(0, 1, 0);
        
        rotation.setFromUnitVectors(up, direction.normalize());

        return (
          <Cylinder
            key={`bond-${index}`}
            args={[bondRadius, bondRadius, distance]}
            position={[position.x, position.y, position.z]}
            rotation={new THREE.Euler().setFromQuaternion(rotation)}
          >
            <meshStandardMaterial
              color={bond.type === 'B-O' ? '#666666' : '#888888'}
              opacity={0.7}
              transparent
              roughness={0.4}
              metalness={0.3}
            />
          </Cylinder>
        );
      })}
    </group>
  );
}