# Public API

## Action

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:81:1`

## ActionType

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:24:1`

## AdapterId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:6:1`

## AdapterKind

Kind: `unknown`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:13:1`

## AdapterRef

Kind: `type`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:15:1`

### Members

| Name        | Kind     | Type                             | Required | Description |
| ----------- | -------- | -------------------------------- | -------- | ----------- |
| config      | property | `DataContractValue \| undefined` | no       |             |
| exportName  | property | `string \| undefined`            | no       |             |
| id          | property | `string`                         | yes      |             |
| kind        | property | `AdapterKind`                    | yes      |             |
| packageName | property | `string \| undefined`            | no       |             |

## AlertAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:41:1`

### Members

| Name    | Kind     | Type                                 | Required | Description |
| ------- | -------- | ------------------------------------ | -------- | ----------- |
| payload | property | `{ message?: string; } \| undefined` | no       |             |
| type    | property | `"alert"`                            | yes      |             |

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

| Name       | Kind     | Type                             | Required | Description |
| ---------- | -------- | -------------------------------- | -------- | ----------- |
| aliases    | property | `readonly string[] \| undefined` | no       |             |
| capability | property | `${string}.${string}`            | yes      |             |
| examples   | property | `readonly string[] \| undefined` | no       |             |
| path       | property | `readonly [string, ...string[]]` | yes      |             |
| summary    | property | `string`                         | yes      |             |

## AnkhCommandProviderManifest

Kind: `type`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:15:1`

### Members

| Name         | Kind     | Type                               | Required | Description |
| ------------ | -------- | ---------------------------------- | -------- | ----------- |
| capabilities | property | `readonly `${string}.${string}`[]` | yes      |             |
| category     | property | `string`                           | yes      |             |
| commands     | property | `readonly AnkhCommandDescriptor[]` | yes      |             |
| id           | property | `string`                           | yes      |             |
| version      | property | `string`                           | yes      |             |

## ANKHORAGE_CAPABILITY_NAMES

Kind: `value`
Module: `src/requirements.ts`
Source: `src/requirements.ts:14:14`

## ANKHORAGE_PERMISSION_NAMES

Kind: `value`
Module: `src/requirements.ts`
Source: `src/requirements.ts:1:14`

## AnkhorageCapabilityName

Kind: `unknown`
Module: `src/requirements.ts`
Source: `src/requirements.ts:24:1`

## AnkhoragePermissionName

Kind: `unknown`
Module: `src/requirements.ts`
Source: `src/requirements.ts:12:1`

## AnkhPackageMetadata

Kind: `type`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:23:1`

### Members

| Name         | Kind     | Type                               | Required | Description |
| ------------ | -------- | ---------------------------------- | -------- | ----------- |
| capabilities | property | `readonly `${string}.${string}`[]` | yes      |             |
| category     | property | `string`                           | yes      |             |
| provider     | property | ``./${string}` \| null`            | yes      |             |

## AnkhProviderReference

Kind: `unknown`
Module: `src/cli/index.ts`
Source: `src/cli/index.ts:3:1`

## ApiDataSourceBaseConfig

Kind: `type`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:22:1`

### Members

| Name        | Kind     | Type                                                                                                       | Required | Description |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| credential  | property | `CredentialRef \| undefined`                                                                               | no       |             |
| description | property | `string \| undefined`                                                                                      | no       |             |
| endpoints   | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataEndpointConfig>>`      | yes      |             |
| id          | property | `string`                                                                                                   | yes      |             |
| kind        | property | `"api"`                                                                                                    | yes      |             |
| metadata    | property | `DataContractValue \| undefined`                                                                           | no       |             |
| name        | property | `string \| undefined`                                                                                      | no       |             |
| origin      | property | `ApiOrigin`                                                                                                | yes      |             |
| protocol    | property | `ApiProtocol`                                                                                              | yes      |             |
| schemas     | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataSchema>> \| undefined` | no       |             |

## ApiDataSourceConfig

Kind: `unknown`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:58:1`

## ApiOrigin

Kind: `unknown`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:8:1`

## ApiProtocol

Kind: `unknown`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:9:1`

## APP_CATEGORIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:143:14`

## AppCategory

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:168:1`

## AppManifest

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:382:1`

### Members

| Name            | Kind     | Type                                                                                                                           | Required | Description |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| activeThemeId   | property | `string`                                                                                                                       | yes      |             |
| activeThemeMode | property | `"dark" \| "light" \| undefined`                                                                                               | no       |             |
| dataBindings    | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/bindings").ComponentDataBinding>> \| undefined`        | no       |             |
| dataSources     | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataSourceConfig>> \| undefined`               | no       |             |
| generatedApis   | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").GeneratedApiDefinition>> \| undefined`         | no       |             |
| infra           | property | `InfraManifest`                                                                                                                | yes      |             |
| metadata        | property | `{ name: string; slug: string; version: string; category: AppCategory; themeId: string; created?: string; updated?: string; }` | yes      |             |
| navigator       | property | `NavigatorSpec`                                                                                                                | yes      |             |
| screens         | property | `Record<string, ScreenSpec>`                                                                                                   | yes      |             |
| settings        | property | `AppSettings`                                                                                                                  | yes      |             |
| splashScreen    | property | `SplashScreenSpec \| undefined`                                                                                                | no       |             |
| themes          | property | `ThemeConfig[]`                                                                                                                | yes      |             |

## AppSettings

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:374:1`

### Members

| Name         | Kind     | Type                                            | Required | Description |
| ------------ | -------- | ----------------------------------------------- | -------- | ----------- |
| apiBaseUrl   | property | `string \| undefined`                           | no       |             |
| localization | property | `{ defaultLocale: string; locales: string[]; }` | yes      |             |

## AUTH_IDENTIFIER_KINDS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:4:14`

## AUTH_OAUTH_CANCELLATION_REASONS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:217:14`

## AUTH_OAUTH_ERROR_CODES

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:184:14`

## AUTH_OAUTH_ERROR_STAGES

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:174:14`

## AUTH_OAUTH_PROVIDER_IDS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:17:14`

## AUTH_OAUTH_TRANSPORT_CANCELLATION_REASONS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:210:14`

## AUTH_OAUTH_TRANSPORT_ERROR_CODES

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:223:14`

## AUTH_PROFILE_CREATE_STRATEGIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:223:14`

## AUTH_PROFILE_FIELDS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:210:14`

## AUTH_PROFILE_PRIMARY_KEY_STRATEGIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:220:14`

## AUTH_PROFILE_UPDATE_STRATEGIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:226:14`

## AUTH_PROVIDERS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:200:14`

## AUTH_SCOPES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:197:14`

## AUTH_SIGN_IN_IDENTIFIERS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:204:14`

## AUTH_SIGN_UP_FIELDS

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:7:14`

## AUTH_SIGN_UP_POLICIES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:207:14`

## AuthAdapter

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:317:1`

### Members

| Name                 | Kind     | Type                                                                         | Required | Description |
| -------------------- | -------- | ---------------------------------------------------------------------------- | -------- | ----------- |
| capabilities         | property | `AuthAdapterCapabilities \| undefined`                                       | no       |             |
| getSession           | method   | `() => Promise<AuthResult<AuthSession \| null>>`                             | yes      |             |
| oauth                | property | `AuthOAuthAdapter \| undefined`                                              | no       |             |
| refreshSession       | method   | `(() => Promise<AuthResult<AuthSession \| null>>) \| undefined`              | no       |             |
| requestPasswordReset | method   | `((input: PasswordResetInput) => Promise<AuthResult>) \| undefined`          | no       |             |
| signIn               | method   | `(input: SignInInput) => Promise<AuthResult<AuthSession>>`                   | yes      |             |
| signOut              | method   | `(input?: SignOutInput) => Promise<AuthResult>`                              | yes      |             |
| signUp               | method   | `(input: SignUpInput) => Promise<AuthResult<AuthSession \| AuthUser>>`       | yes      |             |
| verifyOtp            | method   | `((input: VerifyOtpInput) => Promise<AuthResult<AuthSession>>) \| undefined` | no       |             |

## AuthAdapterCapabilities

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:309:1`

### Members

| Name                   | Kind     | Type                                   | Required | Description |
| ---------------------- | -------- | -------------------------------------- | -------- | ----------- |
| signInIdentifiers      | property | `("email" \| "phone" \| "username")[]` | yes      |             |
| supportsOtp            | property | `boolean`                              | yes      |             |
| supportsPasswordReset  | property | `boolean`                              | yes      |             |
| supportsSessionRefresh | property | `boolean`                              | yes      |             |
| supportsSignUp         | property | `boolean`                              | yes      |             |

## AuthAdapterError

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:126:1`

### Members

| Name    | Kind     | Type      | Required | Description |
| ------- | -------- | --------- | -------- | ----------- |
| cause   | property | `unknown` | no       |             |
| code    | property | `string`  | yes      |             |
| message | property | `string`  | yes      |             |

## AuthFlowConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:46:1`

### Members

| Name                | Kind     | Type                  | Required | Description |
| ------------------- | -------- | --------------------- | -------- | ----------- |
| forgotPasswordRoute | property | `string \| undefined` | no       |             |
| otpRoute            | property | `string \| undefined` | no       |             |
| postSignInRoute     | property | `string`              | yes      |             |
| signInRoute         | property | `string`              | yes      |             |
| signOutRoute        | property | `string \| undefined` | no       |             |
| signUpRoute         | property | `string \| undefined` | no       |             |
| unauthorizedRoute   | property | `string \| undefined` | no       |             |

## AuthIdentifier

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:41:1`

### Members

| Name  | Kind     | Type                               | Required | Description |
| ----- | -------- | ---------------------------------- | -------- | ----------- |
| kind  | property | `"email" \| "phone" \| "username"` | yes      |             |
| value | property | `string`                           | yes      |             |

## AuthIdentifierKind

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:5:1`

## AuthOAuthAdapter

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:302:1`

### Members

| Name                  | Kind     | Type                                                                             | Required | Description |
| --------------------- | -------- | -------------------------------------------------------------------------------- | -------- | ----------- |
| capabilities          | property | `AuthOAuthCapabilities`                                                          | yes      |             |
| completeAuthorization | method   | `(input: CompleteOAuthAuthorizationInput) => Promise<AuthOAuthCompletionResult>` | yes      |             |
| startAuthorization    | method   | `(input: StartOAuthAuthorizationInput) => Promise<AuthOAuthStartResult>`         | yes      |             |

## AuthOAuthAuthorizationRequest

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:242:1`

### Members

| Name             | Kind     | Type                  | Required | Description |
| ---------------- | -------- | --------------------- | -------- | ----------- |
| attemptId        | property | `string`              | yes      |             |
| authorizationUrl | property | `string`              | yes      |             |
| provider         | property | `AuthOAuthProviderId` | yes      |             |
| redirectUri      | property | `string`              | yes      |             |

## AuthOAuthAuthorizationResponse

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:259:1`

## AuthOAuthCancellationReason

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:221:1`

## AuthOAuthCapabilities

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:297:1`

### Members

| Name      | Kind     | Type                                                       | Required | Description |
| --------- | -------- | ---------------------------------------------------------- | -------- | ----------- |
| providers | property | `readonly [AuthOAuthProviderId, ...AuthOAuthProviderId[]]` | yes      |             |

## AuthOAuthCompletionResult

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:278:1`

## AuthOAuthConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:89:1`

### Members

| Name          | Kind     | Type                        | Required | Description |
| ------------- | -------- | --------------------------- | -------- | ----------- |
| callbackRoute | property | `string`                    | yes      |             |
| enabled       | property | `boolean`                   | yes      |             |
| providers     | property | `AuthOAuthProviderConfig[]` | yes      |             |

## AuthOAuthError

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:203:1`

### Members

| Name        | Kind     | Type                                                                                                                                                                                                                                                                                                                                                                                         | Required | Description |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| cause       | property | `unknown`                                                                                                                                                                                                                                                                                                                                                                                    | no       |             |
| code        | property | `"oauth_unavailable" \| "provider_disabled" \| "provider_misconfigured" \| "invalid_redirect_uri" \| "authorization_failed" \| "authorization_attempt_not_found" \| "invalid_callback" \| "state_mismatch" \| "pkce_mismatch" \| "callback_already_completed" \| "code_exchange_failed" \| "network_error" \| "session_persistence_failed" \| "profile_creation_failed" \| "provider_error"` | yes      |             |
| message     | property | `string`                                                                                                                                                                                                                                                                                                                                                                                     | yes      |             |
| provider    | property | `AuthOAuthProviderId \| undefined`                                                                                                                                                                                                                                                                                                                                                           | no       |             |
| recoverable | property | `boolean`                                                                                                                                                                                                                                                                                                                                                                                    | yes      |             |
| stage       | property | `"start" \| "transport" \| "callback" \| "exchange" \| "session" \| "profile"`                                                                                                                                                                                                                                                                                                               | yes      |             |

## AuthOAuthErrorCode

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:201:1`

## AuthOAuthErrorStage

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:182:1`

## AuthOAuthProviderConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:78:1`

### Members

| Name           | Kind     | Type                                  | Required | Description |
| -------------- | -------- | ------------------------------------- | -------- | ----------- |
| credentialsRef | property | `string \| undefined`                 | no       |             |
| enabled        | property | `boolean \| undefined`                | no       |             |
| icon           | property | `IconSpec \| undefined`               | no       |             |
| id             | property | `AuthOAuthProviderId`                 | yes      |             |
| label          | property | `string \| undefined`                 | no       |             |
| queryParams    | property | `Record<string, string> \| undefined` | no       |             |
| scopes         | property | `string[] \| undefined`               | no       |             |

