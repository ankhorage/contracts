# Public API

## Action

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:93:1`

## ActionType

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:42:1`

## AdapterId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:7:1`

## AdapterKind

Kind: `unknown`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:13:1`

## AdapterRef

Kind: `type`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:15:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| config | property | `import("..").SerializableValue \| undefined` | no |  |
| exportName | property | `string \| undefined` | no |  |
| id | property | `string` | yes |  |
| kind | property | `AdapterKind` | yes |  |
| packageName | property | `string \| undefined` | no |  |

## AdaptiveTabsConfig

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:168:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| implementation | property | `"adaptive" \| undefined` | no |  |
| native | property | `NativeTabsConfig \| undefined` | no |  |
| web | property | `HeadlessTabsPresentationConfig \| undefined` | no |  |

## AlertAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:53:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| payload | property | `{ message?: string; } \| undefined` | no |  |
| type | property | `"alert"` | yes |  |

## ANDROID_DEPLOYMENT_TRACKS

Kind: `value`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:166:14`

## ANDROID_RELEASE_STATUSES

Kind: `value`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:169:14`

## AndroidBuildArtifact

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:194:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| archiveUrl | property | `string` | yes |  |
| buildId | property | `string` | yes |  |
| buildProfile | property | `string` | yes |  |
| fingerprint | property | `string` | yes |  |
| provider | property | `string` | yes |  |
| versionCode | property | `number` | yes |  |

## AndroidBuildInspection

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:186:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fingerprint | property | `string` | yes |  |

## AndroidBuildInspectionRequest

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:178:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildProfile | property | `string` | yes |  |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| packageName | property | `string` | yes |  |
| projectRoot | property | `string` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |

## AndroidBuildRequest

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:190:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildProfile | property | `string` | yes |  |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| expectedFingerprint | property | `string` | yes |  |
| packageName | property | `string` | yes |  |
| projectRoot | property | `string` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |

## AndroidDeploymentBuilder

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:203:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildAsync | method | `(request: AndroidBuildRequest) => Promise<DeploymentProviderResult<AndroidBuildArtifact>>` | yes |  |
| inspectAsync | method | `(request: AndroidBuildInspectionRequest) => Promise<DeploymentProviderResult<AndroidBuildInspection>>` | yes |  |

## AndroidDeploymentIntent

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:172:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildProfile | property | `string` | yes |  |
| releaseStatus | property | `"draft" \| "completed"` | yes |  |
| track | property | `"production" \| "internal" \| "alpha" \| "beta"` | yes |  |

## AndroidDeploymentPublication

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:228:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildId | property | `string` | yes |  |
| buildProvider | property | `string` | yes |  |
| publishProvider | property | `string` | yes |  |
| releaseStatus | property | `"draft" \| "completed"` | yes |  |
| revision | property | `string` | yes |  |
| target | property | `"android"` | yes |  |
| track | property | `"production" \| "internal" \| "alpha" \| "beta"` | yes |  |
| versionCode | property | `number` | yes |  |

## AndroidDeploymentPublisher

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:239:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| inspectAsync | method | `(request: AndroidPublishInspectionRequest) => Promise<DeploymentProviderResult<AndroidPublishInspection>>` | yes |  |
| publishAsync | method | `(request: AndroidPublishRequest) => Promise<DeploymentProviderResult<AndroidDeploymentPublication>>` | yes |  |
| verifyAsync | method | `(request: AndroidPublishRequest) => Promise<DeploymentProviderResult<AndroidPublishInspection>>` | yes |  |

## AndroidDeploymentTrack

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:167:1`

## AndroidPublishInspection

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:217:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| activeVersionCodes | property | `readonly number[]` | yes |  |
| track | property | `"production" \| "internal" \| "alpha" \| "beta"` | yes |  |

## AndroidPublishInspectionRequest

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:210:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| packageName | property | `string` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |
| track | property | `"production" \| "internal" \| "alpha" \| "beta"` | yes |  |

## AndroidPublishRequest

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:222:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| artifact | property | `AndroidBuildArtifact` | yes |  |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| packageName | property | `string` | yes |  |
| releaseStatus | property | `"draft" \| "completed"` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |
| revision | property | `string` | yes |  |
| track | property | `"production" \| "internal" \| "alpha" \| "beta"` | yes |  |

## AndroidReleaseStatus

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:170:1`

## AnkhCapabilityId

Kind: `unknown`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:5:1`

## AnkhCommandCategory

Kind: `unknown`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:1:1`

## AnkhCommandDescriptor

Kind: `type`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:7:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| aliases | property | `readonly string[] \| undefined` | no |  |
| capability | property | ``${string}.${string}`` | yes |  |
| examples | property | `readonly string[] \| undefined` | no |  |
| path | property | `readonly string[]` | yes |  |
| summary | property | `string` | yes |  |

## AnkhCommandProviderManifest

Kind: `type`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:20:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `readonly `${string}.${string}`[]` | yes |  |
| category | property | `string` | yes |  |
| commands | property | `readonly AnkhCommandDescriptor[]` | yes |  |
| id | property | `string` | yes |  |
| version | property | `string` | yes |  |

## ANKHORAGE_CAPABILITY_NAMES

Kind: `value`
Module: `src/requirements.ts`
Source: `src/requirements.ts:16:14`

## ANKHORAGE_PERMISSION_NAMES

Kind: `value`
Module: `src/requirements.ts`
Source: `src/requirements.ts:3:14`

## AnkhorageCapabilityName

Kind: `unknown`
Module: `src/requirements.ts`
Source: `src/requirements.ts:27:1`

## AnkhoragePermissionName

Kind: `unknown`
Module: `src/requirements.ts`
Source: `src/requirements.ts:14:1`

## AnkhPackageMetadata

Kind: `type`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:38:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `readonly `${string}.${string}`[]` | yes |  |
| category | property | `string` | yes |  |
| provider | property | ``./${string}` \| null` | yes |  |
| structure | property | `AnkhStructureMetadata \| undefined` | no |  |

## AnkhProviderReference

Kind: `unknown`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:3:1`

## AnkhStructureMetadata

Kind: `type`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:33:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| output | property | `string` | yes |  |
| roots | property | `Readonly<Record<string, AnkhStructureRootMetadata>>` | yes |  |

## AnkhStructureRootMetadata

Kind: `type`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:28:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| export | property | `string` | yes |  |
| source | property | `string` | yes |  |

## ApiBaseDefinition

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:11:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credential | property | `CredentialRef \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| endpoints | property | `DataEndpointRegistry` | yes |  |
| id | property | `string` | yes |  |
| metadata | property | `import("..").SerializableValue \| undefined` | no |  |
| name | property | `string \| undefined` | no |  |
| origin | property | `ApiOrigin` | yes |  |
| protocol | property | `ApiProtocol` | yes |  |
| schemas | property | `Readonly<Record<string, import("./schemas").DataSchema>> \| undefined` | no |  |

## ApiDefinition

Kind: `unknown`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:61:1`

## ApiDefinitionRegistry

Kind: `unknown`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:64:1`

## ApiId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:1:1`

## ApiOrigin

Kind: `unknown`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:8:1`

## ApiProtocol

Kind: `unknown`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:9:1`

## APP_CATEGORIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:142:14`

## APP_DEPLOY_TARGET_IDS

Kind: `value`
Module: `src/deploy.ts`
Source: `src/deploy.ts:1:14`

## APP_ENVIRONMENT_IDS

Kind: `value`
Module: `src/environments.ts`
Source: `src/environments.ts:2:14`

## AppCategory

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:167:1`

## AppDeployAndroidTargetConfig

Kind: `type`
Module: `src/deploy.ts`
Source: `src/deploy.ts:15:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| enabled | property | `boolean` | yes |  |
| package | property | `string` | yes |  |
| providers | property | `AppDeployProviderSelection \| undefined` | no |  |
| scheme | property | `string \| undefined` | no |  |

## AppDeployIosTargetConfig

Kind: `type`
Module: `src/deploy.ts`
Source: `src/deploy.ts:23:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bundleIdentifier | property | `string` | yes |  |
| enabled | property | `boolean` | yes |  |
| providers | property | `AppDeployProviderSelection \| undefined` | no |  |
| scheme | property | `string \| undefined` | no |  |

## AppDeployManifest

Kind: `type`
Module: `src/deploy.ts`
Source: `src/deploy.ts:37:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| targets | property | `AppDeployTargets` | yes |  |

## AppDeployProviderSelection

Kind: `type`
Module: `src/deploy.ts`
Source: `src/deploy.ts:5:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| build | property | `string \| undefined` | no |  |
| publish | property | `string \| undefined` | no |  |

## AppDeployTargetId

Kind: `unknown`
Module: `src/deploy.ts`
Source: `src/deploy.ts:3:1`

## AppDeployTargets

Kind: `type`
Module: `src/deploy.ts`
Source: `src/deploy.ts:31:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| android | property | `AppDeployAndroidTargetConfig \| undefined` | no |  |
| ios | property | `AppDeployIosTargetConfig \| undefined` | no |  |
| web | property | `AppDeployWebTargetConfig \| undefined` | no |  |

## AppDeployWebTargetConfig

Kind: `type`
Module: `src/deploy.ts`
Source: `src/deploy.ts:10:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| enabled | property | `boolean` | yes |  |
| providers | property | `AppDeployProviderSelection \| undefined` | no |  |

## AppEnvironmentId

Kind: `unknown`
Module: `src/environments.ts`
Source: `src/environments.ts:4:1`

## AppManifest

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:271:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| activeThemeId | property | `string` | yes |  |
| activeThemeMode | property | `"dark" \| "light" \| undefined` | no |  |
| dataBindings | property | `ComponentDataBindingRegistry \| undefined` | no |  |
| dataSources | property | `DataSourceRegistry \| undefined` | no |  |
| deploy | property | `AppDeployManifest \| undefined` | no |  |
| infra | property | `InfraManifest` | yes |  |
| media | property | `MediaManifest \| undefined` | no |  |
| metadata | property | `{ name: string; slug: string; version: string; category: AppCategory; themeId: ThemeId; created?: string; updated?: string; }` | yes |  |
| navigator | property | `AppNavigatorManifest` | yes |  |
| repository | property | `RepositoryManifest \| undefined` | no |  |
| screens | property | `EntityRegistry<string, ScreenSpec, "id">` | yes |  |
| settings | property | `AppSettings` | yes |  |
| splashScreen | property | `SplashScreenSpec \| undefined` | no |  |
| state | property | `AppStateSpec \| undefined` | no |  |
| themes | property | `ThemeRegistry` | yes |  |

## AppManifestParseResult

Kind: `unknown`
Module: `src/types/appManifest.ts`
Source: `src/types/appManifest.ts:3:1`

## AppNavigatorManifest

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:265:1`

## AppSettings

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:264:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| localization | property | `{ defaultLocale: string; locales: string[]; }` | yes |  |

## AppStateSpec

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:4:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| persistence | property | `false \| undefined` | no |  |
| provider | property | `"legend"` | yes |  |

## AUTH_IDENTIFIER_KINDS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:7:14`

## AUTH_OAUTH_CANCELLATION_REASONS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:283:14`

## AUTH_OAUTH_ERROR_CODES

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:250:14`

## AUTH_OAUTH_ERROR_STAGES

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:240:14`

## AUTH_OAUTH_PROVIDER_IDS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:20:14`

## AUTH_OAUTH_SETUP_CALLBACK_ROLES

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:58:14`

## AUTH_OAUTH_SETUP_FIELD_PERSISTENCE_KINDS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:48:14`

## AUTH_OAUTH_SETUP_FIELD_SENSITIVITIES

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:55:14`

## AUTH_OAUTH_TRANSPORT_CANCELLATION_REASONS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:276:14`

## AUTH_OAUTH_TRANSPORT_ERROR_CODES

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:289:14`

## AUTH_OAUTH_TRANSPORT_IDS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:44:14`

## AUTH_PROFILE_CREATE_STRATEGIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:191:14`

## AUTH_PROFILE_FIELDS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:178:14`

## AUTH_PROFILE_PRIMARY_KEY_STRATEGIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:188:14`

## AUTH_PROFILE_UPDATE_STRATEGIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:194:14`

## AUTH_SCOPES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:169:14`

## AUTH_SIGN_IN_IDENTIFIERS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:172:14`

## AUTH_SIGN_UP_FIELDS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:10:14`

## AUTH_SIGN_UP_POLICIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:175:14`

## AuthAdapter

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:383:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `AuthAdapterCapabilities \| undefined` | no |  |
| getSession | method | `() => Promise<AuthResult<AuthSession \| null>>` | yes |  |
| oauth | property | `AuthOAuthAdapter \| undefined` | no |  |
| refreshSession | method | `(() => Promise<AuthResult<AuthSession \| null>>) \| undefined` | no |  |
| requestPasswordReset | method | `((input: PasswordResetInput) => Promise<AuthResult>) \| undefined` | no |  |
| signIn | method | `(input: SignInInput) => Promise<AuthResult<AuthSession>>` | yes |  |
| signOut | method | `(input?: SignOutInput) => Promise<AuthResult>` | yes |  |
| signUp | method | `(input: SignUpInput) => Promise<AuthResult<AuthSession \| AuthUser>>` | yes |  |
| verifyOtp | method | `((input: VerifyOtpInput) => Promise<AuthResult<AuthSession>>) \| undefined` | no |  |

## AuthAdapterCapabilities

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:375:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| signInIdentifiers | property | `("email" \| "phone" \| "username")[]` | yes |  |
| supportsOtp | property | `boolean` | yes |  |
| supportsPasswordReset | property | `boolean` | yes |  |
| supportsSessionRefresh | property | `boolean` | yes |  |
| supportsSignUp | property | `boolean` | yes |  |

## AuthAdapterError

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:192:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cause | property | `unknown` | no |  |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |

## AuthFlowConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:112:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| forgotPasswordRoute | property | `string \| undefined` | no |  |
| otpRoute | property | `string \| undefined` | no |  |
| postSignInRoute | property | `string` | yes |  |
| signInRoute | property | `string` | yes |  |
| signOutRoute | property | `string \| undefined` | no |  |
| signUpRoute | property | `string \| undefined` | no |  |
| unauthorizedRoute | property | `string \| undefined` | no |  |

## AuthIdentifier

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:107:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `"email" \| "phone" \| "username"` | yes |  |
| value | property | `string` | yes |  |

## AuthIdentifierKind

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:8:1`

## AuthOAuthAdapter

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:368:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `AuthOAuthCapabilities` | yes |  |
| completeAuthorization | method | `(input: CompleteOAuthAuthorizationInput) => Promise<AuthOAuthCompletionResult>` | yes |  |
| startAuthorization | method | `(input: StartOAuthAuthorizationInput) => Promise<AuthOAuthStartResult>` | yes |  |

## AuthOAuthAuthorizationRequest

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:308:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| attemptId | property | `string` | yes |  |
| authorizationUrl | property | `string` | yes |  |
| provider | property | `AuthOAuthProviderId` | yes |  |
| redirectUri | property | `string` | yes |  |

## AuthOAuthAuthorizationResponse

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:325:1`

## AuthOAuthCancellationReason

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:287:1`

## AuthOAuthCapabilities

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:363:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| providers | property | `readonly [AuthOAuthProviderId, ...AuthOAuthProviderId[]]` | yes |  |

## AuthOAuthCompletionResult

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:344:1`

## AuthOAuthConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:155:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| callbackRoute | property | `string` | yes |  |
| enabled | property | `boolean` | yes |  |
| providers | property | `AuthOAuthProviderConfig[]` | yes |  |

## AuthOAuthError

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:269:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cause | property | `unknown` | no |  |
| code | property | `"oauth_unavailable" \| "provider_disabled" \| "provider_misconfigured" \| "invalid_redirect_uri" \| "authorization_failed" \| "authorization_attempt_not_found" \| "invalid_callback" \| "state_mismatch" \| "pkce_mismatch" \| "callback_already_completed" \| "code_exchange_failed" \| "network_error" \| "session_persistence_failed" \| "profile_creation_failed" \| "provider_error"` | yes |  |
| message | property | `string` | yes |  |
| provider | property | `AuthOAuthProviderId \| undefined` | no |  |
| recoverable | property | `boolean` | yes |  |
| stage | property | `"callback" \| "start" \| "transport" \| "exchange" \| "session" \| "profile"` | yes |  |

## AuthOAuthErrorCode

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:267:1`

## AuthOAuthErrorStage

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:248:1`

## AuthOAuthProviderConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:144:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentialsRef | property | `string \| undefined` | no |  |
| enabled | property | `boolean \| undefined` | no |  |
| icon | property | `IconSpec \| undefined` | no |  |
| id | property | `AuthOAuthProviderId` | yes |  |
| label | property | `string \| undefined` | no |  |
| queryParams | property | `Record<string, string> \| undefined` | no |  |
| scopes | property | `string[] \| undefined` | no |  |

## AuthOAuthProviderId

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:42:1`

## AuthOAuthSetupCallbackRequirement

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:74:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| kind | property | `"callback"` | yes |  |
| label | property | `string` | yes |  |
| required | property | `boolean` | yes |  |
| role | property | `"provider" \| "app"` | yes |  |
| target | property | `"web" \| "android" \| "ios" \| undefined` | no |  |

## AuthOAuthSetupCallbackRole

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:59:1`

