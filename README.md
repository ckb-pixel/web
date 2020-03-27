## 关于 Pixel

这是一款基于 CKB 的多人协作像素渲染类游戏，用户可以在这里购买、渲染、出租像素点。

开发团队将会发行 2,000,000 的 PXT（Piexl Token）以帮助项目快速发展。

### 代币发行

开发团队发行 2,000,000 PXT，其中 1,665,000 PXT 将以 1 PXT = 1 CKB 的售价，进行 IPO（Initial Pixel Offering） 1 PXT = 1 CKB，剩余 335,000 PXT 将归团队所有。

PXT 的持有者将享有 Pixel 游戏持续的分红。

## 游戏玩法

**游戏初始化**

Pixel 初始化时为一幅 50\*50 共计 2500 个像素点的像素画，每一个像素点都是一个 NFT（Non-Fungible Token），其中会记录有这个像素点的坐标和颜色信息。

初始化时，每个像素点的 Capacity 为 666 CKB。666\*50\*50 = 1,665,000，我们将 IPO 得到的所有 CKB 都直接存入像素点中。

**游戏开始**

用户可以购买任意像素点，购买时先选择想要购买的像素点，然后选择希望更改成的颜色，之后将发起购买交易。

用户购买像素点时，需支付大于等于当前像素点 capacity 1.3 倍的 CKB。其中：

* 当前像素点 capacity 1.2 倍的 CKB 给到当前像素点拥有者
* 当前像素点 capacity 0.1 倍的 CKB 给到开发团队，之后将等比例分给每一位 PXT 持有者
* 当前像素点 capacity + 用户购买时超出 1.3 倍部分的任意数量的 CKB，成为新用户拥有的像素点的 capacity

## 团队分工

* Yang Xueping: 基于 CKB 的 NFT 设计与实现
* Shao Junda: 基于 NFT 的数据同步和交易撮合, 以及 Pixel Token 发放
* Chen Yu: 基于 NFT 的可视化及交易构建
* Zhang Mingyuan: 技术支持及服务部署
* Jason Chai: PPT, 路演

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
