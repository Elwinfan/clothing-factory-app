# GitHub上传和自动构建指南

## 🚀 准备工作已完成！
✅ Cordova项目结构创建完成
✅ 配置文件设置完成
✅ GitHub Actions自动构建配置完成
✅ 代码已提交到本地Git仓库

## 📝 接下来的步骤

### 第1步：在GitHub上创建仓库

1. 访问 [GitHub New Repository](https://github.com/new)
2. 填写仓库信息：
   - **仓库名称**：`clothing-factory-app`
   - **描述**：`服装加工厂计件管理系统 - Android应用`
   - **可见性**：Private（私有）或 Public（公开）
   - **初始化选项**：❌ 不要勾选任何选项

3. 点击"Create repository"

### 第2步：推送代码到GitHub

在新的终端/命令行中执行以下命令（替换`你的用户名`）：

```bash
cd "/c/Users/90466/Desktop/clothing-factory-v2"

# 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/你的用户名/clothing-factory-app.git

# 推送代码
git push -u origin master
```

### 第3步：等待自动构建完成

推送成功后，GitHub会自动触发构建流程：

1. 在GitHub仓库页面，点击"Actions"标签
2. 看到工作流正在运行（黄色圆点）
3. 等待约15-20分钟（首次构建较慢）
4. 构建完成后会变成绿色✅

### 第4步：下载APK

#### 方法A：从Actions下载
1. 在Actions页面点击最新的构建任务
2. 滚动到页面底部的"Artifacts"区域
3. 下载`android-apk`压缩包
4. 解压得到`服装加工厂-v1.0.0-debug.apk`

#### 方法B：创建Release版本（推荐）
```bash
# 在项目目录执行
git tag v1.0.0
git push origin v1.0.0
```

然后在GitHub的"Releases"页面下载APK。

## 📱 安装APK到手机

### Android安装步骤：
1. 将APK文件传到手机
2. 在手机上点击APK文件
3. 允许安装未知来源应用
4. 完成安装

## 🧪 测试导出功能

安装完成后，按以下步骤测试：

1. **基础功能测试**：
   - ✅ 添加工人记录
   - ✅ 查看统计数据
   - ✅ 测试工人管理功能

2. **导出功能测试**：
   - ✅ 点击"导出工人Excel"
   - ✅ 检查权限请求（Android 6-10）
   - ✅ 验证文件是否成功下载
   - ✅ 用Excel打开CSV，检查中文显示

3. **文件位置确认**：
   - Android 10+: `/storage/emulated/0/Android/data/com.example.clothingfactory/files/`
   - Android 9-: `/storage/emulated/0/Download/`

## ⚠️ 可能遇到的问题

### 问题1：构建失败
- **解决**：检查Actions日志，常见原因是网络问题，重新触发构建即可

### 问题2：导出失败
- **解决**：检查手机存储权限，在设置中允许应用访问存储

### 问题3：文件乱码
- **解决**：使用较新版本的Excel，文件已包含UTF-8 BOM标记

### 问题4：找不到下载的文件
- **解决**：使用文件管理器搜索".csv"文件

## 🎉 完成！

现在你有了一个功能完整的Android应用：
- ✅ 工人计件管理
- ✅ 公司拿货记录  
- ✅ 工人信息动态管理
- ✅ CSV导出功能
- ✅ 数据备份/恢复
- ✅ 自动化构建流程

每次你推送代码更新，GitHub都会自动构建新的APK！

## 📞 需要帮助？

如果遇到问题：
1. 检查GitHub Actions的构建日志
2. 查看[BUILD_GUIDE.md](BUILD_GUIDE.md)详细说明
3. 在GitHub Issues中提问