## AuthOAuthSetupCapabilities

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:102:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| providers | property | `readonly AuthOAuthProviderId[]` | yes |  |
| transports | property | `readonly AuthOAuthTransportId[]` | yes |  |

## AuthOAuthSetupFieldPersistence

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:52:1`

## AuthOAuthSetupFieldRequirement

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:61:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| key | property | `string` | yes |  |
| kind | property | `"field"` | yes |  |
| label | property | `string` | yes |  |
| persistence | property | `"trustedCredential" \| "publicConfig"` | yes |  |
| required | property | `boolean` | yes |  |
| sensitivity | property | `"public" \| "secret"` | yes |  |
| target | property | `"web" \| "android" \| "ios" \| undefined` | no |  |

## AuthOAuthSetupFieldSensitivity

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:56:1`

## AuthOAuthSetupPlan

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:92:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| environment | property | `"local" \| "preview" \| "production"` | yes |  |
| provider | property | `AuthOAuthProviderId` | yes |  |
| requirements | property | `readonly AuthOAuthSetupRequirement[]` | yes |  |
| targets | property | `readonly ("web" \| "android" \| "ios")[]` | yes |  |
| transport | property | `AuthOAuthTransportId` | yes |  |

## AuthOAuthSetupRequirement

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:84:1`

## AuthOAuthStartResult

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:315:1`

## AuthOAuthTransportCancellationReason

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:280:1`

## AuthOAuthTransportError

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:295:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cause | property | `unknown` | no |  |
| code | property | `"browser_unavailable" \| "transport_failed"` | yes |  |
| message | property | `string` | yes |  |

## AuthOAuthTransportErrorCode

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:293:1`

## AuthOAuthTransportId

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:46:1`

## AuthProfileCreateStrategy

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:192:1`

## AuthProfileField

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:186:1`

## AuthProfilePrimaryKeyStrategy

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:189:1`

## AuthProfileSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:256:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| createStrategy | property | `"app" \| "trigger" \| "api" \| undefined` | no |  |
| fields | property | `AuthProfileField[]` | yes |  |
| primaryKey | property | `"authUserId" \| undefined` | no |  |
| table | property | `string \| undefined` | no |  |
| updateStrategy | property | `"app" \| "api" \| undefined` | no |  |

## AuthProfileUpdateStrategy

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:195:1`

## AuthProviderConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:161:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| oauth | property | `AuthOAuthConfig \| undefined` | no |  |
| otp | property | `{ enabled: boolean; } \| undefined` | no |  |
| passwordReset | property | `{ enabled: boolean; } \| undefined` | no |  |
| provider | property | `string` | yes |  |
| signIn | property | `AuthSignInConfig` | yes |  |
| signUp | property | `AuthSignUpConfig \| undefined` | no |  |

## AuthResult

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:198:1`

## AuthScope

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:170:1`

## AuthSession

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:184:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accessToken | property | `string` | yes |  |
| expiresAt | property | `number \| undefined` | no |  |
| refreshToken | property | `string \| undefined` | no |  |
| tokenType | property | `string \| undefined` | no |  |
| user | property | `AuthUser` | yes |  |

## AuthSignInConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:135:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| identifiers | property | `("email" \| "phone" \| "username")[]` | yes |  |

## AuthSignInIdentifier

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:173:1`

## AuthSignInSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:246:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| identifiers | property | `("email" \| "phone" \| "username")[]` | yes |  |

## AuthSignUpConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:139:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| optionalFields | property | `AuthSignUpField[] \| undefined` | no |  |
| requiredFields | property | `AuthSignUpField[]` | yes |  |

## AuthSignUpField

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:18:1`

## AuthSignUpPolicy

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:176:1`

## AuthSignUpSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:250:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| optionalFields | property | `AuthSignUpField[] \| undefined` | no |  |
| requiredFields | property | `AuthSignUpField[]` | yes |  |
| signUpPolicy | property | `"autoSignIn" \| "requireVerification" \| undefined` | no |  |

## AuthUser

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:174:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| avatarUrl | property | `string \| undefined` | no |  |
| displayName | property | `string \| undefined` | no |  |
| email | property | `string \| undefined` | no |  |
| id | property | `string` | yes |  |
| metadata | property | `Record<string, unknown> \| undefined` | no |  |
| phone | property | `string \| undefined` | no |  |
| username | property | `string \| undefined` | no |  |

## BindingCondition

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:102:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| operator | property | `BindingConditionOperator` | yes |  |
| source | property | `BindingValueSource` | yes |  |
| value | property | `SerializableValue \| undefined` | no |  |

## BindingConditionOperator

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:100:1`

## BindingDataPath

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:10:1`

## BindingFallback

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:48:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| source | property | `BindingValueSource \| undefined` | no |  |
| value | property | `SerializableValue \| undefined` | no |  |

## BindingInputMap

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:89:1`

## BindingInputValue

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:70:1`

## BindingLifecycleBehavior

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:55:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fallback | property | `BindingFallback \| undefined` | no |  |
| message | property | `string \| undefined` | no |  |
| state | property | `BindingLifecycleState` | yes |  |

## BindingLifecycleState

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:53:1`

## BindingOperationRef

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:14:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| apiId | property | `string` | yes |  |
| endpointId | property | `string \| undefined` | no |  |
| operationId | property | `string` | yes |  |

## BindingValue

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:8:1`

## BindingValueExpression

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:43:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| source | property | `BindingValueSource` | yes |  |
| transforms | property | `readonly BindingValueTransform[] \| undefined` | no |  |

## BindingValueSource

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:20:1`

## BindingValueTransform

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:12:1`

## ButtonPressEventDto

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:124:1`

## CollectionItemPressEventDto

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:131:1`

## CollectionItemPressPayload

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:126:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| item | property | `Record<string, SerializableValue>` | yes |  |
| itemId | property | `string \| number` | yes |  |

## CompleteOAuthAuthorizationInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:339:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| attemptId | property | `string` | yes |  |
| response | property | `AuthOAuthAuthorizationResponse` | yes |  |

## ComponentDataBinding

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:124:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| componentId | property | `string` | yes |  |
| componentType | property | `string \| undefined` | no |  |
| events | property | `Readonly<Record<string, readonly EventBinding[]>> \| undefined` | no |  |
| props | property | `Readonly<Record<string, PropBinding>> \| undefined` | no |  |

## ComponentDataBindingRegistry

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:131:1`

## ComponentEventDto

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:106:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| payload | property | `TPayload` | yes |  |
| sourceNodeId | property | `string` | yes |  |
| type | property | `TType` | yes |  |

## ComponentEventDtoKind

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:136:1`

## ComponentEventPayloadValue

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:104:1`

## ComponentInstanceId

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:5:1`

## ComponentRequirements

Kind: `type`
Module: `src/requirements.ts`
Source: `src/requirements.ts:34:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `Readonly<Partial<Record<"notifications" \| "clipboard" \| "barcodeScanner" \| "cameraPreview" \| "ebookReader" \| "mediaPicker" \| "filePicker" \| "location", true>>> \| undefined` | no |  |
| permissions | property | `Readonly<Partial<Record<"camera" \| "microphone" \| "mediaLibrary" \| "mediaLibraryWrite" \| "locationForeground" \| "locationBackground" \| "notifications" \| "clipboard", true>>> \| undefined` | no |  |

## ComponentTypeId

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:6:1`

## ConsoleAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:60:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| payload | property | `Record<string, unknown> \| undefined` | no |  |
| type | property | `"console"` | yes |  |

## CreateNavigatorPlanOptions

Kind: `type`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:39:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| customNavigators | property | `CustomNavigatorRegistry \| undefined` | no |  |
| expoRouterVersion | property | `string` | yes |  |
| platform | property | `NavigatorRuntimePlatform` | yes |  |
| responsiveSize | property | `NavigatorResponsiveSize \| undefined` | no |  |

## CredentialId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:6:1`

## CredentialKind

Kind: `unknown`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:4:1`

## CredentialRef

Kind: `type`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:6:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `string` | yes |  |
| kind | property | `(string & {}) \| CredentialKind` | yes |  |
| label | property | `string \| undefined` | no |  |
| scope | property | `string \| undefined` | no |  |

## CustomNavigatorConfigIssue

Kind: `type`
Module: `src/navigator/extensions.ts`
Source: `src/navigator/extensions.ts:3:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |
| path | property | `string \| undefined` | no |  |

## CustomNavigatorNode

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:215:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| config | property | `Readonly<Record<string, import("./serializable").SerializableValue>> \| undefined` | no |  |
| initialRouteName | property | `string \| undefined` | no |  |
| navigatorId | property | `string` | yes |  |
| routes | property | `RouteDefinition[]` | yes |  |
| type | property | `"custom"` | yes |  |

## CustomNavigatorRegistration

Kind: `type`
Module: `src/navigator/extensions.ts`
Source: `src/navigator/extensions.ts:9:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| exportName | property | `string` | yes |  |
| id | property | `string` | yes |  |
| integration | property | `"expo-router-standard"` | yes |  |
| module | property | `string` | yes |  |
| platforms | property | `readonly NavigatorRuntimePlatform[]` | yes |  |
| router | property | `"stack" \| "tab"` | yes |  |
| stability | property | `NavigatorApiStability` | yes |  |
| validateConfig | property | `(config: CustomNavigatorNode["config"]) => readonly CustomNavigatorConfigIssue[]` | yes |  |

## CustomNavigatorRegistry

Kind: `unknown`
Module: `src/navigator/extensions.ts`
Source: `src/navigator/extensions.ts:22:1`

## DatabaseAdapterRef

Kind: `type`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:23:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| config | property | `import("..").SerializableValue \| undefined` | no |  |
| exportName | property | `string \| undefined` | no |  |
| id | property | `string` | yes |  |
| kind | property | `"database"` | yes |  |
| packageName | property | `string \| undefined` | no |  |

## DatabaseDataSourceConfig

Kind: `type`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:10:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| adapter | property | `DatabaseAdapterRef` | yes |  |
| credential | property | `CredentialRef \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| endpoints | property | `DataEndpointRegistry` | yes |  |
| id | property | `string` | yes |  |
| kind | property | `"database"` | yes |  |
| metadata | property | `import("..").SerializableValue \| undefined` | no |  |
| name | property | `string \| undefined` | no |  |
| schemas | property | `Readonly<Record<string, import("./schemas").DataSchema>> \| undefined` | no |  |

## DataContractValue

Kind: `unknown`
Module: `src/data/values.ts`
Source: `src/data/values.ts:3:1`

## DataDiagnosticCode

Kind: `unknown`
Module: `src/data/diagnostics.ts`
Source: `src/data/diagnostics.ts:5:1`

## DataDiagnosticSeverity

Kind: `unknown`
Module: `src/data/diagnostics.ts`
Source: `src/data/diagnostics.ts:3:1`

## DataEndpointConfig

Kind: `type`
Module: `src/data/endpoints.ts`
Source: `src/data/endpoints.ts:9:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| baseUrl | property | `string \| undefined` | no |  |
| credential | property | `CredentialRef \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| id | property | `string` | yes |  |
| kind | property | `DataEndpointKind` | yes |  |
| metadata | property | `import("..").SerializableValue \| undefined` | no |  |
| name | property | `string \| undefined` | no |  |
| operations | property | `DataOperationRegistry` | yes |  |
| path | property | `string \| undefined` | no |  |

## DataEndpointKind

Kind: `unknown`
Module: `src/data/endpoints.ts`
Source: `src/data/endpoints.ts:7:1`

## DataEndpointRegistry

Kind: `unknown`
Module: `src/data/endpoints.ts`
Source: `src/data/endpoints.ts:21:1`

## DataOperationConfig

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:44:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credential | property | `CredentialRef \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| endpointId | property | `string \| undefined` | no |  |
| id | property | `string` | yes |  |
| intent | property | `DataOperationIntent` | yes |  |
| metadata | property | `import("..").SerializableValue \| undefined` | no |  |
| method | property | `DataOperationMethod \| undefined` | no |  |
| name | property | `string \| undefined` | no |  |
| pagination | property | `DataOperationPagination \| undefined` | no |  |
| path | property | `string \| undefined` | no |  |
| protocol | property | `DataOperationProtocol` | yes |  |
| request | property | `DataOperationRequest \| undefined` | no |  |
| response | property | `DataOperationResponse \| undefined` | no |  |

## DataOperationIntent

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:7:1`

## DataOperationMethod

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:9:1`

## DataOperationPagination

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:35:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cursorPath | property | `string \| undefined` | no |  |
| kind | property | `(string & {}) \| "cursor" \| "limit-offset" \| "page" \| "unknown"` | yes |  |
| limitParameter | property | `string \| undefined` | no |  |
| offsetParameter | property | `string \| undefined` | no |  |
| pageParameter | property | `string \| undefined` | no |  |
| pageSizeParameter | property | `string \| undefined` | no |  |

## DataOperationParameter

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:16:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| default | property | `import("..").SerializableValue \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| location | property | `DataOperationParameterLocation` | yes |  |
| name | property | `string` | yes |  |
| required | property | `boolean \| undefined` | no |  |
| schema | property | `DataSchema \| undefined` | no |  |
| schemaRef | property | `DataSchemaRef \| undefined` | no |  |

## DataOperationParameterLocation

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:14:1`

## DataOperationProtocol

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:12:1`

## DataOperationRegistry

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:60:1`

## DataOperationRequest

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:24:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contentType | property | `string \| undefined` | no |  |
| parameters | property | `readonly DataOperationParameter[] \| undefined` | no |  |
| schema | property | `DataSchema \| undefined` | no |  |
| schemaRef | property | `DataSchemaRef \| undefined` | no |  |

## DataOperationResponse

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:29:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contentType | property | `string \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| schema | property | `DataSchema \| undefined` | no |  |
| schemaRef | property | `DataSchemaRef \| undefined` | no |  |
| status | property | `string \| number \| undefined` | no |  |

## DataPath

Kind: `unknown`
Module: `src/data/values.ts`
Source: `src/data/values.ts:5:1`

## DataSchema

Kind: `type`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:17:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| additionalProperties | property | `boolean \| DataSchema \| undefined` | no |  |
| allOf | property | `readonly DataSchema[] \| undefined` | no |  |
| anyOf | property | `readonly DataSchema[] \| undefined` | no |  |
| const | property | `import("..").SerializableValue \| undefined` | no |  |
| default | property | `import("..").SerializableValue \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| enum | property | `readonly import("..").SerializableValue[] \| undefined` | no |  |
| format | property | `string \| undefined` | no |  |
| items | property | `DataSchema \| undefined` | no |  |
| nullable | property | `boolean \| undefined` | no |  |
| oneOf | property | `readonly DataSchema[] \| undefined` | no |  |
| properties | property | `Readonly<Record<string, DataSchema>> \| undefined` | no |  |
| ref | property | `DataSchemaRef \| undefined` | no |  |
| required | property | `readonly string[] \| undefined` | no |  |
| title | property | `string \| undefined` | no |  |
| type | property | `DataSchemaPrimitiveType \| readonly DataSchemaPrimitiveType[] \| undefined` | no |  |

## DataSchemaPrimitiveType

Kind: `unknown`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:5:1`

## DataSchemaProperty

Kind: `type`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:12:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| schema | property | `DataSchema` | yes |  |

## DataSchemaRef

Kind: `type`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:8:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `string` | yes |  |

## DataSchemaRegistry

Kind: `unknown`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:36:1`

## DataSchemaSlot

Kind: `type`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:38:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| schema | property | `DataSchema \| undefined` | no |  |
| schemaRef | property | `DataSchemaRef \| undefined` | no |  |

## DataSourceConfig

Kind: `unknown`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:22:1`

## DataSourceDiagnostic

Kind: `type`
Module: `src/data/diagnostics.ts`
Source: `src/data/diagnostics.ts:22:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| apiId | property | `string \| undefined` | no |  |
| code | property | `DataDiagnosticCode` | yes |  |
| dataSourceId | property | `string \| undefined` | no |  |
| endpointId | property | `string \| undefined` | no |  |
| hint | property | `string \| undefined` | no |  |
| message | property | `string` | yes |  |
| operationId | property | `string \| undefined` | no |  |
| path | property | `string \| undefined` | no |  |
| severity | property | `DataDiagnosticSeverity` | yes |  |

## DataSourceDiagnosticResult

Kind: `unknown`
Module: `src/data/diagnostics.ts`
Source: `src/data/diagnostics.ts:34:1`

## DataSourceId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:2:1`

## DataSourceKind

Kind: `unknown`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:8:1`

## DataSourceRegistry

Kind: `unknown`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:23:1`

