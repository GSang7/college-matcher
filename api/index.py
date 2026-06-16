from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')

def load_colleges():
    with open(os.path.join(DATA_DIR, 'colleges.json'), 'r', encoding='utf-8') as f:
        return json.load(f)

def load_majors():
    with open(os.path.join(DATA_DIR, 'majors.json'), 'r', encoding='utf-8') as f:
        return json.load(f)

MBTI_COMPATIBILITY = {
    'INTJ': ['计算机科学', '数学', '物理学', '经济学', '金融学', '建筑学', '哲学', '法学'],
    'INTP': ['计算机科学', '数学', '物理学', '哲学', '语言学', '经济学', '心理学'],
    'ENTJ': ['工商管理', '法学', '经济学', '金融学', '国际关系', '公共管理', '政治学'],
    'ENTP': ['创业学', '市场营销', '传播学', '法学', '经济学', '心理学', '设计学'],
    'INFJ': ['心理学', '教育学', '哲学', '文学', '社会学', '人类学', '艺术学'],
    'INFP': ['文学', '艺术学', '心理学', '哲学', '社会学', '音乐学', '历史学'],
    'ENFJ': ['教育学', '心理学', '社会工作', '人力资源', '传播学', '公共管理', '医学'],
    'ENFP': ['传播学', '心理学', '艺术学', '市场营销', '旅游管理', '教育学', '社会学'],
    'ISTJ': ['会计学', '审计学', '工程管理', '档案学', '图书馆学', '护理学', '药学'],
    'ISFJ': ['护理学', '教育学', '社会工作', '图书档案学', '会计学', '药学', '历史学'],
    'ESTJ': ['工商管理', '会计学', '工程管理', '公共管理', '法学', '军事学', '护理学'],
    'ESFJ': ['教育学', '护理学', '社会工作', '人力资源', '旅游管理', '传播学', '艺术学'],
    'ISTP': ['机械工程', '电子工程', '计算机科学', '土木工程', '刑侦学', '体育学', '地理学'],
    'ISFP': ['艺术学', '设计学', '音乐学', '护理学', '园艺学', '心理学', '社会工作'],
    'ESTP': ['市场营销', '体育学', '传播学', '创业学', '法学', '旅游管理', '表演'],
    'ESFP': ['表演', '传播学', '旅游管理', '市场营销', '设计学', '音乐学', '体育学'],
}

HOLLAND_COMPATIBILITY = {
    'R': ['机械工程', '电子工程', '土木工程', '计算机科学', '建筑学', '航空航天', '自动化'],
    'I': ['物理学', '数学', '化学', '生物学', '医学', '天文学', '地理学'],
    'A': ['艺术学', '设计学', '音乐学', '戏剧影视', '美术学', '动画', '摄影'],
    'S': ['教育学', '心理学', '社会工作', '护理学', '医学', '法学', '公共管理'],
    'E': ['工商管理', '市场营销', '国际经济', '金融学', '法学', '传播学', '旅游管理'],
    'C': ['会计学', '审计学', '财务管理', '统计学', '图书馆学', '档案学', '信息管理'],
}

SCORE_TIERS = {
    'top': {'name': '顶尖高校', 'min': 680, 'description': '985顶尖高校及特色211'},
    'high': {'name': '重点高校', 'min': 620, 'description': '985及强势211高校'},
    'medium': {'name': '优质高校', 'min': 550, 'description': '普通211及强势双非'},
    'standard': {'name': '普通高校', 'min': 480, 'description': '普通本科院校'},
    'base': {'name': '基础高校', 'min': 0, 'description': '普通本科及专科院校'}
}

@app.route('/api/mbti-questions')
def get_mbti_questions():
    questions = [
        {'id': 1, 'text': '你更喜欢', 'options': ['独处并专注于自己的想法(E-I)', '与他人互动并获得能量(I-E)']},
        {'id': 2, 'text': '你更关注', 'options': ['具体细节和实际经验(S-N)', '整体概念和理论可能性(N-S)']},
        {'id': 3, 'text': '你做决定时更依赖', 'options': ['逻辑和客观分析(T-F)', '个人价值观和情感(F-T)']},
        {'id': 4, 'text': '你更喜欢', 'options': ['有计划有条理的生活(J-P)', '灵活随性的生活(P-J)']},
        {'id': 5, 'text': '在社交场合中，你通常', 'options': ['主动与人交流，感到精力充沛', '保持安静，观察他人']},
        {'id': 6, 'text': '处理信息时，你更倾向于', 'options': ['关注事实和具体细节', '关注背后的含义和联系']},
        {'id': 7, 'text': '与人争论时，你更看重', 'options': ['公正和逻辑', '和谐与理解']},
        {'id': 8, 'text': '对于截止日期，你通常', 'options': ['提前完成，有条不紊', '临近截止才匆忙完成']},
        {'id': 9, 'text': '你的精力来源是', 'options': ['热闹的聚会和活动', '安静的独处时光']},
        {'id': 10, 'text': '学习新知识时，你更喜欢', 'options': ['动手实践和实验', '阅读理论和概念']},
        {'id': 11, 'text': '在团队中，你更倾向于', 'options': ['分析问题，寻找最佳方案', '协调关系，促进合作']},
        {'id': 12, 'text': '周末你更想', 'options': ['按照计划完成任务', '随心所欲地度过']},
        {'id': 13, 'text': '别人通常认为你是', 'options': ['外向友好的', '安静内敛的']},
        {'id': 14, 'text': '你更信任', 'options': ['经过验证的经验', '直觉和灵感']},
        {'id': 15, 'text': '面对冲突时，你倾向于', 'options': ['直接指出问题', '避免正面对抗']},
        {'id': 16, 'text': '你的生活空间通常是', 'options': ['整洁有序的', '随意摆放的']},
    ]
    return jsonify(questions)

