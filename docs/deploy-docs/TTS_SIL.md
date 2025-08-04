---
lang: zh-CN
title: SiliconFlow TTS 服务配置指南
description: SiliconFlow TTS 语音合成服务的配置和使用指南
---

# SiliconFlow TTS 服务配置指南

## 概述

本指南将帮助您配置和使用 SiliconFlow 提供的 TTS (Text-to-Speech) 服务。SiliconFlow TTS 服务基于 FunAudioLLM/CosyVoice2-0.5B 模型，提供高质量的语音合成功能。

## 前置要求

- Python 3.7+
- requests 库
- 有效的 SiliconFlow API 密钥

## 环境变量配置

在使用 SiliconFlow TTS 服务之前，您需要配置以下环境变量：

| 环境变量 | 默认值 | 说明 |
|---------|--------|------|
| `TTS_SERVICE_METHOD` | `siliconflow` | TTS 服务类型，设置为 `siliconflow` |
| `TTS_SERVICE_URL_SiliconFlow` | `https://api.siliconflow.cn/v1` | SiliconFlow API 基础URL |
| `TTS_SERVICE_API_KEY` | 无 | **必需** - 您的 SiliconFlow API 密钥 |

### 配置示例

**Windows (.env 文件)**
```env
TTS_SERVICE_METHOD=siliconflow
TTS_SERVICE_URL_SiliconFlow=https://api.siliconflow.cn/v1
TTS_SERVICE_API_KEY=your_api_key_here
```

**Linux/macOS (环境变量)**
```bash
export TTS_SERVICE_METHOD=siliconflow
export TTS_SERVICE_URL_SiliconFlow=https://api.siliconflow.cn/v1
export TTS_SERVICE_API_KEY=your_api_key_here
```

## 功能特性

### 1. 自定义音色管理

- **自动加载远程音色**：启动时自动获取已上传的自定义音色列表
- **本地音色上传**：自动扫描并上传 `data/ref_audio/` 目录下的音频文件
- **音色缓存**：避免重复上传相同的音色文件

### 2. 支持的音频格式

- **输入格式**：WAV 文件（用于音色训练）
- **输出格式**：WAV, MP3, PCM, OPUS
- **采样率**：支持多种采样率配置

### 3. 目录结构

确保您的项目具有以下目录结构：

```
project/
├── data/
│   └── ref_audio/
│       ├── character1.wav        # 音色音频文件
│       ├── character1.txt        # 对应的参考文本
│       ├── character2.wav
│       ├── character2.txt
│       └── ...
├── ttsapi_service.py
└── utils/
    └── env_utils.py
```

## 自定义音色配置

### 1. 准备音频文件

在 `data/ref_audio/` 目录下放置您的音色文件：

- **音频文件**：格式为 `.wav`，文件名为音色名称（如 `alice.wav`）
- **文本文件**：格式为 `.txt`，文件名与音频文件对应（如 `alice.txt`）

### 2. 参考文本要求

文本文件应包含与音频对应的文字内容，如果文件不存在或为空，系统将使用默认文本：
```
在一无所知中, 梦里的一天结束了，一个新的轮回便会开始
```

### 3. 自动上传流程

系统启动时会自动：
1. 扫描 `data/ref_audio/` 目录
2. 检查音色是否已存在（基于 MD5 哈希）
3. 上传新的音色到 SiliconFlow 平台
4. 更新本地音色列表

## 错误处理

### 常见问题及解决方案

1. **API 密钥未设置**
   ```
   ValueError: TTS_SERVICE_API_KEY 未设置，请配置环境变量。
   ```
   **解决方案**：检查并正确设置 `TTS_SERVICE_API_KEY` 环境变量

2. **音色上传失败**
   ```
   ❌ 上传音色失败 [character_name]: 400, Bad Request
   ```
   **解决方案**：
   - 检查音频文件格式（必须是 WAV）
   - 确认参考文本内容正确
   - 验证 API 密钥权限

3. **TTS 生成失败**
   ```
   TTS 请求失败: 500, Internal Server Error
   ```
   **解决方案**：
   - 检查网络连接
   - 验证文本内容是否包含特殊字符
   - 确认音色名称存在

## 性能优化建议

1. **音色管理**
   - 合理控制音色数量，避免过多占用存储
   - 定期清理不使用的音色

2. **请求优化**
   - 批量处理短文本可提高效率
   - 避免过长的单次文本输入

3. **缓存策略**
   - 对相同文本和参数的请求考虑实现本地缓存
   - 音频文件可压缩存储以节省空间

## 注意事项

1. **API 限制**：请遵守 SiliconFlow 的 API 调用频率限制
2. **音频质量**：上传的参考音频质量会直接影响合成效果
3. **文本长度**：单次请求的文本长度建议控制在合理范围内
4. **网络环境**：确保服务器能够正常访问 SiliconFlow API

## 故障排查

如果遇到问题，请按以下步骤排查：

1. **检查环境变量配置**
2. **验证 API 密钥有效性**
3. **确认网络连接正常**
4. **查看详细错误日志**
5. **检查音频文件格式和内容**

通过以上配置和使用方法，您可以充分利用 SiliconFlow TTS 服务的强大功能，为您的应用添加高质量的语音合成能力。
