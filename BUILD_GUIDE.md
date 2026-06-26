# Android APK 构建指南

## ❌ 当前问题
本地构建需要Android SDK环境，检测到缺少以下环境变量：
- ANDROID_HOME
- ANDROID_SDK_ROOT
- android命令

## 🎯 推荐解决方案（按优先级）

### 方案1：使用GitHub Actions自动构建 ⭐⭐⭐⭐⭐
**优势：** 完全免费、自动化、无需本地环境

#### 步骤：
1. 上传代码到GitHub
2. 在项目中添加GitHub Actions工作流
3. 自动构建并生成APK
4. 从GitHub Releases下载APK

#### 具体操作：
在项目根目录创建`.github/workflows/build-android.yml`:

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install Cordova
      run: npm install -g cordova

    - name: Install dependencies
      run: npm install

    - name: Add Android Platform
      run: cordova platform add android

    - name: Build APK
      run: cordova build android

    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: app-debug
        path: platforms/android/app/build/outputs/apk/debug/app-debug.apk

    - name: Release
      uses: softprops/action-gh-release@v1
      if: startsWith(github.ref, 'refs/tags/')
      with:
        files: platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### 方案2：使用PhoneGap Build ⭐⭐⭐⭐
**优势：** 简单快速，支持私有应用

#### 步骤：
1. 访问 [build.phonegap.com](https://build.phonegap.com)
2. 注册账号（免费）
3. 上传整个项目文件夹（zip格式）
4. 等待构建完成
5. 下载生成的APK

#### 注意事项：
- 需要移除config.xml中的`<plugin>`标签
- PhoneGap会自动处理插件依赖

### 方案3：本地安装Android SDK ⭐⭐⭐
**优势：** 完全控制，可调试

#### 最简单方法：安装Android Studio
1. 下载 [Android Studio](https://developer.android.com/studio)
2. 安装时选择"Standard"安装
3. 安装完成后设置环境变量：
   ```bash
   # Windows PowerShell
   $env:ANDROID_HOME = "C:\Users\你的用户名\AppData\Local\Android\Sdk"
   $env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools"

   # 或者添加到系统环境变量
   ```

4. 重新构建：
   ```bash
   cd clothing-factory-v2
   cordova build android
   ```

## 🎯 快速验证（无需构建）

由于这是一个纯HTML应用，你可以先验证功能是否正常：

1. **在浏览器中测试**：
   ```bash
   # 直接在浏览器中打开HTML文件
   start www/index.html
   ```

2. **在手机浏览器中测试**：
   - 将HTML文件传到手机
   - 用浏览器打开测试所有功能

3. **导出功能测试**：
   - 测试CSV导出是否正常
   - 验证文件编码和格式

## 📱 推荐流程

**对于你的情况，推荐使用方案1（GitHub Actions）：**

1. 先上传到GitHub（验证代码完整性）
2. 添加GitHub Actions工作流
3. 推送代码触发自动构建
4. 15-20分钟后获得可用的APK
5. 在真实设备上测试导出功能

这样可以确保：
- ✅ 代码已备份到GitHub
- ✅ 自动化构建流程
- ✅ 无需本地复杂配置
- ✅ 可重复构建

## 🔧 验证导出功能的关键点

无论使用哪种构建方式，都需要验证：

1. **文件权限**：Android 6-10需要动态请求权限
2. **文件路径**：Android 11+只能访问应用专属目录
3. **Blob下载**：确认WebView支持Blob URL
4. **编码问题**：验证CSV中文显示正常

如果遇到问题，我们可以在代码中添加Cordova File API的兼容层。
