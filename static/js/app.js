let currentStep = 1;
let mbtiAnswers = {};
let hollandAnswers = {};
let mbtiResult = '';
let hollandResult = '';

document.addEventListener('DOMContentLoaded', async () => {
    await loadProvinces();
    await loadMBTIQuestions();
    await loadHollandQuestions();
});

async function loadProvinces() {
    const response = await fetch('/api/provinces');
    const provinces = await response.json();
    const select = document.getElementById('province');
    const prefLocation = document.getElementById('pref-location');
    
    provinces.forEach(province => {
        const option1 = document.createElement('option');
        option1.value = province;
        option1.textContent = province;
        select.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = province;
        option2.textContent = province;
        prefLocation.appendChild(option2);
    });
}

async function loadMBTIQuestions() {
    const response = await fetch('/api/mbti-questions');
    const questions = await response.json();
    const container = document.getElementById('mbti-questions');
    
    questions.forEach(q => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <h3>${q.id}. ${q.text}</h3>
            <div class="options">
                ${q.options.map((opt, idx) => `
                    <button class="option-btn" onclick="selectMBTI(${q.id}, ${idx}, '${opt}')">${opt}</button>
                `).join('')}
            </div>
        `;
        container.appendChild(card);
    });
}

async function loadHollandQuestions() {
    const response = await fetch('/api/holland-questions');
    const questions = await response.json();
    const container = document.getElementById('holland-questions');
    
    questions.forEach(q => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <h3>${q.id}. ${q.text}</h3>
            <div class="options">
                ${q.options.map((opt, idx) => `
                    <button class="option-btn" onclick="selectHolland(${q.id}, ${idx}, '${q.type}')">${opt}</button>
                `).join('')}
            </div>
        `;
        container.appendChild(card);
    });
}

function selectMBTI(questionId, optionIndex, optionText) {
    mbtiAnswers[questionId] = optionIndex;
    
    const card = document.querySelector(`#mbti-questions .question-card:nth-child(${questionId})`);
    card.querySelectorAll('.option-btn').forEach((btn, idx) => {
        btn.classList.toggle('selected', idx === optionIndex);
    });
}

function selectHolland(questionId, optionIndex, type) {
    hollandAnswers[questionId] = { index: optionIndex, type: type };
    
    const card = document.querySelector(`#holland-questions .question-card:nth-child(${questionId})`);
    card.querySelectorAll('.option-btn').forEach((btn, idx) => {
        btn.classList.toggle('selected', idx === optionIndex);
    });
}

function calculateMBTI() {
    let ei = 0, sn = 0, tf = 0, jp = 0;
    
    const eiQuestions = [1, 5, 9, 13];
    const snQuestions = [2, 6, 10, 14];
    const tfQuestions = [3, 7, 11, 15];
    const jpQuestions = [4, 8, 12, 16];
    
    eiQuestions.forEach(q => {
        if (mbtiAnswers[q] === 0) ei++;
        else if (mbtiAnswers[q] === 1) ei--;
    });
    
    snQuestions.forEach(q => {
        if (mbtiAnswers[q] === 0) sn++;
        else if (mbtiAnswers[q] === 1) sn--;
    });
    
    tfQuestions.forEach(q => {
        if (mbtiAnswers[q] === 0) tf++;
        else if (mbtiAnswers[q] === 1) tf--;
    });
    
    jpQuestions.forEach(q => {
        if (mbtiAnswers[q] === 0) jp++;
        else if (mbtiAnswers[q] === 1) jp--;
    });
    
    mbtiResult = (ei >= 0 ? 'E' : 'I') + 
                 (sn >= 0 ? 'S' : 'N') + 
                 (tf >= 0 ? 'T' : 'F') + 
                 (jp >= 0 ? 'J' : 'P');
    
    console.log('MBTI Result:', mbtiResult);
}