## AuthOAuthProviderId

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:39:1`

## AuthOAuthStartResult

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:249:1`

## AuthOAuthTransportCancellationReason

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:214:1`

## AuthOAuthTransportError

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:229:1`

### Members

| Name    | Kind     | Type                                          | Required | Description |
| ------- | -------- | --------------------------------------------- | -------- | ----------- |
| cause   | property | `unknown`                                     | no       |             |
| code    | property | `"browser_unavailable" \| "transport_failed"` | yes      |             |
| message | property | `string`                                      | yes      |             |

## AuthOAuthTransportErrorCode

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:227:1`

## AuthProfileCreateStrategy

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:224:1`

## AuthProfileField

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:218:1`

## AuthProfilePrimaryKeyStrategy

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:221:1`

## AuthProfileSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:339:1`

### Members

| Name           | Kind     | Type                                       | Required | Description |
| -------------- | -------- | ------------------------------------------ | -------- | ----------- |
| createStrategy | property | `"api" \| "trigger" \| "app" \| undefined` | no       |             |
| fields         | property | `AuthProfileField[]`                       | yes      |             |
| primaryKey     | property | `"authUserId" \| undefined`                | no       |             |
| table          | property | `string \| undefined`                      | no       |             |
| updateStrategy | property | `"api" \| "app" \| undefined`              | no       |             |

## AuthProfileUpdateStrategy

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:227:1`

## AuthProvider

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:202:1`

## AuthProviderConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:95:1`

### Members

| Name          | Kind     | Type                                 | Required | Description |
| ------------- | -------- | ------------------------------------ | -------- | ----------- |
| oauth         | property | `AuthOAuthConfig \| undefined`       | no       |             |
| otp           | property | `{ enabled: boolean; } \| undefined` | no       |             |
| passwordReset | property | `{ enabled: boolean; } \| undefined` | no       |             |
| provider      | property | `string`                             | yes      |             |
| signIn        | property | `AuthSignInConfig`                   | yes      |             |
| signUp        | property | `AuthSignUpConfig \| undefined`      | no       |             |

## AuthResult

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:132:1`

## AuthScope

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:198:1`

## AuthSession

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:118:1`

### Members

| Name         | Kind     | Type                  | Required | Description |
| ------------ | -------- | --------------------- | -------- | ----------- |
| accessToken  | property | `string`              | yes      |             |
| expiresAt    | property | `number \| undefined` | no       |             |
| refreshToken | property | `string \| undefined` | no       |             |
| tokenType    | property | `string \| undefined` | no       |             |
| user         | property | `AuthUser`            | yes      |             |

## AuthSignInConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:69:1`

### Members

| Name        | Kind     | Type                                   | Required | Description |
| ----------- | -------- | -------------------------------------- | -------- | ----------- |
| identifiers | property | `("email" \| "phone" \| "username")[]` | yes      |             |

## AuthSignInIdentifier

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:205:1`

## AuthSignInSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:329:1`

### Members

| Name        | Kind     | Type                                   | Required | Description |
| ----------- | -------- | -------------------------------------- | -------- | ----------- |
| identifiers | property | `("email" \| "phone" \| "username")[]` | yes      |             |

## AuthSignUpConfig

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:73:1`

### Members

| Name           | Kind     | Type                             | Required | Description |
| -------------- | -------- | -------------------------------- | -------- | ----------- |
| optionalFields | property | `AuthSignUpField[] \| undefined` | no       |             |
| requiredFields | property | `AuthSignUpField[]`              | yes      |             |

## AuthSignUpField

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:15:1`

## AuthSignUpPolicy

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:208:1`

## AuthSignUpSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:333:1`

### Members

| Name           | Kind     | Type                                                 | Required | Description |
| -------------- | -------- | ---------------------------------------------------- | -------- | ----------- |
| optionalFields | property | `AuthSignUpField[] \| undefined`                     | no       |             |
| requiredFields | property | `AuthSignUpField[]`                                  | yes      |             |
| signUpPolicy   | property | `"autoSignIn" \| "requireVerification" \| undefined` | no       |             |

## AuthSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:347:1`

### Members

| Name          | Kind     | Type                                 | Required | Description |
| ------------- | -------- | ------------------------------------ | -------- | ----------- |
| authorization | property | `AuthzSpec \| undefined`             | no       |             |
| flow          | property | `AuthFlowConfig \| undefined`        | no       |             |
| oauth         | property | `AuthOAuthConfig \| undefined`       | no       |             |
| profile       | property | `AuthProfileSpec \| undefined`       | no       |             |
| provider      | property | `AuthProvider`                       | yes      |             |
| scope         | property | `"none" \| "global" \| "integrated"` | yes      |             |
| signIn        | property | `AuthSignInSpec \| undefined`        | no       |             |
| signUp        | property | `AuthSignUpSpec \| undefined`        | no       |             |

## AuthUser

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:108:1`

### Members

| Name        | Kind     | Type                                   | Required | Description |
| ----------- | -------- | -------------------------------------- | -------- | ----------- |
| avatarUrl   | property | `string \| undefined`                  | no       |             |
| displayName | property | `string \| undefined`                  | no       |             |
| email       | property | `string \| undefined`                  | no       |             |
| id          | property | `string`                               | yes      |             |
| metadata    | property | `Record<string, unknown> \| undefined` | no       |             |
| phone       | property | `string \| undefined`                  | no       |             |
| username    | property | `string \| undefined`                  | no       |             |

## AUTHZ_ENGINES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:194:14`

## AUTHZ_KINDS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:191:14`

## AuthzEngine

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:195:1`

## AuthzKind

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:192:1`

## AuthzSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:324:1`

### Members

| Name   | Kind     | Type                   | Required | Description |
| ------ | -------- | ---------------------- | -------- | ----------- |
| engine | property | `"native" \| "cerbos"` | yes      |             |
| kind   | property | `"RBAC" \| "ABAC"`     | yes      |             |

## BindingCondition

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:108:1`

### Members

| Name     | Kind     | Type                        | Required | Description |
| -------- | -------- | --------------------------- | -------- | ----------- |
| operator | property | `BindingConditionOperator`  | yes      |             |
| source   | property | `BindingValueSource`        | yes      |             |
| value    | property | `BindingValue \| undefined` | no       |             |

## BindingConditionOperator

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:106:1`

## BindingDataPath

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:16:1`

## BindingFallback

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:54:1`

### Members

| Name   | Kind     | Type                              | Required | Description |
| ------ | -------- | --------------------------------- | -------- | ----------- |
| source | property | `BindingValueSource \| undefined` | no       |             |
| value  | property | `BindingValue \| undefined`       | no       |             |

## BindingInputMap

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:95:1`

## BindingInputValue

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:76:1`

## BindingLifecycleBehavior

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:61:1`

### Members

| Name     | Kind     | Type                           | Required | Description |
| -------- | -------- | ------------------------------ | -------- | ----------- |
| fallback | property | `BindingFallback \| undefined` | no       |             |
| message  | property | `string \| undefined`          | no       |             |
| state    | property | `BindingLifecycleState`        | yes      |             |

## BindingLifecycleState

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:59:1`

## BindingOperationRef

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:20:1`

### Members

| Name         | Kind     | Type                  | Required | Description |
| ------------ | -------- | --------------------- | -------- | ----------- |
| dataSourceId | property | `string`              | yes      |             |
| endpointId   | property | `string \| undefined` | no       |             |
| operationId  | property | `string`              | yes      |             |

## BindingValue

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:6:1`

## BindingValueExpression

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:49:1`

### Members

| Name       | Kind     | Type                                            | Required | Description |
| ---------- | -------- | ----------------------------------------------- | -------- | ----------- |
| source     | property | `BindingValueSource`                            | yes      |             |
| transforms | property | `readonly BindingValueTransform[] \| undefined` | no       |             |

## BindingValueSource

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:26:1`

## BindingValueTransform

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:18:1`

## ButtonPressEventDto

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:118:1`

## CollectionItemPressEventDto

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:125:1`

## CollectionItemPressPayload

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:120:1`

### Members

| Name   | Kind     | Type                            | Required | Description |
| ------ | -------- | ------------------------------- | -------- | ----------- |
| item   | property | `Record<string, ManifestValue>` | yes      |             |
| itemId | property | `string \| number`              | yes      |             |

## CompleteOAuthAuthorizationInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:273:1`

### Members

| Name      | Kind     | Type                             | Required | Description |
| --------- | -------- | -------------------------------- | -------- | ----------- |
| attemptId | property | `string`                         | yes      |             |
| response  | property | `AuthOAuthAuthorizationResponse` | yes      |             |

## ComponentDataBinding

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:130:1`

### Members

| Name          | Kind     | Type                                                             | Required | Description |
| ------------- | -------- | ---------------------------------------------------------------- | -------- | ----------- |
| componentId   | property | `string`                                                         | yes      |             |
| componentType | property | `string \| undefined`                                            | no       |             |
| events        | property | `Readonly<Record<string, readonly EventBinding[]>> \| undefined` | no       |             |
| props         | property | `Readonly<Record<string, PropBinding>> \| undefined`             | no       |             |

## ComponentDataBindingRegistry

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:137:1`

## ComponentEventDto

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:100:1`

### Members

| Name         | Kind     | Type       | Required | Description |
| ------------ | -------- | ---------- | -------- | ----------- |
| payload      | property | `TPayload` | yes      |             |
| sourceNodeId | property | `string`   | yes      |             |
| type         | property | `TType`    | yes      |             |

## ComponentEventDtoKind

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:130:1`

## ComponentEventPayloadValue

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:98:1`

## ComponentInstanceId

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:3:1`

## ComponentRequirements

Kind: `type`
Module: `src/requirements.ts`
Source: `src/requirements.ts:39:1`

### Members

| Name         | Kind     | Type                                                  | Required | Description |
| ------------ | -------- | ----------------------------------------------------- | -------- | ----------- |
| capabilities | property | `readonly ScreenCapabilityRequirement[] \| undefined` | no       |             |
| permissions  | property | `readonly ScreenPermissionRequirement[] \| undefined` | no       |             |

## ComponentTypeId

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:4:1`

## ConsoleAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:48:1`

### Members

| Name    | Kind     | Type                                   | Required | Description |
| ------- | -------- | -------------------------------------- | -------- | ----------- |
| payload | property | `Record<string, unknown> \| undefined` | no       |             |
| type    | property | `"console"`                            | yes      |             |

## CredentialId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:5:1`

## CredentialKind

Kind: `unknown`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:4:1`

## CredentialRef

Kind: `type`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:6:1`

### Members

| Name  | Kind     | Type                              | Required | Description |
| ----- | -------- | --------------------------------- | -------- | ----------- |
| id    | property | `string`                          | yes      |             |
| kind  | property | `(string & {}) \| CredentialKind` | yes      |             |
| label | property | `string \| undefined`             | no       |             |
| scope | property | `string \| undefined`             | no       |             |

## DATABASE_PROVIDERS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:174:14`

## DATABASE_TIERS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:178:14`

## DatabaseAdapterRef

Kind: `type`
Module: `src/data/refs.ts`
Source: `src/data/refs.ts:23:1`

### Members

| Name        | Kind     | Type                             | Required | Description |
| ----------- | -------- | -------------------------------- | -------- | ----------- |
| config      | property | `DataContractValue \| undefined` | no       |             |
| exportName  | property | `string \| undefined`            | no       |             |
| id          | property | `string`                         | yes      |             |
| kind        | property | `"database"`                     | yes      |             |
| packageName | property | `string \| undefined`            | no       |             |

## DatabaseDataSourceConfig

Kind: `type`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:63:1`

### Members

| Name        | Kind     | Type                                                                                                       | Required | Description |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| adapter     | property | `DatabaseAdapterRef`                                                                                       | yes      |             |
| credential  | property | `CredentialRef \| undefined`                                                                               | no       |             |
| description | property | `string \| undefined`                                                                                      | no       |             |
| endpoints   | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataEndpointConfig>>`      | yes      |             |
| id          | property | `string`                                                                                                   | yes      |             |
| kind        | property | `"database"`                                                                                               | yes      |             |
| metadata    | property | `DataContractValue \| undefined`                                                                           | no       |             |
| name        | property | `string \| undefined`                                                                                      | no       |             |
| schemas     | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataSchema>> \| undefined` | no       |             |

## DatabaseProvider

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:176:1`

## DatabaseSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:309:1`

### Members

| Name     | Kind     | Type               | Required | Description |
| -------- | -------- | ------------------ | -------- | ----------- |
| provider | property | `DatabaseProvider` | yes      |             |
| tier     | property | `"dev" \| "prod"`  | yes      |             |

## DatabaseTier

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:179:1`

## DataContractValue

Kind: `unknown`
Module: `src/data/values.ts`
Source: `src/data/values.ts:1:1`

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
Source: `src/data/endpoints.ts:8:1`

### Members

| Name        | Kind     | Type                                            | Required | Description |
| ----------- | -------- | ----------------------------------------------- | -------- | ----------- |
| baseUrl     | property | `string \| undefined`                           | no       |             |
| credential  | property | `CredentialRef \| undefined`                    | no       |             |
| description | property | `string \| undefined`                           | no       |             |
| id          | property | `string`                                        | yes      |             |
| kind        | property | `DataEndpointKind`                              | yes      |             |
| metadata    | property | `DataContractValue \| undefined`                | no       |             |
| name        | property | `string \| undefined`                           | no       |             |
| operations  | property | `Readonly<Record<string, DataOperationConfig>>` | yes      |             |
| path        | property | `string \| undefined`                           | no       |             |

## DataEndpointKind

Kind: `unknown`
Module: `src/data/endpoints.ts`
Source: `src/data/endpoints.ts:6:1`

## DataEndpointRegistry

Kind: `unknown`
Module: `src/data/endpoints.ts`
Source: `src/data/endpoints.ts:20:1`

## DataOperationConfig

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:50:1`

