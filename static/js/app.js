const MBTI_COMPATIBILITY = {"INTJ":["计算机科学","数学","物理学","经济学","金融学","建筑学","哲学","法学"],"INTP":["计算机科学","数学","物理学","哲学","语言学","经济学","心理学"],"ENTJ":["工商管理","法学","经济学","金融学","国际关系","公共管理","政治学"],"ENTP":["创业学","市场营销","传播学","法学","经济学","心理学","设计学"],"INFJ":["心理学","教育学","哲学","文学","社会学","人类学","艺术学"],"INFP":["文学","艺术学","心理学","哲学","社会学","音乐学","历史学"],"ENFJ":["教育学","心理学","社会工作","人力资源","传播学","公共管理","医学"],"ENFP":["传播学","心理学","艺术学","市场营销","旅游管理","教育学","社会学"],"ISTJ":["会计学","审计学","工程管理","档案学","图书馆学","护理学","药学"],"ISFJ":["护理学","教育学","社会工作","图书档案学","会计学","药学","历史学"],"ESTJ":["工商管理","会计学","工程管理","公共管理","法学","军事学","护理学"],"ESFJ":["教育学","护理学","社会工作","人力资源","旅游管理","传播学","艺术学"],"ISTP":["机械工程","电子工程","计算机科学","土木工程","刑侦学","体育学","地理学"],"ISFP":["艺术学","设计学","音乐学","护理学","园艺学","心理学","社会工作"],"ESTP":["市场营销","体育学","传播学","创业学","法学","旅游管理","表演"],"ESFP":["表演","传播学","旅游管理","市场营销","设计学","音乐学","体育学"]};
const HOLLAND_COMPATIBILITY = {"R":["机械工程","电子工程","土木工程","计算机科学","建筑学","航空航天","自动化"],"I":["物理学","数学","化学","生物学","医学","天文学","地理学"],"A":["艺术学","设计学","音乐学","戏剧影视","美术学","动画","摄影"],"S":["教育学","心理学","社会工作","护理学","医学","法学","公共管理"],"E":["工商管理","市场营销","国际经济","金融学","法学","传播学","旅游管理"],"C":["会计学","审计学","财务管理","统计学","图书馆学","档案学","信息管理"]};
const PROVINCES = [{name:"北京",id:"beijing"},{name:"天津",id:"tianjin"},{name:"河北",id:"hebei"},{name:"山西",id:"shanxi"},{name:"内蒙古",id:"neimenggu"},{name:"辽宁",id:"liaoning"},{name:"吉林",id:"jilin"},{name:"黑龙江",id:"heilongjiang"},{name:"上海",id:"shanghai"},{name:"江苏",id:"jiangsu"},{name:"浙江",id:"zhejiang"},{name:"安徽",id:"anhui"},{name:"福建",id:"fujian"},{name:"江西",id:"jiangxi"},{name:"山东",id:"shandong"},{name:"河南",id:"henan"},{name:"湖北",id:"hubei"},{name:"湖南",id:"hunan"},{name:"广东",id:"guangdong"},{name:"广西",id:"guangxi"},{name:"海南",id:"hainan"},{name:"重庆",id:"chongqing"},{name:"四川",id:"sichuan"},{name:"贵州",id:"guizhou"},{name:"云南",id:"yunnan"},{name:"西藏",id:"xizang"},{name:"陕西",id:"shaanxi"},{name:"甘肃",id:"gansu"},{name:"青海",id:"qinghai"},{name:"宁夏",id:"ningxia"},{name:"新疆",id:"xinjiang"}];
const SCORE_TIERS = {"top":{"name":"顶尖高校","min":680,"description":"985顶尖高校","color":"#ff4757"},"high":{"name":"重点高校","min":620,"description":"985及强势211","color":"#ffa502"},"medium":{"name":"优质高校","min":550,"description":"普通211及强势双非","color":"#2ed573"},"standard":{"name":"普通高校","min":480,"description":"普通本科院校","color":"#1e90ff"},"base":{"name":"基础高校","min":0,"description":"普通本科及专科","color":"#a55eea"}};
const MBTI_QUESTIONS = [{"id":1,"text":"你更喜欢","options":["独处并专注于自己的想法","与他人互动并获得能量"]},{"id":2,"text":"你更关注","options":["具体细节和实际经验","整体概念和理论可能性"]},{"id":3,"text":"你做决定时更依赖","options":["逻辑和客观分析","个人价值观和情感"]},{"id":4,"text":"你更喜欢","options":["有计划有条理的生活","灵活随性的生活"]},{"id":5,"text":"在社交场合中，你通常","options":["主动与人交流，感到精力充沛","保持安静，观察他人"]},{"id":6,"text":"处理信息时，你更倾向于","options":["关注事实和具体细节","关注背后的含义和联系"]},{"id":7,"text":"与人争论时，你更看重","options":["公正和逻辑","和谐与理解"]},{"id":8,"text":"对于截止日期，你通常","options":["提前完成，有条不紊","临近截止才匆忙完成"]},{"id":9,"text":"你的精力来源是","options":["热闹的聚会和活动","安静的独处时光"]},{"id":10,"text":"学习新知识时，你更喜欢","options":["动手实践和实验","阅读理论和概念"]},{"id":11,"text":"在团队中，你更倾向于","options":["分析问题，寻找最佳方案","协调关系，促进合作"]},{"id":12,"text":"周末你更想","options":["按照计划完成任务","随心所欲地度过"]},{"id":13,"text":"别人通常认为你是","options":["外向友好的","安静内敛的"]},{"id":14,"text":"你更信任","options":["经过验证的经验","直觉和灵感"]},{"id":15,"text":"面对冲突时，你倾向于","options":["直接指出问题","避免正面对抗"]},{"id":16,"text":"你的生活空间通常是","options":["整洁有序的","随意摆放的"]}];
const HOLLAND_QUESTIONS = [{"id":1,"text":"你喜欢使用工具和机器","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"R"},{"id":2,"text":"你喜欢研究科学问题","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"I"},{"id":3,"text":"你喜欢艺术创作活动","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"A"},{"id":4,"text":"你喜欢帮助他人解决问题","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"S"},{"id":5,"text":"你喜欢领导和管理","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"E"},{"id":6,"text":"你喜欢处理数据和文件","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"C"},{"id":7,"text":"你喜欢户外运动和体力活动","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"R"},{"id":8,"text":"你喜欢探索抽象概念","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"I"},{"id":9,"text":"你喜欢音乐、绘画或写作","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"A"},{"id":10,"text":"你喜欢教学和培训","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"S"},{"id":11,"text":"你喜欢推销产品或想法","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"E"},{"id":12,"text":"你喜欢按规则和程序工作","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"C"},{"id":13,"text":"你喜欢修理和组装东西","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"R"},{"id":14,"text":"你喜欢做实验和分析数据","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"I"},{"id":15,"text":"你喜欢设计和创造","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"A"},{"id":16,"text":"你喜欢照顾和关怀他人","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"S"},{"id":17,"text":"你喜欢组织和影响他人","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"E"},{"id":18,"text":"你喜欢精确和系统的工作","options":["非常同意","同意","一般","不同意","非常不同意"],"type":"C"}];

let currentStep = 1, mbtiAnswers = {}, hollandAnswers = {}, mbtiResult = '', hollandResult = '', userProvince = '', userSubject = '';

document.addEventListener('DOMContentLoaded', () => {
    const provinceSelect = document.getElementById('province');
    const prefLocation = document.getElementById('pref-location');
    PROVINCES.forEach(p => {
        provinceSelect.innerHTML += `<option value="${p.id}">${p.name}</option>`;
        prefLocation.innerHTML += `<option value="${p.name}">${p.name}</option>`;
    });
    const mbtiContainer = document.getElementById('mbti-questions');
    MBTI_QUESTIONS.forEach(q => {
        mbtiContainer.innerHTML += `<div class="question-card"><h3>${q.id}. ${q.text}</h3><div class="options">${q.options.map((o,i) => `<button class="option-btn" onclick="selectMBTI(${q.id},${i})">${o}</button>`).join('')}</div></div>`;
    });
    const hollandContainer = document.getElementById('holland-questions');
    HOLLAND_QUESTIONS.forEach(q => {
        hollandContainer.innerHTML += `<div class="question-card"><h3>${q.id}. ${q.text}</h3><div class="options">${q.options.map((o,i) => `<button class="option-btn" onclick="selectHolland(${q.id},${i},'${q.type}')">${o}</button>`).join('')}</div></div>`;
    });
});

function selectMBTI(id, idx) { mbtiAnswers[id] = idx; document.querySelectorAll(`#mbti-questions .question-card:nth-child(${id}) .option-btn`).forEach((b,i) => b.classList.toggle('selected', i === idx)); }
function selectHolland(id, idx, type) { hollandAnswers[id] = {index: idx, type}; document.querySelectorAll(`#holland-questions .question-card:nth-child(${id}) .option-btn`).forEach((b,i) => b.classList.toggle('selected', i === idx)); }

function calculateMBTI() {
    let ei=0,sn=0,tf=0,jp=0;
    [1,5,9,13].forEach(q => { if(mbtiAnswers[q]===0) ei++; else if(mbtiAnswers[q]===1) ei--; });
    [2,6,10,14].forEach(q => { if(mbtiAnswers[q]===0) sn++; else if(mbtiAnswers[q]===1) sn--; });
    [3,7,11,15].forEach(q => { if(mbtiAnswers[q]===0) tf++; else if(mbtiAnswers[q]===1) tf--; });
    [4,8,12,16].forEach(q => { if(mbtiAnswers[q]===0) jp++; else if(mbtiAnswers[q]===1) jp--; });
    mbtiResult = (ei>=0?'E':'I')+(sn>=0?'S':'N')+(tf>=0?'T':'F')+(jp>=0?'J':'P');
}

function calculateHolland() {
    const c = {R:0,I:0,A:0,S:0,E:0,C:0};
    Object.values(hollandAnswers).forEach(a => c[a.type] += (4 - a.index));
    hollandResult = Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,3).map(e=>e[0]).join('');
}

function nextStep(step) {
    if(step===2) {
        const score=document.getElementById('score').value;
        const province=document.getElementById('province').value;
        const subject=document.getElementById('subject').value;
        if(!score||score<0||score>750) return alert('请输入有效的高考分数（0-750）');
        if(!province) return alert('请选择所在省份');
        if(!subject) return alert('请选择文科或理科');
        userProvince = province;
        userSubject = subject;
    }
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    currentStep = step;
}

function prevStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.remove('completed');
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    currentStep = step;
}

