import { isApiDefinitionList } from '../../../appManifest/apis';
import { isRecord } from '../../../appManifest/shared';
import { APP_ENVIRONMENT_IDS } from '../../../environments';
import type { InfraManifest } from '../../../types/infraManifest';
import type { InfraShape } from '../../../types/infraValidation';
import { infraFields } from './infraFields';
import { isInfraEnvironmentSpec } from './isInfraEnvironmentSpec';
import { isInfraShape } from './isInfraShape';

/** Validate standalone infrastructure without AppManifest, Deploy or provider package side effects. */
export function isInfraManifest(value: unknown): value is InfraManifest {
  return isInfraShape(value, {
    environments: isEnvironments,
    apis: (apis) => apis === undefined || isApiDefinitionList(apis),
    modules: infraFields.strings,
    modulesConfig: (config) => config === undefined || isRecord(config),
  } satisfies InfraShape<InfraManifest>);
}

/** Local is required; preview and production are optional but never inferred from arbitrary keys. */
function isEnvironments(value: unknown): boolean {
  if (!isRecord(value) || !isInfraEnvironmentSpec(value.local)) return false;
  return Object.entries(value).every(
    ([key, environment]) =>
      APP_ENVIRONMENT_IDS.some((id) => id === key) &&
      ((environment === undefined && key !== 'local') || isInfraEnvironmentSpec(environment)),
  );
}