### Members

| Name        | Kind     | Type                                   | Required | Description |
| ----------- | -------- | -------------------------------------- | -------- | ----------- |
| credential  | property | `CredentialRef \| undefined`           | no       |             |
| description | property | `string \| undefined`                  | no       |             |
| endpointId  | property | `string \| undefined`                  | no       |             |
| id          | property | `string`                               | yes      |             |
| intent      | property | `DataOperationIntent`                  | yes      |             |
| metadata    | property | `DataContractValue \| undefined`       | no       |             |
| method      | property | `DataOperationMethod \| undefined`     | no       |             |
| name        | property | `string \| undefined`                  | no       |             |
| pagination  | property | `DataOperationPagination \| undefined` | no       |             |
| path        | property | `string \| undefined`                  | no       |             |
| protocol    | property | `DataOperationProtocol`                | yes      |             |
| request     | property | `DataOperationRequest \| undefined`    | no       |             |
| response    | property | `DataOperationResponse \| undefined`   | no       |             |

## DataOperationIntent

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:6:1`

## DataOperationMethod

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:8:1`

## DataOperationPagination

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:41:1`

### Members

| Name              | Kind     | Type                                                                 | Required | Description |
| ----------------- | -------- | -------------------------------------------------------------------- | -------- | ----------- |
| cursorPath        | property | `string \| undefined`                                                | no       |             |
| kind              | property | `(string & {}) \| "cursor" \| "limit-offset" \| "page" \| "unknown"` | yes      |             |
| limitParameter    | property | `string \| undefined`                                                | no       |             |
| offsetParameter   | property | `string \| undefined`                                                | no       |             |
| pageParameter     | property | `string \| undefined`                                                | no       |             |
| pageSizeParameter | property | `string \| undefined`                                                | no       |             |

## DataOperationParameter

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:22:1`

### Members

| Name        | Kind     | Type                             | Required | Description |
| ----------- | -------- | -------------------------------- | -------- | ----------- |
| default     | property | `DataContractValue \| undefined` | no       |             |
| description | property | `string \| undefined`            | no       |             |
| location    | property | `DataOperationParameterLocation` | yes      |             |
| name        | property | `string`                         | yes      |             |
| required    | property | `boolean \| undefined`           | no       |             |
| schema      | property | `DataSchema \| undefined`        | no       |             |
| schemaRef   | property | `DataSchemaRef \| undefined`     | no       |             |

## DataOperationParameterLocation

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:20:1`

## DataOperationProtocol

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:18:1`

## DataOperationRegistry

Kind: `unknown`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:66:1`

## DataOperationRequest

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:30:1`

### Members

| Name        | Kind     | Type                                             | Required | Description |
| ----------- | -------- | ------------------------------------------------ | -------- | ----------- |
| contentType | property | `string \| undefined`                            | no       |             |
| parameters  | property | `readonly DataOperationParameter[] \| undefined` | no       |             |
| schema      | property | `DataSchema \| undefined`                        | no       |             |
| schemaRef   | property | `DataSchemaRef \| undefined`                     | no       |             |

## DataOperationResponse

Kind: `type`
Module: `src/data/operations.ts`
Source: `src/data/operations.ts:35:1`

### Members

| Name        | Kind     | Type                            | Required | Description |
| ----------- | -------- | ------------------------------- | -------- | ----------- |
| contentType | property | `string \| undefined`           | no       |             |
| description | property | `string \| undefined`           | no       |             |
| schema      | property | `DataSchema \| undefined`       | no       |             |
| schemaRef   | property | `DataSchemaRef \| undefined`    | no       |             |
| status      | property | `string \| number \| undefined` | no       |             |

## DataPath

Kind: `unknown`
Module: `src/data/values.ts`
Source: `src/data/values.ts:11:1`

## DataSchema

Kind: `type`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:22:1`

### Members

| Name                 | Kind     | Type                                                                         | Required | Description |
| -------------------- | -------- | ---------------------------------------------------------------------------- | -------- | ----------- |
| additionalProperties | property | `boolean \| DataSchema \| undefined`                                         | no       |             |
| allOf                | property | `readonly DataSchema[] \| undefined`                                         | no       |             |
| anyOf                | property | `readonly DataSchema[] \| undefined`                                         | no       |             |
| const                | property | `DataContractValue \| undefined`                                             | no       |             |
| default              | property | `DataContractValue \| undefined`                                             | no       |             |
| description          | property | `string \| undefined`                                                        | no       |             |
| enum                 | property | `readonly DataContractValue[] \| undefined`                                  | no       |             |
| format               | property | `string \| undefined`                                                        | no       |             |
| items                | property | `DataSchema \| undefined`                                                    | no       |             |
| nullable             | property | `boolean \| undefined`                                                       | no       |             |
| oneOf                | property | `readonly DataSchema[] \| undefined`                                         | no       |             |
| properties           | property | `Readonly<Record<string, DataSchema>> \| undefined`                          | no       |             |
| ref                  | property | `DataSchemaRef \| undefined`                                                 | no       |             |
| required             | property | `readonly string[] \| undefined`                                             | no       |             |
| title                | property | `string \| undefined`                                                        | no       |             |
| type                 | property | `DataSchemaPrimitiveType \| readonly DataSchemaPrimitiveType[] \| undefined` | no       |             |

## DataSchemaPrimitiveType

Kind: `unknown`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:4:1`

## DataSchemaProperty

Kind: `type`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:17:1`

### Members

| Name        | Kind     | Type                  | Required | Description |
| ----------- | -------- | --------------------- | -------- | ----------- |
| description | property | `string \| undefined` | no       |             |
| schema      | property | `DataSchema`          | yes      |             |

## DataSchemaRef

Kind: `type`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:13:1`

### Members

| Name | Kind     | Type     | Required | Description |
| ---- | -------- | -------- | -------- | ----------- |
| id   | property | `string` | yes      |             |

## DataSchemaRegistry

Kind: `unknown`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:41:1`

## DataSchemaSlot

Kind: `type`
Module: `src/data/schemas.ts`
Source: `src/data/schemas.ts:43:1`

### Members

| Name      | Kind     | Type                         | Required | Description |
| --------- | -------- | ---------------------------- | -------- | ----------- |
| schema    | property | `DataSchema \| undefined`    | no       |             |
| schemaRef | property | `DataSchemaRef \| undefined` | no       |             |

## DataSourceBaseConfig

Kind: `type`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:11:1`

### Members

| Name        | Kind     | Type                                                                                                       | Required | Description |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| credential  | property | `CredentialRef \| undefined`                                                                               | no       |             |
| description | property | `string \| undefined`                                                                                      | no       |             |
| endpoints   | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataEndpointConfig>>`      | yes      |             |
| id          | property | `string`                                                                                                   | yes      |             |
| kind        | property | `DataSourceKind`                                                                                           | yes      |             |
| metadata    | property | `DataContractValue \| undefined`                                                                           | no       |             |
| name        | property | `string \| undefined`                                                                                      | no       |             |
| schemas     | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataSchema>> \| undefined` | no       |             |

## DataSourceConfig

Kind: `unknown`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:68:1`

## DataSourceDiagnostic

Kind: `type`
Module: `src/data/diagnostics.ts`
Source: `src/data/diagnostics.ts:21:1`

### Members

| Name         | Kind     | Type                     | Required | Description |
| ------------ | -------- | ------------------------ | -------- | ----------- |
| code         | property | `DataDiagnosticCode`     | yes      |             |
| dataSourceId | property | `string \| undefined`    | no       |             |
| endpointId   | property | `string \| undefined`    | no       |             |
| hint         | property | `string \| undefined`    | no       |             |
| message      | property | `string`                 | yes      |             |
| operationId  | property | `string \| undefined`    | no       |             |
| path         | property | `string \| undefined`    | no       |             |
| severity     | property | `DataDiagnosticSeverity` | yes      |             |

## DataSourceDiagnosticResult

Kind: `unknown`
Module: `src/data/diagnostics.ts`
Source: `src/data/diagnostics.ts:32:1`

## DataSourceId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:1:1`

## DataSourceKind

Kind: `unknown`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:7:1`

## DataSourceRegistry

Kind: `unknown`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:70:1`

## DbAdapter

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:92:1`

### Members

| Name         | Kind     | Type                                                                                                    | Required | Description |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| capabilities | property | `DbAdapterCapabilities`                                                                                 | yes      |             |
| delete       | method   | `<TRecord extends object = DbRecord>(input: DbDeleteInput) => Promise<DbResult<TRecord[]>>`             | yes      |             |
| findById     | method   | `<TRecord extends object = DbRecord>(input: DbFindByIdInput) => Promise<DbResult<TRecord \| null>>`     | yes      |             |
| insert       | method   | `<TRecord extends object = DbRecord>(input: DbInsertInput<TRecord>) => Promise<DbResult<TRecord[]>>`    | yes      |             |
| select       | method   | `<TRecord extends object = DbRecord>(input: DbSelectInput) => Promise<DbResult<TRecord[]>>`             | yes      |             |
| transaction  | method   | `(<TResult>(run: (adapter: DbAdapter) => Promise<TResult>) => Promise<DbResult<TResult>>) \| undefined` | no       |             |
| update       | method   | `<TRecord extends object = DbRecord>(input: DbUpdateInput<TRecord>) => Promise<DbResult<TRecord[]>>`    | yes      |             |

## DbAdapterCapabilities

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:86:1`

### Members

| Name         | Kind     | Type      | Required | Description |
| ------------ | -------- | --------- | -------- | ----------- |
| realtime     | property | `boolean` | yes      |             |
| returning    | property | `boolean` | yes      |             |
| transactions | property | `boolean` | yes      |             |

## DbAdapterError

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:3:1`

### Members

| Name    | Kind     | Type      | Required | Description |
| ------- | -------- | --------- | -------- | ----------- |
| cause   | property | `unknown` | no       |             |
| code    | property | `string`  | yes      |             |
| message | property | `string`  | yes      |             |

## DbAdminAdapter

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:187:1`

### Members

| Name                        | Kind     | Type                                                        | Required | Description |
| --------------------------- | -------- | ----------------------------------------------------------- | -------- | ----------- |
| capabilities                | property | `DbAdminAdapterCapabilities`                                | yes      |             |
| createCollection            | method   | `(input: DbCollectionDefinition) => Promise<DbAdminResult>` | yes      |             |
| deleteCollection            | method   | `(input: DbCollectionReference) => Promise<DbAdminResult>`  | yes      |             |
| generateCreateCollectionSql | method   | `(input: DbCollectionDefinition) => DbAdminResult`          | yes      |             |
| generateDeleteCollectionSql | method   | `(input: DbCollectionReference) => DbAdminResult`           | yes      |             |

## DbAdminAdapterCapabilities

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:182:1`

### Members

| Name             | Kind     | Type      | Required | Description |
| ---------------- | -------- | --------- | -------- | ----------- |
| directExecution  | property | `boolean` | yes      |             |
| schemaGeneration | property | `boolean` | yes      |             |

## DbAdminResult

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:171:1`

## DbChangeEvent

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:112:1`

### Members

| Name           | Kind     | Type                   | Required | Description |
| -------------- | -------- | ---------------------- | -------- | ----------- |
| committedAt    | property | `string \| undefined`  | no       |             |
| kind           | property | `DbChangeKind`         | yes      |             |
| previousRecord | property | `TRecord \| undefined` | no       |             |
| record         | property | `TRecord \| null`      | yes      |             |
| schema         | property | `string \| undefined`  | no       |             |
| table          | property | `string`               | yes      |             |

## DbChangeKind

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:110:1`

## DbChangeListener

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:121:1`

## DbCollectionDefinition

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:159:1`

### Members

| Name       | Kind     | Type                           | Required | Description |
| ---------- | -------- | ------------------------------ | -------- | ----------- |
| fields     | property | `readonly DbFieldDefinition[]` | yes      |             |
| name       | property | `string`                       | yes      |             |
| primaryKey | property | `string \| undefined`          | no       |             |
| schema     | property | `string \| undefined`          | no       |             |

## DbCollectionReference

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:166:1`

### Members

| Name   | Kind     | Type                  | Required | Description |
| ------ | -------- | --------------------- | -------- | ----------- |
| name   | property | `string`              | yes      |             |
| schema | property | `string \| undefined` | no       |             |

## DbCollectionSubscriptionInput

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:129:1`

## DbDeleteInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:82:1`

### Members

| Name    | Kind     | Type                  | Required | Description |
| ------- | -------- | --------------------- | -------- | ----------- |
| filters | property | `readonly DbFilter[]` | yes      |             |
| schema  | property | `string \| undefined` | no       |             |
| table   | property | `string`              | yes      |             |

