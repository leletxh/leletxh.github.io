---
lang: zh-CN
title: GPT-SoVITS TTS 服务配置指南
description: GPT-SoVITS 语音合成服务的配置指南
---
# GPT-SoVITS TTS 服务配置指南

## 概述

本指南将帮助您配置和使用 GPT-SoVITS 提供的 TTS (Text-to-Speech) 服务。GPT-SoVITS 是一个强大的开源语音合成项目，支持少样本语音克隆和高质量的语音合成功能。

## 前置要求

- Python 3.9+
- conda 环境管理器
- GPU GeForce MX330 以上或 CPU i5 10代以上
- requests 库
- 足够的存储空间用于模型和音频文件

## 系统要求

### 硬件要求

| 组件 | 最低要求 | 推荐配置 |
|------|----------|----------|
| **GPU** | GeForce MX330 | RTX 3060 或更高 |
| **CPU** | i5 10代 | i7 11代或更高 |
| **内存** | 8GB | 16GB 或更高 |
| **存储** | 10GB 可用空间 | 50GB 或更高 |

### 云服务器推荐

如果本地硬件不满足要求，可以考虑使用云GPU服务：
- [SpaceHPC GPU租赁](https://gpu.spacehpc.com/user/register?inviteCode=83929273) - 支持Windows系统

## 环境变量配置

在使用 GPT-SoVITS TTS 服务之前，您需要配置以下环境变量：

| 环境变量 | 默认值 | 说明 |
|---------|--------|------|
| `TTS_SERVICE_METHOD` | `GPT-SoVITS` | TTS 服务类型，设置为 `GPT-SoVITS` |
| `TTS_SERVICE_URL_GPTSoVITS` | `http://127.0.0.1:9880` | GPT-SoVITS API 服务地址 |

### 配置示例

**Windows (.env 文件)**
```env
TTS_SERVICE_METHOD=GPT-SoVITS
TTS_SERVICE_URL_GPTSoVITS=http://127.0.0.1:9880
```

**Linux/macOS (环境变量)**
```bash
export TTS_SERVICE_METHOD=GPT-SoVITS
export TTS_SERVICE_URL_GPTSoVITS=http://127.0.0.1:9880
```

## 安装配置

### 1. 安装 GPT-SoVITS

访问官方仓库获取最新版本：
- [GPT-SoVITS 官方仓库](https://github.com/RVC-Boss/GPT-SoVITS)

按照官方文档完成安装和环境配置。

### 2. 启动 API 服务

#### 使用官方 API

进入 GPT-SoVITS 环境，启动官方 API 服务：

```bash
python api_v2.py
```

#### 使用修改版 API（推荐）

由于兼容性需要，建议使用项目提供的修改版 API：

1. 将项目中的 `replace/api_v2.py` 替换 GPT-SoVITS 目录下的 `api_v2.py`
2. 启动修改版 API 服务：

```bash
python api_v2.py
```

修改版 API 保持与原版相同的端口配置方式，同时实现了通过分析文本情感选择参考音频的功能
让AI的语气更加贴近对话情景

## 功能特性

### 1. 少样本语音克隆

- **快速训练**：使用少量参考音频即可克隆声音
- **高保真度**：接近原声的音色还原
- **多语言支持**：支持中文、英文、日文等多种语言

### 2. 自定义模型支持

- **GPT 模型**：控制语音的韵律和节奏
- **SoVITS 模型**：负责音色的精确还原
- **模型热加载**：支持动态切换不同角色模型

### 3. 支持的音频格式

- **输入格式**：WAV 文件（用于参考音频）
- **输出格式**：WAV, MP3 等常见格式
- **采样率**：支持多种采样率配置

## 角色配置

### 1. 目录结构

确保您的项目具有以下目录结构：

```
GPT-SoVITS/
├── role/
│   ├── 角色名1/
│   │   ├── config.json
│   │   ├── reference.wav
│   │   ├── BERT/ # 可选：自定义文本情感分析模型
│   │   ├── refAudio/ # 可选：自定义多情感参考音频
│   │   ├── character-gpt.ckpt      # 可选：自定义GPT模型
│   │   └── character-sovits.pth    # 可选：自定义SoVITS模型

│   ├── 角色名2/
│   │   ├── config.json
│   │   └── reference.wav
│   └── ...
├── api_v2.py
└── ...
```


### 2. 配置文件格式

#### 基础配置（仅单独参考音频）

在角色文件夹下创建 `config.json`：

```json
{
    "ref_audio": "reference.wav",
    "ref_text": "骇入空间站的时候，我随手改了下螺丝咕姆的画像，不过…最后还是改回去了",
    "ref_lang": "zh"
}
```

#### 高级配置（包含自定义模型）

```json
{
    "ref_audio": "reference.wav",
    "ref_text": "骇入空间站的时候，我随手改了下螺丝咕姆的画像，不过…最后还是改回去了",
    "ref_lang": "zh",
    "gpt": "character-gpt.ckpt",
    "sovits": "character-sovits.pth"
    "BERTmodel": "BERT/"
    "multiREF": "refAudio/"
}
```

### 3. 配置参数说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `ref_audio` | string | ✓ | 参考音频文件名 |
| `ref_text` | string | ✓ | 参考音频对应的文本内容 |
| `ref_lang` | string | ✓ | 参考文本语言（zh/en/ja等） |
| `BERTmodel` | string | ✗ | 自定义文本情感分析模型 |
| `multiREF` | string | ✗ | 自定义多情感参考音频 |
| `gpt` | string | ✗ | 自定义GPT模型文件名 |
| `sovits` | string | ✗ | 自定义SoVITS模型文件名 |

### 4. 参考音频要求

- **格式**：WAV 格式，16kHz 或 22kHz 采样率
- **时长**：建议 3-10 秒
- **质量**：清晰无噪音，音量适中
- **内容**：包含丰富的音调变化

## 语音合成模型训练（可选）

### 1. 数据准备

如需训练自定义模型以提高音色还原度：

- **音频数据**：准备 10-30 分钟的高质量音频
- **文本标注**：确保音频与文本完全对应
- **数据清理**：移除噪音、静音段等

### 2. 训练流程

1. **数据预处理**：音频切分、文本对齐
2. **SoVITS 训练**：训练音色模型
3. **GPT 训练**：训练韵律模型
4. **模型验证**：测试合成效果

详细训练步骤请参考 [GPT-SoVITS 官方文档](https://github.com/RVC-Boss/GPT-SoVITS)。

## 情感分析模型训练（可选）

如果你有自定义的角色，请根据以下指引自己训练分类模型并收集对应参考音频

### 1. 准备训练数据

首先需要准备情感分类的训练数据。数据格式如下：
（提示：请为每个label准备至少5个数据，推荐准备10个）
```python
finetune_examples = [
    {"text": "今天真是太开心了！", "label": 0},  # 高兴
    {"text": "唉，心情有点低落...", "label": 1},  # 悲伤
    {"text": "哼，真是让人生气！", "label": 2},  # 愤怒
    {"text": "哇，太惊讶了！", "label": 3},  # 惊讶
    {"text": "好可怕...", "label": 4},  # 恐惧
    {"text": "真恶心...", "label": 5},  # 厌恶
    {"text": "你好。", "label": 6},  # 中性
    {"text": "好害羞啊...", "label": 7},  # 害羞
    {"text": "太棒了！", "label": 8},  # 兴奋
    {"text": "很舒服。", "label": 9},  # 舒适
    {"text": "有点紧张...", "label": 10},  # 紧张
    {"text": "我喜欢你。", "label": 11},  # 爱慕
    {"text": "好委屈...", "label": 12},  # 委屈
    {"text": "我很厉害！", "label": 13},  # 骄傲
    {"text": "这是什么？", "label": 14},  # 困惑
]
```


### 2. 训练脚本

1.准备python3.8+的环境
2.按照脚本安装依赖
3.创建训练脚本 `train_emotion_model.py`：

```python
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from transformers import DataCollatorWithPadding
from datasets import Dataset
import torch
import numpy as np
from sklearn.model_selection import KFold
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
import os
import json

def compute_metrics(pred):
    """计算评估指标"""
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='weighted')
    acc = accuracy_score(labels, preds)
    return {
        'accuracy': acc,
        'f1': f1,
        'precision': precision,
        'recall': recall
    }

# 检查并创建输出目录
output_dir = "./results"
saved_model_dir = "./saved_model"
os.makedirs(output_dir, exist_ok=True)
os.makedirs(saved_model_dir, exist_ok=True)

# 设备检查
print("检查可用设备...")
if torch.cuda.is_available():
    device = "cuda"
    print("使用CUDA设备")
elif torch.backends.mps.is_available():
    device = "cpu"
    print("检测到MPS设备，但使用CPU以避免兼容性问题")
else:
    device = "cpu"
    print("使用CPU设备")

# 数据增强
def augment_data(examples):
    """简单的数据增强"""
    augmented_examples = []
    
    for example in examples:
        # 原始样本
        augmented_examples.append(example)
        
        # 变体1：添加标点符号
        text = example["text"]
        if not text.endswith(("！", "？", "。", "~", "...")):
            variant1 = {"text": text + "！", "label": example["label"]}
            augmented_examples.append(variant1)
        
        # 变体2：重复关键词
        if "开心" in text or "高兴" in text or "棒" in text:
            variant2 = {"text": text.replace("！", "！太棒了！"), "label": example["label"]}
            augmented_examples.append(variant2)
        
        # 变体3：添加语气词
        if example["label"] in [0, 8]:  # 高兴、兴奋
            variant3 = {"text": "哇！" + text, "label": example["label"]}
            augmented_examples.append(variant3)
        elif example["label"] in [1, 12]:  # 悲伤、委屈
            variant3 = {"text": "唉，" + text, "label": example["label"]}
            augmented_examples.append(variant3)
    
    return augmented_examples

print("正在进行数据增强...")
augmented_examples = augment_data(finetune_examples)
print(f"数据增强后样本数: {len(augmented_examples)} (原始: {len(finetune_examples)})")

# 准备数据集
texts = [example["text"] for example in augmented_examples]
labels = [example["label"] for example in augmented_examples]

# 加载预训练模型
print("正在加载预训练模型...")
tokenizer = BertTokenizer.from_pretrained("bert-base-chinese")

# 对数据进行tokenization
print("正在处理数据...")
tokenized_data = tokenizer(texts, truncation=True, padding=True, max_length=128)

# 创建数据集
dataset = Dataset.from_dict({
    "input_ids": tokenized_data["input_ids"],
    "attention_mask": tokenized_data["attention_mask"],
    "labels": labels
})

print(f"总数据集大小: {len(dataset)}")

# K折交叉验证设置
k_folds = 5
kfold = KFold(n_splits=k_folds, shuffle=True, random_state=42)

# 存储每折的结果
fold_results = []
best_fold_score = 0
best_fold_model = None

print(f"开始{k_folds}折交叉验证训练...")

for fold, (train_idx, val_idx) in enumerate(kfold.split(dataset)):
    print(f"\n=== 第 {fold + 1} 折训练 ===")
    
    # 分割数据集
    train_dataset = dataset.select(train_idx)
    val_dataset = dataset.select(val_idx)
    
    print(f"训练集大小: {len(train_dataset)}")
    print(f"验证集大小: {len(val_dataset)}")
    
    # 为每一折重新创建模型
    model = BertForSequenceClassification.from_pretrained("bert-base-chinese", num_labels=15)
    
    # 训练参数
    training_args = TrainingArguments(
        output_dir=f"{output_dir}/fold_{fold + 1}",
        num_train_epochs=10,
        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        learning_rate=2e-5,
        warmup_steps=100,
        weight_decay=0.01,
        logging_dir=f"./logs/fold_{fold + 1}",
        eval_strategy="epoch",
        save_strategy="epoch",
        save_total_limit=1,
        load_best_model_at_end=True,
        metric_for_best_model="f1",
        greater_is_better=True,
        report_to=None,
        no_cuda=True,
        dataloader_pin_memory=False,
        gradient_accumulation_steps=2,
        fp16=False,
        remove_unused_columns=False,
    )
    
    # 创建Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        data_collator=DataCollatorWithPadding(tokenizer),
        compute_metrics=compute_metrics,
    )
    
    # 开始训练
    print(f"开始第 {fold + 1} 折训练...")
    trainer.train()
    
    # 在验证集上评估
    print(f"第 {fold + 1} 折验证集评估...")
    eval_results = trainer.evaluate()
    fold_results.append(eval_results)
    
    print(f"第 {fold + 1} 折结果: {eval_results}")
    
    # 保存最佳模型
    if eval_results['eval_f1'] > best_fold_score:
        best_fold_score = eval_results['eval_f1']
        best_fold_model = trainer.model
    
    # 清理内存
    del trainer
    del model
    torch.cuda.empty_cache() if torch.cuda.is_available() else None

# 计算平均结果
print(f"\n=== {k_folds}折交叉验证结果 ===")
avg_accuracy = np.mean([result['eval_accuracy'] for result in fold_results])
avg_f1 = np.mean([result['eval_f1'] for result in fold_results])
avg_precision = np.mean([result['eval_precision'] for result in fold_results])
avg_recall = np.mean([result['eval_recall'] for result in fold_results])

print(f"平均准确率: {avg_accuracy:.4f}")
print(f"平均F1分数: {avg_f1:.4f}")
print(f"平均精确率: {avg_precision:.4f}")
print(f"平均召回率: {avg_recall:.4f}")

# 保存最佳模型
if best_fold_model is not None:
    print(f"\n保存最佳模型 (F1: {best_fold_score:.4f})...")
    best_fold_model.save_pretrained(saved_model_dir)
    tokenizer.save_pretrained(saved_model_dir)
    
    # 创建模型配置文件
    model_config = {
        "model_name": "BERT-base-chinese-YourCharacter",
        "base_model": "bert-base-chinese",
        "num_labels": 15,
        "k_folds": k_folds,
        "best_fold_score": best_fold_score,
        "average_metrics": {
            "accuracy": avg_accuracy,
            "f1": avg_f1,
            "precision": avg_precision,
            "recall": avg_recall
        },
        "fold_results": fold_results
    }
    
    with open(f"{saved_model_dir}/model_config.json", "w", encoding="utf-8") as f:
        json.dump(model_config, f, ensure_ascii=False, indent=2)
    
    print(f"模型已保存到: {saved_model_dir}")
    print(f"模型名称: BERT-base-chinese-YourCharacter")
else:
    print("错误：没有找到最佳模型")
```

### 3. 情感标签映射

训练完成后，需要确保情感标签映射正确：

```python
emotion_map = {
    0: "高兴", 1: "悲伤", 2: "愤怒", 3: "惊讶", 4: "恐惧", 
    5: "厌恶", 6: "中性", 7: "害羞", 8: "兴奋", 9: "舒适",
    10: "紧张", 11: "爱慕", 12: "委屈", 13: "骄傲", 14: "困惑"
}
```

### 4. 模型部署

训练完成后，将模型文件放置到正确的位置：

```
GPT-SoVITS/
├── role/
│   ├── 角色名1/
│   │   ├── BERT/ 
```

### 5. 参考音频收集

为每个情感收集对应的参考音频（注意！将参考音频以）：

```
GPT-SoVITS/role/角色名1/refAudio/
└── YourCharacter/
    ├── 高兴/
    │   └── 参考音频.wav
    ├── 悲伤/
    │   └── 参考音频.wav
    ├── 愤怒/
    │   └── 参考音频.wav
    └── ... (其他情感)
```


### 6. 训练建议

1. **数据质量**：确保训练数据质量高，标注准确
2. **数据平衡**：尽量保持各类情感的样本数量平衡
3. **数据增强**：使用数据增强技术提高模型泛化能力
4. **交叉验证**：使用K折交叉验证确保模型稳定性
5. **超参数调优**：根据实际情况调整学习率、批次大小等参数

### 7. 模型评估

训练完成后，可以通过以下指标评估模型：

- **准确率（Accuracy）**：整体分类准确率
- **F1分数**：精确率和召回率的调和平均
- **精确率（Precision）**：预测为正例中实际为正例的比例
- **召回率（Recall）**：实际正例中被正确预测的比例

### 8. 集成到TTS系统

训练完成后，模型会自动被TTS系统加载，用于情感分析和参考音频选择。系统会根据文本内容自动选择合适的情感参考音频进行TTS生成。

## 错误处理

### 常见问题及解决方案

1. **API 服务启动失败**
   ```
   ModuleNotFoundError: No module named 'xxx'
   ```
   **解决方案**：检查 conda 环境和依赖安装

2. **角色配置加载失败**
   ```
   FileNotFoundError: 角色配置文件不存在
   ```
   **解决方案**：
   - 检查 `role` 目录结构
   - 确认 `config.json` 格式正确
   - 验证音频文件路径

3. **模型加载失败**
   ```
   RuntimeError: CUDA out of memory
   ```
   **解决方案**：
   - 减少批处理大小
   - 检查 GPU 内存使用情况
   - 考虑使用 CPU 模式

4. **音质不佳**
   ```
   合成音频质量较差或失真
   ```
   **解决方案**：
   - 检查参考音频质量
   - 调整参考文本与音频的匹配度
   - 考虑训练专用模型

## 性能优化建议

### 1. 硬件优化

- **GPU 加速**：使用支持 CUDA 的 GPU 可显著提升合成速度
- **内存管理**：确保有足够内存加载模型
- **存储优化**：使用 SSD 提高模型加载速度

### 2. 模型优化

- **模型选择**：根据需求选择合适大小的模型
- **缓存策略**：避免重复加载相同模型
- **批量处理**：对多个文本进行批量合成

### 3. 音频优化

- **参考音频质量**：使用高质量参考音频
- **文本匹配度**：确保参考文本与音频内容匹配
- **长度控制**：合理控制单次合成文本长度

## 示例配置

### 银狼角色配置示例

基于 [银狼模型V4](https://www.modelscope.cn/models/leletxh/Silver_Wolf_GPT-SoVITS_Model/files) 
与
[银狼文本情感分析模型](https://huggingface.co/FrozenFish/retrained_SilverWolf_Bert/tree/main)的配置：

**目录结构**：
```
role/
└── 银狼/
    ├── config.json
    ├── 银狼.wav #从"replace/role/银狼"中获取
    ├── BERT/ #银狼文本情感分析模型文件
    ├── refAudio/ #从"replace/role/银狼/refAudio中"获取
    ├── 银狼-V4-e30.ckpt
    └── 银狼-V4_e8_s688_l32.pth
    
```

**config.json**：
```json
{
    "ref_audio": "银狼.wav",
    "ref_text": "骇入空间站的时候，我随手改了下螺丝咕姆的画像，不过…最后还是改回去了",
    "ref_lang": "zh",
    "gpt": "银狼-V4-e30.ckpt",
    "sovits": "银狼-V4_e8_s688_l32.pth"
    "BERTmodel": "BERT/"
    "multiREF": "refAudio/"
}
```

## 注意事项

1. **版权问题**：确保使用的音频素材符合版权规定
2. **伦理使用**：避免恶意使用语音克隆技术
3. **模型版权**：遵守模型的使用协议
4. **资源消耗**：注意 GPU 和内存的使用情况
5. **网络环境**：确保稳定的网络连接用于模型下载

## 故障排查

如果遇到问题，请按以下步骤排查：

1. **检查环境配置**：确认 conda 环境和依赖
2. **验证硬件支持**：检查 GPU 驱动和 CUDA
3. **确认文件路径**：验证配置文件和模型路径
4. **查看日志输出**：分析详细错误信息
5. **测试基础功能**：使用简单配置进行测试

## 技术支持

- **官方文档**：[GPT-SoVITS GitHub](https://github.com/RVC-Boss/GPT-SoVITS)
- **社区支持**：GPT-SoVITS 官方交流群
- **问题反馈**：GitHub Issues

通过以上配置和使用方法，您可以充分利用 GPT-SoVITS 的强大功能，为您的应用添加高质量的语音合成和语音克隆能力。