## DbAdapter

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:83:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `DbAdapterCapabilities` | yes |  |
| delete | method | `<TRecord extends object = DbRecord>(input: DbDeleteInput) => Promise<DbResult<TRecord[]>>` | yes |  |
| findById | method | `<TRecord extends object = DbRecord>(input: DbFindByIdInput) => Promise<DbResult<TRecord \| null>>` | yes |  |
| insert | method | `<TRecord extends object = DbRecord>(input: DbInsertInput<TRecord>) => Promise<DbResult<TRecord[]>>` | yes |  |
| select | method | `<TRecord extends object = DbRecord>(input: DbSelectInput) => Promise<DbResult<TRecord[]>>` | yes |  |
| transaction | method | `(<TResult>(run: (adapter: DbAdapter) => Promise<TResult>) => Promise<DbResult<TResult>>) \| undefined` | no |  |
| update | method | `<TRecord extends object = DbRecord>(input: DbUpdateInput<TRecord>) => Promise<DbResult<TRecord[]>>` | yes |  |

## DbAdapterCapabilities

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:77:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| realtime | property | `boolean` | yes |  |
| returning | property | `boolean` | yes |  |
| transactions | property | `boolean` | yes |  |

## DbAdapterError

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:3:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cause | property | `unknown` | no |  |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |

## DbAdminAdapter

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:178:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `DbAdminAdapterCapabilities` | yes |  |
| createCollection | method | `(input: DbCollectionDefinition) => Promise<DbAdminResult>` | yes |  |
| deleteCollection | method | `(input: DbCollectionReference) => Promise<DbAdminResult>` | yes |  |
| generateCreateCollectionSql | method | `(input: DbCollectionDefinition) => DbAdminResult` | yes |  |
| generateDeleteCollectionSql | method | `(input: DbCollectionReference) => DbAdminResult` | yes |  |

## DbAdminAdapterCapabilities

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:173:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| directExecution | property | `boolean` | yes |  |
| schemaGeneration | property | `boolean` | yes |  |

## DbAdminResult

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:162:1`

## DbChangeEvent

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:103:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| committedAt | property | `string \| undefined` | no |  |
| kind | property | `DbChangeKind` | yes |  |
| previousRecord | property | `TRecord \| undefined` | no |  |
| record | property | `TRecord \| null` | yes |  |
| schema | property | `string \| undefined` | no |  |
| table | property | `string` | yes |  |

## DbChangeKind

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:101:1`

## DbChangeListener

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:112:1`

## DbCollectionDefinition

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:150:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fields | property | `readonly DbFieldDefinition[]` | yes |  |
| name | property | `string` | yes |  |
| primaryKey | property | `string \| undefined` | no |  |
| schema | property | `string \| undefined` | no |  |

## DbCollectionReference

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:157:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| name | property | `string` | yes |  |
| schema | property | `string \| undefined` | no |  |

## DbCollectionSubscriptionInput

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:120:1`

## DbDeleteInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:73:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| filters | property | `readonly DbFilter[]` | yes |  |
| schema | property | `string \| undefined` | no |  |
| table | property | `string` | yes |  |

## DbFieldDefinition

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:142:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| defaultValue | property | `string \| number \| boolean \| null \| undefined` | no |  |
| name | property | `string` | yes |  |
| required | property | `boolean \| undefined` | no |  |
| type | property | `DbFieldType` | yes |  |
| unique | property | `boolean \| undefined` | no |  |

## DbFieldType

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:140:1`

## DbFilter

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:40:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| field | property | `string` | yes |  |
| operator | property | `DbFilterOperator` | yes |  |
| value | property | `unknown` | yes |  |

## DbFilterOperator

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:37:1`

## DbFindByIdInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:58:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| columns | property | `readonly string[] \| undefined` | no |  |
| id | property | `string \| number` | yes |  |
| idField | property | `string \| undefined` | no |  |
| schema | property | `string \| undefined` | no |  |
| table | property | `string` | yes |  |

## DbInsertInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:64:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| schema | property | `string \| undefined` | no |  |
| table | property | `string` | yes |  |
| values | property | `TRecord \| readonly TRecord[]` | yes |  |

## DbPage

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:32:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| limit | property | `number \| undefined` | no |  |
| offset | property | `number \| undefined` | no |  |

## DbRealtimeAdapter

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:127:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| realtime | property | `{ subscribeToCollection<TRecord extends object = DbRecord>(input: DbCollectionSubscriptionInput, listener: DbChangeListener<TRecord>): DbSubscription; subscribeToRecord<TRecord extends object = DbRecord>(input: DbRecordSubscriptionInput, listener: DbChangeListener<TRecord>): DbSubscription; }` | yes |  |

## DbRecord

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:1:1`

## DbRecordSubscriptionInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:122:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `string \| number` | yes |  |
| idField | property | `string \| undefined` | no |  |
| schema | property | `string \| undefined` | no |  |
| table | property | `string` | yes |  |

## DbResult

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:18:1`

## DbSelectInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:51:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| columns | property | `readonly string[] \| undefined` | no |  |
| filters | property | `readonly DbFilter[] \| undefined` | no |  |
| page | property | `DbPage \| undefined` | no |  |
| schema | property | `string \| undefined` | no |  |
| sort | property | `readonly DbSort[] \| undefined` | no |  |
| table | property | `string` | yes |  |

## DbSort

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:27:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| direction | property | `DbSortDirection \| undefined` | no |  |
| field | property | `string` | yes |  |

## DbSortDirection

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:25:1`

## DbSubscription

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:116:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| unsubscribe | method | `() => Promise<void> \| void` | yes |  |

## DbSuccess

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:9:1`

## DbTableInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:46:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| schema | property | `string \| undefined` | no |  |
| table | property | `string` | yes |  |

## DbUpdateInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:68:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| filters | property | `readonly DbFilter[]` | yes |  |
| schema | property | `string \| undefined` | no |  |
| table | property | `string` | yes |  |
| values | property | `Partial<TRecord>` | yes |  |

## DEFAULT_AUTH_FLOW

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:122:14`

## DEPLOYMENT_CAPABILITIES

Kind: `value`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:6:14`

## DEPLOYMENT_PROVIDER_CAPABILITY_IDS

Kind: `value`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:16:14`

## DeploymentAuthenticationRequiredAction

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:61:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |
| provider | property | `string` | yes |  |
| target | property | `"web" \| "android" \| "ios" \| undefined` | no |  |
| type | property | `"authentication"` | yes |  |

## DeploymentAuthenticationState

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:86:1`

## DeploymentAutomatedProvisioningRequirement

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:99:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| id | property | `string` | yes |  |
| message | property | `string` | yes |  |
| provider | property | `string` | yes |  |
| target | property | `"web" \| "android" \| "ios" \| undefined` | no |  |
| type | property | `"automated"` | yes |  |

## DeploymentCapability

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:14:1`

## DeploymentCredentialReference

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:42:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `string` | yes |  |
| kind | property | `string` | yes |  |
| provider | property | `string` | yes |  |

## DeploymentFailure

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:54:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |
| provider | property | `string \| undefined` | no |  |
| target | property | `"web" \| "android" \| "ios" \| undefined` | no |  |

## DeploymentManualAction

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:69:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |
| provider | property | `string \| undefined` | no |  |
| target | property | `"web" \| "android" \| "ios"` | yes |  |
| type | property | `"manual-action"` | yes |  |
| url | property | `string \| undefined` | no |  |

## DeploymentMonetizationAdapter

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:98:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| inspectAsync | method | `(context: MonetizationAdapterContext) => Promise<DeploymentProviderResult<MonetizationTargetState>>` | yes |  |
| syncAsync | method | `(request: MonetizationSyncRequest) => Promise<DeploymentProviderResult<MonetizationTargetState>>` | yes |  |
| target | property | `"android" \| "ios"` | yes |  |

## DeploymentProviderCapabilityDescriptor

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:30:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `"setup" \| "web-publish" \| "android-build" \| "android-publish" \| "ios-build" \| "ios-publish" \| "store-listing" \| "monetization" \| "release"` | yes |  |
| targets | property | `readonly ("web" \| "android" \| "ios")[]` | yes |  |

## DeploymentProviderCapabilityId

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:28:1`

## DeploymentProviderCapabilityState

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:93:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capability | property | `"provision" \| "prepare" \| "build" \| "publish" \| "verify"` | yes |  |
| reason | property | `string \| undefined` | no |  |
| status | property | `"available" \| "unavailable"` | yes |  |

## DeploymentProviderDescriptor

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:35:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `readonly DeploymentProviderCapabilityDescriptor[]` | yes |  |
| displayName | property | `string` | yes |  |
| id | property | `string` | yes |  |
| packageName | property | `string` | yes |  |

## DeploymentProviderRegistration

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:328:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| androidBuilder | property | `AndroidDeploymentBuilder \| undefined` | no |  |
| androidPublisher | property | `AndroidDeploymentPublisher \| undefined` | no |  |
| descriptor | property | `DeploymentProviderDescriptor` | yes |  |
| iosBuilder | property | `IosDeploymentBuilder \| undefined` | no |  |
| iosPublisher | property | `IosDeploymentPublisher \| undefined` | no |  |
| monetization | property | `DeploymentMonetizationAdapter \| undefined` | no |  |
| release | property | `DeploymentReleaseAdapter \| undefined` | no |  |
| setup | property | `DeploymentProviderSetupAdapter \| undefined` | no |  |
| storeListing | property | `DeploymentStoreListingAdapter \| undefined` | no |  |
| webPublisher | property | `WebDeploymentPublisher \| undefined` | no |  |

## DeploymentProviderResult

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:81:1`

## DeploymentProviderSetupAdapter

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:127:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| inspectSetup | method | `(context: DeploymentProviderSetupContext) => Promise<DeploymentProviderSetupInspection>` | yes |  |
| provider | property | `string` | yes |  |

## DeploymentProviderSetupContext

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:113:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| projectRoot | property | `string` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |
| target | property | `"web" \| "android" \| "ios" \| undefined` | no |  |

## DeploymentProviderSetupInspection

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:120:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| authentication | property | `DeploymentAuthenticationState` | yes |  |
| capabilities | property | `readonly DeploymentProviderCapabilityState[]` | yes |  |
| provider | property | `string` | yes |  |
| provisioning | property | `readonly DeploymentProvisioningRequirement[]` | yes |  |

## DeploymentProvisioningRequirement

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:108:1`

## DeploymentReleaseAdapter

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:146:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| controlAsync | method | `(request: ReleaseControlRequest) => Promise<ReleaseControlExecutionResult>` | yes |  |
| executeStepAsync | method | `(request: ReleaseStepExecutionRequest) => Promise<ReleaseMutationResult>` | yes |  |
| inspectAsync | method | `(request: ReleaseInspectionRequest) => Promise<DeploymentProviderResult<ReleaseObservedNativeState>>` | yes |  |
| target | property | `"android" \| "ios"` | yes |  |

## DeploymentRequiredAction

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:78:1`

## DeploymentSecretMaterial

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:48:1`

## DeploymentSecretResolver

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:50:1`

## DeploymentStoreIdentity

Kind: `unknown`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:132:1`

## DeploymentStoreListingAdapter

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:117:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| inspectAsync | method | `(context: StoreListingAdapterContext) => Promise<DeploymentProviderResult<StoreListingTargetState>>` | yes |  |
| syncAsync | method | `(request: StoreListingSyncRequest) => Promise<DeploymentProviderResult<StoreListingTargetState>>` | yes |  |
| target | property | `StoreListingTarget` | yes |  |

## DRAWER_POSITIONS

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:87:14`

## DRAWER_TYPES

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:90:14`

## DrawerNavigatorNode

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:193:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| initialRouteName | property | `string \| undefined` | no |  |
| options | property | `DrawerNavigatorOptions \| undefined` | no |  |
| routes | property | `RouteDefinition[]` | yes |  |
| type | property | `"drawer"` | yes |  |

## DrawerNavigatorOptions

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:93:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| drawerPosition | property | `"left" \| "right" \| undefined` | no |  |
| drawerType | property | `"front" \| "back" \| "slide" \| "permanent" \| undefined` | no |  |
| headerShown | property | `boolean \| undefined` | no |  |
| swipeEnabled | property | `boolean \| undefined` | no |  |

## DrawerPosition

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:88:1`

## DrawerType

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:91:1`

## EndpointId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:3:1`

## EntityRegistry

Kind: `unknown`
Module: `src/collections.ts`
Source: `src/collections.ts:4:1`

## EventBinding

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:118:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| input | property | `Readonly<Record<string, BindingInputValue>> \| undefined` | no |  |
| target | property | `EventBindingTarget` | yes |  |
| when | property | `BindingCondition \| undefined` | no |  |

## EventBindingTarget

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:108:1`

## ExpoRouterNavigatorModule

Kind: `unknown`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:46:1`

## ExternalGraphQlApiDefinition

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:41:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credential | property | `CredentialRef \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| endpoints | property | `DataEndpointRegistry` | yes |  |
| endpointUrl | property | `string` | yes |  |
| id | property | `string` | yes |  |
| introspection | property | `GraphQlIntrospectionConfig \| undefined` | no |  |
| metadata | property | `import("..").SerializableValue \| undefined` | no |  |
| name | property | `string \| undefined` | no |  |
| origin | property | `"external"` | yes |  |
| protocol | property | `"graphql"` | yes |  |
| schemas | property | `Readonly<Record<string, import("./schemas").DataSchema>> \| undefined` | no |  |

## ExternalRestApiDefinition

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:29:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| baseUrl | property | `string` | yes |  |
| credential | property | `CredentialRef \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| endpoints | property | `DataEndpointRegistry` | yes |  |
| id | property | `string` | yes |  |
| metadata | property | `import("..").SerializableValue \| undefined` | no |  |
| name | property | `string \| undefined` | no |  |
| openApi | property | `OpenApiDocumentRef \| undefined` | no |  |
| origin | property | `"external"` | yes |  |
| protocol | property | `"rest"` | yes |  |
| schemas | property | `Readonly<Record<string, import("./schemas").DataSchema>> \| undefined` | no |  |

## FilterAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:85:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| payload | property | `{ filterKey: string; filterValue: string; }` | yes |  |
| type | property | `"filter"` | yes |  |

## findForbiddenInlineSecretFields

Kind: `function`
Module: `src/secrets.ts`
Source: `src/secrets.ts:183:1`

### Signatures

- `(value: unknown) => readonly string[]`
  - value: `unknown`
  - returns: `readonly string[]`

## FIXED_HEADLESS_TABS_PRESENTATIONS

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:100:14`

## FixedHeadlessTabsPresentation

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:101:1`

## FORBIDDEN_INLINE_SECRET_FIELDS

Kind: `value`
Module: `src/secrets.ts`
Source: `src/secrets.ts:174:14`

## FormSubmitEventDto

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:117:1`

## FormSubmitValues

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:115:1`

## GraphQlIntrospectionConfig

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:36:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| enabled | property | `boolean` | yes |  |
| schemaVersion | property | `string \| undefined` | no |  |

## HEADLESS_TABS_PRESENTATIONS

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:103:14`

## HeadlessTabsConfig

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:145:1`

## HeadlessTabsPresentation

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:108:1`

## HeadlessTabsPresentationConfig

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:127:1`

## HeadlessTabsWebConfig

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:149:1`

## IconSpec

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:214:1`

## ImageAssetSource

Kind: `unknown`
Module: `src/storage.ts`
Source: `src/storage.ts:131:1`

## ImageMetadata

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:102:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| createdAt | property | `string \| undefined` | no |  |
| fileName | property | `string \| undefined` | no |  |
| sizeBytes | property | `number \| undefined` | no |  |

## INFRA_ADAPTER_CATALOG

Kind: `value`
Module: `src/infra/constants.ts`
Source: `src/infra/constants.ts:9:14`

## INFRA_RUNTIME_COMPATIBILITY

Kind: `value`
Module: `src/infra/constants.ts`
Source: `src/infra/constants.ts:2:14`

## InfraAdapterDescriptor

Kind: `unknown`
Module: `src/types/infraAdapters.ts`
Source: `src/types/infraAdapters.ts:26:1`

## InfraAdapterId

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:10:1`

## InfraAuthConfigMap

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:99:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| supabase | property | `{ readonly scope?: AuthScope; readonly flow?: AuthFlowConfig; readonly signIn?: AuthSignInSpec; readonly signUp?: AuthSignUpSpec; readonly oauth?: AuthOAuthConfig; readonly profile?: AuthProfileSpec; }` | yes |  |

## InfraAuthSpec

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:127:1`

## InfraAuthzConfigMap

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:109:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cerbos | property | `{ readonly kind: "RBAC" \| "ABAC"; readonly policies?: ValueMap<string, string>; }` | yes |  |

## InfraAuthzSpec

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:130:1`

## InfraCapability

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:11:1`

## InfraComputeAdapter