## DbFieldDefinition

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:151:1`

### Members

| Name         | Kind     | Type                                               | Required | Description |
| ------------ | -------- | -------------------------------------------------- | -------- | ----------- |
| defaultValue | property | `string \| number \| boolean \| null \| undefined` | no       |             |
| name         | property | `string`                                           | yes      |             |
| required     | property | `boolean \| undefined`                             | no       |             |
| type         | property | `DbFieldType`                                      | yes      |             |
| unique       | property | `boolean \| undefined`                             | no       |             |

## DbFieldType

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:149:1`

## DbFilter

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:49:1`

### Members

| Name     | Kind     | Type               | Required | Description |
| -------- | -------- | ------------------ | -------- | ----------- |
| field    | property | `string`           | yes      |             |
| operator | property | `DbFilterOperator` | yes      |             |
| value    | property | `unknown`          | yes      |             |

## DbFilterOperator

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:37:1`

## DbFindByIdInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:67:1`

### Members

| Name    | Kind     | Type                             | Required | Description |
| ------- | -------- | -------------------------------- | -------- | ----------- |
| columns | property | `readonly string[] \| undefined` | no       |             |
| id      | property | `string \| number`               | yes      |             |
| idField | property | `string \| undefined`            | no       |             |
| schema  | property | `string \| undefined`            | no       |             |
| table   | property | `string`                         | yes      |             |

## DbInsertInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:73:1`

### Members

| Name   | Kind     | Type                            | Required | Description |
| ------ | -------- | ------------------------------- | -------- | ----------- |
| schema | property | `string \| undefined`           | no       |             |
| table  | property | `string`                        | yes      |             |
| values | property | `TRecord \| readonly TRecord[]` | yes      |             |

## DbPage

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:32:1`

### Members

| Name   | Kind     | Type                  | Required | Description |
| ------ | -------- | --------------------- | -------- | ----------- |
| limit  | property | `number \| undefined` | no       |             |
| offset | property | `number \| undefined` | no       |             |

## DbRealtimeAdapter

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:136:1`

### Members

| Name     | Kind     | Type                                                                                                                                                                                                                                                                                                    | Required | Description |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| realtime | property | `{ subscribeToCollection<TRecord extends object = DbRecord>(input: DbCollectionSubscriptionInput, listener: DbChangeListener<TRecord>): DbSubscription; subscribeToRecord<TRecord extends object = DbRecord>(input: DbRecordSubscriptionInput, listener: DbChangeListener<TRecord>): DbSubscription; }` | yes      |             |

## DbRecord

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:1:1`

## DbRecordSubscriptionInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:131:1`

### Members

| Name    | Kind     | Type                  | Required | Description |
| ------- | -------- | --------------------- | -------- | ----------- |
| id      | property | `string \| number`    | yes      |             |
| idField | property | `string \| undefined` | no       |             |
| schema  | property | `string \| undefined` | no       |             |
| table   | property | `string`              | yes      |             |

## DbResult

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:18:1`

## DbSelectInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:60:1`

### Members

| Name    | Kind     | Type                               | Required | Description |
| ------- | -------- | ---------------------------------- | -------- | ----------- |
| columns | property | `readonly string[] \| undefined`   | no       |             |
| filters | property | `readonly DbFilter[] \| undefined` | no       |             |
| page    | property | `DbPage \| undefined`              | no       |             |
| schema  | property | `string \| undefined`              | no       |             |
| sort    | property | `readonly DbSort[] \| undefined`   | no       |             |
| table   | property | `string`                           | yes      |             |

## DbSort

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:27:1`

### Members

| Name      | Kind     | Type                           | Required | Description |
| --------- | -------- | ------------------------------ | -------- | ----------- |
| direction | property | `DbSortDirection \| undefined` | no       |             |
| field     | property | `string`                       | yes      |             |

## DbSortDirection

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:25:1`

## DbSubscription

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:125:1`

### Members

| Name        | Kind   | Type                          | Required | Description |
| ----------- | ------ | ----------------------------- | -------- | ----------- |
| unsubscribe | method | `() => Promise<void> \| void` | yes      |             |

## DbSuccess

Kind: `unknown`
Module: `src/db.ts`
Source: `src/db.ts:9:1`

## DbTableInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:55:1`

### Members

| Name   | Kind     | Type                  | Required | Description |
| ------ | -------- | --------------------- | -------- | ----------- |
| schema | property | `string \| undefined` | no       |             |
| table  | property | `string`              | yes      |             |

## DbUpdateInput

Kind: `type`
Module: `src/db.ts`
Source: `src/db.ts:77:1`

### Members

| Name    | Kind     | Type                  | Required | Description |
| ------- | -------- | --------------------- | -------- | ----------- |
| filters | property | `readonly DbFilter[]` | yes      |             |
| schema  | property | `string \| undefined` | no       |             |
| table   | property | `string`              | yes      |             |
| values  | property | `Partial<TRecord>`    | yes      |             |

## DEFAULT_AUTH_FLOW

Kind: `value`
Module: `src/auth.ts`
Source: `src/auth.ts:56:14`

## DEPLOYMENT_TARGETS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:170:14`

## DeploymentSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:304:1`

### Members

| Name       | Kind     | Type               | Required | Description |
| ---------- | -------- | ------------------ | -------- | ----------- |
| monitoring | property | `boolean`          | yes      |             |
| target     | property | `DeploymentTarget` | yes      |             |

## DeploymentTarget

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:172:1`

## EndpointId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:2:1`

## EventBinding

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:124:1`

### Members

| Name   | Kind     | Type                                                       | Required | Description |
| ------ | -------- | ---------------------------------------------------------- | -------- | ----------- |
| input  | property | `Readonly<Record<string, BindingInputValue>> \| undefined` | no       |             |
| target | property | `EventBindingTarget`                                       | yes      |             |
| when   | property | `BindingCondition \| undefined`                            | no       |             |

## EventBindingTarget

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:114:1`

## ExternalGraphQlApiDataSourceConfig

Kind: `type`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:41:1`

### Members

| Name          | Kind     | Type                                                                                                       | Required | Description |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| credential    | property | `CredentialRef \| undefined`                                                                               | no       |             |
| description   | property | `string \| undefined`                                                                                      | no       |             |
| endpoints     | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataEndpointConfig>>`      | yes      |             |
| endpointUrl   | property | `string`                                                                                                   | yes      |             |
| id            | property | `string`                                                                                                   | yes      |             |
| introspection | property | `{ readonly enabled: boolean; readonly schemaVersion?: string; } \| undefined`                             | no       |             |
| kind          | property | `"api"`                                                                                                    | yes      |             |
| metadata      | property | `DataContractValue \| undefined`                                                                           | no       |             |
| name          | property | `string \| undefined`                                                                                      | no       |             |
| origin        | property | `"external"`                                                                                               | yes      |             |
| protocol      | property | `"graphql"`                                                                                                | yes      |             |
| schemas       | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataSchema>> \| undefined` | no       |             |

## ExternalRestApiDataSourceConfig

Kind: `type`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:34:1`

### Members

| Name        | Kind     | Type                                                                                                       | Required | Description |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| baseUrl     | property | `string`                                                                                                   | yes      |             |
| credential  | property | `CredentialRef \| undefined`                                                                               | no       |             |
| description | property | `string \| undefined`                                                                                      | no       |             |
| endpoints   | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataEndpointConfig>>`      | yes      |             |
| id          | property | `string`                                                                                                   | yes      |             |
| kind        | property | `"api"`                                                                                                    | yes      |             |
| metadata    | property | `DataContractValue \| undefined`                                                                           | no       |             |
| name        | property | `string \| undefined`                                                                                      | no       |             |
| openApi     | property | `OpenApiDocumentRef \| undefined`                                                                          | no       |             |
| origin      | property | `"external"`                                                                                               | yes      |             |
| protocol    | property | `"rest"`                                                                                                   | yes      |             |
| schemas     | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataSchema>> \| undefined` | no       |             |

## FilterAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:73:1`

### Members

| Name    | Kind     | Type                                          | Required | Description |
| ------- | -------- | --------------------------------------------- | -------- | ----------- |
| payload | property | `{ filterKey: string; filterValue: string; }` | yes      |             |
| type    | property | `"filter"`                                    | yes      |             |

## findForbiddenInlineSecretFields

Kind: `function`
Module: `src/secrets.ts`
Source: `src/secrets.ts:183:1`

### Signatures

- `(value: unknown) => readonly string[]`
  - value: `unknown`
  - returns: `readonly string[]`

## FORBIDDEN_INLINE_SECRET_FIELDS

Kind: `value`
Module: `src/secrets.ts`
Source: `src/secrets.ts:174:14`

## FormSubmitEventDto

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:111:1`

## FormSubmitValues

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:109:1`

## GENERATED_API_CRUD_OPERATIONS

Kind: `value`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:5:14`

## GeneratedApiAuthRequirement

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:18:1`

### Members

| Name        | Kind     | Type                             | Required | Description |
| ----------- | -------- | -------------------------------- | -------- | ----------- |
| metadata    | property | `DataContractValue \| undefined` | no       |             |
| permissions | property | `readonly string[] \| undefined` | no       |             |
| policy      | property | `string \| undefined`            | no       |             |
| required    | property | `boolean \| undefined`           | no       |             |
| roles       | property | `readonly string[] \| undefined` | no       |             |

## GeneratedApiCrudOperation

Kind: `unknown`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:12:1`

## GeneratedApiDefinition

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:50:1`

### Members

| Name        | Kind     | Type                                        | Required | Description |
| ----------- | -------- | ------------------------------------------- | -------- | ----------- |
| auth        | property | `GeneratedApiAuthRequirement \| undefined`  | no       |             |
| basePath    | property | `string`                                    | yes      |             |
| database    | property | `DatabaseAdapterRef`                        | yes      |             |
| description | property | `string \| undefined`                       | no       |             |
| id          | property | `string`                                    | yes      |             |
| metadata    | property | `DataContractValue \| undefined`            | no       |             |
| name        | property | `string \| undefined`                       | no       |             |
| protocol    | property | `"rest"`                                    | yes      |             |
| resources   | property | `readonly GeneratedApiResourceDefinition[]` | yes      |             |

## GeneratedApiId

Kind: `unknown`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:14:1`

## GeneratedApiOperationPolicyRef

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:26:1`

### Members

| Name      | Kind     | Type                                                                | Required | Description |
| --------- | -------- | ------------------------------------------------------------------- | -------- | ----------- |
| id        | property | `string`                                                            | yes      |             |
| operation | property | `"list" \| "read" \| "create" \| "update" \| "delete" \| undefined` | no       |             |

## GeneratedApiRegistry

Kind: `unknown`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:62:1`

## GeneratedApiResourceDefinition

Kind: `type`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:31:1`

### Members

| Name        | Kind     | Type                                                                  | Required | Description |
| ----------- | -------- | --------------------------------------------------------------------- | -------- | ----------- |
| collection  | property | `DbCollectionDefinition`                                              | yes      |             |
| description | property | `string \| undefined`                                                 | no       |             |
| id          | property | `string`                                                              | yes      |             |
| metadata    | property | `DataContractValue \| undefined`                                      | no       |             |
| name        | property | `string \| undefined`                                                 | no       |             |
| operations  | property | `readonly ("list" \| "read" \| "create" \| "update" \| "delete")[]`   | yes      |             |
| path        | property | `string`                                                              | yes      |             |
| policies    | property | `readonly GeneratedApiOperationPolicyRef[] \| undefined`              | no       |             |
| seed        | property | `readonly Readonly<Record<string, DataContractValue>>[] \| undefined` | no       |             |

## GeneratedApiResourceId

Kind: `unknown`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:15:1`

## GeneratedApiSeedRecord

Kind: `unknown`
Module: `src/data/apis.ts`
Source: `src/data/apis.ts:16:1`

## GeneratedRestApiDataSourceConfig

Kind: `type`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:51:1`

### Members

| Name           | Kind     | Type                                                                                                       | Required | Description |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| adapter        | property | `DatabaseAdapterRef`                                                                                       | yes      |             |
| credential     | property | `CredentialRef \| undefined`                                                                               | no       |             |
| description    | property | `string \| undefined`                                                                                      | no       |             |
| endpoints      | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataEndpointConfig>>`      | yes      |             |
| generatedApiId | property | `string`                                                                                                   | yes      |             |
| id             | property | `string`                                                                                                   | yes      |             |
| kind           | property | `"api"`                                                                                                    | yes      |             |
| metadata       | property | `DataContractValue \| undefined`                                                                           | no       |             |
| name           | property | `string \| undefined`                                                                                      | no       |             |
| origin         | property | `"generated"`                                                                                              | yes      |             |
| protocol       | property | `"rest"`                                                                                                   | yes      |             |
| schemas        | property | `Readonly<Record<string, import("/Users/a_rtiphishl_e/git/contracts/src/index").DataSchema>> \| undefined` | no       |             |

## IconSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:229:1`

### Members

| Name     | Kind     | Type                            | Required | Description |
| -------- | -------- | ------------------------------- | -------- | ----------- |
| color    | property | `string \| undefined`           | no       |             |
| name     | property | `string`                        | yes      |             |
| provider | property | `string \| undefined`           | no       |             |
| size     | property | `string \| number \| undefined` | no       |             |

## ImageAssetSource

Kind: `unknown`
Module: `src/storage.ts`
Source: `src/storage.ts:84:1`

## ImageMetadata

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:55:1`

### Members

| Name      | Kind     | Type                  | Required | Description |
| --------- | -------- | --------------------- | -------- | ----------- |
| createdAt | property | `string \| undefined` | no       |             |
| fileName  | property | `string \| undefined` | no       |             |
| sizeBytes | property | `number \| undefined` | no       |             |

## InfraManifest

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:363:1`