function calculateHolland() {
    const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    Object.values(hollandAnswers).forEach(answer => {
        const score = 4 - answer.index;
        counts[answer.type] += score;
    });
    
    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);
    
    hollandResult = sorted.join('');
    
    console.log('Holland Result:', hollandResult);
}

function nextStep(step) {
    if (step === 2) {
        const score = document.getElementById('score').value;
        const province = document.getElementById('province').value;
        
        if (!score || score < 0 || score > 750) {
            alert('请输入有效的高考分数（0-750）');
            return;
        }
        
        if (!province) {
            alert('请选择所在省份');
            return;
        }
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

async function submitRecommendation() {
    const score = parseInt(document.getElementById('score').value);
    const province = document.getElementById('province').value;
    
    const preferences = {
        location: document.getElementById('pref-location').value,
        campus_env: document.getElementById('pref-campus').checked,
        canteen: document.getElementById('pref-canteen').checked,
        dorm: document.getElementById('pref-dorm').checked,
    };
    
    const requestData = {
        score,
        province,
        mbti: mbtiResult,
        holland: hollandResult,
        preferences
    };
    
    try {
        const response = await fetch('/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        const result = await response.json();
        displayResults(result);
        nextStep(5);
    } catch (error) {
        alert('获取推荐失败，请重试');
        console.error(error);
    }
}

function displayResults(result) {
    const summaryDiv = document.getElementById('result-summary');
    summaryDiv.innerHTML = `
        <h3>你的性格类型: ${mbtiResult || '未测评'} | 兴趣代码: ${hollandResult || '未测评'}</h3>
        <p>你的分数段: ${result.user_tier_name} | 共匹配到 ${result.total} 个推荐</p>
    `;
    
    const majorsDiv = document.getElementById('matching-majors');
    if (result.matching_majors.length > 0) {
        majorsDiv.innerHTML = `
            <h3>匹配的专业方向</h3>
            <div class="major-tags">
                ${result.matching_majors.map(major => `
                    <span class="major-tag">${major}</span>
                `).join('')}
            </div>
        `;
    }
    
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';
    
    const tierOrder = ['top', 'high', 'medium', 'standard', 'base'];
    
    tierOrder.forEach(tierKey => {
        if (result.tiers[tierKey]) {
            const tier = result.tiers[tierKey];
            const tierDiv = document.createElement('div');
            tierDiv.className = 'tier-section';
            tierDiv.innerHTML = `
                <div class="tier-header">
                    <span class="tier-badge ${tierKey}">${tier.name}</span>
                    <span class="tier-title">${tier.description}</span>
                </div>
                ${tier.recommendations.map(rec => `
                    <div class="recommendation-card">
                        <div class="rec-info">
                            <h4>${rec.college}</h4>
                            <div class="rec-meta">
                                <span>${rec.city}</span>
                                <span>${rec.major}</span>
                                <span>最低分: ${rec.min_score}</span>
                            </div>
                            <div class="rec-tags">
                                ${rec.tags.map(tag => `<span class="rec-tag">${tag}</span>`).join('')}
                            </div>
                            <div class="ratings">
                                <span class="rating">校园: ${'★'.repeat(rec.campus_rating)}${'☆'.repeat(5-rec.campus_rating)}</span>
                                <span class="rating">食堂: ${'★'.repeat(rec.canteen_rating)}${'☆'.repeat(5-rec.canteen_rating)}</span>
                                <span class="rating">宿舍: ${'★'.repeat(rec.dorm_rating)}${'☆'.repeat(5-rec.dorm_rating)}</span>
                            </div>
                        </div>
                        <div class="rec-score">
                            <div class="match-score">${rec.match_score}</div>
                            <div class="match-label">匹配度</div>
                        </div>
                    </div>
                `).join('')}
            `;
            recommendationsDiv.appendChild(tierDiv);
        }
    });
    
    if (Object.keys(result.tiers).length === 0) {
        recommendationsDiv.innerHTML = '<p style="text-align:center; color:#666; padding:40px;">暂无匹配的推荐，请尝试调整分数或偏好设置</p>';
    }
}
