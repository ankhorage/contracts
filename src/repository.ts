export interface AppRepositoryConfig {
  readonly provider: 'github';
  readonly owner: string;
  readonly name: string;
  readonly url: string;
  readonly defaultBranch: 'main';
}

export interface RepositoryConfig {
  repository?: AppRepositoryConfig;
}