### Members

| Name          | Kind     | Type                                   | Required | Description |
| ------------- | -------- | -------------------------------------- | -------- | ----------- |
| auth          | property | `AuthSpec \| undefined`                | no       |             |
| database      | property | `DatabaseSpec \| undefined`            | no       |             |
| deployment    | property | `DeploymentSpec \| undefined`          | no       |             |
| modules       | property | `string[]`                             | yes      |             |
| modulesConfig | property | `Record<string, unknown> \| undefined` | no       |             |
| networking    | property | `NetworkingSpec \| undefined`          | no       |             |
| secretStore   | property | `InfraSecretStoreSpec \| undefined`    | no       |             |
| state         | property | `StateSpec \| undefined`               | no       |             |
| storage       | property | `StorageSpec \| undefined`             | no       |             |

## InfraSecretStoreSpec

Kind: `type`
Module: `src/secretManifest.ts`
Source: `src/secretManifest.ts:3:1`

### Members

| Name     | Kind     | Type                  | Required | Description |
| -------- | -------- | --------------------- | -------- | ----------- |
| provider | property | `SecretStoreProvider` | yes      |             |

## KnownAuthOAuthProviderId

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:38:1`

## KnownAuthProfileField

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:217:1`

## KnownAuthProvider

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:201:1`

## KnownAuthSignUpField

Kind: `unknown`
Module: `src/auth.ts`
Source: `src/auth.ts:14:1`

## KnownComponentEventDto

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:135:1`

## KnownDatabaseProvider

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:175:1`

## KnownDeploymentTarget

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:171:1`

## KnownSecretStoreProvider

Kind: `unknown`
Module: `src/secrets.ts`
Source: `src/secrets.ts:2:1`

## KnownStateProvider

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:185:1`

## ManifestValue

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:90:1`

## NavigateAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:33:1`

### Members

| Name    | Kind     | Type                                                            | Required | Description |
| ------- | -------- | --------------------------------------------------------------- | -------- | ----------- |
| payload | property | `{ route: string; params?: Record<string, number \| string>; }` | yes      |             |
| type    | property | `"navigate"`                                                    | yes      |             |

## NAVIGATOR_TYPES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:140:14`

## NavigatorSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:263:1`

### Members

| Name             | Kind     | Type                                   | Required | Description |
| ---------------- | -------- | -------------------------------------- | -------- | ----------- |
| initialRouteName | property | `string \| undefined`                  | no       |             |
| options          | property | `Record<string, unknown> \| undefined` | no       |             |
| routes           | property | `RouteDefinition[]`                    | yes      |             |
| type             | property | `"stack" \| "tabs" \| "drawer"`        | yes      |             |

## NavigatorType

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:141:1`

## NetworkingSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:358:1`

### Members

| Name   | Kind     | Type                  | Required | Description |
| ------ | -------- | --------------------- | -------- | ----------- |
| cdn    | property | `boolean`             | yes      |             |
| domain | property | `string \| undefined` | no       |             |

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

## NUTRITION_BARCODE_TYPES

Kind: `value`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:15:14`

## NUTRITION_CAPTURE_SUBMISSION_STATUSES

Kind: `value`
Module: `src/nutrition/capture.ts`
Source: `src/nutrition/capture.ts:17:14`

## NUTRITION_DATA_SOURCES

Kind: `value`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:40:14`

## NUTRITION_IMAGE_KINDS

Kind: `value`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:65:14`

## NUTRITION_PRODUCT_STATUSES

Kind: `value`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:31:14`

## NUTRITION_REVIEW_DECISIONS

Kind: `value`
Module: `src/nutrition/review.ts`
Source: `src/nutrition/review.ts:12:14`

## NUTRITION_SOURCE_CONFIDENCE_LEVELS

Kind: `value`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:50:14`

## NutritionAllergenTag

Kind: `unknown`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:40:1`

## NutritionBarcode

Kind: `type`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:25:1`

### Members

| Name            | Kind     | Type                                                                  | Required | Description |
| --------------- | -------- | --------------------------------------------------------------------- | -------- | ----------- |
| normalizedValue | property | `string \| undefined`                                                 | no       |             |
| type            | property | `"unknown" \| "ean_8" \| "ean_13" \| "upc_a" \| "upc_e" \| "gtin_14"` | yes      |             |
| value           | property | `string`                                                              | yes      |             |

## NutritionBarcodeType

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:23:1`

## NutritionCaptureClientContext

Kind: `type`
Module: `src/nutrition/capture.ts`
Source: `src/nutrition/capture.ts:27:1`

### Members

| Name              | Kind     | Type                                                        | Required | Description |
| ----------------- | -------- | ----------------------------------------------------------- | -------- | ----------- |
| anonymousDeviceId | property | `string \| undefined`                                       | no       |             |
| appVersion        | property | `string \| undefined`                                       | no       |             |
| clientCapturedAt  | property | `string \| undefined`                                       | no       |             |
| locale            | property | `string \| undefined`                                       | no       |             |
| platform          | property | `(string & {}) \| "android" \| "ios" \| "web" \| undefined` | no       |             |
| userId            | property | `string \| undefined`                                       | no       |             |

## NutritionCaptureSubmission

Kind: `type`
Module: `src/nutrition/capture.ts`
Source: `src/nutrition/capture.ts:70:1`

### Members

| Name             | Kind     | Type                                                                    | Required | Description |
| ---------------- | -------- | ----------------------------------------------------------------------- | -------- | ----------- |
| client           | property | `NutritionCaptureClientContext \| undefined`                            | no       |             |
| createdAt        | property | `string`                                                                | yes      |             |
| decidedAt        | property | `string \| null \| undefined`                                           | no       |             |
| draft            | property | `NutritionProductCaptureDraft`                                          | yes      |             |
| id               | property | `string`                                                                | yes      |             |
| matchedProductId | property | `string \| null \| undefined`                                           | no       |             |
| reviewerNote     | property | `string \| undefined`                                                   | no       |             |
| status           | property | `"queued" \| "needs_more_data" \| "accepted" \| "rejected" \| "merged"` | yes      |             |
| updatedAt        | property | `string`                                                                | yes      |             |

## NutritionCaptureSubmissionId

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:3:1`

## NutritionCaptureSubmissionStatus

Kind: `unknown`
Module: `src/nutrition/capture.ts`
Source: `src/nutrition/capture.ts:24:1`

## NutritionDataSource

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:48:1`

## NutritionFactsPer100g

Kind: `type`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:13:1`

### Members

| Name           | Kind     | Type                                     | Required | Description |
| -------------- | -------- | ---------------------------------------- | -------- | ----------- |
| basis          | property | `NutritionMeasurementBasis \| undefined` | no       |             |
| carbohydratesG | property | `number \| undefined`                    | no       |             |
| energyKcal     | property | `number \| undefined`                    | no       |             |
| energyKj       | property | `number \| undefined`                    | no       |             |
| fatG           | property | `number \| undefined`                    | no       |             |
| fiberG         | property | `number \| undefined`                    | no       |             |
| proteinG       | property | `number \| undefined`                    | no       |             |
| saltG          | property | `number \| undefined`                    | no       |             |
| saturatedFatG  | property | `number \| undefined`                    | no       |             |
| sodiumG        | property | `number \| undefined`                    | no       |             |
| sugarsG        | property | `number \| undefined`                    | no       |             |

## NutritionImageEvidence

Kind: `type`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:75:1`

### Members

| Name        | Kind     | Type                                                                                      | Required | Description |
| ----------- | -------- | ----------------------------------------------------------------------------------------- | -------- | ----------- |
| bucket      | property | `string \| undefined`                                                                     | no       |             |
| capturedAt  | property | `string \| undefined`                                                                     | no       |             |
| contentType | property | `string \| undefined`                                                                     | no       |             |
| height      | property | `number \| undefined`                                                                     | no       |             |
| id          | property | `string \| undefined`                                                                     | no       |             |
| kind        | property | `"front" \| "nutrition_label" \| "ingredients" \| "barcode" \| "package_back" \| "other"` | yes      |             |
| metadata    | property | `Record<string, NutritionJsonValue> \| undefined`                                         | no       |             |
| path        | property | `string \| undefined`                                                                     | no       |             |
| publicUrl   | property | `string \| undefined`                                                                     | no       |             |
| storageId   | property | `string \| undefined`                                                                     | no       |             |
| width       | property | `number \| undefined`                                                                     | no       |             |

## NutritionImageKind

Kind: `unknown`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:73:1`

## NutritionIngredientStatement

Kind: `type`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:34:1`

### Members

| Name    | Kind     | Type                  | Required | Description |
| ------- | -------- | --------------------- | -------- | ----------- |
| locale  | property | `string \| undefined` | no       |             |
| rawText | property | `string \| undefined` | no       |             |
| text    | property | `string \| undefined` | no       |             |

## NutritionIsoDateTime

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:1:1`

## NutritionJsonValue

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:7:1`

## NutritionMeasurementBasis

Kind: `unknown`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:11:1`

## NutritionProduct

Kind: `type`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:102:1`

### Members

| Name             | Kind     | Type                                                                                                                  | Required | Description |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| allergens        | property | `readonly NutritionAllergenTag[] \| undefined`                                                                        | no       |             |
| barcodes         | property | `readonly NutritionBarcode[] \| undefined`                                                                            | no       |             |
| brand            | property | `string \| undefined`                                                                                                 | no       |             |
| createdAt        | property | `string`                                                                                                              | yes      |             |
| id               | property | `string`                                                                                                              | yes      |             |
| images           | property | `readonly NutritionImageEvidence[] \| undefined`                                                                      | no       |             |
| ingredients      | property | `NutritionIngredientStatement \| undefined`                                                                           | no       |             |
| name             | property | `string`                                                                                                              | yes      |             |
| nutrientsPer100g | property | `NutritionFactsPer100g \| undefined`                                                                                  | no       |             |
| packageSizeG     | property | `number \| undefined`                                                                                                 | no       |             |
| packageSizeMl    | property | `number \| undefined`                                                                                                 | no       |             |
| primaryBarcode   | property | `NutritionBarcode`                                                                                                    | yes      |             |
| publishedAt      | property | `string \| null \| undefined`                                                                                         | no       |             |
| quantity         | property | `string \| undefined`                                                                                                 | no       |             |
| serving          | property | `NutritionServing \| undefined`                                                                                       | no       |             |
| source           | property | `"manual_scan" \| "user_correction" \| "open_food_facts" \| "foodrepo_legacy" \| "retailer_import" \| "admin_import"` | yes      |             |
| sourceConfidence | property | `"unknown" \| "low" \| "medium" \| "high"`                                                                            | yes      |             |
| sourcePayload    | property | `NutritionJsonValue \| undefined`                                                                                     | no       |             |
| status           | property | `"rejected" \| "draft" \| "pending_review" \| "published" \| "archived"`                                              | yes      |             |
| stores           | property | `readonly NutritionStoreObservation[] \| undefined`                                                                   | no       |             |
| traces           | property | `readonly NutritionAllergenTag[] \| undefined`                                                                        | no       |             |
| updatedAt        | property | `string`                                                                                                              | yes      |             |
| verifiedByUser   | property | `boolean \| undefined`                                                                                                | no       |             |

## NutritionProductCaptureDraft

Kind: `type`
Module: `src/nutrition/capture.ts`
Source: `src/nutrition/capture.ts:36:1`

### Members

| Name             | Kind     | Type                                             | Required | Description |
| ---------------- | -------- | ------------------------------------------------ | -------- | ----------- |
| barcode          | property | `NutritionBarcode`                               | yes      |             |
| brand            | property | `string \| undefined`                            | no       |             |
| images           | property | `readonly NutritionImageEvidence[] \| undefined` | no       |             |
| ingredients      | property | `NutritionIngredientStatement \| undefined`      | no       |             |
| name             | property | `string \| undefined`                            | no       |             |
| nutrientsPer100g | property | `NutritionFactsPer100g \| undefined`             | no       |             |
| packageSizeG     | property | `number \| undefined`                            | no       |             |
| packageSizeMl    | property | `number \| undefined`                            | no       |             |
| quantity         | property | `string \| undefined`                            | no       |             |
| rawPayload       | property | `NutritionJsonValue \| undefined`                | no       |             |
| serving          | property | `NutritionServing \| undefined`                  | no       |             |
| storeObservation | property | `NutritionStoreObservation \| undefined`         | no       |             |

## NutritionProductCaptureRequest

Kind: `type`
Module: `src/nutrition/capture.ts`
Source: `src/nutrition/capture.ts:51:1`

### Members

| Name   | Kind     | Type                                         | Required | Description |
| ------ | -------- | -------------------------------------------- | -------- | ----------- |
| client | property | `NutritionCaptureClientContext \| undefined` | no       |             |
| draft  | property | `NutritionProductCaptureDraft`               | yes      |             |

## NutritionProductCaptureResponse

Kind: `type`
Module: `src/nutrition/capture.ts`
Source: `src/nutrition/capture.ts:56:1`

### Members

| Name         | Kind     | Type                                                                    | Required | Description |
| ------------ | -------- | ----------------------------------------------------------------------- | -------- | ----------- |
| message      | property | `string \| undefined`                                                   | no       |             |
| productId    | property | `string \| undefined`                                                   | no       |             |
| status       | property | `"queued" \| "needs_more_data" \| "accepted" \| "rejected" \| "merged"` | yes      |             |
| submissionId | property | `string`                                                                | yes      |             |

