// 全局变量
let currentTopicIndex = 0;
let selectedPosition = null;
let readArguments = new Set();
let videoProgress = 0;
let videoPlaying = false;
let videoCompleted = false;
let callActive = false;
let callStartTime = null;
let callTimer = null;

// 适合8岁小孩的辩论话题数据
const topicsData = [
    {
        id: 1,
        title: "小学生应该带手机上学吗？",
        description: "探讨小学生是否需要在学校使用手机，以及手机对学习的影响。",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=400&h=225&fit=crop",
        positions: {
            positive: {
                title: "支持带手机",
                viewpoint: "手机可以帮助我们学习，遇到危险时可以联系家长，还可以查资料做作业。",
                arguments: [
                    {
                        title: "安全联系",
                        preview: "遇到紧急情况时，可以立即联系家长",
                        details: "如果在学校发生意外或者放学路上遇到问题，可以第一时间打电话给爸爸妈妈求助。这样家长也会更放心。"
                    },
                    {
                        title: "学习帮助",
                        preview: "可以用手机查资料，帮助完成作业",
                        details: "遇到不懂的生字或者需要查资料的时候，可以用手机搜索。还可以用学习APP练习数学题和背单词。"
                    },
                    {
                        title: "培养责任心",
                        preview: "学会管理和保护自己的物品",
                        details: "拥有手机可以让我们学会保管重要物品，培养责任感。同时学会合理使用电子设备。"
                    }
                ]
            },
            negative: {
                title: "不支持带手机",
                viewpoint: "手机会让我们上课不专心，影响学习成绩，还可能被坏人利用。",
                arguments: [
                    {
                        title: "影响专注力",
                        preview: "手机会让我们上课时分心，影响听讲",
                        details: "上课时如果收到消息或者想玩游戏，就会不专心听老师讲课。这样会影响学习成绩，错过重要的知识点。"
                    },
                    {
                        title: "容易丢失",
                        preview: "小学生容易把手机弄丢或者摔坏",
                        details: "我们年纪还小，经常会忘记东西或者不小心摔坏物品。手机很贵重，丢了会让父母很担心和生气。"
                    },
                    {
                        title: "影响交流",
                        preview: "老是看手机，就不跟同学一起玩了",
                        details: "下课时间应该和同学们一起玩耍、聊天，这样才能交到好朋友。如果总是看手机，就会变得孤单。"
                    }
                ]
            }
        }
    },
    {
        id: 2,
        title: "周末应该多写作业还是多玩耍？",
        description: "讨论周末时间的安排，是应该专注学习还是放松娱乐。",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop",
        positions: {
            positive: {
                title: "应该多写作业",
                viewpoint: "周末是很好的学习时间，多写作业可以巩固知识，提高成绩。",
                arguments: [
                    {
                        title: "巩固知识",
                        preview: "周末有充足时间复习和预习功课",
                        details: "平时上学时间紧张，周末可以好好复习这周学的内容，还可以预习下周的新课，这样上课时会更容易理解。"
                    },
                    {
                        title: "养成习惯",
                        preview: "培养良好的学习习惯和自律能力",
                        details: "如果周末也坚持学习，就能养成每天学习的好习惯。这样长大后也会很自律，做事情很有计划。"
                    },
                    {
                        title: "超越同学",
                        preview: "比其他同学学得更多，成绩会更好",
                        details: "当别的同学在玩的时候，我在学习，就能学到更多知识。这样考试时会比别人考得更好，老师和家长会很高兴。"
                    }
                ]
            },
            negative: {
                title: "应该多玩耍",
                viewpoint: "周末是休息时间，应该放松身心，玩耍对成长也很重要。",
                arguments: [
                    {
                        title: "身心健康",
                        preview: "适当的休息和运动对身体成长很重要",
                        details: "我们正在长身体，需要充足的休息和运动。如果周末还要写很多作业，会很累，影响身体健康和长高。"
                    },
                    {
                        title: "培养兴趣",
                        preview: "可以发展自己的兴趣爱好和特长",
                        details: "周末可以画画、唱歌、踢球或者学习其他技能。这些爱好能让我们更快乐，也许还能发现自己的特长。"
                    },
                    {
                        title: "增进感情",
                        preview: "和家人朋友一起玩，感情会更好",
                        details: "周末可以和爸爸妈妈一起出去玩，或者邀请朋友到家里。这样能增进感情，让家庭更和睦，友谊更深厚。"
                    }
                ]
            }
        }
    },
    {
        id: 3,
        title: "学校应该允许养小动物吗？",
        description: "探讨在学校养小动物作为班级宠物的利弊。",
        image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=250&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=225&fit=crop",
        positions: {
            positive: {
                title: "应该允许养",
                viewpoint: "养小动物可以培养爱心，学会照顾他人，还能让学习更有趣。",
                arguments: [
                    {
                        title: "培养爱心",
                        preview: "照顾小动物能让我们变得更有爱心",
                        details: "每天给小动物喂食、清理笼子，会让我们学会关心别人。以后对待家人和朋友也会更温柔、更体贴。"
                    },
                    {
                        title: "学习责任",
                        preview: "轮流照顾小动物，学会负责任",
                        details: "我们可以制定值日表，每个同学轮流照顾班级宠物。这样能学会什么是责任，知道自己的事情要认真完成。"
                    },
                    {
                        title: "观察学习",
                        preview: "观察动物的生活习性，学到生物知识",
                        details: "通过观察小兔子吃什么、什么时候睡觉，能学到很多动物知识。这比光看书本更有趣，记忆也更深刻。"
                    }
                ]
            },
            negative: {
                title: "不应该养",
                viewpoint: "学校养动物不卫生，容易分心，还可能出现意外情况。",
                arguments: [
                    {
                        title: "卫生问题",
                        preview: "动物会有细菌，可能让同学生病",
                        details: "小动物身上有很多细菌，教室里养动物会不卫生。有些同学对动物毛发过敏，可能会打喷嚏或者皮肤痒。"
                    },
                    {
                        title: "影响学习",
                        preview: "上课时会想看小动物，不专心听讲",
                        details: "如果教室里有可爱的小兔子，上课时我们就会忍不住看它，不专心听老师讲课。这样会影响学习成绩。"
                    },
                    {
                        title: "安全隐患",
                        preview: "动物可能咬人或者逃跑，很危险",
                        details: "小动物有时候会咬人，特别是害怕的时候。如果笼子没关好，动物跑出来会很危险，可能会吓到同学或者走丢。"
                    }
                ]
            }
        }
    },
    {
        id: 4,
        title: "零花钱应该自己管理还是给家长保管？",
        description: "讨论小学生是否应该自主管理自己的零花钱。",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=225&fit=crop",
        positions: {
            positive: {
                title: "应该自己管理",
                viewpoint: "自己管理零花钱可以学会理财，培养独立能力。",
                arguments: [
                    {
                        title: "学会理财",
                        preview: "从小学会合理花钱，长大后会很会管钱",
                        details: "如果自己管理零花钱，就会学着思考什么值得买，什么不值得买。这样长大后就会很会理财，不会乱花钱。"
                    },
                    {
                        title: "培养独立",
                        preview: "自己做决定，变得更独立更成熟",
                        details: "自己决定怎么花钱，会让我们学会独立思考。遇到问题时也会想办法解决，不会什么都依赖父母。"
                    },
                    {
                        title: "学会计划",
                        preview: "为了买喜欢的东西，学会存钱和计划",
                        details: "如果想买一个比较贵的玩具，就要学会存钱，制定计划。这样能培养我们做事有计划的好习惯。"
                    }
                ]
            },
            negative: {
                title: "应该给家长保管",
                viewpoint: "我们年纪还小，容易乱花钱，让家长帮忙管理更安全。",
                arguments: [
                    {
                        title: "避免浪费",
                        preview: "小孩子容易冲动买东西，家长帮忙更理性",
                        details: "我们看到好玩的玩具就想买，没有想清楚是不是真的需要。家长有经验，能帮我们避免买无用的东西。"
                    },
                    {
                        title: "防止丢失",
                        preview: "小孩子容易弄丢钱，家长保管更安全",
                        details: "我们有时候会忘记钱放在哪里，或者不小心把钱弄掉。让爸爸妈妈帮忙保管，用的时候再要，更安全。"
                    },
                    {
                        title: "学会沟通",
                        preview: "需要买东西时跟家长商量，学会表达和沟通",
                        details: "想买东西时要跟父母说明原因，这样能锻炼我们的表达能力。家长也能给我们建议，帮我们做更好的决定。"
                    }
                ]
            }
        }
    },
    {
        id: 5,
        title: "课间应该安静休息还是活跃运动？",
        description: "讨论课间十分钟的最佳使用方式。",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1581726690015-c2861136b5c2?w=400&h=225&fit=crop",
        positions: {
            positive: {
                title: "应该安静休息",
                viewpoint: "课间安静休息可以让大脑得到充分休息，为下节课做好准备。",
                arguments: [
                    {
                        title: "大脑休息",
                        preview: "安静的环境让大脑得到充分休息",
                        details: "上课需要集中注意力很累，课间安静休息可以让大脑放松。这样下节课时精神会更好，学习效率更高。"
                    },
                    {
                        title: "避免受伤",
                        preview: "不跑不跳，避免在课间受伤",
                        details: "课间时间短，如果跑来跑去很容易摔倒或者撞到别人。安静休息更安全，不会因为受伤而影响学习。"
                    },
                    {
                        title: "准备学习",
                        preview: "可以提前预习下节课内容或整理文具",
                        details: "利用课间时间看看下节课要学什么，或者整理好书本和文具。这样上课时会更有准备，学习效果更好。"
                    }
                ]
            },
            negative: {
                title: "应该活跃运动",
                viewpoint: "课间运动可以锻炼身体，放松心情，让学习更有活力。",
                arguments: [
                    {
                        title: "锻炼身体",
                        preview: "适当运动有助于身体健康和成长",
                        details: "我们正在长身体，需要多运动才能长得高长得壮。课间跳跳绳、踢踢毽子，对身体发育很有好处。"
                    },
                    {
                        title: "放松心情",
                        preview: "运动能让我们心情愉快，减少学习压力",
                        details: "上课时大脑紧张，课间运动可以让我们心情变好，释放压力。开心的时候学习效率会更高。"
                    },
                    {
                        title: "增进友谊",
                        preview: "和同学一起运动，能增进彼此的友谊",
                        details: "和同学一起踢球、跳绳，能增进友谊。在游戏中学会合作和竞争，也能交到更多好朋友。"
                    }
                ]
            }
        }
    }
];

