export interface Progress {
  activeMaterialIndex: number;
  completedMaterialIndexes: number[];
  isCompleted?: boolean;
}

export interface UpdateProgressParams {
  activeMaterialIndex: number;
  completedMaterialIndexes: number[];
  isCompleted?: boolean;
}
