# AnyWeb 介绍

> 进一步了解，请[扫码](#写在最后)添加官方客服，获取支持。 


<p style={{textAlign: 'center'}}><img alt="AnyWeb"
src="https://anyweb.oss-cn-hangzhou.aliyuncs.com/app/2052a88e-5e6a-4d38-85af-6509c175abdf.png"/></p>

## AnyWeb 是什么？

AnyWeb 树图数连是一款针对中国环境设计的无需插件、强合规的区块链资产钱包，支持国内唯一合规公链——Conflux 树图公链。同时，AnyWeb 提供了一整套国内合规、开发者友好的 Web3 应用接入解决方案，包含“账户统一认证”、“法币链上支付”、“热钱包私钥托管”等合规方案，并拥有符合 Web3 原生开发标准的 API / SDK，方便开发者在 Conflux 树图公链零成本、快速上线国内合规 Web3 业务，助力中国 Web3 生态发展。

<br/>

AnyWeb 树图数连的核心特性：

1、AnyWeb 针对中国环境政策合规进行设计，消除开发者在公链进行应用开发的合规性顾虑。

2、AnyWeb 在用户侧针对中国用户体验进行设计，用户无需安装浏览器插件、无需下载App、无需理解助记词、私钥等复杂概念就可以无门槛接入 Web3 体验下一代互联网应用。

3、AnyWeb 针对中国应用场景、开发者习惯设计，AnyWeb 支持
App、H5、小程序多种方式接入，并提供开源 [AnyWeb-JS-SDK](https://github.com/IdeaLightLabs/AnyWeb-JS-SDK) 。与此同时，AnyWeb 兼容已有 DApp 的一键接入，开发
DApp 业务逻辑与现有 Conflux-JS-SDK / Web3.js 习惯保持一致。

4、AnyWeb 针对国内支付环境的合规要求设计，AnyWeb 支持将法币交易凭据上链，支持支付宝、银联等支付服务商，使得开发者能够直接从合约侧校验一笔法币交易的真实性，进而打通法币与链上合约的交互能力，应用场景包括但不限于：法币购买NFT、法币支付消费存证等。

## 为什么中国 Web3 需要 AnyWeb？

Web3 的主要发展阵地一直在海外，因此 Web3 相关生态设施都是针对海外用户习惯而设计的。与国内用户习惯不同，海外用户的主要体验终端在 PC 侧，因而各种资产钱包都是使用浏览器插件开发的。另外，由于海外拥有较为长期、相对完整的 Web3
用户市场教育，用户对于助记词、私钥等概念理解较国内而言更为深入。

相比之下，国内拥有完全不一样的情况：1、在终端侧，国内是移动互联网、移动应用（甚至是小程序应用）主导的；2、用户没有助记词、私钥等基础概念理解；3、用户往往不擅长复杂密码的记忆；4、国内互联网应用服务提供方需要接受合规性监管，用户也需要实名才能使用互联网服务。

上述差异导致了海外的 DApp 开发接入方案、资产钱包等基础设施在国内完全不可复用，因此，国内第一批 Web3 用户正在遭遇着这些差异所带来的糟糕的体验影响，这些差异也制约了国内 Web3 生态应用的发展。

在以前，Conflux 主要的基础设施主要是面向海外的，但随着 Web3 应用场景的不断发展以及国内各类基于公链的 to C 应用需求量快速增长，Conflux 急需一个专为国内环境、国内用户设计的资产钱包，也急需一套针对国内 DApp
的应用开发的完整接入方案。

因此，AnyWeb 的诞生填补了这一空白，这同时也意味着：**Conflux 成为唯一一个具备中国端到端链上应用解决方案的全球公链。**

## AnyWeb 是如何针对合规问题进行设计的？

在中国，提供或使用互联网服务需要接受政府监管，相比海外“自由”但乱象丛生（诈骗、非法集资、恶意操纵市场、洗钱等违法行为）的加密市场，这种监管是极为必要的，这能够保障多数用户的利益不受损失。同时，具备强大共识的政府公信主导下的监管也并不会破坏加密本身的共识，相反能够大大增强中国用户对于
Web3 的体验信任。

监管的前提是实名化——这在中国是一个法规要求、普遍接受、经过验证的优秀实践。因此，AnyWeb 作为连接应用和用户的“区块链网关”，是一个极佳的监管实践切入点。具体做法如下：

1、用户使用 AnyWeb 需要通过手机号完成实名认证，针对未来可能涉及到的敏感资产操作也会逐步开放更高级别的实名认证。

2、开发者通过 AnyWeb 接入 DApp 首先需要成为实名认证开发者，提交应用后需要经过 AnyWeb 审核，通过后方可对外提供服务。

3、在未来，AnyWeb 会加入应用合约审计的能力，并将政府监管通过公开的合约接入到各个 DApp，确保监管部门的执法权在链上也具备可实施性。

## AnyWeb 是如何实现无需插件的钱包能力的？

在上文我们提到过，中国用户的体验终端与海外有较大差异，因此插件式钱包不能很好地符合中国用户的使用习惯。

针对这个问题，AnyWeb 设计了基于热账户的网页钱包与基于 Web 技术的 WASM 可信隔离沙盒。对于没有安装任何钱包介质的用户，DApp 可以直接在 H5 端唤起 AnyWeb 网页钱包，用户可以直接在 H5 端完成一整套 Web3
体验。

这一设计目标的直接挑战在于：

1、在钱包设计中存在若干密码学场景，其中大量运算过程包含高度机密的用户数据，因而这些密码学运算过程必须运行在区别于 DApp
的独立上下文环境，否则用户的机密数据极容易遭到泄漏，这也是为什么目前的钱包均采用浏览器插件的原因（浏览器插件具备独立的上下文运行时）。

2、相比于 PC 浏览器插件或 App，浏览器网页端的环境（WebView）是极为不可信的，因为 WebView 的上一级权限 Owner 是 App
而非操作系统，黑客很有可能通过恶意应用伪造一个钓鱼界面实施攻击，在这种场景下，黑客具备了所有的网络与 JavaScript 调试能力，用户的机密数据可以被恶意应用轻松地自动化获取。

因此，AnyWeb 针对这两大挑战设计了一套编译型、运行在独立上下文的 WASM（WebAssembly）可信隔离沙盒，能够动态地生成随机的本地密钥对，用于确保云端机密数据到本机的传输安全，同时 WASM 的内部密码学算法不向
JavaScript 上下文暴露且经过编译和加花处理，仅接收 RawInputData 并直接返回最终运算结果。这一套机制能够很好地解决上述设计挑战、确保用户的数据安全，黑客在这套机制下难以实施逆向攻击及钓鱼自动化。

## AnyWeb 是如何保证私钥安全的？

AnyWeb 采用 **Multi-Sig 门限密钥分片**、**分布式私钥托管**、**MPC 多方安全计算**、**WASM 可信隔离沙盒**四大技术保证用户的私钥安全。

### Multi-Sig 门限密钥分片

Multi-Sig 门限密钥分片是一种将单一密钥分片**若干份随机密钥共享**的技术。
<p style={{textAlign: 'center'}}><img alt=""
src="https://anyweb.oss-cn-hangzhou.aliyuncs.com/anyweb/80e29b9d-0e44-412f-9026-9c73b13ad5a2.png"/></p>

区块链中密码学的机制设计决定了私钥在用户资产安全中的重要地位，在密码学研究中，“如何提供冗余的抗风险密钥管理方案”是一个历史悠久的研究课题，RSA 发明人之一 Shamir 在 1979 年提出了 Shamir's Secret
Sharing 门限密钥共享技术，通过利用多项式插值（polynomial interpolation）的方式将密钥分为 n 份密钥共享，**只有集齐超过 k 个密钥份额，才能够将密钥恢复**。

Multi-Sig 门限密钥分片技术能够解决密钥的单点泄漏风险。同时，即便黑客获取到了一部分密钥共享，**可变化的随机分片也能够持续更新多方持有的密钥共享，从而令黑客的前序攻击失效**。

### 分布式私钥托管

分布式私钥托管是指将若干份密钥共享**托管在不同服务容器中**的技术。

通过将私钥利用 Multi-Sig 门限密钥分片技术进行拆分，AnyWeb 构建了一个分布式密钥共享服务容器集群，**这些容器随机使用不同的服务组件技术栈和系统安全机制，大幅增加黑客进行攻破全节点的复杂度**。

当运维监控单元探测到单一容器节点存在非法行为时，将立即上报运维介入，同时切断该容器节点的公共网络通信，并执行动态的密钥共享更新，确保用户的私钥安全。

### MPC 多方安全计算

MPC 多方安全计算（Secure Muti-Party Computation）是由现代计算机密码学奠基人、图灵奖得主姚期智于 1986 年提出的**解决一组互不信任的参与方之间在保护隐私信息以及没有可信第三方的前提下协同计算问题**
的理论框架。


<p style={{textAlign: 'center'}}><img alt=""
src="https://anyweb.oss-cn-hangzhou.aliyuncs.com/anyweb/eef93bd9-3c66-47b3-acd1-aae976a9edbf.png"/></p>

简单来讲，如果没有 MPC 理论，为了能够使用完整私钥进行区块链交易签名，AnyWeb 必须将利用 Multi-Sig 门限密钥分片技术获得的多份密钥共享在运行内存中进行短暂合成，恢复出完整私钥并使用 ECDSA
进行椭圆曲线签名。这意味着用户的私钥在某个时刻，会以完整明文的方式短暂地在内存中出现，**即便对于黑客而言，在大量的动态内存数据中、在 ns 级时间的有效窗口中获取到这一数据是十分困难的事情，我们仍然认为这样的安全级别是不充分的**。

因此，AnyWeb 引入了 MPC 多方安全计算技术，通过利用这一技术，**能够实现密钥在从“生成 / 派生”到“签名结束”的完整生命周期中，任何时刻、任何位置均不会出现完整的明文私钥**
。这意味着，黑客将不能够通过挟持某单一端点获取到用户的完整私钥。

### WASM 可信隔离沙盒

WASM 可信隔离沙盒是 AnyWeb 基于浏览器 WebAssembly 技术构建的用于确保 H5 密码学运算安全的上下文隔离技术。

WebAssembly 是一种在浏览器中直接运行编译后二进制程序的技术，同时，WebAssembly 无法访问内存中的任何其他 JavaScript 对象，这对于安全性而言非常重要。

<p style={{textAlign: 'center'}}><img alt=""
src="https://anyweb.oss-cn-hangzhou.aliyuncs.com/anyweb/ff2e70c7-7d3d-4a82-944e-9507fcc2217c.png"/></p>

H5 上级执行环境是不可信的，在一般的钓鱼 WebView 场景下，涉及机密数据的密码学运算如果运行在 JavaScript 上下文中，黑客可以轻松地获取中间过程的任一运算结果，中间算法也将悉数暴露，这意味着黑客很容易执行钓鱼攻击的自动化。

通过构建 WASM 可信隔离沙盒，对于经过加花处理的密码学算法，黑客难以通过逆向技术获取机密算法，同时也难以对 WASM 的内存数据进行直接分析，**AnyWeb 能够大幅提升 H5 端的机密运算安全和机密数据安全**。

## 写在最后

AnyWeb 的诞生承载着产品团队对于中国 Web3 时代的无限美好期待。Web3 的愿景包含了很多社会进步诉求（共创权益、隐私保护、知识产权保护、反垄断、共同富裕等等），我们希望 AnyWeb 提供的基础设施服务能够加速推进 Web3
在中国的合规落地，让广大用户 0 门槛地感受到 Web3 所带来的体验革新。

官方网站：https://www.anyweb.cc

帮助 / 反馈邮箱：open@idealight.ltd

如有合作需求或者任何 AnyWeb 相关的问题，都可扫码联系，谢谢。

<img alt="AnyWeb"
src="https://anyweb.oss-cn-hangzhou.aliyuncs.com/contact-qrcode.jpg"/>