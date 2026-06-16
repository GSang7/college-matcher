#!/bin/bash
echo "========================================"
echo "  高考志愿匹配系统 - 打包工具"
echo "========================================"
echo ""

# 压缩整个项目
echo "正在打包项目文件..."
zip -r college-matcher.zip . -x "*.git*" "__pycache__/*" "*.pyc"

echo ""
echo "========================================"
echo "  打包完成！"
echo "========================================"
echo ""
echo "文件已保存为: college-matcher.zip"
echo ""
echo "上传步骤："
echo "1. 登录 pythonanywhere.com"
echo "2. 点击 Files 标签"
echo "3. 点击 Upload a file"
echo "4. 选择 college-matcher.zip 上传"
echo "5. 解压后按照 DEPLOY_GUIDE.md 部署"
echo ""
