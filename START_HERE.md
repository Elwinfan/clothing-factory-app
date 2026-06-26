# 🚀 快速开始 - 3步获取APK

## 当前状态
✅ Cordova项目已准备好
✅ GitHub Actions自动构建已配置
✅ 只需推送到GitHub即可自动构建APK

## 📝 第1步：创建GitHub仓库

访问：https://github.com/new
- 仓库名：`clothing-factory-app`
- ❌ 不要初始化README、.gitignore等

## 📝 第2步：推送代码

**复制以下命令到终端执行（替换`你的用户名`）：**

```bash
cd "/c/Users/90466/Desktop/clothing-factory-v2"
git remote add origin https://github.com/你的用户名/clothing-factory-app.git
git push -u origin master
```

## 📝 第3步：获取APK

推送完成后：
1. 访问你的GitHub仓库
2. 点击"Actions"标签
3. 等待构建完成（15-20分钟）
4. 下载生成的APK文件

## 📱 完成后测试

安装APK后测试导出功能：
1. 添加工人记录
2. 点击"导出工人Excel"
3. 检查文件是否成功下载
4. 用Excel打开验证中文显示

## 📚 详细说明

查看以下文件获取更多信息：
- `GITHUB_SETUP.md` - 详细GitHub设置指南
- `BUILD_GUIDE.md` - 构建问题解决方案
- `README.md` - 完整项目文档

## ⚡ 一键命令参考

```bash
# 1. 进入项目目录
cd "/c/Users/90466/Desktop/clothing-factory-v2"

# 2. 检查状态
git status

# 3. 查看提交历史
git log --oneline

# 4. 推送到GitHub（首次）
git remote add origin https://github.com/你的用户名/clothing-factory-app.git
git push -u origin master

# 5. 后续更新推送
git add .
git commit -m "Update description"
git push

# 6. 创建版本触发Release构建
git tag v1.0.0
git push origin v1.0.0
```

## 🎯 下载APK的两种方式

### 方式A：Actions页面下载
- 点击仓库的"Actions"标签
- 选择最新的构建任务
- 在"Artifacts"区域下载APK

### 方式B：Releases页面下载
```bash
# 创建并推送tag
git tag v1.0.0
git push origin v1.0.0
```
- 然后在"Releases"页面下载APK文件

## 🔧 故障排除

**问题：推送失败**
- 检查GitHub用户名是否正确
- 确认仓库已创建
- 验证网络连接

**问题：构建失败**
- 查看Actions日志
- 重新推送代码触发构建
- 检查config.xml配置

**问题：导出功能不工作**
- 检查手机存储权限
- 验证Android版本兼容性
- 查看应用日志

## 🎉 完成！

现在你有了一个完整的Android应用开发+构建流程：

✅ 本地Cordova项目
✅ GitHub版本控制
✅ 自动化APK构建
✅ 工人计件管理功能
✅ 数据导出功能

每次推送代码更新，都会自动构建新的APK！
