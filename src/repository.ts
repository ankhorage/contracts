export interface RepositoryConfig {
  readonly provider: 'github';
  readonly owner: string;
  readonly name: string;
  readonly url: string;
  readonly defaultBranch: 'main';
}
