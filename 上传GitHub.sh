#!/bin/bash
echo "========================================"
echo "  上传代码到GitHub"
echo "========================================"
echo ""

# 检查git是否安装
if ! command -v git &> /dev/null; then
    echo "错误：请先安装Git"
    echo "Mac: xcode-select --install"
    echo "Linux: sudo apt install git"
    exit 1
fi

# 初始化Git仓库
echo "正在初始化Git仓库..."
git init
git add .
git commit -m "初始化高考志愿匹配系统"

echo ""
echo "========================================"
echo "  请先在GitHub创建仓库"
echo "========================================"
echo ""
echo "1. 访问 https://github.com/new"
echo "2. 仓库名填写：college-matcher"
echo "3. 选择 Public"
echo "4. 点击 Create repository"
echo ""
echo "然后输入你的GitHub用户名："
read -p "用户名：" username

echo ""
echo "正在连接GitHub..."
git remote add origin "https://github.com/$username/college-matcher.git"
git branch -M main
git push -u origin main

echo ""
echo "========================================"
echo "  上传完成！"
echo "========================================"
echo ""
echo "下一步："
echo "1. 访问 https://vercel.com"
echo "2. 用GitHub账号登录"
echo "3. 导入 college-matcher 项目"
echo "4. 点击 Deploy"