// Three.js 相关变量
let scene, camera, renderer, cards = [];
let isAnimating = false;

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initThreeJS();
    createTopicCards();
    updateIndicators();
    setupEventListeners();
}

// 初始化 Three.js
function initThreeJS() {
    const container = document.getElementById('three-container');
    
    // 创建场景
    scene = new THREE.Scene();
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
}

// 创建话题卡片
function createTopicCards() {
    const container = document.getElementById('three-container');
    
    topicsData.forEach((topic, index) => {
        // 创建 DOM 卡片元素
        const cardElement = document.createElement('div');
        cardElement.className = 'topic-card';
        cardElement.innerHTML = `
            <img class="topic-card-image" src="${topic.image}" alt="${topic.title}" />
            <div class="topic-card-content">
                <h3 class="topic-card-title">${topic.title}</h3>
                <p class="topic-card-description">${topic.description}</p>
            </div>
        `;
        
        // 设置卡片位置
        const yPosition = index * 320; // 卡片间距
        cardElement.style.top = yPosition + 'px';
        
        // 添加点击事件
        cardElement.addEventListener('click', () => selectTopic(index));
        
        container.appendChild(cardElement);
        cards.push(cardElement);
    });
    
    updateCardsPosition();
}

// 更新卡片位置和状态
function updateCardsPosition() {
    cards.forEach((card, index) => {
        const offset = index - currentTopicIndex;
        const yPosition = offset * 100; // 调整垂直间距
        const scale = index === currentTopicIndex ? 1 : 0.9;
        const opacity = index === currentTopicIndex ? 1 : 0.6;
        
        card.style.transform = `translateY(${yPosition}px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = index === currentTopicIndex ? 10 : 1;
        
        if (index === currentTopicIndex) {
            card.classList.add('active');
            card.classList.remove('inactive');
        } else {
            card.classList.remove('active');
            card.classList.add('inactive');
        }
    });
}

// 设置事件监听器
function setupEventListeners() {
    const container = document.getElementById('three-container');
    let startY = 0;
    let isDragging = false;
    
    // 触摸事件
    container.addEventListener('touchstart', (e) => {
        if (isAnimating) return;
        startY = e.touches[0].clientY;
        isDragging = true;
    });
    
    container.addEventListener('touchmove', (e) => {
        e.preventDefault();
    });
    
    container.addEventListener('touchend', (e) => {
        if (!isDragging || isAnimating) return;
        
        const endY = e.changedTouches[0].clientY;
        const deltaY = startY - endY;
        
        if (Math.abs(deltaY) > 50) {
            if (deltaY > 0 && currentTopicIndex < topicsData.length - 1) {
                navigateToTopic(currentTopicIndex + 1);
            } else if (deltaY < 0 && currentTopicIndex > 0) {
                navigateToTopic(currentTopicIndex - 1);
            }
        }
        
        isDragging = false;
    });
    
    // 鼠标事件（用于桌面测试）
    container.addEventListener('wheel', (e) => {
        if (isAnimating) return;
        
        e.preventDefault();
        if (e.deltaY > 0 && currentTopicIndex < topicsData.length - 1) {
            navigateToTopic(currentTopicIndex + 1);
        } else if (e.deltaY < 0 && currentTopicIndex > 0) {
            navigateToTopic(currentTopicIndex - 1);
        }
    });
}

// 导航到指定话题
function navigateToTopic(index) {
    if (isAnimating || index === currentTopicIndex) return;
    
    isAnimating = true;
    currentTopicIndex = index;
    
    // 3D 翻转动画
    const currentCard = cards[currentTopicIndex];
    currentCard.style.transform = 'rotateY(180deg)';
    
    setTimeout(() => {
        updateCardsPosition();
        updateIndicators();
        currentCard.style.transform = '';
        isAnimating = false;
    }, 150);
}

// 更新指示器
function updateIndicators() {
    const dotsContainer = document.querySelector('.indicator-dots');
    dotsContainer.innerHTML = '';
    
    topicsData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        if (index === currentTopicIndex) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    });
}

// 选择话题
function selectTopic(index) {
    if (index !== currentTopicIndex) {
        navigateToTopic(index);
        return;
    }
    
    // 进入视频页面
    const topic = topicsData[currentTopicIndex];
    document.getElementById('video-topic-title').textContent = topic.title;
    document.getElementById('video-cover-img').src = topic.coverImage;
    
    goToPage('video');
}

// 页面切换
function goToPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    setTimeout(() => {
        document.getElementById(pageId + '-page').classList.add('active');
    }, 100);
}

// 视频相关功能
function playVideo() {
    const videoCover = document.querySelector('.video-cover');
    const videoControls = document.getElementById('video-controls');
    
    videoCover.style.display = 'none';
    videoControls.style.display = 'block';
    videoPlaying = true;
    
    // 模拟视频播放进度
    const progressBar = document.getElementById('video-progress');
    const interval = setInterval(() => {
        videoProgress += 2;
        progressBar.style.width = videoProgress + '%';
        
        if (videoProgress >= 100) {
            clearInterval(interval);
            videoCompleted = true;
            videoPlaying = false;
            document.getElementById('choose-position-btn').style.display = 'block';
        }
    }, 100);
}

function toggleVideo() {
    const icon = document.getElementById('play-pause-icon');
    if (videoPlaying) {
        icon.className = 'fas fa-play';
        videoPlaying = false;
    } else {
        icon.className = 'fas fa-pause';
        videoPlaying = true;
    }
}

function skipVideo() {
    videoCompleted = true;
    document.getElementById('choose-position-btn').style.display = 'block';
}

function toggleFullscreen() {
    // 模拟全屏功能
    alert('全屏功能在实际应用中实现');
}

// 立场选择功能
function selectPosition(position) {
    selectedPosition = position;
    
    const positiveCard = document.querySelector('.position-card.positive');
    const negativeCard = document.querySelector('.position-card.negative');
    const confirmBtn = document.getElementById('confirm-position-btn');
    
    // 重置状态
    positiveCard.classList.remove('selected', 'dimmed');
    negativeCard.classList.remove('selected', 'dimmed');
    
    // 设置选中状态
    if (position === 'positive') {
        positiveCard.classList.add('selected');
        negativeCard.classList.add('dimmed');
    } else {
        negativeCard.classList.add('selected');
        positiveCard.classList.add('dimmed');
    }
    
    confirmBtn.disabled = false;
    
    // 更新立场内容
    const topic = topicsData[currentTopicIndex];
    document.getElementById('positive-viewpoint').textContent = topic.positions.positive.viewpoint;
    document.getElementById('negative-viewpoint').textContent = topic.positions.negative.viewpoint;
    
    // 准备预习页面数据
    prepareArgumentsData();
}

// 准备论点数据
function prepareArgumentsData() {
    const topic = topicsData[currentTopicIndex];
    const position = selectedPosition;
    const arguments = topic.positions[position].arguments;
    
    // 更新预习页面标题和徽章
    document.getElementById('practice-topic-title').textContent = topic.title;
    document.getElementById('selected-position-badge').textContent = 
        position === 'positive' ? '正方' : '反方';
    
    // 更新论点卡片
    const argumentCards = document.querySelectorAll('.argument-card');
    argumentCards.forEach((card, index) => {
        if (arguments[index]) {
            const arg = arguments[index];
            card.querySelector('.argument-title').textContent = arg.title;
            card.querySelector('.argument-preview').textContent = arg.preview;
            card.querySelector('.argument-details p').textContent = arg.details;
        }
    });
}

// 论点展开/收起
function toggleArgument(index) {
    const card = document.querySelector(`.argument-card[data-index="${index}"]`);
    const details = card.querySelector('.argument-details');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        details.style.display = 'none';
        card.classList.remove('expanded');
    } else {
        details.style.display = 'block';
        card.classList.add('expanded', 'read');
        readArguments.add(index);
    }
    
    updateStartDebateButton();
}

// 更新开始辩论按钮状态
function updateStartDebateButton() {
    const startBtn = document.getElementById('start-debate-btn');
    startBtn.disabled = readArguments.size < 2;
}

// 语音通话功能
function toggleCall() {
    const callBtn = document.getElementById('call-btn');
    const audioWaves = document.getElementById('audio-waves');
    const timer = document.getElementById('call-timer');
    
    if (!callActive) {
        // 开始通话
        callActive = true;
        callStartTime = Date.now();
        callBtn.classList.add('calling');
        callBtn.innerHTML = '<i class="fas fa-phone-slash"></i>';
        audioWaves.style.display = 'flex';
        timer.style.display = 'block';
        
        // 开始计时
        callTimer = setInterval(updateCallTimer, 1000);
    } else {
        // 结束通话
        endCall();
    }
}

function updateCallTimer() {
    const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const timer = document.getElementById('call-timer');
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function endCall() {
    callActive = false;
    const callBtn = document.getElementById('call-btn');
    const audioWaves = document.getElementById('audio-waves');
    const timer = document.getElementById('call-timer');
    
    callBtn.classList.remove('calling');
    callBtn.innerHTML = '<i class="fas fa-phone"></i>';
    audioWaves.style.display = 'none';
    timer.style.display = 'none';
    
    if (callTimer) {
        clearInterval(callTimer);
        callTimer = null;
    }
}

// 开始正式辩论
function startDebate() {
    // 准备辩论数据
    initDebateData();
    goToPage('debate');
    startDebateRound();
}

// 辩论相关变量
let currentDebateRound = 1;
let debateTimer = null;
let currentDebateTime = 30;
let debateResults = [null, null, null]; // 三轮辩论结果
let isPlayerTurn = false;
let debateActive = false;
let giftInterval = null;

// 初始化辩论数据
function initDebateData() {
    const topic = topicsData[currentTopicIndex];
    
    // 设置立场显示
    if (selectedPosition === 'positive') {
        document.getElementById('player-position').textContent = '正方';
        document.getElementById('opponent-position').textContent = '反方';
    } else {
        document.getElementById('player-position').textContent = '反方';
        document.getElementById('opponent-position').textContent = '正方';
    }
    
    // 重置辩论状态
    currentDebateRound = 1;
    debateResults = [null, null, null];
    updateDebateProgress();
    
    // 开始礼物动效
    startFloatingGifts();
}

// 开始辩论轮次
function startDebateRound() {
    if (currentDebateRound > 3) {
        endDebate();
        return;
    }
    
    debateActive = true;
    currentDebateTime = 30;
    isPlayerTurn = Math.random() > 0.5; // 随机决定谁先开始
    
    updateDebateProgress();
    updatePlayerStatus();
    startDebateTimer();
}

// 开始辩论计时器
function startDebateTimer() {
    const timerElement = document.getElementById('debate-countdown');
    
    debateTimer = setInterval(() => {
        currentDebateTime--;
        timerElement.textContent = currentDebateTime;
        
        // 最后10秒警告效果
        if (currentDebateTime <= 10) {
            timerElement.parentElement.classList.add('warning');
        } else {
            timerElement.parentElement.classList.remove('warning');
        }
        
        // 时间到，切换发言者或结束轮次
        if (currentDebateTime <= 0) {
            if (isPlayerTurn) {
                // 切换到对方
                isPlayerTurn = false;
                currentDebateTime = 30;
                updatePlayerStatus();
            } else {
                // 轮次结束
                endRound();
            }
        }
    }, 1000);
}

// 更新玩家状态显示
function updatePlayerStatus() {
    const playerSection = document.querySelector('.participant-section.player');
    const opponentSection = document.querySelector('.participant-section.opponent');
    const playerStatus = document.getElementById('player-status');
    const opponentStatus = document.getElementById('opponent-status');
    const statusText = document.getElementById('status-text');
    const playerSpeaking = document.getElementById('player-speaking');
    const opponentSpeaking = document.getElementById('opponent-speaking');
    const voiceBtn = document.getElementById('debate-voice-btn');
    const audioWaves = document.getElementById('debate-audio-waves');
    
    // 清除所有状态
    playerSection.classList.remove('speaking');
    opponentSection.classList.remove('speaking');
    playerSpeaking.style.display = 'none';
    opponentSpeaking.style.display = 'none';
    audioWaves.style.display = 'none';
    voiceBtn.classList.remove('active');
    
    if (isPlayerTurn) {
        playerSection.classList.add('speaking');
        playerSpeaking.style.display = 'block';
        playerStatus.textContent = '发言中...';
        opponentStatus.textContent = '等待中...';
        statusText.textContent = '轮到你发言了！';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        audioWaves.style.display = 'flex';
        voiceBtn.classList.add('active');
    } else {
        opponentSection.classList.add('speaking');
        opponentSpeaking.style.display = 'block';
        playerStatus.textContent = '等待中...';
        opponentStatus.textContent = '发言中...';
        statusText.textContent = '对方正在发言...';
        voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        
        // 模拟对方发言的音波效果
        setTimeout(() => {
            audioWaves.style.display = 'flex';
        }, 1000);
    }
}

// 辩论语音按钮切换
function toggleDebateVoice() {
    if (!debateActive || !isPlayerTurn) return;
    
    const voiceBtn = document.getElementById('debate-voice-btn');
    const audioWaves = document.getElementById('debate-audio-waves');
    
    if (voiceBtn.classList.contains('active')) {
        // 停止发言
        voiceBtn.classList.remove('active');
        audioWaves.style.display = 'none';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    } else {
        // 开始发言
        voiceBtn.classList.add('active');
        audioWaves.style.display = 'flex';
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
    }
}

// 跳过当前轮次
function skipRound() {
    if (!debateActive) return;
    
    clearInterval(debateTimer);
    endRound();
}

// 结束当前轮次
function endRound() {
    clearInterval(debateTimer);
    debateActive = false;
    
    // 随机决定本轮结果
    const playerWins = Math.random() > 0.5;
    debateResults[currentDebateRound - 1] = playerWins;
    
    // 更新进度显示
    updateDebateProgress();
    
    // 显示轮次结果
    showRoundResult(playerWins);
    
    // 准备下一轮
    setTimeout(() => {
        currentDebateRound++;
        document.getElementById('debate-countdown').parentElement.classList.remove('warning');
        startDebateRound();
    }, 2000);
}

// 显示轮次结果
function showRoundResult(playerWins) {
    const statusText = document.getElementById('status-text');
    const playerSection = document.querySelector('.participant-section.player');
    const opponentSection = document.querySelector('.participant-section.opponent');
    
    // 清除发言状态
    playerSection.classList.remove('speaking');
    opponentSection.classList.remove('speaking');
    document.getElementById('player-speaking').style.display = 'none';
    document.getElementById('opponent-speaking').style.display = 'none';
    document.getElementById('debate-audio-waves').style.display = 'none';
    
    if (playerWins) {
        statusText.textContent = `第${currentDebateRound}轮：你赢了！🎉`;
        document.getElementById('player-status').textContent = '本轮获胜！';
        document.getElementById('opponent-status').textContent = '本轮失败';
    } else {
        statusText.textContent = `第${currentDebateRound}轮：对方赢了 😔`;
        document.getElementById('player-status').textContent = '本轮失败';
        document.getElementById('opponent-status').textContent = '本轮获胜！';
    }
}

// 更新辩论进度
function updateDebateProgress() {
    document.getElementById('current-round').textContent = currentDebateRound;
    
    for (let i = 0; i < 3; i++) {
        const circle = document.querySelector(`.progress-circle[data-round="${i + 1}"]`);
        const icon = document.getElementById(`round-${i + 1}-icon`);
        
        // 清除所有状态
        circle.classList.remove('current', 'win', 'lose');
        icon.className = 'fas fa-circle';
        
        if (i + 1 === currentDebateRound && currentDebateRound <= 3) {
            // 当前轮次
            circle.classList.add('current');
        } else if (debateResults[i] !== null) {
            // 已完成轮次
            if (debateResults[i]) {
                circle.classList.add('win');
                icon.className = 'fas fa-smile';
            } else {
                circle.classList.add('lose');
                icon.className = 'fas fa-frown';
            }
        }
    }
}

// 结束辩论
function endDebate() {
    clearInterval(debateTimer);
    stopFloatingGifts();
    
    // 计算总结果
    const playerWins = debateResults.filter(result => result === true).length;
    const opponentWins = debateResults.filter(result => result === false).length;
    
    let resultMessage = '';
    if (playerWins > opponentWins) {
        resultMessage = `🎉 恭喜！你以 ${playerWins}:${opponentWins} 的比分获得了辩论胜利！\n\n你的辩论技巧很棒！`;
    } else if (playerWins < opponentWins) {
        resultMessage = `😔 很遗憾，你以 ${playerWins}:${opponentWins} 的比分败给了对手。\n\n不要气馁，继续练习会更棒的！`;
    } else {
        resultMessage = `🤝 平局！你们的实力不相上下！\n\n这是一场精彩的辩论！`;
    }
    
    setTimeout(() => {
        alert(resultMessage);
        // 可以选择返回首页或重新开始
        if (confirm('是否重新选择话题？')) {
            goToPage('home');
            resetApp();
        }
    }, 1000);
}

// 开始漂浮礼物动效
function startFloatingGifts() {
    const giftsContainer = document.getElementById('floating-gifts');
    const giftTypes = ['flower', 'clap', 'heart', 'star'];
    
    giftInterval = setInterval(() => {
        const giftType = giftTypes[Math.floor(Math.random() * giftTypes.length)];
        const gift = document.createElement('div');
        gift.className = `floating-gift gift-${giftType}`;
        
        // 随机位置偏移
        const randomOffset = (Math.random() - 0.5) * 60;
        gift.style.left = `calc(50% + ${randomOffset}px)`;
        
        giftsContainer.appendChild(gift);
        
        // 3秒后移除元素
        setTimeout(() => {
            if (gift.parentNode) {
                gift.parentNode.removeChild(gift);
            }
        }, 3000);
    }, 2000);
}

// 停止漂浮礼物
function stopFloatingGifts() {
    if (giftInterval) {
        clearInterval(giftInterval);
        giftInterval = null;
    }
}

// 助手提示
function showAssistantTip() {
    const tips = [
        '💡 记住要用事实和逻辑来支持你的观点！',
        '🎯 仔细听对方的观点，然后有针对性地反驳！',
        '😊 保持冷静和礼貌，好的辩手从不失态！',
        '🔥 用具体的例子来证明你的观点更有说服力！',
        '⏰ 注意时间管理，把最重要的观点先说出来！'
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    alert(randomTip);
}

// 重置应用状态
function resetApp() {
    currentTopicIndex = 0;
    selectedPosition = null;
    readArguments.clear();
    videoProgress = 0;
    videoPlaying = false;
    videoCompleted = false;
    
    // 重置辩论状态
    currentDebateRound = 1;
    debateResults = [null, null, null];
    debateActive = false;
    
    // 清理定时器
    if (debateTimer) {
        clearInterval(debateTimer);
        debateTimer = null;
    }
    
    if (giftInterval) {
        clearInterval(giftInterval);
        giftInterval = null;
    }
    
    // 重置UI
    updateCardsPosition();
    updateIndicators();
}

// 窗口大小调整
window.addEventListener('resize', () => {
    if (renderer && camera) {
        const container = document.getElementById('three-container');
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    }
});

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// 启动动画循环
animate(); 