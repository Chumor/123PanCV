# 123Pan CV - 123云盘提取码管理脚本

![Javascript](https://img.shields.io/badge/logo-javascript-blue?logo=javascript)
![123云盘](https://img.shields.io/badge/123云盘-专用-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 项目简介

123Pan CV 是专为 123云盘设计的用户脚本，提供智能化的提取码管理解决方案。通过自动识别、保存和组织提取码，极大提升使用123云盘分享链接的效率。

<img width="1260" height="2800" alt="1000035934" src="https://cdn.jsdelivr.net/gh/Chumor/123PanCV@main/123PanCV01.PNG" />
<img width="1260" height="2800" alt="1000035938" src="https://cdn.jsdelivr.net/gh/Chumor/123PanCV@main/123PanCV02.PNG" />


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

[![ScriptCat](https://img.shields.io/badge/ScriptCat-1677ef?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAIVBMVEVMaXERltsRldsSk9oTktoRltwRltsRldsRldoSltsTn+jqqdPoAAAACXRSTlMA+pwlDOXCekqXZTw5AAAACXBIWXMAAAsTAAALEwEAmpwYAAABzklEQVR4nO2X2ZKEIAxFsxAg+f8PnkJbWyBqnOVhqvo+dUlyLMJNGgE++kVVKhyL5EJ1flrMTCiAYBIzK9NzUUQ1vEMwobVIGReSqKreIdb0FilpXMumd4h3ulqeVrOtS6eIQ7qiA6AN4COO6Q1AE6C8ATOiT2+Acg3QFbGrT/cBdS1ih9jVp7cizk6qQ0hD7JrXZgA7UefC+ZjS4qSoZh8ByFiEC9nkZDg4KbABx0dwdNI9YPYRjEa4BpS/ANQnRXQmEjhOOpcHYPyRj+CRkzwfQQo7Cc0FQNhJvo8g7iTfR/BDQEpxJzUfpaEKRSRnDStnkc6MxVTtiRNbfBkOAJ8YCYejKOYOvitC31Ccl9n7YAtmubNzqoWeFJFKnc3IcYDbSxBvR2Twu0mD8nsJtivCrU56CaJe9ifio6HmDTSAxDVYBKk8FYEpC05/4md7UJTcX2FYnviwyQzr0Au6Wvz29VtkN1Xo1UyBhlhDcABwu70uO7uZrGh5qVYL786CicpS23Q5GdGoxXAt5N23V9F8pdrS9WQcDyriIlCtn4PnYlJbxtah9KqmkY+Bl+ryTbCfSPst55t2lSq12d0uiW3ikzOAAkovfSf3o3+lL+xbQ6tlWltuAAAAAElFTkSuQmCC&logoColor=white)](https://scriptcat.org/zh-CN/script-show-page/4094)  
[![Greasy Fork](https://img.shields.io/badge/Greasy_Fork-全球用户推荐-9f6d30?style=for-the-badge&logo=greasyfork&logoColor=white)](https://greasyfork.org/zh-CN/scripts/547543-123pan-cv)

> 💡 **前提**：请先安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [ScriptCat](https://scriptcat.org/) 等用户脚本管理器。

*点击上方徽章即可跳转安装页面*

</div>


## 🔒 隐私声明
- 本脚本所有数据仅保存在浏览器本地，不会上传到服务器  
- 如果启用 Tampermonkey 云同步，则数据会同步到 Tampermonkey 云端  
- 提取码仅用于个人使用，脚本不会记录或泄露用户隐私信息


## 💬 问题与反馈

遇到问题或有建议，请在下方留言，或者通过以下链接提交 issue：

- [反馈表单](https://ncn1ivt4fta0.feishu.cn/share/base/form/shrcnkCzcXhDk4rgHF36qp8IKeh)
- [提交 issue](https://github.com/Chumor/123PanCV/issues)

## ⭐ 评分
- 您的评价对我们非常重要，请为脚本评分
