const { createApp } = Vue

const app = createApp({
    data() {
        return {
            gameState: 'start', // 'start', 'gender', 'playing', 'end'
            character: {
                gender: '',
                age: 0,
                money: 50,        // 💰 初始金錢值
                happiness: 50,    // 🤣 初始快樂值
                health: 50,       // 💪 初始健康值
                iq: 50,          // 🧠 初始智商值
                clownIndex: 0,   // 🤡 初始胡鬧指數
                fantasy: 0,      // 🦄 初始幻想值
            },
            currentQuestionIndex: 0,
            questions: [
                {
                    text: "小時候最愛的玩具是什麼？",
                    options: [
                        {
                            text: "球球（至少很正常）",
                            effects: { iq: 5, happiness: 5 }
                        },
                        {
                            text: "木棍（在家打地鼠）",
                            effects: { happiness: 10, clownIndex: 5 }
                        },
                        {
                            text: "什麼都咬一下🤣",
                            effects: { iq: -10, clownIndex: 15, health: -5 }
                        }
                    ]
                },
                {
                    text: "上課時最喜歡做什麼？",
                    options: [
                        {
                            text: "認真聽講（假的吧）",
                            effects: { iq: 10, happiness: -5 }
                        },
                        {
                            text: "畫老師的魔鬼漫畫",
                            effects: { happiness: 10, clownIndex: 10, fantasy: 5 }
                        },
                        {
                            text: "研究課桌椅的材質",
                            effects: { iq: -5, clownIndex: 15 }
                        }
                    ]
                }
                // 其他問題待補充...
            ],
            events: [],
            gameInterval: null
        }
    },    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        ending() {
            // 根據屬性值決定結局
            const { money, happiness, health, iq, clownIndex, fantasy } = this.character;
            
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
            // 其他結局...
            return {
                title: "😅 平凡人生",
                description: "至少你活著畢業了..."
            };
        }
    },
    methods: {
        // 開始遊戲
        startGame() {
            this.gameState = 'gender';
            this.addEvent("開始了一段不太正經的人生旅程...");
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
        addEvent(event) {
            this.events.unshift(event);
            if (this.events.length > 10) {
                this.events.pop();
            }
        },
        
        // 檢查狀態
        checkStatus() {
            // 確保數值在合理範圍內
            this.character.health = Math.max(0, Math.min(100, this.character.health));
            this.character.happiness = Math.max(0, Math.min(100, this.character.happiness));
            
            // 檢查遊戲結束條件
            if (this.character.health <= 0) {
                this.addEvent('你的健康狀況很糟糕，需要立即就醫！');
            }
            if (this.character.happiness <= 0) {
                this.addEvent('你感到非常沮喪...');
            }
            if (this.character.money < 0) {
                this.addEvent('你破產了！');
            }
        },
          // 開始遊戲循環
        startGameLoop() {
            this.gameInterval = setInterval(() => {
                this.character.age += 0.1;
                // 每過一段時間自然消耗
                this.character.health -= 0.5;
                this.character.happiness -= 0.5;
                this.checkStatus();
            }, 1000);
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
