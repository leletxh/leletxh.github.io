---
lang: zh-CN
title: 快速开始
description: CABM 项目的快速开始指南，包含安装说明和使用教程
---

# 快速开始

"当灵性注入载体，它便挣脱物质躯壳，抵达超验之境。"

~~（不就是个Gal吗）~~
> *此文档最近一次更新时间：2025.08.17*

> ## **⚠️ 注意：本项目目前处于开发阶段，核心功能已经实现（可能吧？），其他的功能和优化也正在进行中。欢迎贡献代码或提出建议。**
## 目录

[[toc]]

## 开发状态

**已完成功能：**
- 基本的AI对话功能，包含最近的历史记录
- 前端的主页面（现在是科幻风了）
- 角色系统（可切换不同角色）
- 分段流式输出（灵魂所在~）
- 记忆系统（使用向量数据库长期保存记忆）
- AI生成选项
- 简单的角色动作（呼吸）
- 角色的表情（后面或许会换成3D模型）
- 自定义角色（目前只能加，不能删改）
- 剧情模式（根据大纲推动故事发展）
- 角色的知识库（背景故事、人物细节等）
- ~~语音输入~~（问题太多了，目前几乎用不了）
- 很多的bug

**正在开发：**
- 场景切换（让AI切换场景或生成新场景）
- 中期记忆（包括当前目标等）
- 多个参考音频（不同心情使用对应的参考音频）
- 更多的预设角色
- 改进剧情模式的流程
- 用户画像（角色对用户的印象）
- ~~记忆权重，记忆遗忘~~（难度有点大，暂不考虑）
- 更多的bug

## 项目简介
CABM（Code Afflatus & Beyond Matter）是一个融合先进AI技术的沉浸式对话应用，用户可以与AI角色进行深度互动，体验类似视觉小说(Galgame)的情感化叙事。项目结合了大型语言模型、检索增强生成、语音合成等技术，提供：

- **智能角色系统**：每个角色拥有独特人格、背景故事和情感表达
- **动态叙事体验**：剧情模式根据用户选择推动故事发展
- **情感驱动交互**：每个角色有多个立绘，根据情绪实时调整
- **多模态输出**：支持文本、语音、表情立绘的同步呈现
- **长期记忆系统**：向量数据库存储对话历史，让角色永远记得和你的故事
- **高度可定制**：用户可创建自定义角色

## 声明
- 本项目为个人非营利性兴趣项目，无意且不参与任何形式的同业竞争。
- 本项目采用GNU通用公共许可证(GPL)开源协议，禁止闭源商业化改造。详见[GNU General Public License v3.0](LICENSE)
- 使用者需自行承担因调用第三方AI服务产生的API费用，此类费用与项目作者无关
- 本项目涉及人工智能生成内容，作者不对AI生成内容的准确性、合法性及可能引发的后果承担任何责任。
- 欢迎提出建设性意见或提交Pull Requests，但作者保留是否采纳的最终决定权，建议提前和作者联系。
- 作者保留对本声明条款的最终解释权及修改权。

## 功能特点

- 与AI模型进行自然对话，流式输出
- 多角色系统，可切换不同的AI角色
- 动态生成背景图片，提供沉浸式体验
- 角色立绘动态显示，增强视觉效果
- 语音合成，多模态输出
- 对话历史记录查看
- 响应式设计，适配不同设备

## 安装说明

### 📦 一键包，较为推荐，极简

使用类似软件一样的UI，老奶奶都能够部署（某位不愿透漏真名的作者说的）

#### 1. 下载压缩包