Kind: `type`
Module: `src/types/infraAdapters.ts`
Source: `src/types/infraAdapters.ts:72:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| descriptor | property | `InfraAdapterDescriptor<P>` | yes |  |
| destroyAsync | method | `(context: InfraExecutionContext, request: InfraDestroyRequest) => Promise<InfraResult<InfraReconcileResult>>` | yes |  |
| ensureAsync | method | `(context: InfraExecutionContext, selection: InfraComputeSelection<P>) => Promise<InfraResult<InfraComputeSnapshot>>` | yes |  |
| inspectAsync | method | `(context: InfraExecutionContext, selection: InfraComputeSelection<P>) => Promise<InfraResult<InfraComputeSnapshot>>` | yes |  |
| planAsync | method | `(context: InfraExecutionContext, selection: InfraComputeSelection<P>) => Promise<InfraResult<readonly InfraPlanAction[]>>` | yes |  |
| statusAsync | method | `(context: InfraExecutionContext) => Promise<InfraResult<readonly InfraResourceStatus[]>>` | yes |  |
| validateAsync | method | `(context: InfraExecutionContext, selection: InfraComputeSelection<P>) => Promise<InfraResult<null>>` | yes |  |

## InfraComputeConfigMap

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:22:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| hetzner | property | `{ readonly location: string; readonly serverType?: string; readonly image?: string; readonly credentials?: InfraControlPlaneCredentialRef; readonly ssh?: { readonly user?: string; readonly port?: number; readonly credentials?: InfraControlPlaneCredentialRef; }; }` | yes |  |
| local | property | `{ readonly workingDirectory?: string; }` | yes |  |

## InfraComputeProviderId

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:18:1`

## InfraComputeSelection

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:51:1`

## InfraComputeSnapshot

Kind: `type`
Module: `src/types/infraAdapters.ts`
Source: `src/types/infraAdapters.ts:68:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| outputs | property | `readonly InfraOutput[]` | yes |  |
| resources | property | `readonly InfraOwnedResource[]` | yes |  |
| targets | property | `readonly InfraComputeTarget[]` | yes |  |

## InfraComputeTarget

Kind: `unknown`
Module: `src/types/infraTargets.ts`
Source: `src/types/infraTargets.ts:4:1`

## InfraControlPlaneCredentialRef

Kind: `type`
Module: `src/types/infraSecrets.ts`
Source: `src/types/infraSecrets.ts:4:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| name | property | `string` | yes |  |
| source | property | `"control-plane"` | yes |  |

## InfraCredentialPort

Kind: `type`
Module: `src/types/infraAdapters.ts`
Source: `src/types/infraAdapters.ts:33:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| findAsync | method | `(reference: InfraControlPlaneCredentialRef) => Promise<InfraResult<Readonly<Record<string, string>> \| null>>` | yes |  |
| persistAsync | method | `(reference: InfraControlPlaneCredentialRef, values: Readonly<Record<string, string>>) => Promise<InfraResult<null>>` | yes |  |
| resolveAsync | method | `(reference: InfraControlPlaneCredentialRef) => Promise<InfraResult<Readonly<Record<string, string>>>>` | yes |  |

## InfraDatabaseConfigMap

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:82:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| supabase | property | `{ readonly tier?: "dev" \| "prod"; readonly backup?: InfraScheduledDatabaseBackupSpec; }` | yes |  |

## InfraDatabaseSpec

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:119:1`

## InfraDeploymentSpec

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:59:1`

## InfraDestroyRequest

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:102:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| confirmation | property | `{ readonly projectId: string; readonly environment: AppEnvironmentId; }` | yes |  |
| environment | property | `"local" \| "preview" \| "production"` | yes |  |
| persistence | property | `{ readonly policy: "retain"; } \| { readonly policy: "delete"; readonly confirmedResources: readonly InfraResourceIdentity[]; }` | yes |  |
| projectId | property | `string` | yes |  |

## InfraDiagnostic

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:22:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |
| owner | property | `InfraResourceIdentity \| undefined` | no |  |
| path | property | `readonly (string \| number)[] \| undefined` | no |  |
| severity | property | `"error" \| "info" \| "warning"` | yes |  |

## InfraEnvironmentSpec

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:153:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| auth | property | `({ readonly provider: "supabase"; } & { readonly scope?: AuthScope; readonly flow?: AuthFlowConfig; readonly signIn?: AuthSignInSpec; readonly signUp?: AuthSignUpSpec; readonly oauth?: AuthOAuthConfig; readonly profile?: AuthProfileSpec; }) \| undefined` | no |  |
| authz | property | `({ readonly provider: "cerbos"; } & { readonly kind: "RBAC" \| "ABAC"; readonly policies?: ValueMap<string, string>; }) \| undefined` | no |  |
| database | property | `({ readonly provider: "supabase"; } & { readonly tier?: "dev" \| "prod"; readonly backup?: InfraScheduledDatabaseBackupSpec; }) \| undefined` | no |  |
| deployment | property | `InfraDeploymentSpec` | yes |  |
| networking | property | `InfraNetworkingSpec \| undefined` | no |  |
| objectStorage | property | `InfraObjectStorageSpec \| undefined` | no |  |
| secretStore | property | `({ readonly provider: "supabase-vault"; } & { readonly schema?: string; }) \| undefined` | no |  |
| workloads | property | `InfraWorkloadRegistry \| undefined` | no |  |

## InfraExecutionContext

Kind: `type`
Module: `src/types/infraAdapters.ts`
Source: `src/types/infraAdapters.ts:50:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `InfraCredentialPort` | yes |  |
| desired | property | `InfraEnvironmentSpec` | yes |  |
| environment | property | `"local" \| "preview" \| "production"` | yes |  |
| previous | property | `InfraLedger \| undefined` | no |  |
| projectId | property | `string` | yes |  |
| secrets | property | `{ resolveAsync(reference: InfraSecretReference): Promise<InfraResult<string>>; }` | yes |  |
| signal | property | `AbortSignal \| undefined` | no |  |

## InfraGeneratedArtifact

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:81:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| content | property | `string` | yes |  |
| executable | property | `boolean \| undefined` | no |  |
| owner | property | `InfraResourceIdentity` | yes |  |
| path | property | `string` | yes |  |

## InfraLedger

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:89:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| artifacts | property | `readonly { readonly owner: InfraResourceIdentity; readonly path: string; }[]` | yes |  |
| environment | property | `"local" \| "preview" \| "production"` | yes |  |
| outputs | property | `readonly InfraOutput[]` | yes |  |
| projectId | property | `string` | yes |  |
| resources | property | `readonly InfraOwnedResource[]` | yes |  |
| schemaVersion | property | `1` | yes |  |
| targets | property | `readonly InfraComputeTarget[]` | yes |  |

## InfraManifest

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:172:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| apis | property | `ApiDefinitionRegistry \| undefined` | no |  |
| environments | property | `Readonly<Record<"local", InfraEnvironmentSpec> & Partial<Record<"preview" \| "production", InfraEnvironmentSpec>>>` | yes |  |
| modules | property | `InfraModuleRegistry` | yes |  |

## InfraModuleId

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:164:1`

## InfraModuleRegistry

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:170:1`

## InfraModuleSpec

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:166:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| config | property | `import("..").SerializableValue \| undefined` | no |  |

## InfraNetworkingSpec

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:144:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| domain | property | `string \| undefined` | no |  |
| publicBaseUrl | property | `string \| undefined` | no |  |
| tls | property | `InfraNetworkingTlsSpec \| undefined` | no |  |

## InfraNetworkingTlsSpec

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:137:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contactEmail | property | `string` | yes |  |
| mode | property | `"acme-http-01"` | yes |  |

## InfraObjectStorageConfigMap

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:88:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| r2 | property | `{ readonly buckets?: SerializableSet; readonly accountId?: string; readonly credentials?: InfraControlPlaneCredentialRef; }` | yes |  |
| supabase | property | `{ readonly buckets?: SerializableSet; readonly backend?: InfraS3PersistenceTarget; }` | yes |  |

## InfraObjectStorageSpec

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:122:1`

## InfraOutput

Kind: `unknown`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:66:1`

## InfraOwnedResource

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:14:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| dependsOn | property | `readonly InfraResourceIdentity[]` | yes |  |
| externalId | property | `string \| undefined` | no |  |
| identity | property | `InfraResourceIdentity` | yes |  |
| persistent | property | `boolean` | yes |  |
| retention | property | `"retain" \| "delete-on-destroy"` | yes |  |

## InfraPlan

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:43:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| actions | property | `readonly InfraPlanAction[]` | yes |  |
| environment | property | `"local" \| "preview" \| "production"` | yes |  |
| projectId | property | `string` | yes |  |

## InfraPlanAction

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:35:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| dependsOn | property | `readonly InfraResourceIdentity[]` | yes |  |
| detail | property | `string` | yes |  |
| impact | property | `"none" \| "interrupts-service" \| "deletes-data"` | yes |  |
| operation | property | `"create" \| "delete" \| "update" \| "retain" \| "noop"` | yes |  |
| owner | property | `InfraResourceIdentity` | yes |  |

## InfraProviderFor

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:13:1`

## InfraReconcileResult

Kind: `type`
Module: `src/types/infraAdapters.ts`
Source: `src/types/infraAdapters.ts:62:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| outputs | property | `readonly InfraOutput[]` | yes |  |
| resources | property | `readonly InfraOwnedResource[]` | yes |  |

## InfraResourceIdentity

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:7:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| adapter | property | `"local" \| "hetzner" \| "minikube" \| "k3s" \| "docker-compose" \| "supabase" \| "cerbos" \| "r2" \| "supabase-vault"` | yes |  |
| environment | property | `"local" \| "preview" \| "production"` | yes |  |
| projectId | property | `string` | yes |  |
| resourceId | property | `string` | yes |  |

## InfraResourceStatus

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:50:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| detail | property | `string \| undefined` | no |  |
| diagnostics | property | `readonly InfraDiagnostic[] \| undefined` | no |  |
| owner | property | `InfraResourceIdentity` | yes |  |
| state | property | `"unknown" \| "absent" \| "pending" \| "ready" \| "degraded" \| "stopped" \| "retained" \| "failed"` | yes |  |

## InfraResult

Kind: `unknown`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:31:1`

## InfraRuntimeAdapter

Kind: `type`
Module: `src/types/infraAdapters.ts`
Source: `src/types/infraAdapters.ts:109:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| descriptor | property | `InfraAdapterDescriptor<P>` | yes |  |
| destroyAsync | method | `(context: InfraExecutionContext, desired: InfraRuntimeDesiredState<P>, request: InfraDestroyRequest) => Promise<InfraResult<InfraReconcileResult>>` | yes |  |
| ensureAsync | method | `(context: InfraExecutionContext, desired: InfraRuntimeDesiredState<P>) => Promise<InfraResult<InfraReconcileResult>>` | yes |  |
| generateAsync | method | `((context: InfraExecutionContext, desired: InfraRuntimeDesiredState<P>) => Promise<InfraResult<readonly InfraGeneratedArtifact[]>>) \| undefined` | no |  |
| planAsync | method | `(context: InfraExecutionContext, desired: InfraRuntimeDesiredState<P>) => Promise<InfraResult<readonly InfraPlanAction[]>>` | yes |  |
| statusAsync | method | `(context: InfraExecutionContext, desired: InfraRuntimeDesiredState<P>) => Promise<InfraResult<readonly InfraResourceStatus[]>>` | yes |  |
| suspendAsync | method | `(context: InfraExecutionContext, desired: InfraRuntimeDesiredState<P>) => Promise<InfraResult<InfraReconcileResult>>` | yes |  |
| validateAsync | method | `(context: InfraExecutionContext, desired: InfraRuntimeDesiredState<P>) => Promise<InfraResult<null>>` | yes |  |

## InfraRuntimeConfigMap

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:37:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| docker-compose | property | `{ readonly projectName?: string; }` | yes |  |
| k3s | property | `{ readonly version?: string; readonly topology?: { readonly servers: number; readonly agents: number; }; }` | yes |  |
| minikube | property | `{ readonly profile?: string; readonly driver?: "docker" \| "podman"; readonly cpus?: number; readonly memoryMiB?: number; }` | yes |  |

## InfraRuntimeDesiredState

Kind: `type`
Module: `src/types/infraAdapters.ts`
Source: `src/types/infraAdapters.ts:99:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| availableOutputs | property | `readonly InfraOutput[]` | yes |  |
| selection | property | `InfraRuntimeSelection<P>` | yes |  |
| targets | property | `readonly InfraComputeTarget[]` | yes |  |
| workloads | property | `readonly InfraWorkloadSpec[]` | yes |  |

## InfraRuntimeProviderId

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:19:1`

## InfraRuntimeSelection

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:54:1`

## InfraS3PersistenceTarget

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:67:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bucket | property | `string` | yes |  |
| credentials | property | `InfraControlPlaneCredentialRef` | yes |  |
| endpoint | property | `string` | yes |  |
| forcePathStyle | property | `boolean \| undefined` | no |  |
| region | property | `string` | yes |  |

## InfraScheduledDatabaseBackupSpec

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:76:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| intervalHours | property | `number \| undefined` | no |  |
| mode | property | `"scheduled"` | yes |  |
| target | property | `InfraS3PersistenceTarget` | yes |  |

## InfraSecretReference

Kind: `type`
Module: `src/types/infraSecrets.ts`
Source: `src/types/infraSecrets.ts:10:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| environment | property | `"local" \| "preview" \| "production"` | yes |  |
| key | property | `string` | yes |  |
| projectId | property | `string` | yes |  |
| ref | property | `string` | yes |  |
| source | property | `"secret-store"` | yes |  |

## InfraSecretStoreConfigMap

Kind: `type`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:115:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| supabase-vault | property | `{ readonly schema?: string; }` | yes |  |

## InfraSecretStoreSpec

Kind: `unknown`
Module: `src/types/infraManifest.ts`
Source: `src/types/infraManifest.ts:133:1`

## InfraServiceAdapter

Kind: `type`
Module: `src/types/infraAdapters.ts`
Source: `src/types/infraAdapters.ts:144:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| descriptor | property | `InfraAdapterDescriptor<"supabase" \| "cerbos" \| "r2" \| "supabase-vault">` | yes |  |
| desiredWorkloadsAsync | method | `(context: InfraExecutionContext) => Promise<InfraResult<readonly InfraWorkloadSpec[]>>` | yes |  |
| destroyAsync | method | `(context: InfraExecutionContext, request: InfraDestroyRequest) => Promise<InfraResult<InfraReconcileResult>>` | yes |  |
| planAsync | method | `(context: InfraExecutionContext) => Promise<InfraResult<readonly InfraPlanAction[]>>` | yes |  |
| prepareAsync | method | `((context: InfraExecutionContext) => Promise<InfraResult<null>>) \| undefined` | no |  |
| reconcileAsync | method | `(context: InfraExecutionContext, runtimeOutputs: readonly InfraOutput[]) => Promise<InfraResult<InfraReconcileResult>>` | yes |  |
| statusAsync | method | `(context: InfraExecutionContext) => Promise<InfraResult<readonly InfraResourceStatus[]>>` | yes |  |
| suspendAsync | method | `((context: InfraExecutionContext) => Promise<InfraResult<InfraReconcileResult>>) \| undefined` | no |  |
| validateAsync | method | `(context: InfraExecutionContext) => Promise<InfraResult<null>>` | yes |  |

## InfraStatus

Kind: `type`
Module: `src/types/infraLifecycle.ts`
Source: `src/types/infraLifecycle.ts:58:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| environment | property | `"local" \| "preview" \| "production"` | yes |  |
| projectId | property | `string` | yes |  |
| resources | property | `readonly InfraResourceStatus[]` | yes |  |
| state | property | `"unknown" \| "absent" \| "pending" \| "ready" \| "degraded" \| "stopped" \| "retained" \| "failed"` | yes |  |

## InfraWorkloadArtifact

Kind: `type`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:4:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| image | property | `string` | yes |  |
| kind | property | `"image"` | yes |  |

## InfraWorkloadFileMap

Kind: `unknown`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:62:1`

## InfraWorkloadHealthSpec

Kind: `unknown`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:35:1`

## InfraWorkloadId

Kind: `unknown`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:60:1`

## InfraWorkloadPort

Kind: `type`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:28:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| port | property | `number` | yes |  |
| protocol | property | `"tcp" \| "udp" \| undefined` | no |  |
| publishedPort | property | `number \| undefined` | no |  |

## InfraWorkloadPortRegistry

Kind: `unknown`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:61:1`

## InfraWorkloadRegistry

Kind: `unknown`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:82:1`

## InfraWorkloadResourceSpec

Kind: `type`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:45:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cpuMillis | property | `number \| undefined` | no |  |
| memoryMiB | property | `number \| undefined` | no |  |

## InfraWorkloadScalarValue

Kind: `unknown`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:10:1`

## InfraWorkloadSpec

Kind: `type`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:65:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| args | property | `readonly string[] \| undefined` | no |  |
| artifact | property | `InfraWorkloadArtifact` | yes |  |
| command | property | `readonly string[] \| undefined` | no |  |
| dependsOn | property | `Readonly<Partial<Record<string, true>>> \| undefined` | no |  |
| environment | property | `Readonly<Record<string, InfraWorkloadValue>> \| undefined` | no |  |
| exposure | property | `"public" \| "internal" \| undefined` | no |  |
| files | property | `Readonly<Record<string, InfraWorkloadValue>> \| undefined` | no |  |
| health | property | `InfraWorkloadHealthSpec \| undefined` | no |  |
| id | property | `string` | yes |  |
| persistence | property | `InfraWorkloadVolumeRegistry \| undefined` | no |  |
| ports | property | `InfraWorkloadPortRegistry \| undefined` | no |  |
| replicas | property | `number \| undefined` | no |  |
| resources | property | `InfraWorkloadResourceSpec \| undefined` | no |  |

## InfraWorkloadValue

Kind: `unknown`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:20:1`

