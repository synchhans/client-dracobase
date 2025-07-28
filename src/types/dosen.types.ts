export interface DosenRecentItem {
  id: string;
  accessedAt: string;
  workspace: {
    id: string;
    name: string;
    description: string;
    language: {
      id: string;
      name: string;
      icon: string;
    };
  };
}

export interface MahasiswaWorkspace {
  workspaceId: string;
  workspaceName: string;
  lastAccessed: string;
  mahasiswa: {
    _id: string;
    displayName: string;
    email: string;
    picture: string;
  };
  progressPercentage: number;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
