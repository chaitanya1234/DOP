import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CrystalStructure } from '../types/crystal';
import CrystalModel from './CrystalModel';

interface CrystalViewerProps {
  structure: CrystalStructure;
}

export default function CrystalViewer({ structure }: CrystalViewerProps) {
  return (
    <div className="w-full h-[500px] bg-white rounded-lg overflow-hidden shadow-lg">
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <color attach="background" args={['white']} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <CrystalModel structure={structure} />
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}