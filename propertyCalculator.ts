import { StructuralProperties, ElectronicProperties, ThermalProperties } from '../types/crystal';

interface MaterialProperties {
  electronic: ElectronicProperties;
  thermal: ThermalProperties;
  structural: StructuralProperties;
}

const MATERIAL_PROPERTIES: Record<string, MaterialProperties> = {
  SrTiO3: {
    electronic: {
      bandGap: 3.2,
      conductivityType: 'insulating',
      ferroelectric: false,
      magneticOrder: 'paramagnetic'
    },
    thermal: {
      meltingPoint: 2353,
      thermalConductivity: 11.2,
      thermalExpansion: 9.4
    },
    structural: {
      spaceGroup: 'Pm3m',
      tolerance: 1.002,
      octahedralTilt: 0,
      ionicRadii: {
        aSite: 1.44,
        bSite: 0.605,
        oxygen: 1.40
      }
    }
  },
  BaTiO3: {
    electronic: {
      bandGap: 3.2,
      conductivityType: 'insulating',
      ferroelectric: true,
      magneticOrder: 'paramagnetic'
    },
    thermal: {
      meltingPoint: 1898,
      thermalConductivity: 6.0,
      thermalExpansion: 11.3
    },
    structural: {
      spaceGroup: 'P4mm',
      tolerance: 1.062,
      octahedralTilt: 0,
      ionicRadii: {
        aSite: 1.61,
        bSite: 0.605,
        oxygen: 1.40
      }
    }
  },
  CaTiO3: {
    electronic: {
      bandGap: 3.5,
      conductivityType: 'insulating',
      ferroelectric: false,
      magneticOrder: 'paramagnetic'
    },
    thermal: {
      meltingPoint: 2365,
      thermalConductivity: 8.8,
      thermalExpansion: 12.2
    },
    structural: {
      spaceGroup: 'Pbnm',
      tolerance: 0.968,
      octahedralTilt: 10.1,
      ionicRadii: {
        aSite: 1.34,
        bSite: 0.605,
        oxygen: 1.40
      }
    }
  }
};

export const calculateProperties = (aSite: 'Sr' | 'Ba' | 'Ca'): MaterialProperties => {
  const formula = `${aSite}TiO3`;
  return MATERIAL_PROPERTIES[formula];
};