## InfraWorkloadVolumeRegistry

Kind: `unknown`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:63:1`

## InfraWorkloadVolumeSpec

Kind: `type`
Module: `src/types/infraWorkload.ts`
Source: `src/types/infraWorkload.ts:50:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `string` | yes |  |
| mountPath | property | `string` | yes |  |
| retention | property | `"retain" \| "delete-on-destroy"` | yes |  |
| seed | property | `"image" \| undefined` | no |  |
| sizeGiB | property | `number` | yes |  |

## InternalRestApiDefinition

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:55:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| basePath | property | `string` | yes |  |
| credential | property | `CredentialRef \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| endpoints | property | `DataEndpointRegistry` | yes |  |
| id | property | `string` | yes |  |
| metadata | property | `import("..").SerializableValue \| undefined` | no |  |
| name | property | `string \| undefined` | no |  |
| origin | property | `"internal"` | yes |  |
| protocol | property | `"rest"` | yes |  |
| schemas | property | `Readonly<Record<string, import("./schemas").DataSchema>> \| undefined` | no |  |

## IosBuildArtifact

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:273:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| archiveUrl | property | `string` | yes |  |
| buildId | property | `string` | yes |  |
| buildNumber | property | `string` | yes |  |
| buildProfile | property | `string` | yes |  |
| fingerprint | property | `string` | yes |  |
| provider | property | `string` | yes |  |
| version | property | `string` | yes |  |

## IosBuildInspection

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:264:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fingerprint | property | `string` | yes |  |

## IosBuildInspectionRequest

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:256:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildProfile | property | `string` | yes |  |
| bundleIdentifier | property | `string` | yes |  |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| projectRoot | property | `string` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |

## IosBuildRequest

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:268:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildProfile | property | `string` | yes |  |
| bundleIdentifier | property | `string` | yes |  |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| expectedFingerprint | property | `string` | yes |  |
| projectRoot | property | `string` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |
| version | property | `string` | yes |  |

## IosDeploymentBuilder

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:283:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildAsync | method | `(request: IosBuildRequest) => Promise<DeploymentProviderResult<IosBuildArtifact>>` | yes |  |
| inspectAsync | method | `(request: IosBuildInspectionRequest) => Promise<DeploymentProviderResult<IosBuildInspection>>` | yes |  |

## IosDeploymentIntent

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:251:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildProfile | property | `string` | yes |  |
| version | property | `string` | yes |  |

## IosDeploymentPublication

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:308:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildId | property | `string` | yes |  |
| buildNumber | property | `string` | yes |  |
| buildProvider | property | `string` | yes |  |
| publishProvider | property | `string` | yes |  |
| revision | property | `string` | yes |  |
| target | property | `"ios"` | yes |  |
| version | property | `string` | yes |  |

## IosDeploymentPublisher

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:318:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| inspectAsync | method | `(request: IosPublishInspectionRequest) => Promise<DeploymentProviderResult<IosPublishInspection>>` | yes |  |
| publishAsync | method | `(request: IosPublishRequest) => Promise<DeploymentProviderResult<IosDeploymentPublication>>` | yes |  |
| verifyAsync | method | `(request: IosPublishRequest) => Promise<DeploymentProviderResult<IosPublishInspection>>` | yes |  |

## IosPublishInspection

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:297:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| buildNumber | property | `string \| null` | yes |  |
| bundleIdentifier | property | `string` | yes |  |
| version | property | `string \| null` | yes |  |

## IosPublishInspectionRequest

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:290:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bundleIdentifier | property | `string` | yes |  |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |
| version | property | `string` | yes |  |

## IosPublishRequest

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:303:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| artifact | property | `IosBuildArtifact` | yes |  |
| bundleIdentifier | property | `string` | yes |  |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |
| revision | property | `string` | yes |  |
| version | property | `string` | yes |  |

## isAppDeployManifest

Kind: `function`
Module: `src/appManifest/deploy.ts`
Source: `src/appManifest/deploy.ts:22:1`

Validate authored application deployment configuration.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isAppManifest

Kind: `function`
Module: `src/appManifest/isAppManifest.ts`
Source: `src/appManifest/isAppManifest.ts:21:1`

Return whether an unknown value satisfies the canonical AppManifest shape.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isAppNavigatorManifest

Kind: `function`
Module: `src/appManifest/navigator.ts`
Source: `src/appManifest/navigator.ts:16:1`

Validate the complete serialized `AppManifest.navigator` slice.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isInfraAdapterDescriptor

Kind: `function`
Module: `src/infra/isInfraAdapterDescriptor.ts`
Source: `src/infra/isInfraAdapterDescriptor.ts:8:1`

Installed adapters must match the canonical identity, capabilities, targets and config version exactly.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isInfraAuthSpec

Kind: `function`
Module: `src/infra/isInfraAuthSpec.ts`
Source: `src/infra/isInfraAuthSpec.ts:20:1`

Preserve application auth configuration while rejecting nested authorization and unknown providers.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isInfraDeploymentSpec

Kind: `function`
Module: `src/infra/isInfraDeploymentSpec.ts`
Source: `src/infra/isInfraDeploymentSpec.ts:16:1`

Validate provider-specific config and the exact same compatibility map used by TypeScript.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isInfraEnvironmentSpec

Kind: `function`
Module: `src/infra/isInfraEnvironmentSpec.ts`
Source: `src/infra/isInfraEnvironmentSpec.ts:21:1`

Validate sibling capabilities and their required relationships within one environment.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isInfraManifest

Kind: `function`
Module: `src/infra/isInfraManifest.ts`
Source: `src/infra/isInfraManifest.ts:12:1`

Validate standalone infrastructure without AppManifest, Deploy or provider package side effects.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isInfraWorkloadSpec

Kind: `function`
Module: `src/infra/isInfraWorkloadSpec.ts`
Source: `src/infra/isInfraWorkloadSpec.ts:14:1`

Validate the portable desired workload; runtime-specific fields and plaintext secret objects fail.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isMediaAssetReference

Kind: `function`
Module: `src/media.ts`
Source: `src/media.ts:64:1`

Validate an authored media reference with exactly one enumerable key and a non-empty media ID.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isSerializableSet

Kind: `function`
Module: `src/collections.ts`
Source: `src/collections.ts:16:1`

Validate the canonical JSON-safe representation for unordered string membership.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isSerializableValue

Kind: `function`
Module: `src/serializable.ts`
Source: `src/serializable.ts:14:1`

Validate recursively serializable manifest/config values without accepting functions or host objects.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isStructureDescriptor

Kind: `function`
Module: `src/structure/isStructureDescriptor.ts`
Source: `src/structure/isStructureDescriptor.ts:7:1`

Validate one standalone structural descriptor without resolving external/local references.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## isStructureDescriptorDocument

Kind: `function`
Module: `src/structure/isStructureDescriptorDocument.ts`
Source: `src/structure/isStructureDescriptorDocument.ts:14:1`

Validate a complete package structural-descriptor document and all resolvable references.

### Signatures

- `(value: unknown) => boolean`
  - value: `unknown`
  - returns: `boolean`

## JAVASCRIPT_STACK_PRESENTATIONS

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:43:14`

## JAVASCRIPT_TABS_PRESENTATIONS

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:110:14`

## JavaScriptStackPresentation

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:44:1`

## JavaScriptStackScreenOptions

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:67:1`

## JavaScriptTabsConfig

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:163:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| implementation | property | `"javascript"` | yes |  |
| presentation | property | `"bottom" \| "top" \| undefined` | no |  |

## JavaScriptTabsPresentation

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:111:1`

## KnownAuthOAuthProviderId

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:41:1`

## KnownAuthOAuthTransportId

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:45:1`

## KnownAuthProfileField

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:185:1`

## KnownAuthSignUpField

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:17:1`

## KnownComponentEventDto

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:139:1`

## KnownSecretStoreProvider

Kind: `unknown`
Module: `src/secrets.ts`
Source: `src/secrets.ts:2:1`

## ManifestValue

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:102:1`

## MEDIA_ASSET_KINDS

Kind: `value`
Module: `src/media.ts`
Source: `src/media.ts:6:14`

## MediaAsset

Kind: `type`
Module: `src/media.ts`
Source: `src/media.ts:42:1`

Canonical Studio-managed authoring media entry.

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contentType | property | `string \| undefined` | no |  |
| id | property | `string` | yes |  |
| kind | property | `"image" \| "audio" \| "video" \| "font" \| "file"` | yes |  |
| metadata | property | `MediaAssetMetadata \| undefined` | no |  |
| name | property | `string` | yes |  |
| source | property | `MediaAssetSource` | yes |  |

## MediaAssetKind

Kind: `unknown`
Module: `src/media.ts`
Source: `src/media.ts:8:1`

## MediaAssetMetadata

Kind: `type`
Module: `src/media.ts`
Source: `src/media.ts:32:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| createdAt | property | `string \| undefined` | no |  |
| durationMs | property | `number \| undefined` | no |  |
| height | property | `number \| undefined` | no |  |
| originalFileName | property | `string \| undefined` | no |  |
| sizeBytes | property | `number \| undefined` | no |  |
| width | property | `number \| undefined` | no |  |

## MediaAssetReference

Kind: `type`
Module: `src/media.ts`
Source: `src/media.ts:59:1`

Stable component/property reference to one entry in `AppManifest.media.assets`.

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| mediaId | property | `string` | yes |  |

## MediaAssetRegistry

Kind: `unknown`
Module: `src/media.ts`
Source: `src/media.ts:51:1`

## MediaAssetSource

Kind: `unknown`
Module: `src/media.ts`
Source: `src/media.ts:30:1`

## MediaBundledSource

Kind: `type`
Module: `src/media.ts`
Source: `src/media.ts:24:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `"bundled"` | yes |  |
| path | property | `string` | yes | App-relative bundled asset path resolved by the generated/runtime host. |

## MediaManifest

Kind: `type`
Module: `src/media.ts`
Source: `src/media.ts:54:1`

App-authoring media pool. Runtime/user-generated uploads do not belong here.

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| assets | property | `MediaAssetRegistry` | yes |  |

## MediaStorageAdapter

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:155:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| getImageMetadata | method | `((input: StorageAssetReference) => Promise<StorageResult<ImageMetadata>>) \| undefined` | no |  |
| list | method | `(input: StorageListInput) => Promise<StorageResult<StorageListResult>>` | yes |  |
| publicUrl | method | `(input: StoragePublicUrlInput) => Promise<StorageResult<StoragePublicUrlResult>>` | yes |  |
| remove | method | `(input: StorageRemoveInput) => Promise<StorageResult>` | yes |  |
| resolve | method | `(input: StorageResolveInput) => Promise<StorageResult<StorageResolveResult>>` | yes |  |
| upload | method | `(input: StorageUploadInput) => Promise<StorageResult<StorageUploadResult>>` | yes |  |

## MediaStorageSource

Kind: `type`
Module: `src/media.ts`
Source: `src/media.ts:10:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bucket | property | `string` | yes |  |
| kind | property | `"storage"` | yes |  |
| path | property | `string` | yes |  |
| storageId | property | `string \| undefined` | no | Optional logical storage connection identifier for future multi-storage apps. |

## MediaUrlSource

Kind: `type`
Module: `src/media.ts`
Source: `src/media.ts:18:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `"url"` | yes |  |
| url | property | `string` | yes | Stable remote URL. Transient/local URL schemes are not canonical media sources. |

## MonetizationAdapterContext

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:87:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| identity | property | `DeploymentStoreIdentity` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |

## MonetizationBasePrice

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:16:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| amount | property | `string` | yes |  |
| country | property | `string` | yes |  |
| currency | property | `string` | yes |  |

## MonetizationDesiredState

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:46:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| products | property | `readonly MonetizationProduct[]` | yes |  |
| revision | property | `string` | yes |  |

## MonetizationDiagnostic

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:51:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| locale | property | `string \| undefined` | no |  |
| message | property | `string` | yes |  |
| productId | property | `string \| undefined` | no |  |
| severity | property | `"error" \| "warning"` | yes |  |
| target | property | `"android" \| "ios" \| undefined` | no |  |

## MonetizationLocalization

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:10:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string` | yes |  |
| locale | property | `string` | yes |  |
| name | property | `string` | yes |  |

## MonetizationObservedProduct

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:38:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| basePrice | property | `MonetizationBasePrice \| undefined` | no |  |
| id | property | `string` | yes |  |
| kind | property | `MonetizationProductKind \| "one-time"` | yes |  |
| localizations | property | `readonly MonetizationLocalization[]` | yes |  |
| subscription | property | `MonetizationSubscription \| undefined` | no |  |

## MonetizationPlan

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:79:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currentRevision | property | `string` | yes |  |
| desiredRevision | property | `string` | yes |  |
| diagnostics | property | `readonly MonetizationDiagnostic[]` | yes |  |
| status | property | `"no-change" \| "changes" \| "blocked"` | yes |  |
| steps | property | `readonly MonetizationPlanStep[]` | yes |  |

## MonetizationPlanStep

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:67:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `string` | yes |  |
| operation | property | `"ensure-subscription-family" \| "create-product" \| "update-metadata" \| "update-price" \| "update-subscription"` | yes |  |
| productId | property | `string` | yes |  |
| target | property | `"android" \| "ios"` | yes |  |

## MonetizationProduct

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:30:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| basePrice | property | `MonetizationBasePrice` | yes |  |
| id | property | `string` | yes |  |
| kind | property | `MonetizationProductKind` | yes |  |
| localizations | property | `readonly MonetizationLocalization[]` | yes |  |
| subscription | property | `MonetizationSubscription \| undefined` | no |  |

## MonetizationProductKind

Kind: `unknown`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:8:1`

## MonetizationSubscription

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:24:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| family | property | `string` | yes |  |
| level | property | `number \| undefined` | no |  |
| period | property | `MonetizationSubscriptionPeriod` | yes |  |

## MonetizationSubscriptionPeriod

Kind: `unknown`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:22:1`

## MonetizationSyncRequest

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:93:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| desired | property | `MonetizationDesiredState` | yes |  |
| identity | property | `DeploymentStoreIdentity` | yes |  |
| plan | property | `MonetizationPlan` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |

## MonetizationTargetState

Kind: `type`
Module: `src/types/deployMonetization.ts`
Source: `src/types/deployMonetization.ts:60:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| diagnostics | property | `readonly MonetizationDiagnostic[]` | yes |  |
| products | property | `readonly MonetizationObservedProduct[]` | yes |  |
| subscriptionFamilies | property | `readonly string[]` | yes |  |
| target | property | `"android" \| "ios"` | yes |  |

## NamedIconSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:202:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| color | property | `string \| undefined` | no |  |
| name | property | `string` | yes |  |
| provider | property | `string \| undefined` | no |  |
| size | property | `string \| number \| undefined` | no |  |
| source | property | `undefined` | no |  |

## NATIVE_TABS_MINIMIZE_BEHAVIORS

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:113:14`

## NativeTabsConfig

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:155:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bottomAccessory | property | `NavigatorScreenReference \| undefined` | no |  |
| implementation | property | `"native"` | yes |  |
| minimizeBehavior | property | `"never" \| "automatic" \| "onScrollDown" \| "onScrollUp" \| undefined` | no |  |

## NativeTabsMinimizeBehavior

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:119:1`

## NavigateAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:45:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| payload | property | `{ route: string; params?: Record<string, number \| string>; }` | yes |  |
| type | property | `"navigate"` | yes |  |

## NAVIGATOR_PRESETS

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:9:14`

## NAVIGATOR_TYPES

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:6:14`

## NavigatorAdapterId

Kind: `unknown`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:56:1`

## NavigatorAdapterPlan

Kind: `type`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:68:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| exportName | property | `string \| undefined` | no |  |
| id | property | `NavigatorAdapterId` | yes |  |
| limitations | property | `readonly string[]` | yes |  |
| module | property | `string \| undefined` | no |  |
| stability | property | `NavigatorApiStability` | yes |  |
| support | property | `NavigatorSupportStatus` | yes |  |

## NavigatorApiStability

Kind: `unknown`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:78:1`

## NavigatorCapabilityDescriptor

Kind: `type`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:57:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| dependencies | property | `readonly NavigatorDependencyRequirement[]` | yes |  |
| id | property | `string` | yes |  |
| implementation | property | `NavigatorImplementation \| undefined` | no |  |
| incompatibilities | property | `readonly string[]` | yes |  |
| limitations | property | `readonly string[]` | yes |  |
| presentation | property | `NavigatorPresentation \| undefined` | no |  |
| requirements | property | `readonly NavigatorCapabilityRequirement[]` | yes |  |
| stability | property | `NavigatorApiStability` | yes |  |
| targets | property | `readonly NavigatorCapabilityTarget[]` | yes |  |
| topology | property | `"custom" \| "slot" \| "drawer" \| "split-view" \| "stack" \| "tabs"` | yes |  |

## NavigatorCapabilityId

Kind: `unknown`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:80:1`

## NavigatorCapabilityRequirement

Kind: `type`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:52:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string` | yes |  |
| id | property | `string` | yes |  |