function estimateRank(score, provinceId) {
    const rankMap = {
        'beijing': [69, 75, 80, 85, 90], 'shanghai': [50, 55, 60, 65, 70],
        'guangdong': [23, 28, 30, 35, 40], 'zhejiang': [10, 12, 15, 18, 20],
        'jiangsu': [3000, 3200, 3500, 3800, 4000], 'shandong': [7000, 7200, 7400, 7600, 7800],
        'henan': [2800, 2900, 3000, 3100, 3200], 'sichuan': [2000, 2100, 2200, 2300, 2400],
        'hubei': [1500, 1600, 1700, 1800, 1900], 'hunan': [1200, 1300, 1400, 1500, 1600],
        'fujian': [1800, 1900, 2000, 2100, 2200], 'anhui': [1000, 1100, 1200, 1300, 1400],
        'shaanxi': [1800, 1900, 2000, 2100, 2200], 'chongqing': [2200, 2300, 2400, 2500, 2600],
        'liaoning': [4000, 4100, 4200, 4300, 4400], 'heilongjiang': [2000, 2100, 2200, 2300, 2400],
        'tianjin': [1800, 1900, 2000, 2100, 2200], 'hebei': [5000, 5100, 5200, 5300, 5400],
        'shanxi': [3000, 3100, 3200, 3300, 3400], 'gansu': [2000, 2100, 2200, 2300, 2400],
        'guangxi': [3000, 3100, 3200, 3300, 3400], 'guizhou': [2000, 2100, 2200, 2300, 2400],
        'yunnan': [2000, 2100, 2200, 2300, 2400], 'jiangxi': [3000, 3100, 3200, 3300, 3400],
        'neimenggu': [1000, 1100, 1200, 1300, 1400], 'jilin': [2000, 2100, 2200, 2300, 2400],
        'hainan': [1000, 1100, 1200, 1300, 1400], 'xizang': [500, 550, 600, 650, 700],
        'qinghai': [500, 550, 600, 650, 700], 'ningxia': [500, 550, 600, 650, 700],
        'xinjiang': [1000, 1100, 1200, 1300, 1400]
    };
    const ranks = rankMap[provinceId] || [1000, 1100, 1200, 1300, 1400];
    return Math.round(ranks[0] + (700 - score) * 15);
}