从原版下载[戳我打开发布页面](https://github.com/leletxh/CABM-run/releases)

下载做新版的`.zip`文件

解压，点击`启动器.exe`就行了

##### 冷知识，如果你打不开上面的页面，不妨看看[如何加速](deploy-docs/VISTR_GITHUB.md)

#### 2. 配置环境变量

可以在弹出的窗口设置
也按照下方[配置环境变量](#_2-配置环境变量)部分的说明进行配置。

### 🐳 Docker 快速部署（推荐，但要软件）

#### 🚀 直接拉取镜像部署（最简单）

无需克隆代码，直接使用预构建镜像：

```bash{3}
# Linux/macOS 一键部署
curl -o deploy.sh https://raw.githubusercontent.com/xhc2008/CABM/main/deploy.sh
chmod +x deploy.sh
./deploy.sh
```

```powershell{3}
# Windows PowerShell 一键部署
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/xhc2008/CABM/main/deploy.ps1" -OutFile "deploy.ps1"
PowerShell -ExecutionPolicy Bypass -File deploy.ps1
```

**[📖 Docker 部署详细文档](deploy-docs/DOCKER_PULL_GUIDE.md)**

#### 源码构建部署

```bash{6}
# 克隆项目
git clone https://github.com/xhc2008/CABM.git
cd CABM

# 一键部署
./deploy.sh
```

#### 手动部署

```bash{6}
# 1. 配置环境变量
cp .env.docker .env.docker
# 编辑 .env.docker 文件，填入你的 API 密钥

# 2. 启动服务
./deploy-docker.sh start

# 3. 访问应用
# http://localhost:5000
```

#### 配置环境变量

按照下方[配置环境变量](#_2-配置环境变量)部分的说明进行配置。
也可以在UI中配置

**更多部署选项：**
- [📖 Docker 镜像直接拉取部署指南](deploy-docs/DOCKER_PULL_GUIDE.md)

#### Docker 管理命令

```bash
./docker-start.sh start      # 启动服务
./docker-start.sh stop       # 停止服务
./docker-start.sh restart    # 重启服务
./docker-start.sh logs       # 查看日志
./docker-start.sh status     # 查看状态
./docker-start.sh package    # 打包镜像
./docker-start.sh cleanup    # 清理资源
```

### 📦 conda安装方式

使用conda可以更好地管理Python环境和依赖包，推荐有conda使用经验的用户选择此方式。



#### 2. 创建conda环境

```bash
# 创建新的conda环境，Python版本3.10+
conda create -n cabm python=3.11
```

#### 3. 激活环境

```bash
# 激活conda环境
conda activate cabm
```

#### 4. 安装依赖

```bash
# 使用pip安装项目依赖
pip install -r requirements.txt
```

或者如果项目提供了conda环境文件，也可以使用：

```bash
conda env create -f environment.yml -p .conda
```


#### 5. 配置环境变量

按照下方[配置环境变量](#_2-配置环境变量)部分的说明进行配置。
也可以在UI中配置

#### 6. 启动应用

```bash
# 确保conda环境已激活
conda activate cabm

# 启动应用
python start.py
```

#### conda环境管理

```bash
# 激活环境
conda activate cabm

# 退出环境
conda deactivate

# 删除环境（如需重新安装）
conda remove -p .conda --all

# 查看已安装的包
conda list

# 导出环境配置
conda env export > environment.yml
```

### 📦 传统安装方式

#### 1. 安装依赖



使用 pip 安装项目依赖：

```bash
pip install -r requirements.txt
```


#### 2. 配置环境变量

复制`.env.example`文件为`.env`，并填写API密钥和URL：

```bash
cp .env.example .env
```
编辑`.env`文件，填写API_KEY（将里面所有的`your_api_key_here`替换成你的API密钥）。
需前往[硅基流动平台](https://cloud.siliconflow.cn/i/mVqMyTZk)申请你的API Key；
如果使用其他平台或模型，需要替换对应的API_BASE_URL和MODEL

#### 如果你的显卡较好推荐[使用GPT-SoVITS语音合成](deploy-docs/TTS_GPTSoVITS.md)
#### [硅基流动的详细使用说明](deploy-docs/TTS_SIL.md)

### 🚀 Docker 优势

- **一键部署**：无需手动安装依赖，自动配置环境
- **环境隔离**：避免与其他应用冲突
- **跨平台**：支持 Linux、Windows、macOS
- **易于管理**：统一的启动、停止、重启命令
- **生产就绪**：包含健康检查和自动重启
- **资源限制**：可控制内存和CPU使用

### 📋 环境要求

#### Docker 环境
- Docker 20.10+
- Docker Compose 2.0+
- 2GB以上的可用内存
- 1GB以上的可用存储空间

#### 传统环境
- Python 3.8+
- 500MB以上的可用存储空间

## 使用说明

### 启动应用

#### Windows

双击 `start.bat` 文件或在命令行中运行：

```cmd
start.bat
```

#### Linux/macOS

确保脚本有执行权限：

```bash
chmod +x start.sh
```

然后运行：

```bash
./start.sh
```

#### 高级选项

你也可以直接使用Python启动脚本，并传递额外的参数：

```bash
python start.py --host 127.0.0.1 --port 8080 --debug --no-browser
```

可用参数：
- `--host`: 指定主机地址（默认为配置文件中的值）
- `--port`: 指定端口号（默认为配置文件中的值）
- `--debug`: 启用调试模式
- `--no-browser`: 不自动打开浏览器

启动后，应用会自动在浏览器中打开。程序会智能选择最合适的本地IP地址（优先使用192.168开头的地址），确保在各种浏览器中都能正常访问。

你也可以手动访问以下地址：
- 本地访问：`http://localhost:5000` 或 `http://127.0.0.1:5000`
- 局域网访问：`http://[你的本地IP]:5000`（启动时会显示具体地址）

### 基本操作

- **发送消息**：在右上角输入框中输入消息，点击"发送"按钮或按回车键发送
- **查看历史**：点击"历史"按钮查看完整对话历史
- **切换角色**：点击"角色"按钮选择不同的AI角色
- **播放语音**：点击"播放语音"按钮再次播放语音
- **更换背景**：点击"更换背景"按钮生成新的背景图片

## 注意事项

- 频繁更换背景会429，导致无法切换
- 手机可以访问，但是排版会有问题

## 自定义角色
现在可以在前端UI自定义角色。你需要准备：
- 角色的**无背景**立绘（如果有多个，尽量保持角色的大小相同）
- 角色的简介（包括给人看的和给AI看的）
- 角色的一句语音及其文本，3-10秒（非必须，但想要使用语音就必须上传）
- 角色的详细信息、背景故事等等，需要按要求整理好（非必须）

## 贡献，按周结算没有并不代表没有
[![Contributors](https://img.shields.io/github/contributors/xhc2008/CABM?color=blue)](https://github.com/xhc2008/CABM/graphs/contributors) 

![Contributors](https://contrib.rocks/image?repo=xhc2008/CABM) 

欢迎提交 Pull Request 或 Issue！~~(但不一定会做)~~

具体贡献流程请参考[CONTRIBUTING.md](CONTRIBUTING.md)

## 📚 文档索引

### 部署文档
- [📖 Docker 镜像直接拉取部署指南](deploy-docs/DOCKER_PULL_GUIDE.md) - **推荐：无需源码，直接拉取镜像部署**
- [Windows 部署指南](deploy-docs/WINDOWS_DEPLOY_GUIDE.md) - Windows 环境部署
- [Docker 问题解决方案](deploy-docs/DOCKER_SOLUTION.md) - 常见问题及解决方案

### 功能文档
- [TTS GPT-SoVITS 配置](deploy-docs/TTS_GPTSoVITS.md) - 语音合成服务配置

### 开发文档
- [贡献指南](CONTRIBUTING.md) - 如何参与项目开发

## 许可证

[GNU General Public License v3.0](LICENSE)
