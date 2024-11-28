import React from 'react';
import { Settings, Atom, Zap, Thermometer, Box } from 'lucide-react';
import { CrystalStructure } from '../types/crystal';

interface ControlPanelProps {
  onASiteChange: (element: 'Sr' | 'Ba' | 'Ca') => void;
  onLatticeConstantChange: (value: number) => void;
  currentASite: string;
  currentLatticeConstant: number;
  structure: CrystalStructure;
}

export default function ControlPanel({
  onASiteChange,
  onLatticeConstantChange,
  currentASite,
  currentLatticeConstant,
  structure,
}: ControlPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-sky-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-sky-50 rounded-lg">
          <Settings className="w-5 h-5 text-black" />
        </div>
        <h2 className="text-xl font-semibold text-black">Crystal Controls</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-black mb-3">
            <Atom className="w-4 h-4" />
            A-site Cation
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Sr', 'Ba', 'Ca'].map((element) => (
              <button
                key={element}
                onClick={() => onASiteChange(element as 'Sr' | 'Ba' | 'Ca')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentASite === element
                    ? 'bg-black text-white shadow-md'
                    : 'bg-sky-50 text-black hover:bg-sky-100'
                }`}
              >
                {element}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-3">
            Lattice Constant (Å)
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="3.5"
              max="4.5"
              step="0.001"
              value={currentLatticeConstant}
              onChange={(e) => onLatticeConstantChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between text-sm">
              <span className="text-black/60">3.5 Å</span>
              <span className="font-medium text-black">{currentLatticeConstant.toFixed(3)} Å</span>
              <span className="text-black/60">4.5 Å</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-sky-50 rounded-lg">
            <h3 className="flex items-center gap-2 text-sm font-medium text-black mb-3">
              <Box className="w-4 h-4" />
              Structural Properties
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black/70">Formula</span>
                <span className="font-mono font-medium text-black">{currentASite}TiO₃</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Space Group</span>
                <span className="font-medium text-black">{structure.structural.spaceGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Tolerance Factor</span>
                <span className="font-medium text-black">{structure.structural.tolerance.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Octahedral Tilt</span>
                <span className="font-medium text-black">{structure.structural.octahedralTilt}°</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-sky-50 rounded-lg">
            <h3 className="flex items-center gap-2 text-sm font-medium text-black mb-3">
              <Zap className="w-4 h-4" />
              Electronic Properties
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black/70">Band Gap</span>
                <span className="font-medium text-black">{structure.electronic.bandGap} eV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Conductivity</span>
                <span className="font-medium text-black capitalize">{structure.electronic.conductivityType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Ferroelectric</span>
                <span className="font-medium text-black">{structure.electronic.ferroelectric ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Magnetic Order</span>
                <span className="font-medium text-black capitalize">{structure.electronic.magneticOrder}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-sky-50 rounded-lg">
            <h3 className="flex items-center gap-2 text-sm font-medium text-black mb-3">
              <Thermometer className="w-4 h-4" />
              Thermal Properties
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black/70">Melting Point</span>
                <span className="font-medium text-black">{structure.thermal.meltingPoint} K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Thermal Conductivity</span>
                <span className="font-medium text-black">{structure.thermal.thermalConductivity} W/(m·K)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Thermal Expansion</span>
                <span className="font-medium text-black">{structure.thermal.thermalExpansion} × 10⁻⁶/K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}