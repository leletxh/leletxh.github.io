---
lang: zh-CN
title: SiliconFlow TTS 服务配置指南
description: SiliconFlow TTS 语音合成服务的配置和使用指南，支持情感识别和角色情感音色
---

# SiliconFlow TTS 服务配置指南

## 概述

本指南将帮助您配置和使用 SiliconFlow 提供的 TTS (Text-to-Speech) 服务。SiliconFlow TTS 服务基于 FunAudioLLM/CosyVoice2-0.5B 模型，提供高质量的语音合成功能，并用微调过的BRET模型支持**情感识别**和**角色情感音色**功能。

## 前置要求

- Python 3.7+
- requests 库
- transformers 库 (用于情感分析)
- torch 库 (用于BERT模型)
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

### 1. 情感识别功能 🎭

系统集成了BERT情感分析模型，能够自动识别文本情感并选择对应的音色：

**支持的情感类型（15种）：**
- 高兴、悲伤、愤怒、惊讶、恐惧
- 厌恶、中性、害羞、兴奋、舒适
- 紧张、爱慕、委屈、骄傲、困惑

**情感识别流程：**
1. 输入文本自动进行情感分析
2. 根据检测到的情感选择对应的参考音频
3. 使用情感匹配的音色进行语音合成

### 2. 角色情感音色系统 🎨

每个角色可以配置多种情感的参考音频：

```
replace/role/
├── 银狼/
│   ├── BERT/                    # BERT情感分析模型
│   │   ├── config.json
│   │   ├── model.safetensors    # 模型文件（需单独下载）
│   │   └── ...
│   ├── refAudio/                # 情感参考音频
│   │   ├── 高兴/
│   │   │   └── 看招，系统崩溃！紧张什么，对付几个公司的杂鱼，很简单的。.wav
│   │   ├── 悲伤/
│   │   │   └── 唉，一个两个还好说，这次玩的有点大，基本上全部阵亡。这路估计不行。.wav
│   │   ├── 愤怒/
│   │   │   └── 毕竟，你不知道假面愚者为了找乐子会玩出什么花样.wav
│   │   ├── 中性/
│   │   │   └── 今天天气不错.wav
│   │   └── ...                  # 其他情感目录
│   └── config.json              # 角色配置文件
└── 其他角色/
    └── ...
```

### 3. 自定义音色管理

- **自动加载远程音色**：启动时自动获取已上传的自定义音色列表
- **本地音色上传**：自动扫描并上传角色情感音色
- **音色缓存**：避免重复上传相同的音色文件
- **情感音色映射**：自动建立角色-情感-音色的映射关系

### 4. 支持的音频格式

- **输入格式**：WAV 文件（用于音色训练）
- **输出格式**：WAV, MP3, PCM, OPUS
- **采样率**：支持多种采样率配置

## 安装和配置

### 1. 安装依赖

确保安装了必要的Python包：

```bash
pip install transformers torch requests
```

### 2. 下载BERT模型

**重要：** 在使用情感识别功能前，需要下载对应的BERT模型：