## NutritionProductCorrectionRequest

Kind: `type`
Module: `src/nutrition/capture.ts`
Source: `src/nutrition/capture.ts:63:1`

### Members

| Name      | Kind     | Type                                         | Required | Description |
| --------- | -------- | -------------------------------------------- | -------- | ----------- |
| client    | property | `NutritionCaptureClientContext \| undefined` | no       |             |
| note      | property | `string \| undefined`                        | no       |             |
| patch     | property | `Partial<NutritionProductCaptureDraft>`      | yes      |             |
| productId | property | `string`                                     | yes      |             |

## NutritionProductDetail

Kind: `type`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:128:1`

### Members

| Name    | Kind     | Type               | Required | Description |
| ------- | -------- | ------------------ | -------- | ----------- |
| product | property | `NutritionProduct` | yes      |             |

## NutritionProductId

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:2:1`

## NutritionProductLookupByBarcodeResponse

Kind: `type`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:132:1`

### Members

| Name    | Kind     | Type               | Required | Description |
| ------- | -------- | ------------------ | -------- | ----------- |
| product | property | `NutritionProduct` | yes      |             |

## NutritionProductStatus

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:38:1`

## NutritionProductSummary

Kind: `type`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:89:1`

### Members

| Name             | Kind     | Type                                                                                                                  | Required | Description |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| brand            | property | `string \| undefined`                                                                                                 | no       |             |
| id               | property | `string`                                                                                                              | yes      |             |
| imageUrl         | property | `string \| undefined`                                                                                                 | no       |             |
| name             | property | `string`                                                                                                              | yes      |             |
| primaryBarcode   | property | `NutritionBarcode`                                                                                                    | yes      |             |
| quantity         | property | `string \| undefined`                                                                                                 | no       |             |
| source           | property | `"manual_scan" \| "user_correction" \| "open_food_facts" \| "foodrepo_legacy" \| "retailer_import" \| "admin_import"` | yes      |             |
| sourceConfidence | property | `"unknown" \| "low" \| "medium" \| "high"`                                                                            | yes      |             |
| status           | property | `"rejected" \| "draft" \| "pending_review" \| "published" \| "archived"`                                              | yes      |             |
| updatedAt        | property | `string`                                                                                                              | yes      |             |

## NutritionReviewDecision

Kind: `unknown`
Module: `src/nutrition/review.ts`
Source: `src/nutrition/review.ts:19:1`

## NutritionReviewDecisionRequest

Kind: `type`
Module: `src/nutrition/review.ts`
Source: `src/nutrition/review.ts:21:1`

### Members

| Name            | Kind     | Type                                                                | Required | Description |
| --------------- | -------- | ------------------------------------------------------------------- | -------- | ----------- |
| decision        | property | `"accept" \| "reject" \| "merge" \| "request_changes" \| "publish"` | yes      |             |
| metadata        | property | `Record<string, NutritionJsonValue> \| undefined`                   | no       |             |
| note            | property | `string \| undefined`                                               | no       |             |
| productOverride | property | `Partial<NutritionProduct> \| undefined`                            | no       |             |
| reviewerId      | property | `string \| undefined`                                               | no       |             |
| submissionId    | property | `string`                                                            | yes      |             |
| targetProductId | property | `string \| undefined`                                               | no       |             |

## NutritionReviewDecisionResponse

Kind: `type`
Module: `src/nutrition/review.ts`
Source: `src/nutrition/review.ts:31:1`

### Members

| Name         | Kind     | Type                                                                    | Required | Description |
| ------------ | -------- | ----------------------------------------------------------------------- | -------- | ----------- |
| decidedAt    | property | `string`                                                                | yes      |             |
| decision     | property | `"accept" \| "reject" \| "merge" \| "request_changes" \| "publish"`     | yes      |             |
| productId    | property | `string \| undefined`                                                   | no       |             |
| reviewId     | property | `string`                                                                | yes      |             |
| status       | property | `"queued" \| "needs_more_data" \| "accepted" \| "rejected" \| "merged"` | yes      |             |
| submissionId | property | `string`                                                                | yes      |             |

## NutritionReviewId

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:4:1`

## NutritionReviewRecord

Kind: `type`
Module: `src/nutrition/review.ts`
Source: `src/nutrition/review.ts:40:1`

### Members

| Name            | Kind     | Type                                                                    | Required | Description |
| --------------- | -------- | ----------------------------------------------------------------------- | -------- | ----------- |
| createdAt       | property | `string`                                                                | yes      |             |
| decision        | property | `"accept" \| "reject" \| "merge" \| "request_changes" \| "publish"`     | yes      |             |
| id              | property | `string`                                                                | yes      |             |
| metadata        | property | `Record<string, NutritionJsonValue> \| undefined`                       | no       |             |
| nextStatus      | property | `"queued" \| "needs_more_data" \| "accepted" \| "rejected" \| "merged"` | yes      |             |
| note            | property | `string \| undefined`                                                   | no       |             |
| previousStatus  | property | `"queued" \| "needs_more_data" \| "accepted" \| "rejected" \| "merged"` | yes      |             |
| reviewerId      | property | `string \| undefined`                                                   | no       |             |
| submissionId    | property | `string`                                                                | yes      |             |
| targetProductId | property | `string \| null \| undefined`                                           | no       |             |

## NutritionReviewSubmissionListRequest

Kind: `type`
Module: `src/nutrition/review.ts`
Source: `src/nutrition/review.ts:53:1`

### Members

| Name    | Kind     | Type                                                                                 | Required | Description |
| ------- | -------- | ------------------------------------------------------------------------------------ | -------- | ----------- |
| barcode | property | `string \| undefined`                                                                | no       |             |
| limit   | property | `number \| undefined`                                                                | no       |             |
| offset  | property | `number \| undefined`                                                                | no       |             |
| status  | property | `"queued" \| "needs_more_data" \| "accepted" \| "rejected" \| "merged" \| undefined` | no       |             |
| store   | property | `string \| undefined`                                                                | no       |             |

## NutritionReviewSubmissionListResponse

Kind: `type`
Module: `src/nutrition/review.ts`
Source: `src/nutrition/review.ts:61:1`

### Members

| Name        | Kind     | Type                                    | Required | Description |
| ----------- | -------- | --------------------------------------- | -------- | ----------- |
| limit       | property | `number \| undefined`                   | no       |             |
| offset      | property | `number \| undefined`                   | no       |             |
| submissions | property | `readonly NutritionCaptureSubmission[]` | yes      |             |

## NutritionServing

Kind: `type`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:27:1`

### Members

| Name               | Kind     | Type                  | Required | Description |
| ------------------ | -------- | --------------------- | -------- | ----------- |
| label              | property | `string \| undefined` | no       |             |
| servingsPerPackage | property | `number \| undefined` | no       |             |
| sizeG              | property | `number \| undefined` | no       |             |
| sizeMl             | property | `number \| undefined` | no       |             |

## NutritionSourceConfidence

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:51:1`

## NutritionStoreObservation

Kind: `type`
Module: `src/nutrition/products.ts`
Source: `src/nutrition/products.ts:57:1`

### Members

| Name               | Kind     | Type                  | Required | Description |
| ------------------ | -------- | --------------------- | -------- | ----------- |
| countryCode        | property | `string \| undefined` | no       |             |
| observedAt         | property | `string \| undefined` | no       |             |
| storeChain         | property | `string \| undefined` | no       |             |
| storeLocationLabel | property | `string \| undefined` | no       |             |
| storeName          | property | `string \| undefined` | no       |             |

## NutritionUserId

Kind: `unknown`
Module: `src/nutrition/common.ts`
Source: `src/nutrition/common.ts:5:1`

## OpenApiDocumentRef

Kind: `type`
Module: `src/data/sources.ts`
Source: `src/data/sources.ts:28:1`

### Members

| Name       | Kind     | Type                  | Required | Description |
| ---------- | -------- | --------------------- | -------- | ----------- |
| documentId | property | `string \| undefined` | no       |             |
| url        | property | `string \| undefined` | no       |             |
| version    | property | `string \| undefined` | no       |             |

## OperationId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:3:1`

## OperationScreenDataLoaderDefinition

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:97:1`

### Members

| Name      | Kind     | Type                                                       | Required | Description |
| --------- | -------- | ---------------------------------------------------------- | -------- | ----------- |
| id        | property | `string \| undefined`                                      | no       |             |
| input     | property | `Readonly<Record<string, BindingInputValue>> \| undefined` | no       |             |
| kind      | property | `"operation"`                                              | yes      |             |
| operation | property | `BindingOperationRef`                                      | yes      |             |

## PasswordResetInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:162:1`

### Members

| Name       | Kind     | Type                  | Required | Description |
| ---------- | -------- | --------------------- | -------- | ----------- |
| identifier | property | `AuthIdentifier`      | yes      |             |
| redirectTo | property | `string \| undefined` | no       |             |

## PropBinding

Kind: `type`
Module: `src/bindings.ts`
Source: `src/bindings.ts:67:1`

### Members

| Name       | Kind     | Type                                            | Required | Description |
| ---------- | -------- | ----------------------------------------------- | -------- | ----------- |
| empty      | property | `BindingLifecycleBehavior \| undefined`         | no       |             |
| error      | property | `BindingLifecycleBehavior \| undefined`         | no       |             |
| fallback   | property | `BindingFallback \| undefined`                  | no       |             |
| loading    | property | `BindingLifecycleBehavior \| undefined`         | no       |             |
| source     | property | `BindingValueSource`                            | yes      |             |
| transforms | property | `readonly BindingValueTransform[] \| undefined` | no       |             |

## resolveAuthFlow

Kind: `function`
Module: `src/auth.ts`
Source: `src/auth.ts:65:1`

### Signatures

- `(flow?: AuthFlowConfig | undefined) => AuthFlowConfig`
  - flow: `AuthFlowConfig | undefined` (optional)
  - returns: `AuthFlowConfig`

## RouteDefinition

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:270:1`

### Members

| Name                    | Kind     | Type                         | Required | Description |
| ----------------------- | -------- | ---------------------------- | -------- | ----------- |
| guards                  | property | `string[] \| undefined`      | no       |             |
| icon                    | property | `IconSpec \| undefined`      | no       |             |
| label                   | property | `string \| undefined`        | no       |             |
| name                    | property | `string`                     | yes      |             |
| navigator               | property | `NavigatorSpec \| undefined` | no       |             |
| path                    | property | `string \| undefined`        | no       |             |
| screenId                | property | `string \| undefined`        | no       |             |
| showInPrimaryNavigation | property | `boolean \| undefined`       | no       |             |

## RuntimeCallback

Kind: `unknown`
Module: `src/runtimeCallbacks.ts`
Source: `src/runtimeCallbacks.ts:18:1`

## RuntimeCallbackArgs

Kind: `type`
Module: `src/runtimeCallbacks.ts`
Source: `src/runtimeCallbacks.ts:12:1`

### Members

| Name            | Kind     | Type                  | Required | Description |
| --------------- | -------- | --------------------- | -------- | ----------- |
| node            | property | `UiNode \| undefined` | no       |             |
| payload         | property | `unknown`             | yes      |             |
| resolvedPayload | property | `object \| undefined` | no       |             |

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

| Name  | Kind     | Type                      | Required | Description |
| ----- | -------- | ------------------------- | -------- | ----------- |
| node  | property | `UiNode`                  | yes      |             |
| props | property | `Record<string, unknown>` | yes      |             |

## SchemaId

Kind: `unknown`
Module: `src/data/ids.ts`
Source: `src/data/ids.ts:4:1`

## ScreenCapabilityRequirement

Kind: `type`
Module: `src/requirements.ts`
Source: `src/requirements.ts:30:1`

### Members

| Name       | Kind     | Type                                                                                                                   | Required | Description |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| capability | property | `"notifications" \| "clipboard" \| "barcodeScanner" \| "cameraPreview" \| "mediaPicker" \| "filePicker" \| "location"` | yes      |             |

## ScreenDataLoaderDefinition

Kind: `unknown`
Module: `src/bindings.ts`
Source: `src/bindings.ts:104:1`

## ScreenPermissionRequirement

Kind: `type`
Module: `src/requirements.ts`
Source: `src/requirements.ts:26:1`

### Members

| Name       | Kind     | Type                                                                                                                                                  | Required | Description |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| permission | property | `"camera" \| "microphone" \| "mediaLibrary" \| "mediaLibraryWrite" \| "locationForeground" \| "locationBackground" \| "notifications" \| "clipboard"` | yes      |             |

## ScreenRequirements

Kind: `type`
Module: `src/requirements.ts`
Source: `src/requirements.ts:34:1`

### Members

| Name         | Kind     | Type                                                  | Required | Description |
| ------------ | -------- | ----------------------------------------------------- | -------- | ----------- |
| capabilities | property | `readonly ScreenCapabilityRequirement[] \| undefined` | no       |             |
| permissions  | property | `readonly ScreenPermissionRequirement[] \| undefined` | no       |             |

## ScreenSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:253:1`

### Members

| Name        | Kind     | Type                                                                                                                    | Required | Description |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| dataLoaders | property | `readonly import("/Users/a_rtiphishl_e/git/contracts/src/bindings").OperationScreenDataLoaderDefinition[] \| undefined` | no       |             |
| description | property | `string \| undefined`                                                                                                   | no       |             |
| id          | property | `string`                                                                                                                | yes      |             |
| name        | property | `string`                                                                                                                | yes      |             |
| requires    | property | `ScreenRequirements \| undefined`                                                                                       | no       |             |
| root        | property | `UiNode`                                                                                                                | yes      |             |
| title       | property | `string \| undefined`                                                                                                   | no       |             |

## SearchAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:65:1`

### Members

| Name    | Kind     | Type                                 | Required | Description |
| ------- | -------- | ------------------------------------ | -------- | ----------- |
| payload | property | `{ query: string; scope?: string; }` | yes      |             |
| type    | property | `"search"`                           | yes      |             |

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

| Name     | Kind     | Type                               | Required | Description |
| -------- | -------- | ---------------------------------- | -------- | ----------- |
| kind     | property | `string`                           | yes      |             |
| payload  | property | `Readonly<Record<string, string>>` | yes      |             |
| provider | property | `string \| undefined`              | no       |             |
| ref      | property | `string`                           | yes      |             |
| scope    | property | `SecretScope`                      | yes      |             |

## SecretGetMetadataInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:59:1`

### Members

| Name  | Kind     | Type          | Required | Description |
| ----- | -------- | ------------- | -------- | ----------- |
| ref   | property | `string`      | yes      |             |
| scope | property | `SecretScope` | yes      |             |

## SecretListInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:53:1`

### Members

| Name     | Kind     | Type                  | Required | Description |
| -------- | -------- | --------------------- | -------- | ----------- |
| kind     | property | `string \| undefined` | no       |             |
| provider | property | `string \| undefined` | no       |             |
| scope    | property | `SecretScope`         | yes      |             |

## SecretMetadata

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:14:1`

### Members

| Name             | Kind     | Type                  | Required | Description |
| ---------------- | -------- | --------------------- | -------- | ----------- |
| configuredFields | property | `readonly string[]`   | yes      |             |
| createdAt        | property | `string`              | yes      |             |
| kind             | property | `string`              | yes      |             |
| provider         | property | `string \| undefined` | no       |             |
| ref              | property | `string`              | yes      |             |
| scope            | property | `SecretScope`         | yes      |             |
| updatedAt        | property | `string`              | yes      |             |

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

| Name  | Kind     | Type          | Required | Description |
| ----- | -------- | ------------- | -------- | ----------- |
| ref   | property | `string`      | yes      |             |
| scope | property | `SecretScope` | yes      |             |

## SecretReplaceInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:72:1`

### Members

| Name    | Kind     | Type                               | Required | Description |
| ------- | -------- | ---------------------------------- | -------- | ----------- |
| payload | property | `Readonly<Record<string, string>>` | yes      |             |
| ref     | property | `string`                           | yes      |             |
| scope   | property | `SecretScope`                      | yes      |             |

## SecretResolveInput

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:83:1`

### Members

| Name  | Kind     | Type          | Required | Description |
| ----- | -------- | ------------- | -------- | ----------- |
| ref   | property | `string`      | yes      |             |
| scope | property | `SecretScope` | yes      |             |

## SecretScope

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:7:1`

### Members

| Name        | Kind     | Type     | Required | Description |
| ----------- | -------- | -------- | -------- | ----------- |
| environment | property | `string` | yes      |             |
| projectId   | property | `string` | yes      |             |

## SecretStoreAdapter

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:94:1`

### Members

| Name        | Kind   | Type                                                                                | Required | Description |
| ----------- | ------ | ----------------------------------------------------------------------------------- | -------- | ----------- |
| create      | method | `(input: SecretCreateInput) => Promise<SecretStoreResult<SecretMetadata>>`          | yes      |             |
| getMetadata | method | `(input: SecretGetMetadataInput) => Promise<SecretStoreResult<SecretMetadata>>`     | yes      |             |
| list        | method | `(input: SecretListInput) => Promise<SecretStoreResult<readonly SecretMetadata[]>>` | yes      |             |
| remove      | method | `(input: SecretRemoveInput) => Promise<SecretStoreResult>`                          | yes      |             |
| replace     | method | `(input: SecretReplaceInput) => Promise<SecretStoreResult<SecretMetadata>>`         | yes      |             |
| resolve     | method | `(input: SecretResolveInput) => Promise<SecretStoreResult<SecretPayload>>`          | yes      |             |

## SecretStoreError

Kind: `type`
Module: `src/secrets.ts`
Source: `src/secrets.ts:36:1`

### Members

| Name    | Kind     | Type                                                                                                                                                    | Required | Description |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| cause   | property | `unknown`                                                                                                                                               | no       |             |
| code    | property | `"provider_error" \| "invalid_config" \| "invalid_reference" \| "invalid_payload" \| "not_found" \| "conflict" \| "permission_denied" \| "unavailable"` | yes      |             |
| message | property | `string`                                                                                                                                                | yes      |             |

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

## SetLanguageAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:58:1`

### Members

| Name    | Kind     | Type                  | Required | Description |
| ------- | -------- | --------------------- | -------- | ----------- |
| payload | property | `{ locale: string; }` | yes      |             |
| type    | property | `"setLanguage"`       | yes      |             |

## SignInInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:142:1`

### Members

| Name       | Kind     | Type                                   | Required | Description |
| ---------- | -------- | -------------------------------------- | -------- | ----------- |
| identifier | property | `AuthIdentifier`                       | yes      |             |
| metadata   | property | `Record<string, unknown> \| undefined` | no       |             |
| otp        | property | `string \| undefined`                  | no       |             |
| password   | property | `string \| undefined`                  | no       |             |
| redirectTo | property | `string \| undefined`                  | no       |             |

## SignOutInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:158:1`

### Members

| Name       | Kind     | Type                   | Required | Description |
| ---------- | -------- | ---------------------- | -------- | ----------- |
| allDevices | property | `boolean \| undefined` | no       |             |

## SignUpInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:150:1`

### Members

| Name       | Kind     | Type                                   | Required | Description |
| ---------- | -------- | -------------------------------------- | -------- | ----------- |
| identifier | property | `AuthIdentifier`                       | yes      |             |
| metadata   | property | `Record<string, unknown> \| undefined` | no       |             |
| password   | property | `string \| undefined`                  | no       |             |
| profile    | property | `Record<string, unknown> \| undefined` | no       |             |
| redirectTo | property | `string \| undefined`                  | no       |             |

## SplashScreenAssetSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:290:1`

### Members

| Name       | Kind     | Type                                  | Required | Description |
| ---------- | -------- | ------------------------------------- | -------- | ----------- |
| image      | property | `string \| undefined`                 | no       |             |
| imageWidth | property | `number \| undefined`                 | no       |             |
| resizeMode | property | `SplashScreenResizeMode \| undefined` | no       |             |

## SplashScreenModeSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:296:1`

### Members

| Name            | Kind     | Type                                  | Required | Description |
| --------------- | -------- | ------------------------------------- | -------- | ----------- |
| backgroundColor | property | `string \| undefined`                 | no       |             |
| image           | property | `string \| undefined`                 | no       |             |
| imageWidth      | property | `number \| undefined`                 | no       |             |
| resizeMode      | property | `SplashScreenResizeMode \| undefined` | no       |             |

## SplashScreenResizeMode

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:288:1`

## SplashScreenSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:300:1`

### Members

| Name            | Kind     | Type                                  | Required | Description |
| --------------- | -------- | ------------------------------------- | -------- | ----------- |
| backgroundColor | property | `string \| undefined`                 | no       |             |
| dark            | property | `SplashScreenModeSpec \| undefined`   | no       |             |
| image           | property | `string \| undefined`                 | no       |             |
| imageWidth      | property | `number \| undefined`                 | no       |             |
| resizeMode      | property | `SplashScreenResizeMode \| undefined` | no       |             |

## StartOAuthAuthorizationInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:235:1`

### Members

| Name        | Kind     | Type                                            | Required | Description |
| ----------- | -------- | ----------------------------------------------- | -------- | ----------- |
| provider    | property | `AuthOAuthProviderId`                           | yes      |             |
| queryParams | property | `Readonly<Record<string, string>> \| undefined` | no       |             |
| redirectUri | property | `string`                                        | yes      |             |
| scopes      | property | `readonly string[] \| undefined`                | no       |             |

## STATE_PERSISTENCE_MODES

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:188:14`

## STATE_PROVIDERS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:184:14`

## StateAdapter

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:53:1`

### Members

| Name         | Kind     | Type                                                                                                                           | Required | Description |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| capabilities | property | `StateAdapterCapabilities`                                                                                                     | yes      |             |
| delete       | method   | `((path: StatePath) => StateResult) \| undefined`                                                                              | no       |             |
| get          | method   | `<TValue extends StateValue = StateValue>(path: StatePath) => StateResult<TValue \| undefined>`                                | yes      |             |
| set          | method   | `<TValue extends StateValue = StateValue>(path: StatePath, value: TValue) => StateResult`                                      | yes      |             |
| subscribe    | method   | `<TValue extends StateValue = StateValue>(path: StatePath, listener: StateListener<TValue>) => StateResult<StateSubscription>` | yes      |             |

## StateAdapterCapabilities

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:12:1`

### Members

| Name          | Kind     | Type      | Required | Description |
| ------------- | -------- | --------- | -------- | ----------- |
| computed      | property | `boolean` | yes      |             |
| persistence   | property | `boolean` | yes      |             |
| subscriptions | property | `boolean` | yes      |             |

## StateAdapterError

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:18:1`

### Members

| Name    | Kind     | Type      | Required | Description |
| ------- | -------- | --------- | -------- | ----------- |
| cause   | property | `unknown` | no       |             |
| code    | property | `string`  | yes      |             |
| message | property | `string`  | yes      |             |

## StateListener

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:45:1`

## StatePath

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:10:1`

## StatePersistenceMode

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:189:1`

## StatePrimitive

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:1:1`

## StateProvider

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:186:1`

## StateResult

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:33:1`

## StateSnapshot

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:40:1`

### Members

| Name  | Kind     | Type                  | Required | Description |
| ----- | -------- | --------------------- | -------- | ----------- |
| path  | property | `StatePath`           | yes      |             |
| value | property | `TValue \| undefined` | yes      |             |

## StateSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:319:1`

### Members

| Name        | Kind     | Type                                                       | Required | Description |
| ----------- | -------- | ---------------------------------------------------------- | -------- | ----------- |
| persistence | property | `"database" \| "none" \| "local" \| "secure" \| undefined` | no       |             |
| provider    | property | `StateProvider`                                            | yes      |             |

## StateSubscription

Kind: `type`
Module: `src/state.ts`
Source: `src/state.ts:49:1`

### Members

| Name        | Kind   | Type                          | Required | Description |
| ----------- | ------ | ----------------------------- | -------- | ----------- |
| unsubscribe | method | `() => Promise<void> \| void` | yes      |             |

## StateSuccess

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:24:1`

## StateValue

Kind: `unknown`
Module: `src/state.ts`
Source: `src/state.ts:3:1`

## STORAGE_PROVIDERS

Kind: `value`
Module: `src/types.ts`
Source: `src/types.ts:181:14`

## StorageAdapter

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:86:1`

### Members

| Name             | Kind   | Type                                                                                     | Required | Description |
| ---------------- | ------ | ---------------------------------------------------------------------------------------- | -------- | ----------- |
| getImageMetadata | method | `((input: StorageAssetReference) => Promise<StorageResult<ImageMetadata>>) \| undefined` | no       |             |
| publicUrl        | method | `(input: StoragePublicUrlInput) => Promise<StorageResult<StoragePublicUrlResult>>`       | yes      |             |
| remove           | method | `(input: StorageRemoveInput) => Promise<StorageResult>`                                  | yes      |             |
| upload           | method | `(input: StorageUploadInput) => Promise<StorageResult<StorageUploadResult>>`             | yes      |             |

## StorageAdapterError

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:1:1`

### Members

| Name    | Kind     | Type      | Required | Description |
| ------- | -------- | --------- | -------- | ----------- |
| cause   | property | `unknown` | no       |             |
| code    | property | `string`  | yes      |             |
| message | property | `string`  | yes      |             |

## StorageAssetReference

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:18:1`

### Members

| Name      | Kind     | Type                  | Required | Description |
| --------- | -------- | --------------------- | -------- | ----------- |
| bucket    | property | `string`              | yes      |             |
| path      | property | `string`              | yes      |             |
| publicUrl | property | `string \| undefined` | no       |             |
| storageId | property | `string \| undefined` | no       |             |

## StorageImageAssetSource

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:61:1`

### Members

| Name        | Kind     | Type                         | Required | Description |
| ----------- | -------- | ---------------------------- | -------- | ----------- |
| alt         | property | `string \| undefined`        | no       |             |
| bucket      | property | `string`                     | yes      |             |
| contentType | property | `string \| undefined`        | no       |             |
| height      | property | `number \| undefined`        | no       |             |
| kind        | property | `"storage"`                  | yes      |             |
| metadata    | property | `ImageMetadata \| undefined` | no       |             |
| path        | property | `string`                     | yes      |             |
| publicUrl   | property | `string \| undefined`        | no       |             |
| storageId   | property | `string \| undefined`        | no       |             |
| width       | property | `number \| undefined`        | no       |             |

## StorageOkResult

Kind: `unknown`
Module: `src/storage.ts`
Source: `src/storage.ts:7:1`

## StorageProvider

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:182:1`

## StoragePublicUrlInput

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:45:1`

### Members

| Name      | Kind     | Type                  | Required | Description |
| --------- | -------- | --------------------- | -------- | ----------- |
| bucket    | property | `string`              | yes      |             |
| path      | property | `string`              | yes      |             |
| storageId | property | `string \| undefined` | no       |             |

## StoragePublicUrlResult

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:51:1`

