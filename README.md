## 关于 Pixel

这是一款基于 CKB 的多人协作像素渲染类游戏，用户可以在这里购买、渲染、出租像素点。


### 代币发行

开发团队将会发行 2,000,000 的 PXT（Piexl Token）以帮助项目快速发展。

发行的 2,000,000 枚 PXT，其中 1,665,000 枚 PXT 将以 1 PXT = 1 CKB 的售价，进行 IPO（Initial Pixel Offering），剩余 335,000 枚 PXT 将归团队所有。

PXT 的持有者将享有 Pixel 游戏持续的分红。

## 游戏玩法

**游戏初始化**

Pixel 初始化时为一幅 50\*50 共计 2500 个像素点的像素画，每一个像素点都是一个 NFT（Non-Fungible Token），其中会记录有这个像素点的坐标和颜色信息。

初始化时，每个像素点的 Capacity 为 666 CKB。666\*50\*50 = 1,665,000，也就是说我们会将 IPO 得到的所有 CKB 都直接存入像素点中。

**游戏开始**

用户可以购买任意像素点，购买时先选择想要购买的像素点，然后选择希望更改成的颜色，之后将发起购买交易。

用户购买像素点时，需支付大于等于当前像素点 capacity 1.3 倍的 CKB。其中：

* 当前像素点 capacity 1.2 倍的 CKB 给到当前像素点拥有者
* 当前像素点 capacity 0.1 倍的 CKB 将等比例分给每一位 PXT 持有者
* 当前像素点 capacity + 用户购买时超出 1.3 倍部分的任意数量的 CKB，成为新用户拥有的像素点的 capacity

**Pixel Pool**

考虑到像素点初始化是由团队进行的，所以每个像素点第一次被购买时，团队将获得 799.2（666\*1.2） 个 CKB，我们将其中 666 个 CKB 存放入 Pixel Pool 用于后续 Pixel 生态发展基金，而将剩余的 133.2 个 CKB 等比例分给每一位 PXT 持有者。

## 角色分析

**Pixel**

每一个 Pixel 都是一个 NFT，是一个具有内在价值、实际使用价值、收藏价值的数字资产。

* Pixel 的内在价值是由 capacity 也就是 CKB 决定，而 CKB 是具有真实稀缺性和强大升值空间的一种数字资产。
* Pixel 具有实际使用价值。每一个 Pixel 内都包含了坐标和颜色的参数，是组成 Pixel 画布的一员，用户购买像素点的同时，也获得了更改像素点颜色的权力，用户可以在像素点中放入自己喜欢的像素点。
* Pixel 具有收藏价值。因为后一位购买者需要支付当前像素点 capacity 1.2 倍的 CKB 给到当前像素点的拥有者，因此每一个 Pixel 都具有升值空间和收藏价值。

**Pixel 游戏参与者**

Pixel 参与者将体验多人协同绘制像素画的乐趣。参与者购买的每一个像素点都是一个 NFT，是独一无二的数字资产。

Pixel 参与者实际掌握了像素点的定价权力：

* 当 Pixel 参与者不希望自己持有的像素点被人轻易购买走的时候，参与者可以在购买时附加大量的 CKB 到该像素点中，这样如果该像素点被其他用户购买走，Pixel 参与者也可以获得较多的补偿。
* 当 Pixel 参与者比较希望自己的像素点被人买走的时候，参与者可以购买时仅附加少量的 CKB 到该像素点中，这样该像素点被其他用户购买走时，Pixel 参与者就可以获得一定的收益。

**PXT 持有者**

PXT 持有者将永久享受 Pixel 游戏带来的分红，是 Pixel 最坚实的后盾。每当有一个像素点被游戏参与者购买，PXT 持有者都将等比例分配该像素点 capacity 0.1 倍的收益。

随着 Pixel 生态的不断地繁荣，PXT 持有者们将持续地享受生态发展带来的福利。

**Pixel 开发团队**

Pixel 开发团队将持续地为 Pixel 添加新的功能，让更多用户可以更便捷的参与到 Pixel 游戏中来。

同时，Pixel 团队也欢迎其他开发者基于 Pixel 开发出更多更好玩的游戏。

## 技术介绍

**智能合约**

本次我们共部署了两个合约，一个是 Pixel 基础信息的 type script，另一个是 Pixel 买卖规则的 lock script。

* Pixel 基础信息的 type script。包含了 Pixel 的基础信息：坐标和颜色
  * 坐标在交易前后不能发生变化
  * 颜色可以在交易前后发生变化
  
* Pixel 买卖规则的 lock script。包含了 Pixle 的买卖规则：
  * 原像素点持有者的地址：output 的 capacity 需要是原像素点 capacity 的 1.2 倍
  * 官方团队的地址：output 的 capacity 需要时原像素点 capacity 的 0.1 倍
  * 像素点购买者：在 output 中获得一个 capacity 大于等于原像素点 capacity 的 Pixel NFT

## 下一版 Pixel：可租赁的 Pixel

随着 Pixel 的用户越来越多，生态越来越繁荣，购买一个 Pixel 的价格也将水涨船高，此时 Pixel 的流动性将会下降。在下一版本中，我们计划推出可租赁的 Pixel。

对于那些希望参与到 Pixel 绘画中，拥有创作、商业推广、表白告白等等多种多样的需求的用户，购买大量像素点的成本将会非常非常高，这个时候用户就可以租赁使用 Pixel。

租赁 Pixel 时，租赁者需要根据租赁时间支付一部分租金给到 Pixel 实际拥有者和所有 PXT 用户，此时租赁者就拥有了该 Pixel 的使用权，可以在其中填入自己想要的颜色，当然 Pixel 的所有权不会发生变化。

## 团队分工

* Yang Xueping: 基于 CKB 的 NFT 设计与实现
* Shao Junda: 基于 NFT 的数据同步和交易撮合, 以及 Pixel Token 发放
* Chen Yu: 基于 NFT 的可视化及交易构建
* Zhang Mingyuan: 技术支持及服务部署
* Jason Chai: PPT, 路演

## 开发进程

*3/27 23：00

* 前端完成基础内容
* Pixel 的 type script 完成
* 后端完成 live cell 检索和收集
* PPT 部分完成思路整理

*3/28 14：00

* 前后端接口进行对接
* Pixel 的 lock script 基本完成
* PPT 迷茫中



---

# web
The project for rendering pixels

##  About Pixel

This is a co-operative multiplayer pixel painting game based on CKB. Users can buy, tintage and lease pixels.

The team will issue Pixel Token to help the project develop fast.

## About Team

Yang Xueping: NFT design and implementation

Shao Junda: NFT's data sync and matchmaking tradeoff system, as well as Pixel Token distribution

Chen Yu: NFT's visualization and matchmaking tradeoff system

Zhang Mingyuan: Technical support and service deployment

Jason Cai: PPT
