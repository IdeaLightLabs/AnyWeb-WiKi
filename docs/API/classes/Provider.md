[@idealight-labs/anyweb-js-sdk](../README.md) / [Exports](../modules.md) / Provider

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

[provider.ts:44](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L44)

## Properties

### address

• **address**: `string`[] = `[]`

#### Defined in

[provider.ts:31](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L31)

___

### appId

• `Readonly` **appId**: `string`

#### Defined in

[provider.ts:30](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L30)

___

### chainId

• **chainId**: `number` = `-1`

#### Defined in

[provider.ts:33](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L33)

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

[provider.ts:35](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L35)

___

### logger

• **logger**: `ConsoleLike`

#### Defined in

[provider.ts:29](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L29)

___

### networkId

• **networkId**: `number` = `-1`

#### Defined in

[provider.ts:32](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L32)

___

### url

• **url**: `string` = `''`

#### Defined in

[provider.ts:34](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L34)

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

[provider.ts:84](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L84)

___

### enable

▸ **enable**(): `Promise`<`unknown`\>

Deprecated: use `request` instead

#### Returns

`Promise`<`unknown`\>

#### Defined in

[provider.ts:117](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L117)

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

[provider.ts:223](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L223)

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

[provider.ts:129](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L129)

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

[provider.ts:100](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L100)

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

[provider.ts:72](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/blob/7562c1f/src/provider.ts#L72)
