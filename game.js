const { createApp } = Vue

const app = createApp({
    data() {
        return {
            gameStarted: false,
            playerName: '',
            selectedTemplate: null,
            characterTemplates: [
                {
                    title: '富二代',
                    money: 1000000,
                    health: 100,
                    happiness: 90,
                    description: '含著金湯匙出生，起始資金豐厚，但人生是否順遂還要看你自己。'
                },
                {
                    title: '平凡學生',
                    money: 5000,
                    health: 100,
                    happiness: 80,
                    description: '普通的學生，擁有青春的活力，未來充滿各種可能。'
                },
                {
                    title: '奮鬥創業家',
                    money: 100000,
                    health: 90,
                    happiness: 70,
                    description: '懷抱創業夢想，擁有一些啟動資金，但面臨更大的壓力。'
                }
            ],
            character: {
                name: '',
                age: 18,
                health: 100,
                money: 1000,
                happiness: 100,
            },
            events: [],
            gameInterval: null
        }
    },    computed: {
        canStartGame() {
            return this.selectedTemplate !== null && this.playerName.trim() !== '';
        }
    },
    methods: {
        // 選擇角色
        selectCharacter(index) {
            this.selectedTemplate = index;
        },

        // 開始遊戲
        startGame() {
            if (!this.canStartGame) return;
            
            const template = this.characterTemplates[this.selectedTemplate];
            this.character = {
                name: this.playerName,
                age: 18,
                health: template.health,
                money: template.money,
                happiness: template.happiness
            };
            
            this.gameStarted = true;
            this.startGameLoop();
            this.addEvent(`${this.playerName}的人生旅程正式開始了！`);
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
