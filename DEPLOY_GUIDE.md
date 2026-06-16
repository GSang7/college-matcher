# Python Anywhere 部署指南

## 第一步：注册账号

1. 访问 https://www.pythonanywhere.com
2. 点击 "Pricing & Sign up"
3. 选择 **Beginner** (免费)
4. 注册账号（需要邮箱）

## 第二步：上传代码

### 方法1：直接上传ZIP（推荐）

1. 登录后点击 **Dashboard**
2. 点击 **Files** 标签
3. 点击 **Upload a file**
4. 先把整个 `college-matcher` 文件夹压缩成 ZIP
5. 上传 ZIP 文件
6. 右键点击 ZIP 文件 → **Open terminal here**
7. 输入命令解压：
```bash
unzip college-matcher.zip
mv college-matcher/* .
rm -rf college-matcher college-matcher.zip
```

### 方法2：使用 Git

1. 先把代码推送到 GitHub
2. 在 Files 页面点击 **Clone your repo**
3. 输入你的 GitHub 仓库地址

## 第三步：配置 Web 应用

1. 点击 **Web** 标签
2. 点击 **Add a new web app**
3. 选择 **Manual configuration**
4. 选择 **Python 3.10**（或其他版本）
5. 设置路径为 `/home/你的用户名/college-matcher/flask_app.py`

## 第四步：安装依赖

1. 在 Web 页面点击 **WSGI configuration file** 链接
2. 修改文件内容为：

```python
import sys
project_home = '/home/你的用户名/college-matcher'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

from flask_app import app as application
```

3. 保存文件

4. 回到 **Web** 页面，点击 **Virtualenv** 部分
5. 创建新的虚拟环境或使用已有

6. 在 **Static files** 部分添加：
   - URL: `/static/`
   - Directory: `/home/你的用户名/college-matcher/static`

## 第五步：设置 API（可选）

在 **Web** 页面的 **Python packages** 部分，添加：
- flask

## 第六步：重启应用

1. 点击 **Web** 页面的绿色 **Reload** 按钮
2. 等待几秒

## 第七步：访问网站

1. 在 **Web** 页面顶部可以看到你的 URL
2. 格式：`https://你的用户名.pythonanywhere.com`
3. 点击链接即可访问！

---

## 常见问题

### Q: 出现 500 错误怎么办？
A: 检查 WSGI 文件路径是否正确，确保文件名是 `flask_app.py`

### Q: 静态文件加载失败？
A: 检查 Static files 配置，路径必须包含 `/home/你的用户名/college-matcher/static`

### Q: 如何更新代码？
A: 在 Files 页面直接编辑，或上传新的 ZIP 重新解压

### Q: 免费版有什么限制？
A: 每天有 100 秒 CPU 时间限制，足够正常使用

---

## 快速测试（本地）

部署前先在本地测试：

```bash
cd college-matcher
pip install flask
python flask_app.py
```

访问 http://localhost:5000 测试