function submitRecommendation() {
    const score = parseInt(document.getElementById('score').value);
    const rank = estimateRank(score, userProvince);
    const preferences = {
        location: document.getElementById('pref-location').value,
        campus_env: document.getElementById('pref-campus').checked,
        canteen: document.getElementById('pref-canteen').checked,
        dorm: document.getElementById('pref-dorm').checked
    };
    const matchingMajors = new Set();
    if(mbtiResult && MBTI_COMPATIBILITY[mbtiResult]) MBTI_COMPATIBILITY[mbtiResult].forEach(m => matchingMajors.add(m));
    if(hollandResult) hollandResult.split('').forEach(c => { if(HOLLAND_COMPATIBILITY[c]) HOLLAND_COMPATIBILITY[c].forEach(m => matchingMajors.add(m)); });
    const getTier = s => s>=680?'top':s>=620?'high':s>=550?'medium':s>=480?'standard':'base';
    
    Promise.all([
        fetch('static/data/colleges_full.json').then(r => r.json()),
        fetch('static/data/universities_211.json').then(r => r.json())
    ]).then(([colleges985, colleges211]) => {
        const COLLEGES = [...colleges985, ...colleges211];
            const results = [];
            COLLEGES.forEach(college => {
                const minScore = userSubject === '理科' ? (college['min_score理科'] || college.min_score) : (college['min_score文科'] || college.min_score);
                if(!minScore || score < minScore - 30) return;
                const majors = userSubject === '理科' ? college.majors理科 : college.majors文科;
                if(!majors || majors.length === 0) return;
                majors.forEach(major => {
                    if(matchingMajors.size > 0 && !matchingMajors.has(major)) return;
                    let ms = 0;
                    if(matchingMajors.has(major)) ms += 50;
                    if(score >= minScore) ms += Math.min((score-minScore)/50,1)*30;
                    if(preferences.location && college.city === preferences.location) ms += 10;
                    if(preferences.campus_env && college.campus_rating >= 4) ms += 5;
                    if(preferences.canteen && college.canteen_rating >= 4) ms += 5;
                    if(ms > 0) {
                        results.push({
                            college: college.name, type: college.type, tier: college.tier,
                            city: college.city, major: major, min_score: minScore,
                            match_score: Math.round(ms*10)/10, campus: college.campus_rating,
                            canteen: college.canteen_rating, dorm: college.dorm_rating,
                            tags: college.tags, reputation: college.reputation
                        });
                    }
                });
            });
            results.sort((a,b) => b.match_score-a.match_score || b.reputation-a.reputation);
            const tierResults = {};
            Object.keys(SCORE_TIERS).forEach(k => {
                const items = results.filter(r => getTier(r.min_score) === k).slice(0,8);
                if(items.length) tierResults[k] = {...SCORE_TIERS[k], recommendations: items};
            });
            displayResults({total: results.length, tiers: tierResults, matchingMajors: [...matchingMajors].slice(0,15), userTier: getTier(score), userTierName: SCORE_TIERS[getTier(score)].name, score: score, rank: rank});
            nextStep(5);
        });
}