## NavigatorCapabilityTarget

Kind: `type`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:46:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| platform | property | `NavigatorRuntimePlatform` | yes |  |
| support | property | `NavigatorSupportStatus` | yes |  |
| verification | property | `readonly NavigatorCapabilityVerification[]` | yes |  |

## NavigatorCapabilityVerification

Kind: `type`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:41:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `NavigatorVerificationKind` | yes |  |
| status | property | `NavigatorVerificationStatus` | yes |  |

## NavigatorCatalog

Kind: `type`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:76:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `readonly NavigatorCapabilityDescriptor[]` | yes |  |
| presets | property | `readonly NavigatorPresetDescriptor[]` | yes |  |

## NavigatorDefaults

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:243:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| stack | property | `StackImplementationConfig \| undefined` | no |  |
| tabs | property | `TabsImplementationConfig \| undefined` | no |  |

## NavigatorDependencyRequirement

Kind: `type`
Module: `src/navigator/generation.ts`
Source: `src/navigator/generation.ts:20:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `"dependency" \| "peerDependency"` | yes |  |
| packageName | property | `string` | yes |  |
| versionRange | property | `string` | yes |  |

## NavigatorDiagnostic

Kind: `type`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:82:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |
| path | property | `string` | yes |  |
| severity | property | `"error" \| "warning"` | yes |  |

## NavigatorGeneratedFile

Kind: `type`
Module: `src/navigator/generation.ts`
Source: `src/navigator/generation.ts:8:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contents | property | `string` | yes |  |
| path | property | `string` | yes |  |

## NavigatorGenerationBindings

Kind: `type`
Module: `src/navigator/generation.ts`
Source: `src/navigator/generation.ts:13:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| guards | property | `Readonly<Record<string, NavigatorScreenModule>>` | yes |  |
| iconSourceResolver | property | `NavigatorScreenModule \| undefined` | no |  |
| screens | property | `Readonly<Record<string, NavigatorScreenModule>>` | yes |  |
| tabPresentations | property | `Readonly<Record<string, NavigatorScreenModule>> \| undefined` | no |  |

## NavigatorGenerationOptions

Kind: `type`
Module: `src/navigator/generation.ts`
Source: `src/navigator/generation.ts:36:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| includeScreenFiles | property | `boolean \| undefined` | no |  |
| rootDirectory | property | `string \| undefined` | no |  |

## NavigatorGenerationResult

Kind: `type`
Module: `src/navigator/generation.ts`
Source: `src/navigator/generation.ts:26:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilityIds | property | `readonly string[]` | yes |  |
| dependencies | property | `readonly NavigatorDependencyRequirement[]` | yes |  |
| diagnostics | property | `readonly NavigatorDiagnostic[]` | yes |  |
| files | property | `readonly NavigatorGeneratedFile[]` | yes |  |
| plan | property | `NavigatorPlan` | yes |  |
| support | property | `NavigatorSupportStatus` | yes |  |

## NavigatorImplementation

Kind: `unknown`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:32:1`

## NavigatorNode

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:221:1`

## NavigatorNodePlan

Kind: `type`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:89:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| adapter | property | `NavigatorAdapterPlan` | yes |  |
| custom | property | `{ navigatorId: string; config?: CustomNavigatorNode["config"]; } \| undefined` | no |  |
| drawer | property | `{ options?: DrawerNavigatorOptions; } \| undefined` | no |  |
| initialRouteName | property | `string \| undefined` | no |  |
| pointer | property | `string` | yes |  |
| routes | property | `readonly NavigatorRoutePlan[]` | yes |  |
| splitView | property | `{ columns: { primary: string; supplementary?: string; }; inspector?: string; topColumnForCollapsing?: "primary" \| "secondary" \| "supplementary"; } \| undefined` | no |  |
| stack | property | `{ implementation: StackImplementation; options?: StackScreenOptions; } \| undefined` | no |  |
| tabs | property | `TabsNavigatorPlan \| undefined` | no |  |
| type | property | `"custom" \| "slot" \| "drawer" \| "split-view" \| "stack" \| "tabs"` | yes |  |

## NavigatorPlan

Kind: `type`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:117:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilityIds | property | `readonly string[]` | yes |  |
| context | property | `NavigatorValidationContext` | yes |  |
| dependencies | property | `readonly NavigatorDependencyRequirement[]` | yes |  |
| diagnostics | property | `readonly NavigatorDiagnostic[]` | yes |  |
| root | property | `NavigatorNodePlan` | yes |  |
| support | property | `NavigatorSupportStatus` | yes |  |

## NavigatorPlatformConfig

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:248:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| stack | property | `StackImplementationConfig \| undefined` | no |  |
| tabs | property | `TabsImplementationConfig \| undefined` | no |  |

## NavigatorPlatforms

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:253:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| android | property | `NavigatorPlatformConfig \| undefined` | no |  |
| ios | property | `NavigatorPlatformConfig \| undefined` | no |  |
| web | property | `NavigatorPlatformConfig \| undefined` | no |  |

## NavigatorPresentation

Kind: `unknown`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:34:1`

## NavigatorPreset

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:27:1`

## NavigatorPresetDescriptor

Kind: `type`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:70:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string` | yes |  |
| id | property | `"custom" \| "slot" \| "drawer" \| "split-view" \| "stack" \| "tabs" \| "tabs-stack" \| "stack-tabs" \| "stack-tabs-stack" \| "drawer-stack" \| "stack-drawer" \| "stack-drawer-stack" \| "drawer-tabs" \| "drawer-tabs-stack" \| "stack-drawer-tabs" \| "stack-drawer-tabs-stack"` | yes |  |
| topology | property | `readonly ("custom" \| "slot" \| "drawer" \| "split-view" \| "stack" \| "tabs")[]` | yes |  |

## NavigatorResponsiveSize

Kind: `unknown`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:126:1`

## NavigatorRoutePlan

Kind: `type`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:128:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| guards | property | `readonly string[]` | yes |  |
| icon | property | `import("..").IconSpec \| undefined` | no |  |
| label | property | `string \| undefined` | no |  |
| name | property | `string` | yes |  |
| navigator | property | `NavigatorNodePlan \| undefined` | no |  |
| path | property | `string \| undefined` | no |  |
| screenId | property | `string \| undefined` | no |  |
| showInPrimaryNavigation | property | `boolean \| undefined` | no |  |
| stackOptions | property | `StackScreenOptions \| undefined` | no |  |

## NavigatorRuntimePlatform

Kind: `unknown`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:140:1`

## NavigatorScreenModule

Kind: `type`
Module: `src/navigator/generation.ts`
Source: `src/navigator/generation.ts:43:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| exportName | property | `string` | yes |  |
| module | property | `string` | yes |  |

## NavigatorScreenReference

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:151:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| screenId | property | `string` | yes |  |

## NavigatorSupportStatus

Kind: `unknown`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:142:1`

## NavigatorType

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:7:1`

## NavigatorValidationContext

Kind: `type`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:144:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| expoRouterVersion | property | `string` | yes |  |
| platform | property | `NavigatorRuntimePlatform` | yes |  |

## NavigatorVerificationKind

Kind: `unknown`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:16:1`

## NavigatorVerificationStatus

Kind: `unknown`
Module: `src/navigator/catalog.ts`
Source: `src/navigator/catalog.ts:30:1`

## normalizeSecretRef

Kind: `function`
Module: `src/secrets.ts`
Source: `src/secrets.ts:105:1`

### Signatures

- `(value: string) => SecretStoreResult<string>`
  - value: `string`
  - returns: `SecretStoreResult<string>`

## normalizeSecretScope

Kind: `function`
Module: `src/secrets.ts`
Source: `src/secrets.ts:129:1`

### Signatures

- `(scope: SecretScope) => SecretStoreResult<SecretScope>`
  - scope: `SecretScope`
  - returns: `SecretStoreResult<SecretScope>`

## OpenApiDocumentRef

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:23:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| documentId | property | `string \| undefined` | no |  |
| url | property | `string \| undefined` | no |  |
| version | property | `string \| undefined` | no |  |

## OperationId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:4:1`

## OperationScreenDataLoaderDefinition

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:91:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `string \| undefined` | no |  |
| input | property | `Readonly<Record<string, BindingInputValue>> \| undefined` | no |  |
| kind | property | `"operation"` | yes |  |
| operation | property | `BindingOperationRef` | yes |  |

## parseAppManifest

Kind: `function`
Module: `src/appManifest/parseAppManifest.ts`
Source: `src/appManifest/parseAppManifest.ts:11:1`

### Signatures

- `(value: unknown) => AppManifestParseResult`
  - value: `unknown`
  - returns: `AppManifestParseResult`

## parseInfraManifest

Kind: `function`
Module: `src/infra/parseInfraManifest.ts`
Source: `src/infra/parseInfraManifest.ts:6:1`

### Signatures

- `(value: unknown) => InfraResult<InfraManifest>`
  - value: `unknown`
  - returns: `InfraResult<InfraManifest>`

## PasswordResetInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:228:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| identifier | property | `AuthIdentifier` | yes |  |
| redirectTo | property | `string \| undefined` | no |  |

## PropBinding

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:61:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| empty | property | `BindingLifecycleBehavior \| undefined` | no |  |
| error | property | `BindingLifecycleBehavior \| undefined` | no |  |
| fallback | property | `BindingFallback \| undefined` | no |  |
| loading | property | `BindingLifecycleBehavior \| undefined` | no |  |
| source | property | `BindingValueSource` | yes |  |
| transforms | property | `readonly BindingValueTransform[] \| undefined` | no |  |

## ReleaseAdapterContext

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:124:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| identity | property | `DeploymentStoreIdentity` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |

## ReleaseControlExecutionResult

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:119:1`

## ReleaseControlRequest

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:139:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| control | property | `ReleaseLifecycleControl` | yes |  |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| desired | property | `ReleaseDesiredState` | yes |  |
| identity | property | `DeploymentStoreIdentity` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |

## ReleaseDesiredState

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:27:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| notes | property | `readonly ReleaseNote[]` | yes |  |
| revision | property | `string` | yes |  |
| rollout | property | `ReleaseRollout` | yes |  |
| targets | property | `readonly ReleaseTarget[]` | yes |  |
| version | property | `string` | yes |  |

## ReleaseDiagnostic

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:83:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |
| severity | property | `"error" \| "warning"` | yes |  |
| target | property | `"release" \| ReleaseTarget \| undefined` | no |  |

## ReleaseInspectionRequest

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:130:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| identity | property | `DeploymentStoreIdentity` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |
| version | property | `string` | yes |  |

## ReleaseLifecycleControl

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:107:1`

## ReleaseMutationResult

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:114:1`

## ReleaseNote

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:11:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| locale | property | `string` | yes |  |
| text | property | `string` | yes |  |

## ReleaseObservedAndroidState

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:41:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| artifactRevision | property | `string \| null` | yes |  |
| releaseNotes | property | `readonly ReleaseNote[]` | yes |  |
| rolloutStatus | property | `"draft" \| "completed" \| "missing" \| "inProgress" \| "halted"` | yes |  |
| target | property | `"android"` | yes |  |
| userFraction | property | `string \| undefined` | no |  |
| version | property | `string \| null` | yes |  |
| versionCodes | property | `readonly string[]` | yes |  |

## ReleaseObservedIosState

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:51:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| appVersionState | property | `string \| undefined` | no |  |
| artifactRevision | property | `string \| null` | yes |  |
| buildNumber | property | `string \| null` | yes |  |
| phasedReleaseState | property | `"INACTIVE" \| "ACTIVE" \| "PAUSED" \| "COMPLETE" \| null` | yes |  |
| releaseNotes | property | `readonly ReleaseNote[]` | yes |  |
| releaseType | property | `string \| undefined` | no |  |
| reviewState | property | `string \| undefined` | no |  |
| target | property | `"ios"` | yes |  |
| version | property | `string \| null` | yes |  |

## ReleaseObservedNativeState

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:144:1`

## ReleaseObservedState

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:66:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| targets | property | `readonly ReleaseObservedTargetState[]` | yes |  |

## ReleaseObservedTargetState

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:63:1`

## ReleaseObservedWebState

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:35:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| artifactRevision | property | `string \| null` | yes |  |
| target | property | `"web"` | yes |  |
| version | property | `string \| null` | yes |  |

## ReleasePlan

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:99:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currentRevision | property | `string` | yes |  |
| desiredRevision | property | `string` | yes |  |
| diagnostics | property | `readonly ReleaseDiagnostic[]` | yes |  |
| status | property | `ReleasePlanStatus` | yes |  |
| steps | property | `readonly ReleasePlanStep[]` | yes |  |

## ReleasePlanStatus

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:70:1`

## ReleasePlanStep

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:90:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| dependsOn | property | `readonly string[]` | yes |  |
| id | property | `string` | yes |  |
| irreversible | property | `boolean` | yes |  |
| operation | property | `ReleaseStepOperation` | yes |  |
| retry | property | `ReleaseStepRetry` | yes |  |
| target | property | `"release" \| ReleaseTarget` | yes |  |

## ReleaseRollout

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:21:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| android | property | `ReleaseTargetRollout \| undefined` | no |  |
| ios | property | `ReleaseTargetRollout \| undefined` | no |  |
| web | property | `ReleaseTargetRollout \| undefined` | no |  |

## ReleaseRolloutMode

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:9:1`

## ReleaseStepExecutionRequest

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:134:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| desired | property | `ReleaseDesiredState` | yes |  |
| identity | property | `DeploymentStoreIdentity` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |
| step | property | `ReleasePlanStep` | yes |  |

## ReleaseStepOperation

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:72:1`

## ReleaseStepRetry

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:71:1`

## ReleaseTarget

Kind: `unknown`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:8:1`

## ReleaseTargetRollout

Kind: `type`
Module: `src/types/deployRelease.ts`
Source: `src/types/deployRelease.ts:16:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| initialFraction | property | `string \| undefined` | no |  |
| mode | property | `ReleaseRolloutMode` | yes |  |

## RepositoryManifest

Kind: `type`
Module: `src/repository.ts`
Source: `src/repository.ts:1:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| defaultBranch | property | `"main"` | yes |  |
| name | property | `string` | yes |  |
| owner | property | `string` | yes |  |
| provider | property | `"github"` | yes |  |
| url | property | `string` | yes |  |

## resolveAuthFlow

Kind: `function`
Module: `src/auth.ts`
Source: `src/auth.ts:131:1`

### Signatures

- `(flow?: AuthFlowConfig | undefined) => AuthFlowConfig`
  - flow: `AuthFlowConfig | undefined` (optional)
  - returns: `AuthFlowConfig`

## ResolvedHeadlessTabsPresentation

Kind: `type`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:12:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| customPresentationId | property | `string \| undefined` | no |  |
| presentation | property | `ResolvedTabsPresentation` | yes |  |

## ResolvedTabsImplementation

Kind: `unknown`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:17:1`

## ResolvedTabsPresentation

Kind: `unknown`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:19:1`

## ResponsiveTabsPresentation

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:121:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| compact | property | `"bottom" \| "top" \| "rail" \| "sidebar"` | yes |  |
| expanded | property | `"bottom" \| "top" \| "rail" \| "sidebar"` | yes |  |
| medium | property | `"bottom" \| "top" \| "rail" \| "sidebar" \| undefined` | no |  |

## RouteDefinition

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:229:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| guards | property | `string[] \| undefined` | no |  |
| icon | property | `IconSpec \| undefined` | no |  |
| label | property | `string \| undefined` | no |  |
| name | property | `string` | yes |  |
| navigator | property | `NavigatorNode \| undefined` | no |  |
| path | property | `string \| undefined` | no |  |
| screenId | property | `string \| undefined` | no |  |
| showInPrimaryNavigation | property | `boolean \| undefined` | no |  |
| stackOptions | property | `StackScreenOptions \| undefined` | no |  |

## RuntimeCallback

Kind: `unknown`
Module: `src/runtimeCallbacks.ts`
Source: `src/runtimeCallbacks.ts:18:1`

## RuntimeCallbackArgs

Kind: `type`
Module: `src/runtimeCallbacks.ts`
Source: `src/runtimeCallbacks.ts:12:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| node | property | `UiNode \| undefined` | no |  |
| payload | property | `unknown` | yes |  |
| resolvedPayload | property | `object \| undefined` | no |  |

## RuntimeCallbackMap

Kind: `unknown`
Module: `src/runtimeCallbacks.ts`
Source: `src/runtimeCallbacks.ts:19:1`

## RuntimeNodePropsResolver

Kind: `unknown`
Module: `src/runtimeCallbacks.ts`
Source: `src/runtimeCallbacks.ts:8:1`

## RuntimeResolveNodePropsArgs

Kind: `type`
Module: `src/runtimeCallbacks.ts`
Source: `src/runtimeCallbacks.ts:3:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| node | property | `UiNode` | yes |  |
| props | property | `Record<string, unknown>` | yes |  |

## SchemaId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:5:1`

