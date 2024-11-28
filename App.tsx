import React, { useState } from 'react';
import CrystalViewer from './components/CrystalViewer';
import ControlPanel from './components/ControlPanel';
import { generatePerovskiteStructure } from './utils/crystalGenerator';

function App() {
  const [aSite, setASite] = useState<'Sr' | 'Ba' | 'Ca'>('Sr');
  const [latticeConstant, setLatticeConstant] = useState(3.905);

  const structure = generatePerovskiteStructure(aSite, 'Ti', latticeConstant);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-black rounded-lg">
            <svg
              className="w-6 h-6 text-sky-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-black">
            Interactive Perovskite Structure
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-1 rounded-xl shadow-lg">
            <CrystalViewer structure={structure} />
          </div>
          
          <div className="space-y-6">
            <ControlPanel
              onASiteChange={setASite}
              onLatticeConstantChange={setLatticeConstant}
              currentASite={aSite}
              currentLatticeConstant={latticeConstant}
              structure={structure}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;