# 123Pan CV - 123云盘提取码管理脚本

![Javascript](https://img.shields.io/badge/logo-javascript-blue?logo=javascript)
![123云盘](https://img.shields.io/badge/123云盘-专用-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 项目简介

123Pan CV 是专为 123云盘设计的用户脚本，提供智能化的提取码管理解决方案。通过自动识别、保存和组织提取码，极大提升使用123云盘分享链接的效率。

<img width="1260" height="2800" alt="1000035934" src="https://gh-proxy.com/https://github.com/Chumor/123PanCV/blob/main/123PanCV01.PNG" />
<img width="1260" height="2800" alt="1000035938" src="https://gh-proxy.com/https://github.com/Chumor/123PanCV/blob/main/123PanCV02.PNG" />


## ✨ 核心功能

### 🔍 智能识别
- **自动检测** - 智能识别页面中的文件名和提取码
- **多源捕获** - 支持 localStorage、sessionStorage、cookie 和输入框多种来源
- **精准匹配** - 排除纯数字误识别，确保提取码准确性

### 💾 数据管理
- **表格展示** - 清晰的记录表格，支持排序和筛选
- **一键复制** - 点击提取码即可复制到剪贴板
- **导入导出** - JSON格式备份，数据迁移无忧
- **云同步** - 支持 Tampermonkey 云端同步

### 🛡️ 隐私保护
- **剪贴板保护** - 阻止123云盘自动写入剪贴板
- **本地存储** - 所有数据仅保存在浏览器本地
- **无服务器传输** - 绝不上传用户数据

### 🔗 便捷操作
- **快速跳转** - 点击文件名直接访问分享链接
- **批量管理** - 支持多条记录同时操作
- **菜单集成** - Tampermonkey 菜单快捷命令



## ⚠️ 免责声明

**本脚本仅供学习交流使用，请勿用于任何商业用途。使用本脚本产生的任何后果由用户自行承担。**

## 🚀 快速安装

### 第一步：安装脚本管理器
首先需要安装以下任意一款脚本管理器扩展：

| 管理器 | 支持浏览器 |链接|
|--------|------------|----------|
| **Tampermonkey** | Chrome, Firefox, Edge, Safari |[官网](https://www.tampermonkey.net/)
| **ScriptCat** | Chrome, Edge, 360等Chromium内核 | [官网](https://scriptcat.org/) |

### 第二步：安装脚本
点击下方图标安装脚本：

<div align="center" style="margin: 30px 0;">

### 📱 一键安装

[![ScriptCat安装](https://img.shields.io/badge/ScriptCat-1677ef?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAIVBMVEVMaXERltsRldsSk9oTktoRltwRltsRldsRldoSltsTn+jqqdPoAAAACXRSTlMA+pwlDOXCekqXZTw5AAAACXBIWXMAAAsTAAALEwEAmpwYAAABzklEQVR4nO2X2ZKEIAxFsxAg+f8PnkJbWyBqnOVhqvo+dUlyLMJNGgE++kVVKhyL5EJ1flrMTCiAYBIzK9NzUUQ1vEMwobVIGReSqKreIdb0FilpXMumd4h3ulqeVrOtS6eIQ7qiA6AN4COO6Q1AE6C8ATOiT2+Acg3QFbGrT/cBdS1ih9jVp7cizk6qQ0hD7JrXZgA7UefC+ZjS4qSoZh8ByFiEC9nkZDg4KbABx0dwdNI9YPYRjEa4BpS/ANQnRXQmEjhOOpcHYPyRj+CRkzwfQQo7Cc0FQNhJvo8g7iTfR/BDQEpxJzUfpaEKRSRnDStnkc6MxVTtiRNbfBkOAJ8YCYejKOYOvitC31Ccl9n7YAtmubNzqoWeFJFKnc3IcYDbSxBvR2Twu0mD8nsJtivCrU56CaJe9ifio6HmDTSAxDVYBKk8FYEpC05/4md7UJTcX2FYnviwyQzr0Au6Wvz29VtkN1Xo1UyBhlhDcABwu70uO7uZrGh5qVYL786CicpS23Q5GdGoxXAt5N23V9F8pdrS9WQcDyriIlCtn4PnYlJbxtah9KqmkY+Bl+ryTbCfSPst55t2lSq12d0uiW3ikzOAAkovfSf3o3+lL+xbQ6tlWltuAAAAAElFTkSuQmCC&logoColor=white)](https://scriptcat.org/zh-CN/script-show-page/4094)
[![GreasyFork安装](https://img.shields.io/badge/Greasy_Fork-全球用户推荐-9f6d30?style=for-the-badge&logo=greasyfork&logoColor=white)](https://greasyfork.org/zh-CN/scripts/547543-123pan-cv)

*点击上方徽章即可跳转安装页面*

</div>

---
## 📜 更新日志

## v1.4.0
### 🎯 核心功能增强
#### 文件名识别革命性升级
- **多段文件名智能拼接** - 支持识别并组合多个`.file-name-line`片段的完整文件名
- **双重识别策略** - 结合`aria-label`属性与文件名字段的多重验证
- **完整文件名保留** - 彻底解决文件名截断问题，如`rufus-4.10（收录自公众号：应用抽屉）.exe`

#### 用户体验优化
- **Material Design 3.0界面** - 采用现代化设计语言，视觉体验全面升级
- **动态悬停反馈** - 按钮和交互元素增加细腻的动效反馈
- **渐变标题栏** - 使用蓝紫色渐变背景，提升视觉层次感
### ⚡ 性能与技术架构
#### 事件系统重构
- **全局事件委托** - 大幅减少事件监听器数量，提升性能
- **内存泄漏修复** - 优化事件绑定机制，避免内存累积
- **ESC键快捷关闭** - 支持键盘快捷操作

#### 数据管理增强
- **导入数据智能合并** - 重复URL记录自动更新，避免数据冗余
- **导出文件命名优化** - 包含日期标识，便于版本管理
### 🛡️ 稳定性提升

#### 剪贴板保护强化
- **彻底阻止自动写入** - 覆盖所有可能的剪贴板写入路径
- **控制台日志记录** - 详细记录被阻止的剪贴板操作

#### 错误处理机制
- **JSON解析容错** - 增强导入文件格式验证
- **空状态友好提示** - 无数据时的引导性界面设计

### 🎨 界面细节打磨

#### 视觉设计升级
- **毛玻璃效果** - 标题栏按钮采用背景模糊效果
- **色彩系统优化** - 统一的色彩规范和交互状态
- **图标SVG化** - GitHub图标使用矢量图形，清晰度提升

#### 交互体验优化
- **复制反馈动画** - 提取码复制时的颜色和文字变化反馈
- **按钮悬停状态** - 细腻的悬停动效和阴影提升
- **表格斑马纹** - 交替行背景色，提升阅读体验

---
### v1.3.0
**新增功能**  
- 剪贴板保护，阻止123Pan自动写入剪贴板内容  
- 支持更多文件名匹配规则（如 nowrap 样式的文本）  
- Tampermonkey 菜单命令：查看、导入、导出、清空记录  
- 文件名点击跳转到真实分享链接  
- 支持导入 JSON 文件合并已有记录  
**改进**  
- 自动保存逻辑优化：每 3 秒检测页面文件与提取码  
- 提取码识别范围扩展：支持 localStorage、sessionStorage、cookie 和输入框  
- 表格界面样式优化，更美观易用  
- 点击提取码可复制，并有颜色反馈  
**修复**  
- 修复旧版本可能覆盖已有记录的问题  
- 修复某些页面提取码无法保存的问题  
### v1.1.250829.1
- 初始版本：支持自动保存提取码、显示表格、复制提取码、导入导出、清空记录功能
------
## 🔒 隐私声明
- 本脚本所有数据仅保存在浏览器本地，不会上传到服务器  
- 如果启用 Tampermonkey 云同步，则数据会同步到 Tampermonkey 云端  
- 提取码仅用于个人使用，脚本不会记录或泄露用户隐私信息
---
## 💬 用户反馈
- 遇到问题或有建议，请在下方留言或在脚本支持链接提交 issue
## ⭐ 评分
- 您的评价对我们非常重要，请为脚本评分