function displayResults(result) {
    const provinceName = PROVINCES.find(p => p.id === userProvince)?.name || userProvince;
    const subjectName = userSubject === '理科' ? '理科' : '文科';
    document.getElementById('result-summary').innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
            <div>
                <h3 style="margin-bottom:8px">${mbtiResult||'未测评'} · ${hollandResult||'未测评'}</h3>
                <p style="opacity:0.9">${subjectName} | 分数段: ${result.userTierName} | 共匹配 ${result.total} 个推荐</p>
            </div>
            <div style="text-align:right">
                <div style="font-size:2rem;font-weight:700">${result.score}</div>
                <div style="font-size:0.85rem;opacity:0.8">预估位次: 约${result.rank.toLocaleString()} (${provinceName})</div>
            </div>
        </div>
        <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.1);border-radius:12px">
            <div style="font-size:0.85rem;color:rgba(255,255,255,0.7);margin-bottom:8px">历年等效位次换算 (以${provinceName}${subjectName}为例)</div>
            <div style="display:flex;gap:24px;flex-wrap:wrap">
                <div><span style="opacity:0.7">2024</span> <strong>${result.rank.toLocaleString()}</strong></div>
                <div><span style="opacity:0.7">2023</span> <strong>${(result.rank*0.98).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong></div>
                <div><span style="opacity:0.7">2022</span> <strong>${(result.rank*0.96).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong></div>
                <div><span style="opacity:0.7">2021</span> <strong>${(result.rank*0.94).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong></div>
            </div>
        </div>
    `;
    if(result.matchingMajors.length) document.getElementById('matching-majors').innerHTML = `<h3 style="margin-bottom:12px">匹配专业方向</h3><div class="major-tags">${result.matchingMajors.map(m=>`<span class="major-tag">${m}</span>`).join('')}</div>`;
    const container = document.getElementById('recommendations');
    container.innerHTML = '';
    ['top','high','medium','standard','base'].forEach(k => {
        if(result.tiers[k]) {
            const t = result.tiers[k];
            container.innerHTML += `
                <div class="tier-section">
                    <div class="tier-header">
                        <span class="tier-badge ${k}">${t.name}</span>
                        <span class="tier-title">${t.description}</span>
                    </div>
                    ${t.recommendations.map(r => `
                        <div class="recommendation-card">
                            <div class="rec-info">
                                <h4>${r.college}</h4>
                                <div class="rec-meta">
                                    <span>📍${r.city}</span>
                                    <span>📚${r.major}</span>
                                    <span>最低分:${r.min_score}</span>
                                    <span>口碑:${r.reputation}</span>
                                </div>
                                <div class="rec-tags">
                                    ${r.tags.map(t=>`<span class="rec-tag">${t}</span>`).join('')}
                                    <span class="rec-tag">${r.type}</span>
                                </div>
                                <div class="ratings">
                                    <span class="rating">校园${'★'.repeat(r.campus)}${'☆'.repeat(5-r.campus)}</span>
                                    <span class="rating">食堂${'★'.repeat(r.canteen)}${'☆'.repeat(5-r.canteen)}</span>
                                    <span class="rating">宿舍${'★'.repeat(r.dorm)}${'☆'.repeat(5-r.dorm)}</span>
                                </div>
                            </div>
                            <div class="rec-score">
                                <div class="match-score">${r.match_score}</div>
                                <div class="match-label">匹配度</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    });
    if(!Object.keys(result.tiers).length) container.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.5);padding:40px;">暂无匹配推荐，请调整分数或偏好</p>';
}