1. 访问 [HuggingFace模型页面](https://huggingface.co/FrozenFish/retrained_SilverWolf_Bert/tree/main)
2. 下载完整的BERT模型文件到 `replace/role/银狼/BERT/` 目录
3. 确保包含以下文件：
   - `config.json`
   - `model.safetensors`
   - `tokenizer_config.json`
   - `vocab.txt`
   - 其他配置文件

### 3. 准备角色情感音频

为每个角色准备不同情感的参考音频：

1. **创建角色目录**：`replace/role/{角色名}/`
2. **创建情感目录**：`replace/role/{角色名}/refAudio/{情感名}/`
3. **放置音频文件**：将对应情感的WAV文件放入相应目录

**示例结构：**
```
replace/role/银狼/refAudio/
├── 高兴/
│   └── 看招，系统崩溃！紧张什么，对付几个公司的杂鱼，很简单的。.wav
├── 悲伤/
│   └── 唉，一个两个还好说，这次玩的有点大，基本上全部阵亡。这路估计不行。.wav
├── 愤怒/
│   └── 毕竟，你不知道假面愚者为了找乐子会玩出什么花样.wav
└── 中性/
    └── 今天天气不错.wav
```

## 使用方法

### 1. 基本TTS调用

```python
from replace.ttsapi_service import ttsService

# 初始化TTS服务
tts = ttsService()

# 基本语音合成
audio_data = tts.get_tts("你好，世界！", role="银狼")
```

### 2. 情感识别TTS

系统会自动进行情感分析并选择对应音色：

```python
# 高兴的文本 - 自动使用"高兴"情感音色
audio_data = tts.get_tts("我很高兴见到你！", role="银狼")

# 悲伤的文本 - 自动使用"悲伤"情感音色  
audio_data = tts.get_tts("这真是太糟糕了，我很伤心。", role="银狼")

# 愤怒的文本 - 自动使用"愤怒"情感音色
audio_data = tts.get_tts("你怎么能这样对我！我很生气！", role="银狼")
```

### 3. 情感分析日志

系统会输出详细的情感分析信息：

```
情感分析 (银狼): '我很高兴见到你！' -> 高兴 (置信度: 0.9234)
使用角色 银狼 的 高兴 情感音色
✅ 成功生成音频 (情感: 高兴)
```

## 高级配置

### 1. 角色配置文件

每个角色可以有自己的配置文件 `replace/role/{角色名}/config.json`：

```json
{
    "ref_audio": "银狼.wav",
    "ref_text": "骇入空间站的时候，我随手改了下螺丝咕姆的画像，不过…最后还是改回去了。",
    "ref_lang": "zh",
    "BERTmodel": "BERT/",
    "multiREF": "refAudio/"
}
```

### 2. 情感映射配置

系统支持15种情感类型，可以根据需要扩展：

```python
emotion_map = {
    0: "高兴", 1: "悲伤", 2: "愤怒", 3: "惊讶", 4: "恐惧", 
    5: "厌恶", 6: "中性", 7: "害羞", 8: "兴奋", 9: "舒适",
    10: "紧张", 11: "爱慕", 12: "委屈", 13: "骄傲", 14: "困惑"
}
```

## 错误处理

### 常见问题及解决方案

1. **BERT模型未找到**
   ```
   ❌ 银狼的BERT模型加载失败: [Errno 2] No such file or directory
   ```
   **解决方案**：
   - 确保已下载BERT模型到正确目录
   - 检查模型文件是否完整
   - 验证目录权限

2. **情感音色未找到**
   ```
   未找到 高兴 情感音色，使用中性情感音色
   ```
   **解决方案**：
   - 检查 `refAudio/高兴/` 目录是否存在
   - 确认目录中有WAV音频文件
   - 验证文件名格式正确

3. **API 密钥未设置**
   ```
   ValueError: TTS_SERVICE_API_KEY 未设置，请配置环境变量。
   ```
   **解决方案**：检查并正确设置 `TTS_SERVICE_API_KEY` 环境变量

4. **音色上传失败**
   ```
   ❌ 上传音色失败 [银狼_高兴]: 400, Bad Request
   ```
   **解决方案**：
   - 检查音频文件格式（必须是 WAV）
   - 确认参考文本内容正确
   - 验证 API 密钥权限

## 性能优化建议

1. **模型加载优化**
   - BERT模型按需加载，避免内存浪费
   - 首次使用角色时会自动加载对应模型
   - 支持CUDA加速（如果可用）

2. **音色管理**
   - 合理控制音色数量，避免过多占用存储
   - 定期清理不使用的音色
   - 使用MD5哈希避免重复上传

3. **请求优化**
   - 批量处理短文本可提高效率
   - 避免过长的单次文本输入
   - 对相同文本和参数的请求考虑实现本地缓存

## 注意事项

1. **模型文件大小**：BERT模型文件较大（约390MB），请确保有足够存储空间
2. **API 限制**：请遵守 SiliconFlow 的 API 调用频率限制
3. **音频质量**：上传的参考音频质量会直接影响合成效果
4. **文本长度**：单次请求的文本长度建议控制在合理范围内
5. **网络环境**：确保服务器能够正常访问 SiliconFlow API
6. **情感识别准确性**：BERT模型的训练数据会影响情感识别准确性

## 故障排查

如果遇到问题，请按以下步骤排查：

1. **检查BERT模型**：确认模型文件完整且路径正确
2. **验证情感音频**：检查各情感目录下的音频文件
3. **检查环境变量配置**
4. **验证 API 密钥有效性**
5. **确认网络连接正常**
6. **查看详细错误日志**

## 示例代码

### 完整使用示例

```python
import logging
from replace.ttsapi_service import ttsService

# 设置日志级别
logging.basicConfig(level=logging.INFO)

# 初始化TTS服务
tts = ttsService()

# 测试不同情感的文本
test_texts = [
    ("我很高兴见到你！", "高兴"),
    ("这真是太糟糕了，我很伤心。", "悲伤"), 
    ("你怎么能这样对我！我很生气！", "愤怒"),
    ("今天天气不错。", "中性")
]

for text, expected_emotion in test_texts:
    try:
        audio_data = tts.get_tts(text, role="银狼")
        print(f"✅ 成功生成音频: '{text}' -> {expected_emotion}")
    except Exception as e:
        print(f"❌ 生成失败: {e}")
```

通过以上配置和使用方法，您可以充分利用 SiliconFlow TTS 服务的情感识别功能，为您的应用添加智能化的情感语音合成能力。
