export interface AtomPosition {
  x: number;
  y: number;
  z: number;
}

export interface Atom {
  element: string;
  position: AtomPosition;
  color: string;
}

export interface ElectronicProperties {
  bandGap: number;          // in eV
  conductivityType: 'metallic' | 'semiconducting' | 'insulating';
  ferroelectric: boolean;
  magneticOrder: 'paramagnetic' | 'ferromagnetic' | 'antiferromagnetic';
}

export interface ThermalProperties {
  meltingPoint: number;     // in Kelvin
  thermalConductivity: number; // in W/(m·K)
  thermalExpansion: number;    // in 10^-6/K
}

export interface StructuralProperties {
  spaceGroup: string;
  tolerance: number;        // Goldschmidt tolerance factor
  octahedralTilt: number;  // in degrees
  ionicRadii: {
    aSite: number;         // in Angstroms
    bSite: number;         // in Angstroms
    oxygen: number;        // in Angstroms
  };
}

export interface CrystalStructure {
  atoms: Atom[];
  latticeConstant: number;
  electronic: ElectronicProperties;
  thermal: ThermalProperties;
  structural: StructuralProperties;
}