## ScreenDataLoaderDefinition

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:98:1`

## ScreenMetadataSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:233:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| id | property | `string` | yes |  |
| name | property | `string` | yes |  |
| title | property | `string \| undefined` | no |  |

## ScreenRequirements

Kind: `type`
Module: `src/requirements.ts`
Source: `src/requirements.ts:29:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `Readonly<Partial<Record<"notifications" \| "clipboard" \| "barcodeScanner" \| "cameraPreview" \| "ebookReader" \| "mediaPicker" \| "filePicker" \| "location", true>>> \| undefined` | no |  |
| permissions | property | `Readonly<Partial<Record<"camera" \| "microphone" \| "mediaLibrary" \| "mediaLibraryWrite" \| "locationForeground" \| "locationBackground" \| "notifications" \| "clipboard", true>>> \| undefined` | no |  |

## ScreenSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:240:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| dataLoaders | property | `readonly import("./bindings").OperationScreenDataLoaderDefinition[] \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| id | property | `string` | yes |  |
| name | property | `string` | yes |  |
| requires | property | `ScreenRequirements \| undefined` | no |  |
| root | property | `UiNode` | yes |  |
| title | property | `string \| undefined` | no |  |

## SearchAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:77:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| payload | property | `{ query: string; scope?: string; }` | yes |  |
| type | property | `"search"` | yes |  |

## SECRET_STORE_ERROR_CODES

Kind: `value`
Module: `src/secrets.ts`
Source: `src/secrets.ts:24:14`

## SECRET_STORE_PROVIDERS

Kind: `value`
Module: `src/secrets.ts`
Source: `src/secrets.ts:1:14`

## SecretCreateInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:64:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `string` | yes |  |
| payload | property | `Readonly<Record<string, string>>` | yes |  |
| provider | property | `string \| undefined` | no |  |
| ref | property | `string` | yes |  |
| scope | property | `SecretScope` | yes |  |

## SecretGetMetadataInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:59:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| ref | property | `string` | yes |  |
| scope | property | `SecretScope` | yes |  |

## SecretListInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:53:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `string \| undefined` | no |  |
| provider | property | `string \| undefined` | no |  |
| scope | property | `SecretScope` | yes |  |

## SecretMetadata

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:14:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| configuredFields | property | `readonly string[]` | yes |  |
| createdAt | property | `string` | yes |  |
| kind | property | `string` | yes |  |
| provider | property | `string \| undefined` | no |  |
| ref | property | `string` | yes |  |
| scope | property | `SecretScope` | yes |  |
| updatedAt | property | `string` | yes |  |

## SecretPayload

Kind: `unknown`
Module: `src/secrets.ts`
Source: `src/secrets.ts:12:1`

## SecretRef

Kind: `unknown`
Module: `src/secrets.ts`
Source: `src/secrets.ts:5:1`

## SecretRemoveInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:78:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| ref | property | `string` | yes |  |
| scope | property | `SecretScope` | yes |  |

## SecretReplaceInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:72:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| payload | property | `Readonly<Record<string, string>>` | yes |  |
| ref | property | `string` | yes |  |
| scope | property | `SecretScope` | yes |  |

## SecretResolveInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:83:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| ref | property | `string` | yes |  |
| scope | property | `SecretScope` | yes |  |

## SecretScope

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:7:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| environment | property | `string` | yes |  |
| projectId | property | `string` | yes |  |

## SecretStoreAdapter

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:94:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| create | method | `(input: SecretCreateInput) => Promise<SecretStoreResult<SecretMetadata>>` | yes |  |
| getMetadata | method | `(input: SecretGetMetadataInput) => Promise<SecretStoreResult<SecretMetadata>>` | yes |  |
| list | method | `(input: SecretListInput) => Promise<SecretStoreResult<readonly SecretMetadata[]>>` | yes |  |
| remove | method | `(input: SecretRemoveInput) => Promise<SecretStoreResult>` | yes |  |
| replace | method | `(input: SecretReplaceInput) => Promise<SecretStoreResult<SecretMetadata>>` | yes |  |
| resolve | method | `(input: SecretResolveInput) => Promise<SecretStoreResult<SecretPayload>>` | yes |  |

## SecretStoreError

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:36:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cause | property | `unknown` | no |  |
| code | property | `"provider_error" \| "unavailable" \| "invalid_config" \| "invalid_reference" \| "invalid_payload" \| "not_found" \| "conflict" \| "permission_denied"` | yes |  |
| message | property | `string` | yes |  |

## SecretStoreErrorCode

Kind: `unknown`
Module: `src/secrets.ts`
Source: `src/secrets.ts:34:1`

## SecretStoreOkResult

Kind: `unknown`
Module: `src/secrets.ts`
Source: `src/secrets.ts:42:1`

## SecretStoreProvider

Kind: `unknown`
Module: `src/secrets.ts`
Source: `src/secrets.ts:3:1`

## SecretStoreResult

Kind: `unknown`
Module: `src/secrets.ts`
Source: `src/secrets.ts:46:1`

## SerializableSet

Kind: `unknown`
Module: `src/collections.ts`
Source: `src/collections.ts:13:1`

## SerializableValue

Kind: `unknown`
Module: `src/serializable.ts`
Source: `src/serializable.ts:3:1`

## SetLanguageAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:70:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| payload | property | `{ locale: string; }` | yes |  |
| type | property | `"setLanguage"` | yes |  |

## SignInInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:208:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| identifier | property | `AuthIdentifier` | yes |  |
| metadata | property | `Record<string, unknown> \| undefined` | no |  |
| otp | property | `string \| undefined` | no |  |
| password | property | `string \| undefined` | no |  |
| redirectTo | property | `string \| undefined` | no |  |

## SignOutInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:224:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| allDevices | property | `boolean \| undefined` | no |  |

## SignUpInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:216:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| identifier | property | `AuthIdentifier` | yes |  |
| metadata | property | `Record<string, unknown> \| undefined` | no |  |
| password | property | `string \| undefined` | no |  |
| profile | property | `Record<string, unknown> \| undefined` | no |  |
| redirectTo | property | `string \| undefined` | no |  |

## SlotNavigatorNode

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:185:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| initialRouteName | property | `string \| undefined` | no |  |
| routes | property | `RouteDefinition[]` | yes |  |
| type | property | `"slot"` | yes |  |

## SplashScreenModeSpec

Kind: `type`
Module: `src/appManifest/splashScreen.ts`
Source: `src/appManifest/splashScreen.ts:5:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| backgroundColor | property | `string \| undefined` | no |  |
| image | property | `MediaAssetReference \| undefined` | no |  |

## SplashScreenResizeMode

Kind: `unknown`
Module: `src/appManifest/splashScreen.ts`
Source: `src/appManifest/splashScreen.ts:3:1`

## SplashScreenSpec

Kind: `type`
Module: `src/appManifest/splashScreen.ts`
Source: `src/appManifest/splashScreen.ts:10:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| backgroundColor | property | `string \| undefined` | no |  |
| dark | property | `SplashScreenModeSpec \| undefined` | no |  |
| image | property | `MediaAssetReference \| undefined` | no |  |
| imageWidth | property | `number \| undefined` | no |  |
| resizeMode | property | `SplashScreenResizeMode \| undefined` | no |  |

## SplitViewNavigatorNode

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:204:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| columns | property | `{ primary: NavigatorScreenReference; supplementary?: NavigatorScreenReference; }` | yes |  |
| initialRouteName | property | `string \| undefined` | no |  |
| inspector | property | `NavigatorScreenReference \| undefined` | no |  |
| routes | property | `RouteDefinition[]` | yes |  |
| topColumnForCollapsing | property | `"primary" \| "supplementary" \| "secondary" \| undefined` | no |  |
| type | property | `"split-view"` | yes |  |

## STACK_IMPLEMENTATIONS

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:29:14`

## STACK_PRESENTATIONS

Kind: `value`
Module: `src/navigator.ts`
Source: `src/navigator.ts:32:14`

## StackHeaderOptions

Kind: `type`
Module: `src/navigator.ts`
Source: `src/navigator.ts:46:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| headerBackVisible | property | `boolean \| undefined` | no |  |
| headerShown | property | `boolean \| undefined` | no |  |
| headerTransparent | property | `boolean \| undefined` | no |  |
| title | property | `string \| undefined` | no |  |

## StackImplementation

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:30:1`

## StackImplementationConfig

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:71:1`

## StackNavigatorNode

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:189:1`

## StackPresentation

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:41:1`

## StackScreenOptions

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:53:1`

## StartOAuthAuthorizationInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:301:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| provider | property | `AuthOAuthProviderId` | yes |  |
| queryParams | property | `Readonly<Record<string, string>> \| undefined` | no |  |
| redirectUri | property | `string` | yes |  |
| scopes | property | `readonly string[] \| undefined` | no |  |

## StateAdapter

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:56:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| capabilities | property | `StateAdapterCapabilities` | yes |  |
| delete | method | `((path: StatePath) => StateResult) \| undefined` | no |  |
| get | method | `<TValue extends StateValue = SerializableValue>(path: StatePath) => StateResult<TValue \| undefined>` | yes |  |
| set | method | `<TValue extends StateValue = SerializableValue>(path: StatePath, value: TValue) => StateResult` | yes |  |
| subscribe | method | `<TValue extends StateValue = SerializableValue>(path: StatePath, listener: StateListener<TValue>) => StateResult<StateSubscription>` | yes |  |

## StateAdapterCapabilities

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:15:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| computed | property | `boolean` | yes |  |
| persistence | property | `boolean` | yes |  |
| subscriptions | property | `boolean` | yes |  |

## StateAdapterError

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:21:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cause | property | `unknown` | no |  |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |

## StateListener

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:48:1`

## StatePath

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:13:1`

## StatePrimitive

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:9:1`

## StateResult

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:36:1`

## StateSnapshot

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:43:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| path | property | `StatePath` | yes |  |
| value | property | `TValue \| undefined` | yes |  |

## StateSubscription

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:52:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| unsubscribe | method | `() => Promise<void> \| void` | yes |  |

## StateSuccess

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:27:1`

## StateValue

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:11:1`

## StorageAdapter

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:133:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| getImageMetadata | method | `((input: StorageAssetReference) => Promise<StorageResult<ImageMetadata>>) \| undefined` | no |  |
| publicUrl | method | `(input: StoragePublicUrlInput) => Promise<StorageResult<StoragePublicUrlResult>>` | yes |  |
| remove | method | `(input: StorageRemoveInput) => Promise<StorageResult>` | yes |  |
| upload | method | `(input: StorageUploadInput) => Promise<StorageResult<StorageUploadResult>>` | yes |  |

## StorageAdapterError

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:1:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cause | property | `unknown` | no |  |
| code | property | `string` | yes |  |
| message | property | `string` | yes |  |

## StorageAssetReference

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:18:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bucket | property | `string` | yes |  |
| path | property | `string` | yes |  |
| publicUrl | property | `string \| undefined` | no |  |
| storageId | property | `string \| undefined` | no |  |

## StorageImageAssetSource

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:108:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| alt | property | `string \| undefined` | no |  |
| bucket | property | `string` | yes |  |
| contentType | property | `string \| undefined` | no |  |
| height | property | `number \| undefined` | no |  |
| kind | property | `"storage"` | yes |  |
| metadata | property | `ImageMetadata \| undefined` | no |  |
| path | property | `string` | yes |  |
| publicUrl | property | `string \| undefined` | no |  |
| storageId | property | `string \| undefined` | no |  |
| width | property | `number \| undefined` | no |  |

## StorageListAdapter

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:140:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| list | method | `(input: StorageListInput) => Promise<StorageResult<StorageListResult>>` | yes |  |

## StorageListInput

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:66:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bucket | property | `string` | yes |  |
| cursor | property | `string \| undefined` | no |  |
| limit | property | `number \| undefined` | no |  |
| prefix | property | `string \| undefined` | no |  |
| storageId | property | `string \| undefined` | no |  |

## StorageListResult

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:74:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| nextCursor | property | `string \| undefined` | no |  |
| objects | property | `readonly StorageObjectMetadata[]` | yes |  |

## StorageObjectMetadata

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:55:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bucket | property | `string` | yes |  |
| contentType | property | `string \| undefined` | no |  |
| createdAt | property | `string \| undefined` | no |  |
| etag | property | `string \| undefined` | no |  |
| path | property | `string` | yes |  |
| sizeBytes | property | `number \| undefined` | no |  |
| storageId | property | `string \| undefined` | no |  |
| updatedAt | property | `string \| undefined` | no |  |

## StorageOkResult

Kind: `unknown`
Module: `src/storage.ts`
Source: `src/storage.ts:7:1`

## StoragePublicUrlInput

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:45:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bucket | property | `string` | yes |  |
| path | property | `string` | yes |  |
| storageId | property | `string \| undefined` | no |  |

## StoragePublicUrlResult

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:51:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| publicUrl | property | `string` | yes |  |

## StorageRemoveInput

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:39:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bucket | property | `string` | yes |  |
| path | property | `string` | yes |  |
| storageId | property | `string \| undefined` | no |  |

## StorageResolveAdapter

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:144:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| resolve | method | `(input: StorageResolveInput) => Promise<StorageResult<StorageResolveResult>>` | yes |  |

## StorageResolvedAccess

Kind: `unknown`
Module: `src/storage.ts`
Source: `src/storage.ts:79:1`

## StorageResolvedAsset

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:89:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| access | property | `StorageResolvedAccess` | yes |  |
| bucket | property | `string` | yes |  |
| expiresAt | property | `string \| undefined` | no |  |
| path | property | `string` | yes |  |
| storageId | property | `string \| undefined` | no |  |
| url | property | `string` | yes |  |

## StorageResolveInput

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:81:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| access | property | `StorageResolvedAccess \| undefined` | no |  |
| bucket | property | `string` | yes |  |
| expiresInSeconds | property | `number \| undefined` | no |  |
| path | property | `string` | yes |  |
| storageId | property | `string \| undefined` | no |  |

## StorageResolveResult

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:98:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| asset | property | `StorageResolvedAsset` | yes |  |

## StorageResult

Kind: `unknown`
Module: `src/storage.ts`
Source: `src/storage.ts:11:1`

## StorageUploadInput

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:25:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | property | `Uint8Array<ArrayBufferLike>` | yes |  |
| bucket | property | `string` | yes |  |
| cacheControl | property | `string \| undefined` | no |  |
| contentType | property | `string \| undefined` | no |  |
| path | property | `string` | yes |  |
| storageId | property | `string \| undefined` | no |  |
| upsert | property | `boolean \| undefined` | no |  |

## StorageUploadResult

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:35:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| asset | property | `StorageAssetReference` | yes |  |

## StoreListingAdapterContext

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:105:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| identity | property | `DeploymentStoreIdentity` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |

## StoreListingAsset

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:36:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| md5 | property | `string` | yes |  |
| mediaType | property | `StoreListingAssetMediaType` | yes |  |
| relativePath | property | `string` | yes |  |
| sha256 | property | `string` | yes |  |
| size | property | `number` | yes |  |

## StoreListingAssetMediaType

Kind: `unknown`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:34:1`

## StoreListingAssetReader

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:101:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| readAsync | method | `(relativePath: string) => Promise<Uint8Array>` | yes |  |

## StoreListingAssetSet

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:44:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| assets | property | `readonly StoreListingAsset[]` | yes |  |
| locale | property | `string` | yes |  |
| target | property | `StoreListingTarget` | yes |  |
| variant | property | `string` | yes |  |

## StoreListingDesiredState

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:59:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| assetSets | property | `readonly StoreListingAssetSet[]` | yes |  |
| locales | property | `readonly StoreListingLocale[]` | yes |  |
| revision | property | `string` | yes |  |

## StoreListingDiagnostic

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:65:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| code | property | `string` | yes |  |
| field | property | `StoreListingField \| undefined` | no |  |
| locale | property | `string \| undefined` | no |  |
| message | property | `string` | yes |  |
| severity | property | `"error" \| "warning"` | yes |  |
| target | property | `StoreListingTarget \| undefined` | no |  |
| variant | property | `string \| undefined` | no |  |

## StoreListingField

Kind: `unknown`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:10:1`

## StoreListingLocale

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:21:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| keywords | property | `readonly string[] \| undefined` | no |  |
| locale | property | `string` | yes |  |
| marketingUrl | property | `string \| undefined` | no |  |
| name | property | `string` | yes |  |
| privacyPolicyUrl | property | `string \| undefined` | no |  |
| promotionalText | property | `string \| undefined` | no |  |
| promoVideoUrl | property | `string \| undefined` | no |  |
| summary | property | `string \| undefined` | no |  |
| supportUrl | property | `string \| undefined` | no |  |

## StoreListingPlan

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:93:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currentRevision | property | `string` | yes |  |
| desiredRevision | property | `string` | yes |  |
| diagnostics | property | `readonly StoreListingDiagnostic[]` | yes |  |
| status | property | `"no-change" \| "changes" \| "blocked"` | yes |  |
| steps | property | `readonly StoreListingPlanStep[]` | yes |  |

## StoreListingPlanOperation

Kind: `unknown`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:83:1`

## StoreListingPlanStep

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:85:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `string` | yes |  |
| locale | property | `string` | yes |  |
| operation | property | `StoreListingPlanOperation` | yes |  |
| target | property | `StoreListingTarget` | yes |  |
| variant | property | `string \| undefined` | no |  |

