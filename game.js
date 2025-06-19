const { createApp } = Vue

const app = createApp({
    data() {
        return {
            gameState: 'start',
            playerName: '',
            selectedTemplate: null,
            characterTemplates: [
                {
                    title: "躺平咖",
                    money: 30,
                    health: 70,
                    happiness: 60,
                    description: "最佳的人生就是躺著"
                },
                {
                    title: "社恐魂",
                    money: 50,
                    health: 50,
                    happiness: 40,
                    description: "拒絕社交，只想當邊緣人"
                },
                {
                    title: "夢想家",
                    money: 20,
                    health: 60,
                    happiness: 80,
                    description: "活在自己的小世界"
                }
            ],
            character: {
                gender: '',
                money: 50,        // 💰 初始金錢值
                happiness: 50,    // 🤣 初始快樂值
                health: 50,       // 💪 初始健康值
                iq: 50,          // 🧠 智商值
                clownIndex: 0,    // 🤡 胡鬧指數
                fantasy: 0,       // 🦄 幻想值
                lazy: 0,         // 😴 懶度
                socialFear: 0,   // 😨 社恐程度
                bullshit: 0,     // 🗯 鬼話技能
                wasteLevel: 0,    // 廢度指數
                stage: '幼兒園'   // 目前人生階段
            },
            currentQuestionIndex: 0,
            questions: [
                // 幼兒園階段 (3-6歲)
                {
                    stage: '幼兒園',
                    tags: ['日常生活', '創意', '叛逆'],
                    text: "幼兒園午睡時間到了，你要？",
                    options: [
                        {
                            text: "假裝睡著，其實在腦中編武俠劇",
                            effects: { 
                                fantasy: 15, 
                                lazy: 5,
                                bullshit: 10
                            }
                        },
                        {
                            text: "偷偷把旁邊小孩的午餐吃掉",
                            effects: { 
                                clownIndex: 10, 
                                health: 5,
                                bullshit: 5
                            }
                        },
                        {
                            text: "公然起身宣布：「我拒絕被資本主義困住」",
                            effects: { 
                                clownIndex: 20, 
                                iq: 10,
                                socialFear: -5
                            }
                        }
                    ]
                },
                {
                    stage: '幼兒園',
                    tags: ['夢想', '人生規劃', '幻想'],
                    text: "老師問你長大要當什麼？",
                    options: [
                        {
                            text: "當個有錢的躺平家",
                            effects: { 
                                lazy: 15, 
                                fantasy: 10,
                                money: 5
                            }
                        },
                        {
                            text: "當個每天不用見人的「橋下居民」",
                            effects: { 
                                socialFear: 20, 
                                lazy: 10,
                                money: -5
                            }
                        },
                        {
                            text: "當貓，會被餵飯又能亂叫",
                            effects: { 
                                fantasy: 20, 
                                clownIndex: 15,
                                lazy: 10
                            }
                        }
                    ]
                },
                {
                    stage: '幼兒園',
                    tags: ['才藝', '迴避', '叛逆'],
                    text: "家人要你學才藝，你會？",
                    options: [
                        {
                            text: "學睡覺（每堂課都睡滿）",
                            effects: { 
                                lazy: 20, 
                                health: 5,
                                money: -5
                            }
                        },
                        {
                            text: "學躲起來（每次上課前消失）",
                            effects: { 
                                socialFear: 15, 
                                bullshit: 10,
                                clownIndex: 5
                            }
                        },
                        {
                            text: "直接拿畫筆畫出「我不想學」的表情",
                            effects: { 
                                clownIndex: 15, 
                                fantasy: 10,
                                iq: 5
                            }
                        }
                    ]
                },
                // 國小階段 (7-12歲)
                {
                    stage: '國小',
                    tags: ['運動', '藉口', '創意'],
                    text: "全班要跑步考試，你會？",
                    options: [
                        {
                            text: "一開始就跌倒，順便躺著",
                            effects: { 
                                lazy: 15, 
                                bullshit: 10,
                                health: -5
                            }
                        },
                        {
                            text: "跑一圈後自創新玩法：原地旋轉",
                            effects: { 
                                clownIndex: 20, 
                                fantasy: 10,
                                health: -5
                            }
                        },
                        {
                            text: "說自己靈魂脫體，不能參加",
                            effects: { 
                                fantasy: 15, 
                                bullshit: 15,
                                socialFear: 5
                            }
                        }
                    ]
                },
                {
                    stage: '國小',
                    tags: ['學習', '社交', '迴避'],
                    text: "你被老師叫起來唸課文，你會？",
                    options: [
                        {
                            text: "唸得像機器壞掉",
                            effects: { 
                                clownIndex: 15, 
                                socialFear: 10,
                                iq: -5
                            }
                        },
                        {
                            text: "唸一半開始唱歌",
                            effects: { 
                                fantasy: 10, 
                                clownIndex: 15,
                                bullshit: 5
                            }
                        },
                        {
                            text: "拿書蓋臉假裝自己不存在",
                            effects: { 
                                socialFear: 20, 
                                lazy: 10,
                                happiness: -5
                            }
                        }
                    ]
                },
                // 青少年階段
                {
                    stage: '青少年',
                    tags: ['紀律', '藉口', '創意'],
                    text: "你遲到了第12次，老師叫你進辦公室說明",
                    options: [
                        {
                            text: "說你在幫地球調整磁場",
                            effects: { 
                                fantasy: 20, 
                                bullshit: 15,
                                clownIndex: 10
                            }
                        },
                        {
                            text: "假裝自己穿越時空，時差沒調好",
                            effects: { 
                                bullshit: 20, 
                                fantasy: 15,
                                lazy: 5
                            }
                        },
                        {
                            text: "提出「時間是虛構的概念」的辯論報告",
                            effects: { 
                                iq: 15, 
                                fantasy: 10,
                                clownIndex: 10
                            }
                        }
                    ]
                },
                {
                    stage: '青少年',
                    tags: ['感情', '社交', '迴避'],
                    text: "曖昧對象問你週末要不要出來",
                    options: [
                        {
                            text: "拒絕，因為要睡到下週一",
                            effects: { 
                                lazy: 20,
                                socialFear: 15,
                                happiness: -10
                            }
                        },
                        {
                            text: "說你在閉關修練「社交反彈術」",
                            effects: { 
                                bullshit: 20,
                                fantasy: 10,
                                socialFear: 10
                            }
                        },
                        {
                            text: "回：我對人際關係過敏（打噴嚏）",
                            effects: { 
                                clownIndex: 15,
                                socialFear: 5,
                                fantasy: 10
                            }
                        }
                    ]
                },
                {
                    stage: '青少年',
                    tags: ['責任', '社交', '迴避'],
                    text: "班上在選幹部，你會？",
                    options: [
                        {
                            text: "自薦當「無作為總監」",
                            effects: { 
                                clownIndex: 20,
                                lazy: 15,
                                bullshit: 10
                            }
                        },
                        {
                            text: "提案新增「發呆代表」",
                            effects: { 
                                fantasy: 15,
                                lazy: 10,
                                iq: 5
                            }
                        },
                        {
                            text: "被推上去但整年沒出現一次",
                            effects: { 
                                socialFear: 20,
                                lazy: 15,
                                happiness: -10
                            }
                        }
                    ]
                },
                // 成年階段 (13歲以上)
                {
                    stage: '成年',
                    tags: ['工作', '藉口', '創意'],
                    text: "公司要求加班，你的回應是？",
                    options: [
                        {
                            text: "說你得去照顧你的「寵物石頭」",
                            effects: { 
                                bullshit: 20,
                                fantasy: 15,
                                money: -10
                            }
                        },
                        {
                            text: "裝忙：桌上擺滿零食包裝",
                            effects: { 
                                clownIndex: 15,
                                lazy: 10,
                                happiness: 5
                            }
                        },
                        {
                            text: "發給主管「躺平」貼圖後消失",
                            effects: { 
                                socialFear: 15,
                                lazy: 20,
                                money: -15
                            }
                        }
                    ]
                },
                {
                    stage: '成年',
                    tags: ['生活', '經濟', '創意'],
                    text: "房東通知漲租，你會？",
                    options: [
                        {
                            text: "宣布你要和蟑螂共組政黨",
                            effects: { 
                                clownIndex: 20,
                                fantasy: 15,
                                money: -10
                            }
                        },
                        {
                            text: "提議用「存在感」當房租",
                            effects: { 
                                bullshit: 20,
                                iq: 5,
                                money: -5
                            }
                        },
                        {
                            text: "搬去紙箱，當「紙箱王」",
                            effects: { 
                                fantasy: 20,
                                socialFear: 10,
                                money: 10
                            }
                        }
                    ]
                },
                {
                    stage: '成年',
                    tags: ['社交', '藉口', '創意'],
                    text: "同事問你週末要不要聚會？",
                    options: [
                        {
                            text: "說你要去火星出差",
                            effects: { 
                                fantasy: 20,
                                bullshit: 15,
                                happiness: -5
                            }
                        },
                        {
                            text: "回「我的心已經出席了」",
                            effects: { 
                                clownIndex: 15,
                                socialFear: 10,
                                bullshit: 10
                            }
                        },
                        {
                            text: "答應但當天「因為轉生成魚」",
                            effects: { 
                                fantasy: 15,
                                bullshit: 20,
                                happiness: -10
                            }
                        }
                    ]
                },
                {
                    stage: '成年',
                    tags: ['學習', '生活', '迴避'],
                    text: "大學開學第一天，你？",
                    options: [
                        {
                            text: "開完學就消失三年",
                            effects: { 
                                lazy: 25,
                                socialFear: 20,
                                money: -10
                            }
                        },
                        {
                            text: "誤入哲學系，開始發表虛無論文",
                            effects: { 
                                fantasy: 20,
                                bullshit: 15,
                                iq: 5
                            }
                        },
                        {
                            text: "報名九門課，實際只去一堂（因為教室冷氣最強）",
                            effects: { 
                                clownIndex: 15,
                                lazy: 20,
                                money: -5
                            }
                        }
                    ]
                },
                {
                    stage: '成年',
                    tags: ['工作', '人生規劃', '夢想'],
                    text: "工作面試官問你5年計畫？",
                    options: [
                        {
                            text: "「希望我爸還願意養我」",
                            effects: { 
                                lazy: 20,
                                bullshit: 10,
                                money: -15
                            }
                        },
                        {
                            text: "「我要開一間專門關門的咖啡店」",
                            effects: { 
                                fantasy: 25,
                                clownIndex: 15,
                                money: -10
                            }
                        },
                        {
                            text: "「我打算每天都睡到下午三點，然後找一下意義」",
                            effects: { 
                                lazy: 25,
                                fantasy: 15,
                                socialFear: 5
                            }
                        }
                    ]
                },
                {
                    stage: '成年',
                    tags: ['經濟', '決策', '創意'],
                    text: "你中了一點小樂透，會怎麼處理？",
                    options: [
                        {
                            text: "買一堆超廢訂閱制（雜誌、冷凍年糕、宇宙能量指數）",
                            effects: { 
                                clownIndex: 20,
                                money: 15,
                                fantasy: 10
                            }
                        },
                        {
                            text: "用來買床，然後永久躺下",
                            effects: { 
                                lazy: 30,
                                happiness: 15,
                                socialFear: 10
                            }
                        },
                        {
                            text: "成立「無所作為基金會」",
                            effects: { 
                                bullshit: 25,
                                clownIndex: 15,
                                money: 10
                            }
                        }
                    ]
                },
                {
                    stage: '成年',
                    tags: ['工作', '職涯', '生活'],
                    text: "面試通過了！選擇你的第一份工作：",
                    options: [
                        {
                            text: "手搖店店員（專門偷喝試喝品、躲在冷藏庫休息）",
                            effects: { 
                                clownIndex: 15,
                                health: -5,
                                lazy: 10
                            }
                        },
                        {
                            text: "辦公室文書（一天改一個 Excel 格式）",
                            effects: { 
                                lazy: 20,
                                happiness: -10,
                                money: 15
                            }
                        },
                        {
                            text: "靈性導師（靠塔羅牌隨便唬爛人生建議）",
                            effects: { 
                                bullshit: 25,
                                fantasy: 20,
                                money: 10
                            }
                        }
                    ]
                },
                {
                    stage: '成年',
                    tags: ['工作', '責任', '藉口'],
                    text: "主管派你做報告，明早交",
                    options: [
                        {
                            text: "用舊報告直接複製貼上，改標題",
                            effects: { 
                                lazy: 20,
                                bullshit: 15,
                                iq: -5
                            }
                        },
                        {
                            text: "說你資料存在 AI 裡，但它靜靜生氣了",
                            effects: { 
                                fantasy: 20,
                                bullshit: 20,
                                clownIndex: 10
                            }
                        },
                        {
                            text: "回信：「我選擇不參與資本主義遊戲」",
                            effects: { 
                                socialFear: 15,
                                lazy: 15,
                                money: -20
                            }
                        }
                    ]
                },
                {
                    stage: '成年',
                    tags: ['工作', '紀律', '藉口'],
                    text: "週一早上 9:02，你剛醒",
                    options: [
                        {
                            text: "傳訊：「塞在無形的精神堵塞中」",
                            effects: { 
                                bullshit: 25,
                                lazy: 15,
                                fantasy: 10
                            }
                        },
                        {
                            text: "打開筆電，假裝開 Teams，實際開 YouTube",
                            effects: { 
                                clownIndex: 15,
                                lazy: 20,
                                happiness: 5
                            }
                        },
                        {
                            text: "完全不理會，等被炒",
                            effects: { 
                                socialFear: 20,
                                lazy: 25,
                                money: -30
                            }
                        }
                    ]
                },
                // 社會階段 (14歲以上)
                {
                    stage: '社會',
                    tags: ['人生規劃', '夢想', '理想'],
                    text: "你參加了一個關於人生的講座，講者問你對未來的看法",
                    options: [
                        {
                            text: "我希望能買得起一棟房子，然後養一堆貓",
                            effects: { 
                                fantasy: 15, 
                                money: -10,
                                happiness: 10
                            }
                        },
                        {
                            text: "我想成為網紅，讓全世界都知道我的名字",
                            effects: { 
                                clownIndex: 20, 
                                socialFear: -10,
                                bullshit: 10
                            }
                        },
                        {
                            text: "我希望能活得像電影裡的主角，驚險又刺激",
                            effects: { 
                                fantasy: 25, 
                                clownIndex: 15,
                                iq: 5
                            }
                        }
                    ]
                },
                {
                    stage: '社會',
                    tags: ['社交', '工作', '平衡'],
                    text: "朋友邀請你去參加派對，但你正在忙著工作",
                    options: [
                        {
                            text: "拒絕邀請，繼續努力工作",
                            effects: { 
                                lazy: -10,
                                happiness: -10,
                                money: 20
                            }
                        },
                        {
                            text: "說服朋友們改在你家辦派對",
                            effects: { 
                                socialFear: 10,
                                happiness: 15,
                                money: -5
                            }
                        },
                        {
                            text: "帶著工作去派對，順便發現新商機",
                            effects: { 
                                clownIndex: 10,
                                fantasy: 10,
                                money: 15
                            }
                        }
                    ]
                },
                {
                    stage: '社會',
                    tags: ['社交', '生活', '分享'],
                    text: "你在公園遇到一位老朋友，他問你最近怎麼樣",
                    options: [
                        {
                            text: "忙著追求夢想，幾乎沒時間休息",
                            effects: { 
                                lazy: -15,
                                happiness: 10,
                                iq: 5
                            }
                        },
                        {
                            text: "剛換工作，還在適應中",
                            effects: { 
                                socialFear: 10,
                                happiness: 5,
                                money: -5
                            }
                        },
                        {
                            text: "生活很充實，謝謝關心！",
                            effects: { 
                                happiness: 15,
                                health: 5,
                                fantasy: 5
                            }
                        }
                    ]
                },
                {
                    stage: '社會',
                    tags: ['學習', '決策', '人生規劃'],
                    text: "你考慮要不要繼續深造",
                    options: [
                        {
                            text: "是的，我想去國外念書",
                            effects: { 
                                fantasy: 20,
                                iq: 15,
                                money: -20
                            }
                        },
                        {
                            text: "不，我覺得實務經驗更重要",
                            effects: { 
                                lazy: 10,
                                happiness: 5,
                                money: 10
                            }
                        },
                        {
                            text: "還在猶豫中...",
                            effects: { 
                                socialFear: 10,
                                happiness: 5,
                                iq: 5
                            }
                        }
                    ]
                },
                {
                    stage: '社會',
                    tags: ['社會責任', '公益', '價值'],
                    text: "你參加了一個志願者活動",
                    options: [
                        {
                            text: "非常有意義，我學到了很多",
                            effects: { 
                                happiness: 20,
                                health: 10,
                                fantasy: 5
                            }
                        },
                        {
                            text: "有點無聊，但還是堅持完成了",
                            effects: { 
                                lazy: 5,
                                happiness: 5,
                                money: -5
                            }
                        },
                        {
                            text: "我只是想要志工時數而已",
                            effects: { 
                                clownIndex: 10,
                                bullshit: 10,
                                money: 5
                            }
                        }
                    ]
                },
                {
                    stage: '社會',
                    tags: ['工作', '職涯', '決策'],
                    text: "你在考慮換工作",
                    options: [
                        {
                            text: "是的，這份工作讓我覺得很不快樂",
                            effects: { 
                                lazy: 10,
                                happiness: -10,
                                money: -5
                            }
                        },
                        {
                            text: "不，我覺得這份工作還不錯",
                            effects: { 
                                happiness: 10,
                                health: 5,
                                money: 5
                            }
                        },
                        {
                            text: "我在等更好的機會",
                            effects: { 
                                fantasy: 10,
                                iq: 5,
                                money: 5
                            }
                        }
                    ]
                },
                {
                    stage: '社會',
                    tags: ['工作', '成就', '態度'],
                    text: "你收到一份來自老闆的表揚信",
                    options: [
                        {
                            text: "感到很驚訝，原來我做的事情有被注意到",
                            effects: { 
                                happiness: 20,
                                health: 5,
                                iq: 5
                            }
                        },
                        {
                            text: "老闆終於開眼了",
                            effects: { 
                                clownIndex: 10,
                                bullshit: 10,
                                money: 5
                            }
                        },
                        {
                            text: "這只是個開始，我要繼續努力",
                            effects: { 
                                lazy: -5,
                                happiness: 10,
                                iq: 10
                            }
                        }
                    ]
                },
                {
                    stage: '社會',
                    tags: ['創業', '人生規劃', '決策'],
                    text: "你考慮要不要創業",
                    options: [
                        {
                            text: "是的，我有很多創意想實現",
                            effects: { 
                                fantasy: 25,
                                iq: 15,
                                money: -50
                            }
                        },
                        {
                            text: "不，我比較喜歡穩定的生活",
                            effects: { 
                                lazy: 10,
                                happiness: 5,
                                money: 20
                            }
                        },
                        {
                            text: "還在考慮中，創業風險好像很大",
                            effects: { 
                                socialFear: 10,
                                happiness: 5,
                                iq: 5
                            }
                        }
                    ]
                },
                {
                    stage: '社會',
                    tags: ['職涯', '學習', '成長'],
                    text: "你參加了一個職涯規劃的工作坊",
                    options: [
                        {
                            text: "非常有幫助，我對未來更有方向了",
                            effects: { 
                                happiness: 15,
                                health: 5,
                                iq: 10
                            }
                        },
                        {
                            text: "有點無聊，但至少知道自己不適合什麼",
                            effects: { 
                                lazy: 5,
                                happiness: 5,
                                money: -5
                            }
                        },
                        {
                            text: "我只是想要免費的午餐",
                            effects: { 
                                clownIndex: 10,
                                bullshit: 10,
                                money: 5
                            }
                        }
                    ]
                },
                {
                    stage: '社會',
                    tags: ['健康', '生活', '決策'],
                    text: "你在考慮要不要參加健身房",
                    options: [
                        {
                            text: "是的，我想要變得更健康",
                            effects: { 
                                health: 15,
                                happiness: 10,
                                money: -30
                            }
                        },
                        {
                            text: "不，我覺得自己還好",
                            effects: { 
                                lazy: 5,
                                happiness: 5,
                                money: 10
                            }
                        },
                        {
                            text: "還在猶豫中，健身房的合約好像很貴",
                            effects: { 
                                socialFear: 5,
                                happiness: 5,
                                iq: 5
                            }
                        }
                    ]
                }
            ],
            events: [],
            gameInterval: null,
            achievements: {
                sleepMaster: false,    // 瞇眼生存獎章
                socialAvoid: false,    // 社交反彈高手
                bullshitKing: false,    // 鬼話連篇王者
                ultimateWaste: false    // 究極廢物
            },
            stages: ['幼兒園', '國小', '青少年', '成年', '社會'],
            questionsPerStage: {
                '幼兒園': 3,
                '國小': 2,
                '青少年': 3,
                '成年': 6,
                '社會': 10  // 社會階段10個問題
            },
            characterTypes: {
                lazyEfficient: {
                    title: "💤 半主動型高效躺平者",
                    description: "你很有效率地不做任何事，擅長用最少動能活下來。",
                    threshold: {
                        lazy: 9,
                        addiction: 4,
                        socialFear: 5,
                        procrastination: 7,
                        philosophy: 2,
                        salary: 6
                    }
                },
                virtualLover: {
                    title: "🧚 情感真空式虛擬戀人",
                    description: "你的社交來自戀愛模擬器，真實人類請勿打擾。",
                    threshold: {
                        lazy: 6,
                        addiction: 10,
                        socialFear: 9,
                        procrastination: 4,
                        philosophy: 5,
                        salary: 3
                    }
                },
                socialMinimalist: {
                    title: "🤐 自動封鎖型人際簡約主義者",
                    description: "每一次互動都是負擔，你已達到人類社交最簡化形式。",
                    threshold: {
                        lazy: 4,
                        addiction: 6,
                        socialFear: 10,
                        procrastination: 5,
                        philosophy: 6,
                        salary: 4
                    }
                },
                pseudoPhilosopher: {
                    title: "🧠 偽深層式自我辯證者",
                    description: "你擅長將無作為說成「順應宇宙秩序」，是生活中的語言煉金術士。",
                    threshold: {
                        lazy: 8,
                        addiction: 5,
                        socialFear: 6,
                        procrastination: 6,
                        philosophy: 10,
                        salary: 2
                    }
                },
                shadowEmployee: {
                    title: "💼 被動發薪型影子員工",
                    description: "你成功實現社會版的「無聲存在」，連同事都懷疑你是不是AI。",
                    threshold: {
                        lazy: 5,
                        addiction: 3,
                        socialFear: 8,
                        procrastination: 7,
                        philosophy: 5,
                        salary: 10
                    }
                },
                activeProcrastinator: {
                    title: "⏳ 積極被動型拖延實踐者",
                    description: "你對事情從不拒絕，但也從不開始。你不是不做事，只是還在醞釀一個完美時機……永遠。",
                    threshold: {
                        lazy: 7,
                        addiction: 6,
                        socialFear: 5,
                        procrastination: 10,
                        philosophy: 7,
                        salary: 6
                    }
                }
            }
        }
    },    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        ending() {
            const { money, happiness, health, iq, clownIndex, fantasy, lazy, wasteLevel } = this.character;
            
            // 新增廢度指數相關結局
            if (wasteLevel >= 80) {
                return {
                    title: "🦥 究極廢物終極體",
                    description: "恭喜你！你已經廢到連呼吸都嫌麻煩了！"
                };
            }
            if (lazy >= 90) {
                return {
                    title: "😴 宇宙級躺平大師",
                    description: "你把懶惰發展成了一門藝術，真是令人欽佩！"
                };
            }
            if (clownIndex >= 80) {
                return {
                    title: "🤡 地表最強白癡",
                    description: "你的人生充滿了笑料，成為了一個活生生的迷因製造機！"
                };
            }
            if (fantasy >= 80) {
                return {
                    title: "🦄 幻想大師",
                    description: "現實對你來說太無聊了，你活在自己的童話世界裡～"
                };
            }
            if (money <= 20 && happiness >= 70) {
                return {
                    title: "🎭 快樂的窮鬼",
                    description: "誰說沒錢就不能開心？你活出了真我！"
                };
            }
            return {
                title: "😅 平凡社畜",
                description: "至少你還活著...而且偶爾也會裝死"
            };
        },
        finalCharacterType() {
            // 將角色屬性換算成10分制
            const traits = {
                lazy: Math.floor(this.character.lazy / 10),
                addiction: Math.floor((this.character.clownIndex + this.character.fantasy) / 20),
                socialFear: Math.floor(this.character.socialFear / 10),
                procrastination: Math.floor((this.character.lazy + this.character.bullshit) / 20),
                philosophy: Math.floor((this.character.fantasy + this.character.bullshit) / 20),
                salary: Math.floor((this.character.money + this.character.iq) / 20)
            };

            // 計算每個角色類型的匹配度
            const matchScores = Object.entries(this.characterTypes).map(([type, data]) => {
                const score = Object.entries(data.threshold).reduce((total, [trait, value]) => {
                    const diff = Math.abs(traits[trait] - value);
                    return total - diff;
                }, 0);
                return { type, score };
            });

            // 找出匹配度最高的角色類型
            const bestMatch = matchScores.reduce((best, current) => 
                current.score > best.score ? current : best
            );

            return this.characterTypes[bestMatch.type];
        },
        canStartGame() {
            return this.playerName.trim() !== '' && this.selectedTemplate !== null;
        },
        totalProgress() {
            const totalQuestions = this.questions.length;
            return Math.min(100, (this.currentQuestionIndex / totalQuestions) * 100);
        }
    },
    methods: {
        // 開始遊戲
        startGame() {
            if (this.gameState === 'start') {
                this.gameState = 'gender';
                this.addEvent("開始了一段不太正經的人生旅程...");
            } else if (this.gameState === 'gender' && this.canStartGame) {
                this.gameState = 'playing';
                this.character.stage = '幼兒園';  // 確保從幼兒園開始
                this.currentQuestionIndex = 0;    // 重置問題索引
                this.addEvent(`${this.playerName} 開始了新的人生！`);
                const template = this.characterTemplates[this.selectedTemplate];
                this.addEvent(`選擇了 ${template.title} 型人生！`);
            }
        },

        // 選擇性別
        selectGender(gender) {
            this.character.gender = gender;
            if (gender === 'unknown') {
                this.character.clownIndex += 10;
                this.addEvent("連性別都搞不清楚，這人生絕對很精彩！🤣");
            }
            this.gameState = 'playing';
        },

        // 工作
        work() {
            const earnedMoney = Math.floor(Math.random() * 500) + 200;
            this.character.money += earnedMoney;
            this.character.health -= 10;
            this.character.happiness -= 15;
            this.addEvent(`你工作賺取了 $${earnedMoney}！`);
            this.checkStatus();
        },
        
        // 學習
        study() {
            this.character.happiness -= 10;
            this.character.health -= 5;
            this.addEvent('你學到了新知識！');
            this.checkStatus();
        },
        
        // 休息
        relax() {
            this.character.health += 15;
            this.character.happiness += 20;
            this.character.money -= 100;
            this.addEvent('你好好休息了一下，感覺精神多了！');
            this.checkStatus();
        },
        
        // 社交
        socialize() {
            this.character.happiness += 25;
            this.character.money -= 200;
            this.character.health -= 5;
            this.addEvent('你和朋友們度過了愉快的時光！');
            this.checkStatus();
        },
        
        // 新增事件到日誌
        addEvent(message) {
            this.events.push({
                text: message
            });
            if (this.events.length > 10) {
                this.events.shift();
            }
            // 確保在下一個 tick 時滾動到最新事件
            this.$nextTick(() => {
                const eventsLog = document.querySelector('.events-log');
                if (eventsLog) {
                    eventsLog.scrollTop = eventsLog.scrollHeight;
                }
            });
        },

        // 獲取屬性對應的表情符號
        getAttributeEmoji(key) {
            const emojiMap = {
                money: '💰',
                happiness: '🤣',
                health: '💪',
                iq: '🧠',
                clownIndex: '🤡',
                fantasy: '🦄',
                lazy: '😴',
                socialFear: '😨',
                bullshit: '🗯'
            };
            return emojiMap[key] || '❓';
        },

        // 選擇選項
        selectOption(option) {
            if (!this.currentQuestion) return;  // 如果沒有當前問題，直接返回
            
            const changes = {};
            Object.entries(option.effects).forEach(([key, value]) => {
                this.character[key] = Math.max(0, Math.min(100, this.character[key] + value));
                changes[key] = value;
            });
            
            // 更新廢度指數
            if (this.character.lazy > 70 || this.character.socialFear > 70) {
                this.character.wasteLevel += 10;
            }
            if (this.character.bullshit > 60 && this.character.fantasy > 60) {
                this.character.wasteLevel += 5;
            }
            
            // 檢查特殊廢物成就
            if (this.character.wasteLevel >= 80 && !this.achievements.ultimateWaste) {
                this.achievements.ultimateWaste = true;
                this.addEvent("🏆 解鎖成就：究極廢物！");
            }
            
            // 檢查成就
            this.checkAchievements();
            
            // 更新年齡和階段
            this.updateLifeStage();
            
            // 添加事件記錄（包含屬性變化）
            this.events.push({
                text: `你選擇了：${option.text}`,
                changes: changes
            });
            
            // 確保滾動到最新事件
            this.$nextTick(() => {
                const eventsLog = document.querySelector('.events-log');
                if (eventsLog) {
                    eventsLog.scrollTop = eventsLog.scrollHeight;
                }
            });
            
            // 移動到下一個問題
            this.currentQuestionIndex++;
            
            // 如果所有問題都回答完了，進入結局
            if (this.currentQuestionIndex >= this.questions.length) {
                this.gameState = 'end';
                this.addEvent("🎭 你的荒謬人生故事已經寫完了...");
            }
            
            this.checkStatus();
        },

        // 獲取當前階段的索引
        getStageIndex(stage) {
            return this.stages.indexOf(stage);
        },

        // 計算特定階段的完成進度
        getStageProgress(stageIndex) {
            const currentStage = this.stages[stageIndex];
            const currentStageQuestions = this.questions.filter(q => q.stage === currentStage);
            
            if (this.character.stage !== currentStage) {
                // 如果不是當前階段，要麼是 100%（已完成），要麼是 0%（未開始）
                return this.getStageIndex(this.character.stage) > stageIndex ? 100 : 0;
            }
            
            // 計算當前階段的完成度
            const questionsInStage = currentStageQuestions.length;
            const completedQuestions = this.currentQuestionIndex - 
                this.questions.filter(q => q.stage !== currentStage && 
                    this.getStageIndex(q.stage) < stageIndex).length;
            
            return Math.min(100, (completedQuestions / questionsInStage) * 100);
        },
        
        // 檢查成就
        checkAchievements() {
            if (this.character.lazy >= 80) {
                if (!this.achievements.sleepMaster) {
                    this.achievements.sleepMaster = true;
                    this.addEvent("🏆 獲得成就：瞇眼生存獎章");
                }
            }
            if (this.character.socialFear >= 80) {
                if (!this.achievements.socialAvoid) {
                    this.achievements.socialAvoid = true;
                    this.addEvent("🏆 獲得成就：社交反彈高手");
                }
            }
            if (this.character.bullshit >= 80) {
                if (!this.achievements.bullshitKing) {
                    this.achievements.bullshitKing = true;
                    this.addEvent("🏆 獲得成就：鬼話連篇王者");
                }
            }
            if (this.character.wasteLevel >= 80) {
                if (!this.achievements.ultimateWaste) {
                    this.achievements.ultimateWaste = true;
                    this.addEvent("🏆 解鎖成就：究極廢物");
                }
            }
        },

        // 更新人生階段
        updateLifeStage() {
            const prevStage = this.character.stage;
            
            // 根據已回答的問題數量來決定階段
            const stagesCompleted = Math.floor(this.currentQuestionIndex / 3);  // 每3個問題進入下一階段
            
            // 確保不會超過最後階段
            const nextStageIndex = Math.min(stagesCompleted, this.stages.length - 1);
            this.character.stage = this.stages[nextStageIndex];
            
            // 如果進入新階段，添加提示
            if (prevStage !== this.character.stage) {
                this.addEvent(`🎭 進入了${this.character.stage}時期！`);
            }
        },

        // 重新開始遊戲
        restartGame() {
            this.gameState = 'start';
            this.character = {
                gender: '',
                money: 50,
                happiness: 50,
                health: 50,
                iq: 50,
                clownIndex: 0,
                fantasy: 0,
                lazy: 0,
                socialFear: 0,
                bullshit: 0,
                wasteLevel: 0,
                stage: '幼兒園'
            };
            this.currentQuestionIndex = 0;
            this.events = [];
            if (this.gameInterval) {
                clearInterval(this.gameInterval);
            }
        },
        endGame() {
            this.gameState = 'end';
            const finalType = this.finalCharacterType;
            this.addEvent(`🎭 你的荒謬人生結局：${finalType.title}`);
            this.addEvent(`📝 ${finalType.description}`);
        },
        selectCharacter(index) {
            this.selectedTemplate = index;
            const template = this.characterTemplates[index];
            this.character.money = template.money;
            this.character.health = template.health;
            this.character.happiness = template.happiness;
        }
    },
    mounted() {
        // 遊戲初始化時不自動開始
    },
    beforeUnmount() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
    }
})

app.mount('#app')
