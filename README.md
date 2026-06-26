# 服装加工厂计件管理系统 (Android App)

## 项目简介
这是一个专为服装加工厂设计的计件管理Android应用，支持工人计件记录、公司拿货管理、工人信息动态管理等功能。

## 功能特性
- ✅ **工人计件管理**：记录工人的计件数据，自动计算工资
- ✅ **公司拿货管理**：记录公司拿货信息和金额统计
- ✅ **工人管理**：动态添加/删除工人信息
- ✅ **数据导出**：支持导出CSV格式文件到Excel
- ✅ **数据备份/恢复**：支持JSON格式数据备份和恢复
- ✅ **本地存储**：使用LocalStorage，数据安全可靠

## 技术栈
- **前端框架**：纯HTML5 + CSS3 + JavaScript
- **打包工具**：Apache Cordova
- **目标平台**：Android (API 22-33+)
- **数据存储**：LocalStorage

## 安装说明

### 环境要求
- Node.js 16+
- npm 8+
- Android Studio（可选，用于自定义构建）
- JDK 8+

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/你的用户名/clothing-factory-app.git
cd clothing-factory-app
```

2. **安装Cordova CLI**
```bash
npm install -g cordova
```

3. **安装项目依赖**
```bash
npm install
```

4. **添加Android平台**
```bash
cordova platform add android
```

5. **构建APK**
```bash
# 调试版本
cordova build android

# 发布版本
cordova build android --release
```

6. **安装APK到设备**
- 调试版本：`platforms/android/app/build/outputs/apk/debug/app-debug.apk`
- 发布版本：`platforms/android/app/build/outputs/apk/release/app-release.apk`

## 使用指南

### 工人计件
1. 打开应用，点击"👷 工人计件"标签
2. 填写工人姓名、工序类型、完成数量、单价等信息
3. 点击"提交记录"保存数据
4. 可随时查看统计数据和导出Excel

### 公司拿货
1. 点击"🏢 公司拿货"标签
2. 填写拿货数量、公司单价等信息
3. 点击"提交拿货记录"保存
4. 可导出拿货记录Excel

### 工人管理
1. 点击"👥 工人管理"标签
2. 输入新工人姓名，点击"添加工人"
3. 可删除已有工人
4. 工人名单会自动同步到计件功能

### 数据导出
- **导出工人Excel**：点击"📊 导出工人Excel"
- **导出拿货Excel**：点击"📊 导出拿货Excel"
- **备份数据**：点击"💾 备份数据"（JSON格式）
- **恢复数据**：点击"📥 恢复数据"

## 导出功能说明
应用支持多种数据导出功能：
- CSV格式导出，可直接用Excel打开
- 支持中文编码（UTF-8 BOM）
- 自动命名文件（包含日期）
- 支持分享到其他应用

## 兼容性
- **Android版本**：Android 5.0 (API 22) 及以上
- **屏幕尺寸**：手机和平板均可使用
- **存储权限**：首次使用需要授予存储权限

## 注意事项
1. **存储权限**：首次导出文件时需要授予存储权限
2. **数据备份**：建议定期使用备份功能保护数据
3. **文件路径**：导出的文件保存在设备存储中，可通过文件管理器找到
4. **中文编码**：导出的CSV文件使用UTF-8编码，Excel可直接打开

## 常见问题

### Q: 导出的文件在哪里？
A: 文件保存在设备的下载目录或应用专属目录中，具体位置因Android版本而异。

### Q: 为什么导出的文件在Excel中乱码？
A: 请确保使用较新版本的Excel打开，文件已包含UTF-8 BOM标记。

### Q: 如何迁移数据到新设备？
A: 使用"备份数据"功能，然后通过"恢复数据"在新设备上导入。

## 开发计划
- [ ] 添加数据云同步功能
- [ ] 支持多种语言
- [ ] 添加图表统计功能
- [ ] 优化大屏设备显示

## 许可证
MIT License

## 作者
Elwinfan

## 更新日志
### v1.0.0 (2026-06-26)
- ✨ 首次发布
- ✅ 实现工人计件管理
- ✅ 实现公司拿货管理
- ✅ 实现工人动态管理
- ✅ 实现数据导出功能
- ✅ 支持Android全版本

## 联系方式
如有问题或建议，请提交Issue或Pull Request。
