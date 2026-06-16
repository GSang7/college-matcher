# Vercel 部署指南

## 第一步：注册GitHub账号

1. 访问 https://github.com 注册账号
2. 登录后点击右上角 + → New repository
3. 仓库名填写：`college-matcher`
4. 选择 Public
5. 点击 Create repository

## 第二步：上传代码到GitHub

### 方法1：使用GitHub网页上传（最简单）

1. 在你的仓库页面，点击 "uploading an existing file"
2. 把整个 `college-matcher` 文件夹里的所有文件拖进去
3. 点击 Commit changes

### 方法2：使用Git命令

```bash
cd college-matcher
git init
git add .
git commit -m "初始化项目"
git remote add origin https://github.com/你的用户名/college-matcher.git
git push -u origin main
```

## 第三步：注册Vercel账号

1. 访问 https://vercel.com
2. 点击 "Sign Up"
3. 选择 "Continue with GitHub"（用GitHub账号登录）
4. 授权Vercel访问你的GitHub

## 第四步：导入项目

1. 登录Vercel后，点击 "Add New..." → "Project"
2. 在 Import Git Repository 下找到 `college-matcher`
3. 点击 "Import"
4. 保持默认设置，点击 "Deploy"
5. 等待1-2分钟部署完成

## 第五步：访问网站

1. 部署完成后，Vercel会给你一个URL
2. 格式：`https://college-matcher-你的用户名.vercel.app`
3. 点击链接即可访问！

## 第六步：自定义域名（可选）

1. 在Vercel项目设置中，点击 "Domains"
2. 输入你想用的域名
3. 按照提示配置DNS

---

## 常见问题

### Q: 部署失败怎么办？
A: 检查文件结构是否正确：
```
college-matcher/
├── api/
│   └── index.py
├── data/
│   ├── colleges.json
│   └── majors.json
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── index.html
├── vercel.json
└── requirements.txt
```

### Q: API调用失败？
A: 确保 `api/index.py` 文件存在且正确

### Q: 如何更新网站？
A: 修改代码后推送到GitHub，Vercel会自动重新部署

### Q: 免费版有什么限制？
A: Vercel免费版包含：
- 100GB带宽/月
- 无限静态网站
- Serverless Functions
- 自动HTTPS

---

## 完整文件结构

```
college-matcher/
├── api/
│   └── index.py          # Serverless API
├── data/
│   ├── colleges.json     # 大学数据
│   └── majors.json       # 专业数据
├── static/
│   ├── css/
│   │   └── style.css     # 样式文件
│   └── js/
│       └── app.js        # 前端逻辑
├── index.html            # 主页面
├── vercel.json           # Vercel配置
├── requirements.txt      # Python依赖
└── README.md             # 说明文档
```