### Members

| Name      | Kind     | Type     | Required | Description |
| --------- | -------- | -------- | -------- | ----------- |
| publicUrl | property | `string` | yes      |             |

## StorageRemoveInput

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:39:1`

### Members

| Name      | Kind     | Type                  | Required | Description |
| --------- | -------- | --------------------- | -------- | ----------- |
| bucket    | property | `string`              | yes      |             |
| path      | property | `string`              | yes      |             |
| storageId | property | `string \| undefined` | no       |             |

## StorageResult

Kind: `unknown`
Module: `src/storage.ts`
Source: `src/storage.ts:11:1`

## StorageSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:314:1`

### Members

| Name     | Kind     | Type                     | Required | Description |
| -------- | -------- | ------------------------ | -------- | ----------- |
| buckets  | property | `string[]`               | yes      |             |
| provider | property | `"auto" \| "s3" \| "r2"` | yes      |             |

## StorageUploadInput

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:25:1`

### Members

| Name         | Kind     | Type                   | Required | Description |
| ------------ | -------- | ---------------------- | -------- | ----------- |
| body         | property | `Uint8Array`           | yes      |             |
| bucket       | property | `string`               | yes      |             |
| cacheControl | property | `string \| undefined`  | no       |             |
| contentType  | property | `string \| undefined`  | no       |             |
| path         | property | `string`               | yes      |             |
| storageId    | property | `string \| undefined`  | no       |             |
| upsert       | property | `boolean \| undefined` | no       |             |

## StorageUploadResult

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:35:1`

### Members

| Name  | Kind     | Type                    | Required | Description |
| ----- | -------- | ----------------------- | -------- | ----------- |
| asset | property | `StorageAssetReference` | yes      |             |

## ThemeConfig

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:17:1`

### Members

| Name  | Kind     | Type              | Required | Description |
| ----- | -------- | ----------------- | -------- | ----------- |
| dark  | property | `ThemeModeConfig` | yes      |             |
| id    | property | `string`          | yes      |             |
| light | property | `ThemeModeConfig` | yes      |             |
| name  | property | `string`          | yes      |             |

## ThemeModeConfig

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:12:1`

### Members

| Name         | Kind     | Type                                                                                                   | Required | Description |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| harmony      | property | `"monochromatic" \| "analogous" \| "complementary" \| "triadic" \| "tetradic" \| "splitComplementary"` | yes      |             |
| primaryColor | property | `string`                                                                                               | yes      |             |

## ToggleDarkModeAction

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:53:1`

### Members

| Name    | Kind     | Type               | Required | Description |
| ------- | -------- | ------------------ | -------- | ----------- |
| payload | property | `undefined`        | no       |             |
| type    | property | `"toggleDarkMode"` | yes      |             |

## UiBindableEventMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:129:1`

### Members

| Name        | Kind     | Type                                      | Required | Description |
| ----------- | -------- | ----------------------------------------- | -------- | ----------- |
| description | property | `string \| undefined`                     | no       |             |
| label       | property | `string \| undefined`                     | no       |             |
| payload     | property | `UiBindableEventPayloadMeta \| undefined` | no       |             |

## UiBindableEventPayloadMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:124:1`

### Members

| Name      | Kind     | Type                                                       | Required | Description |
| --------- | -------- | ---------------------------------------------------------- | -------- | ----------- |
| eventType | property | `UiComponentEventPayloadKind`                              | yes      |             |
| fields    | property | `readonly UiComponentEventPayloadFieldMeta[] \| undefined` | no       |             |

## UiBindablePropMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:115:1`

### Members

| Name              | Kind     | Type                   | Required | Description |
| ----------------- | -------- | ---------------------- | -------- | ----------- |
| acceptsFallback   | property | `boolean \| undefined` | no       |             |
| acceptsTransforms | property | `boolean \| undefined` | no       |             |
| description       | property | `string \| undefined`  | no       |             |
| label             | property | `string \| undefined`  | no       |             |
| required          | property | `boolean \| undefined` | no       |             |
| value             | property | `UiBindableValueMeta`  | yes      |             |

## UiBindableValueFieldMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:99:1`

### Members

| Name        | Kind     | Type                   | Required | Description |
| ----------- | -------- | ---------------------- | -------- | ----------- |
| description | property | `string \| undefined`  | no       |             |
| label       | property | `string \| undefined`  | no       |             |
| path        | property | `string`               | yes      |             |
| required    | property | `boolean \| undefined` | no       |             |
| type        | property | `UiBindableValueType`  | yes      |             |

## UiBindableValueMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:107:1`

### Members

| Name        | Kind     | Type                                               | Required | Description |
| ----------- | -------- | -------------------------------------------------- | -------- | ----------- |
| description | property | `string \| undefined`                              | no       |             |
| fields      | property | `readonly UiBindableValueFieldMeta[] \| undefined` | no       |             |
| itemType    | property | `UiBindableValueType \| undefined`                 | no       |             |
| label       | property | `string \| undefined`                              | no       |             |
| type        | property | `UiBindableValueType`                              | yes      |             |

## UiBindableValueType

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:88:1`

## UiComponentBindingMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:135:1`

### Members

| Name   | Kind     | Type                                                         | Required | Description |
| ------ | -------- | ------------------------------------------------------------ | -------- | ----------- |
| events | property | `Readonly<Record<string, UiBindableEventMeta>> \| undefined` | no       |             |
| props  | property | `Readonly<Record<string, UiBindablePropMeta>> \| undefined`  | no       |             |

## UiComponentBlueprint

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:49:1`

### Members

| Name         | Kind     | Type                                                          | Required | Description |
| ------------ | -------- | ------------------------------------------------------------- | -------- | ----------- |
| defaultProps | property | `Readonly<Record<string, UiComponentPropValue>> \| undefined` | no       |             |
| icon         | property | `UiComponentBlueprintIcon \| undefined`                       | no       |             |
| label        | property | `string`                                                      | yes      |             |

## UiComponentBlueprintIcon

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:44:1`

### Members

| Name     | Kind     | Type                  | Required | Description |
| -------- | -------- | --------------------- | -------- | ----------- |
| name     | property | `string`              | yes      |             |
| provider | property | `string \| undefined` | no       |             |

## UiComponentCategory

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:3:1`

## UiComponentEventMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:81:1`

### Members

| Name          | Kind     | Type                                                       | Required | Description |
| ------------- | -------- | ---------------------------------------------------------- | -------- | ----------- |
| description   | property | `string \| undefined`                                      | no       |             |
| eventType     | property | `UiComponentEventPayloadKind`                              | yes      |             |
| label         | property | `string`                                                   | yes      |             |
| payloadFields | property | `readonly UiComponentEventPayloadFieldMeta[] \| undefined` | no       |             |

## UiComponentEventPayloadFieldMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:74:1`

### Members

| Name        | Kind     | Type                               | Required | Description |
| ----------- | -------- | ---------------------------------- | -------- | ----------- |
| description | property | `string \| undefined`              | no       |             |
| label       | property | `string \| undefined`              | no       |             |
| path        | property | `string`                           | yes      |             |
| type        | property | `UiComponentEventPayloadFieldType` | yes      |             |

## UiComponentEventPayloadFieldType

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:66:1`

## UiComponentEventPayloadKind

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:64:1`

## UiComponentI18nFieldMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:55:1`

### Members

| Name            | Kind     | Type     | Required | Description |
| --------------- | -------- | -------- | -------- | ----------- |
| defaultTextProp | property | `string` | yes      |             |
| keyProp         | property | `string` | yes      |             |

## UiComponentI18nMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:60:1`

### Members

| Name   | Kind     | Type                                  | Required | Description |
| ------ | -------- | ------------------------------------- | -------- | ----------- |
| fields | property | `readonly UiComponentI18nFieldMeta[]` | yes      |             |

## UiComponentMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:145:1`

### Members

| Name               | Kind     | Type                                                          | Required | Description |
| ------------------ | -------- | ------------------------------------------------------------- | -------- | ----------- |
| allowedChildren    | property | `readonly string[]`                                           | yes      |             |
| bindings           | property | `UiComponentBindingMeta \| undefined`                         | no       |             |
| blueprint          | property | `UiComponentBlueprint \| undefined`                           | no       |             |
| category           | property | `UiComponentCategory`                                         | yes      |             |
| description        | property | `string \| undefined`                                         | no       |             |
| directManifestNode | property | `boolean`                                                     | yes      |             |
| events             | property | `Readonly<Record<string, UiComponentEventMeta>> \| undefined` | no       |             |
| i18n               | property | `UiComponentI18nMeta \| undefined`                            | no       |             |
| name               | property | `string`                                                      | yes      |             |
| note               | property | `string \| undefined`                                         | no       |             |
| props              | property | `Readonly<Record<string, UiComponentPropSchema>>`             | yes      |             |
| slots              | property | `Readonly<Record<string, UiComponentSlotMeta>> \| undefined`  | no       |             |

## UiComponentMetaRegistry

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:160:1`

## UiComponentPackageManifest

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:162:1`

### Members

| Name        | Kind     | Type                                        | Required | Description |
| ----------- | -------- | ------------------------------------------- | -------- | ----------- |
| components  | property | `Readonly<Record<string, UiComponentMeta>>` | yes      |             |
| displayName | property | `string \| undefined`                       | no       |             |
| packageName | property | `string`                                    | yes      |             |

## UiComponentPropArrayItemSchema

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:30:1`

### Members

| Name   | Kind     | Type                    | Required | Description |
| ------ | -------- | ----------------------- | -------- | ----------- |
| key    | property | `string`                | yes      |             |
| schema | property | `UiComponentPropSchema` | yes      |             |

## UiComponentPropSchema

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:35:1`

### Members

| Name       | Kind     | Type                                                     | Required | Description |
| ---------- | -------- | -------------------------------------------------------- | -------- | ----------- |
| category   | property | `string`                                                 | yes      |             |
| default    | property | `UiComponentPropValue \| undefined`                      | no       |             |
| enum       | property | `readonly (string \| number)[] \| undefined`             | no       |             |
| itemSchema | property | `readonly UiComponentPropArrayItemSchema[] \| undefined` | no       |             |
| label      | property | `string \| undefined`                                    | no       |             |
| type       | property | `UiComponentPropType`                                    | yes      |             |

## UiComponentPropType

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:5:1`

## UiComponentPropValue

Kind: `unknown`
Module: `src/ui.ts`
Source: `src/ui.ts:20:1`

## UiComponentSlotMeta

Kind: `type`
Module: `src/ui.ts`
Source: `src/ui.ts:140:1`

### Members

| Name            | Kind     | Type                             | Required | Description |
| --------------- | -------- | -------------------------------- | -------- | ----------- |
| allowedChildren | property | `readonly string[] \| undefined` | no       |             |
| label           | property | `string \| undefined`            | no       |             |

## UiNode

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:243:1`

### Members

| Name     | Kind     | Type                                            | Required | Description |
| -------- | -------- | ----------------------------------------------- | -------- | ----------- |
| alias    | property | `string \| undefined`                           | no       |             |
| children | property | `UiNode[] \| undefined`                         | no       |             |
| id       | property | `string`                                        | yes      |             |
| props    | property | `Record<string, unknown> \| undefined`          | no       |             |
| repeat   | property | `UiNodeRepeatSpec \| undefined`                 | no       |             |
| style    | property | `Record<string, string \| number> \| undefined` | no       |             |
| type     | property | `string`                                        | yes      |             |

## UiNodeRepeatSpec

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:236:1`

### Members

| Name      | Kind     | Type                             | Required | Description |
| --------- | -------- | -------------------------------- | -------- | ----------- |
| empty     | property | `readonly UiNode[] \| undefined` | no       |             |
| itemAlias | property | `string \| undefined`            | no       |             |
| keyPath   | property | `string \| undefined`            | no       |             |
| source    | property | `BindingValueSource`             | yes      |             |

## UrlImageAssetSource

Kind: `type`
Module: `src/storage.ts`
Source: `src/storage.ts:74:1`

### Members

| Name        | Kind     | Type                         | Required | Description |
| ----------- | -------- | ---------------------------- | -------- | ----------- |
| alt         | property | `string \| undefined`        | no       |             |
| contentType | property | `string \| undefined`        | no       |             |
| height      | property | `number \| undefined`        | no       |             |
| kind        | property | `"url"`                      | yes      |             |
| metadata    | property | `ImageMetadata \| undefined` | no       |             |
| url         | property | `string`                     | yes      |             |
| width       | property | `number \| undefined`        | no       |             |

## validateSecretPayload

Kind: `function`
Module: `src/secrets.ts`
Source: `src/secrets.ts:146:1`

### Signatures

- `(payload: Readonly<Record<string, string>>) => SecretStoreResult<Readonly<Record<string, string>>>`
  - payload: `Readonly<Record<string, string>>`
  - returns: `SecretStoreResult<Readonly<Record<string, string>>>`

## VerifyOtpInput

Kind: `type`
Module: `src/auth.ts`
Source: `src/auth.ts:167:1`

### Members

| Name       | Kind     | Type                                   | Required | Description |
| ---------- | -------- | -------------------------------------- | -------- | ----------- |
| identifier | property | `AuthIdentifier`                       | yes      |             |
| metadata   | property | `Record<string, unknown> \| undefined` | no       |             |
| redirectTo | property | `string \| undefined`                  | no       |             |
| token      | property | `string`                               | yes      |             |