## StoreListingRemoteAssetSet

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:51:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| checksum | property | `"md5" \| "sha256"` | yes |  |
| hashes | property | `readonly string[]` | yes |  |
| locale | property | `string` | yes |  |
| target | property | `StoreListingTarget` | yes |  |
| variant | property | `string` | yes |  |

## StoreListingSyncRequest

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:111:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| assets | property | `StoreListingAssetReader` | yes |  |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| desired | property | `StoreListingDesiredState` | yes |  |
| identity | property | `DeploymentStoreIdentity` | yes |  |
| plan | property | `StoreListingPlan` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |

## StoreListingTarget

Kind: `unknown`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:8:1`

## StoreListingTargetState

Kind: `type`
Module: `src/types/deployStoreListing.ts`
Source: `src/types/deployStoreListing.ts:75:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| assetSets | property | `readonly StoreListingRemoteAssetSet[]` | yes |  |
| diagnostics | property | `readonly StoreListingDiagnostic[]` | yes |  |
| locales | property | `readonly StoreListingLocale[]` | yes |  |
| supportedFields | property | `readonly StoreListingField[]` | yes |  |
| target | property | `StoreListingTarget` | yes |  |

## STRUCTURE_DESCRIPTOR

Kind: `value`
Module: `src/structure/generated.ts`
Source: `src/structure/generated.ts:7:14`

## STRUCTURE_DESCRIPTOR_COMPILER_VERSION

Kind: `value`
Module: `src/structure/generated.ts`
Source: `src/structure/generated.ts:4:14`

## STRUCTURE_DESCRIPTOR_FINGERPRINT

Kind: `value`
Module: `src/structure/generated.ts`
Source: `src/structure/generated.ts:5:14`

## StructureDescriptor

Kind: `unknown`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:64:1`

## StructureDescriptorDefinition

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:75:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| descriptor | property | `StructureDescriptor` | yes |  |
| id | property | `string` | yes |  |

## StructureDescriptorDocument

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:86:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| descriptors | property | `StructureDescriptorRegistry` | yes |  |
| packageName | property | `string` | yes |  |
| packageVersion | property | `string` | yes |  |
| protocolVersion | property | `1` | yes |  |
| roots | property | `Readonly<Record<string, string>>` | yes |  |

## StructureDescriptorId

Kind: `unknown`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:3:1`

## StructureDescriptorRegistry

Kind: `unknown`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:80:1`

## StructureEntityRegistryDescriptor

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:29:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| identityField | property | `string \| undefined` | no |  |
| key | property | `StructureDescriptor` | yes |  |
| kind | property | `"entity-registry"` | yes |  |
| value | property | `StructureDescriptor` | yes |  |

## StructureEnumDescriptor

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:14:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `"enum"` | yes |  |
| values | property | `readonly StructureLiteralValue[]` | yes |  |

## StructureLiteralValue

Kind: `unknown`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:7:1`

## StructureObjectDescriptor

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:24:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fields | property | `Readonly<Record<string, StructureObjectField>>` | yes |  |
| kind | property | `"object"` | yes |  |

## StructureObjectField

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:19:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| optional | property | `boolean \| undefined` | no |  |
| value | property | `StructureDescriptor` | yes |  |

## StructureOrderedListDescriptor

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:47:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| item | property | `StructureDescriptor` | yes |  |
| kind | property | `"ordered-list"` | yes |  |

## StructureReferenceDescriptor

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:58:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | property | `string` | yes |  |
| kind | property | `"ref"` | yes |  |
| packageName | property | `string \| undefined` | no |  |

## StructureScalarDescriptor

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:9:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `"scalar"` | yes |  |
| type | property | `StructureScalarType` | yes |  |

## StructureScalarType

Kind: `unknown`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:5:1`

## StructureSetDescriptor

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:42:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| kind | property | `"set"` | yes |  |
| member | property | `StructureDescriptor` | yes |  |

## StructureUnionDescriptor

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:52:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| discriminator | property | `string \| undefined` | no |  |
| kind | property | `"union"` | yes |  |
| variants | property | `readonly StructureDescriptor[]` | yes |  |

## StructureValueMapDescriptor

Kind: `type`
Module: `src/structure/types.ts`
Source: `src/structure/types.ts:36:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| key | property | `StructureDescriptor` | yes |  |
| kind | property | `"value-map"` | yes |  |
| value | property | `StructureDescriptor` | yes |  |

## SvgIconSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:208:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| color | property | `string \| undefined` | no |  |
| name | property | `undefined` | no |  |
| provider | property | `undefined` | no |  |
| size | property | `string \| number \| undefined` | no |  |
| source | property | `MediaAssetReference` | yes |  |

## TabsImplementationConfig

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:177:1`

## TabsNavigatorConfig

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:198:1`

## TabsNavigatorNode

Kind: `unknown`
Module: `src/navigator.ts`
Source: `src/navigator.ts:202:1`

## TabsNavigatorPlan

Kind: `type`
Module: `src/navigator/planning.ts`
Source: `src/navigator/planning.ts:27:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| bottomAccessoryScreenId | property | `string \| undefined` | no |  |
| customPresentationId | property | `string \| undefined` | no |  |
| exportName | property | `string` | yes |  |
| implementation | property | `ResolvedTabsImplementation` | yes |  |
| minimizeBehavior | property | `"never" \| "automatic" \| "onScrollDown" \| "onScrollUp" \| undefined` | no |  |
| module | property | `ExpoRouterNavigatorModule` | yes |  |
| presentation | property | `ResolvedTabsPresentation \| undefined` | no |  |
| presentations | property | `Readonly<Record<NavigatorResponsiveSize, ResolvedTabsPresentation>> \| undefined` | no |  |
| stability | property | `NavigatorApiStability` | yes |  |

## ThemeConfig

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:29:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| dark | property | `ThemeModeConfig` | yes |  |
| id | property | `string` | yes |  |
| light | property | `ThemeModeConfig` | yes |  |
| name | property | `string` | yes |  |
| recipes | property | `ThemeRecipeOverrides \| undefined` | no |  |
| tokens | property | `ThemeGlobalTokenOverrides \| undefined` | no |  |

## ThemeGlobalTokenOverrides

Kind: `type`
Module: `src/theme.ts`
Source: `src/theme.ts:30:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| radii | property | `Readonly<Record<string, number>> \| undefined` | no |  |
| shadows | property | `Readonly<Record<string, number>> \| undefined` | no |  |
| spacing | property | `Readonly<Record<string, number>> \| undefined` | no |  |
| typography | property | `ThemeTypographyTokenOverrides \| undefined` | no |  |

## ThemeId

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:27:1`

## ThemeModeConfig

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:22:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| harmony | property | `"monochromatic" \| "analogous" \| "complementary" \| "splitComplementary" \| "triadic" \| "tetradic" \| "square"` | yes |  |
| primaryColor | property | `string` | yes |  |

## ThemeNumericTokenOverrides

Kind: `unknown`
Module: `src/theme.ts`
Source: `src/theme.ts:4:1`

## ThemeRecipeFieldOverrides

Kind: `unknown`
Module: `src/theme.ts`
Source: `src/theme.ts:41:1`

## ThemeRecipeOverrides

Kind: `type`
Module: `src/theme.ts`
Source: `src/theme.ts:49:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| components | property | `Readonly<Record<string, Readonly<Record<string, ThemeRecipeOverrideValue>>>> \| undefined` | no |  |
| patterns | property | `Readonly<Record<string, Readonly<Record<string, ThemeRecipeOverrideValue>>>> \| undefined` | no |  |

## ThemeRecipeOverrideValue

Kind: `unknown`
Module: `src/theme.ts`
Source: `src/theme.ts:38:1`

## ThemeRegistry

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:40:1`

## ThemeStringTokenOverrides

Kind: `unknown`
Module: `src/theme.ts`
Source: `src/theme.ts:7:1`

## ThemeTypographyHeadingOverrides

Kind: `type`
Module: `src/theme.ts`
Source: `src/theme.ts:10:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| lineHeight | property | `number \| undefined` | no |  |
| size | property | `number \| undefined` | no |  |
| weight | property | `string \| undefined` | no |  |

## ThemeTypographyTokenOverrides

Kind: `type`
Module: `src/theme.ts`
Source: `src/theme.ts:17:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| headings | property | `Readonly<Record<string, ThemeTypographyHeadingOverrides>> \| undefined` | no |  |
| sizes | property | `Readonly<Record<string, number>> \| undefined` | no |  |
| weights | property | `Readonly<Record<string, string>> \| undefined` | no |  |

## ToggleDarkModeAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:65:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| payload | property | `undefined` | no |  |
| type | property | `"toggleDarkMode"` | yes |  |

## UiBindableEventMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:127:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| label | property | `string \| undefined` | no |  |
| payload | property | `UiBindableEventPayloadMeta \| undefined` | no |  |

## UiBindableEventPayloadMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:122:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| eventType | property | `UiComponentEventPayloadKind` | yes |  |
| fields | property | `readonly UiComponentEventPayloadFieldMeta[] \| undefined` | no |  |

## UiBindablePropMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:113:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| acceptsFallback | property | `boolean \| undefined` | no |  |
| acceptsTransforms | property | `boolean \| undefined` | no |  |
| description | property | `string \| undefined` | no |  |
| label | property | `string \| undefined` | no |  |
| required | property | `boolean \| undefined` | no |  |
| value | property | `UiBindableValueMeta` | yes |  |

## UiBindableValueFieldMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:97:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| label | property | `string \| undefined` | no |  |
| path | property | `string` | yes |  |
| required | property | `boolean \| undefined` | no |  |
| type | property | `UiBindableValueType` | yes |  |

## UiBindableValueMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:105:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| fields | property | `readonly UiBindableValueFieldMeta[] \| undefined` | no |  |
| itemType | property | `UiBindableValueType \| undefined` | no |  |
| label | property | `string \| undefined` | no |  |
| type | property | `UiBindableValueType` | yes |  |

## UiBindableValueType

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:86:1`

## UiComponentBindingMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:133:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| events | property | `Readonly<Record<string, UiBindableEventMeta>> \| undefined` | no |  |
| props | property | `Readonly<Record<string, UiBindablePropMeta>> \| undefined` | no |  |

## UiComponentBlueprint

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:52:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| defaultProps | property | `Readonly<Record<string, UiComponentPropValue>> \| undefined` | no |  |
| icon | property | `UiComponentBlueprintIcon \| undefined` | no |  |
| label | property | `string` | yes |  |

## UiComponentBlueprintIcon

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:47:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| name | property | `string` | yes |  |
| provider | property | `string \| undefined` | no |  |

## UiComponentCategory

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:4:1`

## UiComponentEventMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:79:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| eventType | property | `UiComponentEventPayloadKind` | yes |  |
| label | property | `string` | yes |  |
| payloadFields | property | `readonly UiComponentEventPayloadFieldMeta[] \| undefined` | no |  |

## UiComponentEventPayloadFieldMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:72:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| description | property | `string \| undefined` | no |  |
| label | property | `string \| undefined` | no |  |
| path | property | `string` | yes |  |
| type | property | `UiComponentEventPayloadFieldType` | yes |  |

## UiComponentEventPayloadFieldType

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:69:1`

## UiComponentEventPayloadKind

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:67:1`

## UiComponentI18nFieldMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:58:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| defaultTextProp | property | `string` | yes |  |
| keyProp | property | `string` | yes |  |

## UiComponentI18nMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:63:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fields | property | `readonly UiComponentI18nFieldMeta[]` | yes |  |

## UiComponentMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:143:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| allowedChildren | property | `readonly string[]` | yes |  |
| bindings | property | `UiComponentBindingMeta \| undefined` | no |  |
| blueprint | property | `UiComponentBlueprint \| undefined` | no |  |
| category | property | `UiComponentCategory` | yes |  |
| description | property | `string \| undefined` | no |  |
| directManifestNode | property | `boolean` | yes |  |
| events | property | `Readonly<Record<string, UiComponentEventMeta>> \| undefined` | no |  |
| i18n | property | `UiComponentI18nMeta \| undefined` | no |  |
| name | property | `string` | yes |  |
| note | property | `string \| undefined` | no |  |
| props | property | `Readonly<Record<string, UiComponentPropSchema>>` | yes |  |
| slots | property | `Readonly<Record<string, UiComponentSlotMeta>> \| undefined` | no |  |

## UiComponentMetaRegistry

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:158:1`

## UiComponentPackageManifest

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:160:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| components | property | `Readonly<Record<string, UiComponentMeta>>` | yes |  |
| displayName | property | `string \| undefined` | no |  |
| packageName | property | `string` | yes |  |

## UiComponentPropArrayItemSchema

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:32:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| key | property | `string` | yes |  |
| schema | property | `UiComponentPropSchema` | yes |  |

## UiComponentPropSchema

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:37:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| category | property | `string` | yes |  |
| default | property | `UiComponentPropValue \| undefined` | no |  |
| enum | property | `readonly (string \| number)[] \| undefined` | no |  |
| itemSchema | property | `readonly UiComponentPropArrayItemSchema[] \| undefined` | no |  |
| label | property | `string \| undefined` | no |  |
| mediaKinds | property | `readonly ("image" \| "audio" \| "video" \| "font" \| "file")[] \| undefined` | no |  |
| type | property | `UiComponentPropType` | yes |  |

## UiComponentPropType

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:6:1`

## UiComponentPropValue

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:22:1`

## UiComponentSlotMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:138:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| allowedChildren | property | `readonly string[] \| undefined` | no |  |
| label | property | `string \| undefined` | no |  |

## UiNode

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:223:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| alias | property | `string \| undefined` | no |  |
| children | property | `UiNode[] \| undefined` | no |  |
| id | property | `string` | yes |  |
| props | property | `Record<string, unknown> \| undefined` | no |  |
| repeat | property | `UiNodeRepeatSpec \| undefined` | no |  |
| style | property | `Record<string, string \| number> \| undefined` | no |  |
| type | property | `string` | yes |  |

## UiNodeRepeatSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:216:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| empty | property | `readonly UiNode[] \| undefined` | no |  |
| itemAlias | property | `string \| undefined` | no |  |
| keyPath | property | `string \| undefined` | no |  |
| source | property | `BindingValueSource` | yes |  |

## UrlImageAssetSource

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:121:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| alt | property | `string \| undefined` | no |  |
| contentType | property | `string \| undefined` | no |  |
| height | property | `number \| undefined` | no |  |
| kind | property | `"url"` | yes |  |
| metadata | property | `ImageMetadata \| undefined` | no |  |
| url | property | `string` | yes |  |
| width | property | `number \| undefined` | no |  |

## validateInfraAdapterSelection

Kind: `function`
Module: `src/infra/validateInfraAdapterSelection.ts`
Source: `src/infra/validateInfraAdapterSelection.ts:8:1`

### Signatures

- `(environment: InfraEnvironmentSpec, installed: readonly unknown[]) => InfraResult<readonly InfraAdapterDescriptor[]>`
  - environment: `InfraEnvironmentSpec`
  - installed: `readonly unknown[]`
  - returns: `InfraResult<readonly InfraAdapterDescriptor[]>`

## validateSecretPayload

Kind: `function`
Module: `src/secrets.ts`
Source: `src/secrets.ts:146:1`

### Signatures

- `(payload: Readonly<Record<string, string>>) => SecretStoreResult<Readonly<Record<string, string>>>`
  - payload: `Readonly<Record<string, string>>`
  - returns: `SecretStoreResult<Readonly<Record<string, string>>>`

## ValueMap

Kind: `unknown`
Module: `src/collections.ts`
Source: `src/collections.ts:11:1`

## VerifyOtpInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:233:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| identifier | property | `AuthIdentifier` | yes |  |
| metadata | property | `Record<string, unknown> \| undefined` | no |  |
| redirectTo | property | `string \| undefined` | no |  |
| token | property | `string` | yes |  |

## WebDeploymentPublication

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:142:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| deploymentId | property | `string` | yes |  |
| production | property | `boolean` | yes |  |
| provider | property | `string` | yes |  |
| revision | property | `string` | yes |  |
| target | property | `"web"` | yes |  |
| url | property | `string` | yes |  |

## WebDeploymentPublisher

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:160:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| publishAsync | method | `(request: WebDeploymentPublishRequest) => Promise<DeploymentProviderResult<WebDeploymentPublication>>` | yes |  |

## WebDeploymentPublishIntent

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:136:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| alias | property | `string \| undefined` | no |  |
| environment | property | `string \| undefined` | no |  |
| mode | property | `"preview" \| "production"` | yes |  |

## WebDeploymentPublishRequest

Kind: `type`
Module: `src/types/deployProvider.ts`
Source: `src/types/deployProvider.ts:151:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| credentials | property | `readonly DeploymentCredentialReference[]` | yes |  |
| exportDirectory | property | `string` | yes |  |
| intent | property | `WebDeploymentPublishIntent` | yes |  |
| projectRoot | property | `string` | yes |  |
| resolveSecret | property | `DeploymentSecretResolver` | yes |  |
| revision | property | `string` | yes |  |