@app.route('/api/holland-questions')
def get_holland_questions():
    questions = [
        {'id': 1, 'text': '你喜欢使用工具和机器', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'R'},
        {'id': 2, 'text': '你喜欢研究科学问题', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'I'},
        {'id': 3, 'text': '你喜欢艺术创作活动', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'A'},
        {'id': 4, 'text': '你喜欢帮助他人解决问题', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'S'},
        {'id': 5, 'text': '你喜欢领导和管理', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'E'},
        {'id': 6, 'text': '你喜欢处理数据和文件', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'C'},
        {'id': 7, 'text': '你喜欢户外运动和体力活动', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'R'},
        {'id': 8, 'text': '你喜欢探索抽象概念', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'I'},
        {'id': 9, 'text': '你喜欢音乐、绘画或写作', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'A'},
        {'id': 10, 'text': '你喜欢教学和培训', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'S'},
        {'id': 11, 'text': '你喜欢推销产品或想法', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'E'},
        {'id': 12, 'text': '你喜欢按规则和程序工作', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'C'},
        {'id': 13, 'text': '你喜欢修理和组装东西', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'R'},
        {'id': 14, 'text': '你喜欢做实验和分析数据', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'I'},
        {'id': 15, 'text': '你喜欢设计和创造', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'A'},
        {'id': 16, 'text': '你喜欢照顾和关怀他人', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'S'},
        {'id': 17, 'text': '你喜欢组织和影响他人', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'E'},
        {'id': 18, 'text': '你喜欢精确和系统的工作', 'options': ['非常同意', '同意', '一般', '不同意', '非常不同意'], 'type': 'C'},
    ]
    return jsonify(questions)

@app.route('/api/recommend', methods=['POST'])
def recommend():
    data = request.json
    score = int(data.get('score', 0))
    province = data.get('province', '')
    mbti = data.get('mbti', '')
    holland = data.get('holland', '')
    preferences = data.get('preferences', {})
    
    colleges = load_colleges()
    
    matching_majors = set()
    
    if mbti and mbti in MBTI_COMPATIBILITY:
        matching_majors.update(MBTI_COMPATIBILITY[mbti])
    
    if holland:
        for code in holland:
            if code in HOLLAND_COMPATIBILITY:
                matching_majors.update(HOLLAND_COMPATIBILITY[code])
    
    def get_score_tier(s):
        if s >= SCORE_TIERS['top']['min']:
            return 'top'
        elif s >= SCORE_TIERS['high']['min']:
            return 'high'
        elif s >= SCORE_TIERS['medium']['min']:
            return 'medium'
        elif s >= SCORE_TIERS['standard']['min']:
            return 'standard'
        return 'base'
    
    def calculate_match_score(college, major_name):
        match_score = 0
        
        if major_name in matching_majors:
            match_score += 50
        
        if score >= college.get('min_score', 0):
            score_fit = min((score - college.get('min_score', 0)) / 50, 1) * 30
            match_score += score_fit
        
        if preferences.get('location') and college.get('city') == preferences['location']:
            match_score += 10
        
        if preferences.get('campus_env') and college.get('campus_rating', 0) >= 4:
            match_score += 5
        
        if preferences.get('canteen') and college.get('canteen_rating', 0) >= 4:
            match_score += 5
        
        return match_score
    
    results = []
    user_tier = get_score_tier(score)
    
    for college in colleges:
        college_tier = get_score_tier(college.get('min_score', 0))
        
        if score < college.get('min_score', 0) - 30:
            continue
        
        for major in college.get('majors', []):
            major_name = major.get('name', '')
            
            if matching_majors and major_name not in matching_majors:
                if len(results) < 50:
                    continue
            
            match_score = calculate_match_score(college, major_name)
            
            if match_score > 0:
                results.append({
                    'college': college['name'],
                    'college_type': college.get('type', ''),
                    'city': college.get('city', ''),
                    'province': college.get('province', ''),
                    'major': major_name,
                    'major_category': major.get('category', ''),
                    'min_score': college.get('min_score', 0),
                    'match_score': round(match_score, 1),
                    'tier': college_tier,
                    'campus_rating': college.get('campus_rating', 0),
                    'canteen_rating': college.get('canteen_rating', 0),
                    'dorm_rating': college.get('dorm_rating', 0),
                    'tags': college.get('tags', []),
                })
    
    results.sort(key=lambda x: (-x['match_score'], -x['min_score']))
    
    tier_results = {}
    for tier_key, tier_info in SCORE_TIERS.items():
        tier_colleges = [r for r in results if r['tier'] == tier_key]
        if tier_colleges:
            tier_results[tier_key] = {
                'name': tier_info['name'],
                'description': tier_info['description'],
                'recommendations': tier_colleges[:10]
            }
    
    return jsonify({
        'total': len(results),
        'tiers': tier_results,
        'matching_majors': list(matching_majors)[:20],
        'user_tier': user_tier,
        'user_tier_name': SCORE_TIERS[user_tier]['name']
    })

@app.route('/api/provinces')
def get_provinces():
    provinces = [
        '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
        '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
        '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
        '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'
    ]
    return jsonify(provinces)
