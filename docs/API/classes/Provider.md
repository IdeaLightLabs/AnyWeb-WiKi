[@idealight-labs/anyweb-js-sdk](https://wiki.anyweb.cc/docs) / Exports / Provider

# Class: Provider

AnyWeb Provider

**`author`** Littleor

**`since`** 2020/2/2

**`example`**
const provider = new Provider()

## Implements

- `IProvider`

## Table of contents

### Constructors

- [constructor](Provider.md#constructor)

### Properties

- [address](Provider.md#address)
- [appId](Provider.md#appid)
- [chainId](Provider.md#chainid)
- [events](Provider.md#events)
- [logger](Provider.md#logger)
- [networkId](Provider.md#networkid)
- [oauthToken](Provider.md#oauthtoken)
- [url](Provider.md#url)

### Methods

- [call](Provider.md#call)
- [enable](Provider.md#enable)
- [on](Provider.md#on)
- [rawRequest](Provider.md#rawrequest)
- [request](Provider.md#request)
- [send](Provider.md#send)

## Constructors

### constructor

• **new Provider**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `IBaseProviderOptions` |

#### Defined in

[provider.ts:45](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L45)

## Properties

### address

• **address**: `string`[] = `[]`

#### Defined in

[provider.ts:31](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L31)

___

### appId

• `Readonly` **appId**: `string`

#### Defined in

[provider.ts:30](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L30)

___

### chainId

• **chainId**: `number` = `-1`

#### Defined in

[provider.ts:34](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L34)

___

### events

• **events**: `Object` = `{}`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onAccountsChanged?` | (`accounts`: `string`[]) => `void` |
| `onChainChanged?` | (`chainId`: `string`) => `void` |
| `onConnect?` | (`connectInfo`: `IProviderConnectInfo`) => `void` |
| `onDisconnect?` | (`error`: `IProviderRpcError`) => `void` |
| `onMessage?` | (`message`: `IProviderMessage`) => `void` |
| `onNetworkChanged?` | (`networkId`: `string`) => `void` |

#### Defined in

[provider.ts:36](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L36)

___

### logger

• **logger**: `ConsoleLike`

#### Defined in

[provider.ts:29](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L29)

___

### networkId

• **networkId**: `number` = `-1`

#### Defined in

[provider.ts:33](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L33)

___

### oauthToken

• `Optional` **oauthToken**: `string` = `undefined`

#### Defined in

[provider.ts:32](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L32)

___

### url

• **url**: `string` = `''`

#### Defined in

[provider.ts:35](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L35)

## Methods

### call

▸ **call**(...`arg`): `Promise`<`unknown`\>

Deprecated: use `request` instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `...arg` | `any`[] |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[provider.ts:85](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L85)

___

### enable

▸ **enable**(): `Promise`<`unknown`\>

Deprecated: use `request` instead

#### Returns

`Promise`<`unknown`\>

#### Defined in

[provider.ts:118](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L118)

___

### on

▸ **on**(`type`, `listener`): `void`

Monitor information

**`example`**
provider.on('connected', listener)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | Type of information |
| `listener` | (...`args`: `any`[]) => `void` | Event listener |

#### Returns

`void`

#### Implementation of

IProvider.on

#### Defined in

[provider.ts:249](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L249)

___

### rawRequest

▸ `Protected` **rawRequest**(`method`, `params?`): `Promise`<`unknown`\>

Submits an RPC request

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `params?` | readonly `unknown`[] \| `Record`<`string`, `unknown`\> |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[provider.ts:130](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L130)

___

### request

▸ **request**(`args`): `Promise`<`unknown`\>

Submits an RPC request

**`example`**
const result = await provider.request({ method: 'cfx_sendTransaction', params})

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `IRequestArguments` | Request Arguments: {method, params} |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

IProvider.request

#### Defined in

[provider.ts:101](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L101)

___

### send

▸ **send**(...`arg`): `Promise`<`unknown`\>

Deprecated: use `request` instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `...arg` | `any`[] |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[provider.ts:73](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/bcdd0a9/src/provider.ts#L73)
