// ========== Cordova文件下载支持 ==========

// 检测是否在Cordova环境中
function isCordovaEnvironment() {
    return typeof window.cordova !== 'undefined' && window.cordova.platformId;
}

// 请求存储权限（Android 6-10需要）
function requestStoragePermission() {
    return new Promise((resolve, reject) => {
        if (!isCordovaEnvironment()) {
            resolve(false); // 非Cordova环境
            return;
        }

        const permissions = window.cordova.plugins.permissions;
        if (!permissions) {
            resolve(false);
            return;
        }

        // Android 11+不需要存储权限
        if (window.device && window.device.version) {
            const androidVersion = parseInt(window.device.version.split('.').slice(0, 2).join(''));
            if (androidVersion >= 30) { // Android 11 (API 30)
                resolve(true);
                return;
            }
        }

        // Android 6-10需要请求权限
        permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, (status) => {
            if (status.hasPermission) {
                resolve(true);
            } else {
                reject(new Error('存储权限被拒绝'));
            }
        }, (error) => {
            reject(error);
        });
    });
}

// Cordova文件下载函数
function downloadFileCordova(content, filename, mimeType) {
    return new Promise(async (resolve, reject) => {
        try {
            // 请求权限
            await requestStoragePermission();

            // 等待设备准备
            if (!window.device) {
                document.addEventListener('deviceready', () => {
                    performDownload(content, filename, mimeType, resolve, reject);
                }, { once: true });
            } else {
                performDownload(content, filename, mimeType, resolve, reject);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function performDownload(content, filename, mimeType, resolve, reject) {
    // 获取可访问的存储路径
    const paths = window.cordova.file;
    const downloadPath = paths.externalDataDirectory || documentsDirectory || dataDirectory;

    // 完整文件路径
    const fullPath = downloadPath + filename;

    // 写入文件
    window.resolveLocalFileSystemURL(downloadPath, (dirEntry) => {
        dirEntry.getFile(filename, { create: true, exclusive: false }, (fileEntry) => {
            fileEntry.createWriter((writer) => {
                writer.onwriteend = () => {
                    // 文件写入成功，创建下载通知
                    const fileURL = fileEntry.toURL();
                    showDownloadNotification(filename, fileURL);
                    resolve({ success: true, filePath: fullPath, fileURL: fileURL });
                };

                writer.onerror = (error) => {
                    reject(new Error('文件写入失败: ' + error));
                };

                // 将内容转换为Blob并写入
                const blob = new Blob([content], { type: mimeType });
                writer.write(blob);
            }, reject);
        }, reject);
    }, reject);
}

// 显示下载通知
function showDownloadNotification(filename, fileURL) {
    // 在Android上显示通知或Toast
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
        // 可以添加本地通知
    }

    // 确保文件可被其他应用访问（Android）
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Intent) {
        // 添加文件到媒体库
    }
}

// 浏览器环境下载（后备方案）
function downloadFileBrowser(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 100);
    return Promise.resolve({ success: true, method: 'browser' });
}

// 统一的文件下载函数
function downloadFile(content, filename, mimeType = 'text/csv;charset=utf-8;') {
    if (isCordovaEnvironment()) {
        return downloadFileCordova(content, filename, mimeType);
    } else {
        return downloadFileBrowser(content, filename, mimeType);
    }
}

// 修改导出CSV函数
function exportToCSV() {
    const data = loadData();

    if (data.length === 0) {
        showToast('没有数据可以导出', true);
        return;
    }

    // 创建CSV内容
    const headers = ['日期', '款式', '工人姓名', '工序类型', '完成数量', '单价(元)', '工资(元)'];
    const rows = data.map(record => [
        record.date,
        record.style || '',
        record.workerName,
        record.taskType,
        record.quantity,
        record.unitPrice.toFixed(2),
        record.wage.toFixed(2)
    ]);

    let csvContent = '﻿'; // UTF-8 BOM
    csvContent += headers.join(',') + '\n';
    csvContent += rows.map(row => row.join(',')).join('\n');

    const today = new Date().toISOString().split('T')[0];
    const filename = `工人计件数据_${today}.csv`;

    downloadFile(csvContent, filename, 'text/csv;charset=utf-8;')
        .then(result => {
            if (result.success) {
                if (result.filePath) {
                    showToast(`导出成功！文件路径: ${result.filePath}`);
                } else {
                    showToast('工人数据导出成功！');
                }
            }
        })
        .catch(error => {
            showToast('导出失败: ' + error.message, true);
            console.error('导出错误:', error);
        });
}

// 修改公司拿货导出函数
function exportCompanyData() {
    const data = loadCompanyData();

    if (data.length === 0) {
        showToast('没有拿货数据可以导出', true);
        return;
    }

    // 创建CSV内容
    const headers = ['拿货数量', '公司单价(元)', '日期', '备注', '总金额(元)'];
    const rows = data.map(record => [
        record.quantity,
        record.companyPrice.toFixed(2),
        record.date,
        record.remark || '',
        record.totalAmount.toFixed(2)
    ]);

    let csvContent = '﻿'; // UTF-8 BOM
    csvContent += headers.join(',') + '\n';
    csvContent += rows.map(row => row.join(',')).join('\n');

    const today = new Date().toISOString().split('T')[0];
    const filename = `公司拿货数据_${today}.csv`;

    downloadFile(csvContent, filename, 'text/csv;charset=utf-8;')
        .then(result => {
            if (result.success) {
                if (result.filePath) {
                    showToast(`导出成功！文件路径: ${result.filePath}`);
                } else {
                    showToast('拿货数据导出成功！');
                }
            }
        })
        .catch(error => {
            showToast('导出失败: ' + error.message, true);
            console.error('导出错误:', error);
        });
}

// 修改备份数据函数
function backupData() {
    const workerData = loadData();
    const companyData = loadCompanyData();
    const prices = loadPrices ? loadPrices() : {};

    const backup = {
        version: '2.0',
        exportDate: new Date().toISOString(),
        prices: prices,
        workerRecords: workerData,
        companyRecords: companyData
    };

    const content = JSON.stringify(backup, null, 2);
    const today = new Date().toISOString().split('T')[0];
    const filename = `计件系统_完整备份_${today}.json`;

    downloadFile(content, filename, 'application/json')
        .then(result => {
            if (result.success) {
                if (result.filePath) {
                    showToast(`备份成功！文件路径: ${result.filePath}`);
                } else {
                    showToast('数据备份成功！');
                }
            }
        })
        .catch(error => {
            showToast('备份失败: ' + error.message, true);
            console.error('备份错误:', error);
        });
}
