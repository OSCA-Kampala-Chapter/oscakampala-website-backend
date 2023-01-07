const { createClient } = require('redis');

const Redis = (function () {
    return {
        redisService: createClient(),
        startRedis: async function () {
            await this.redisService.connect();
            console.log('redis connected!');
        },
        set: async function (key, value) {
            await this.startRedis();
            await this.redisService.set(key, value, {
                EX: 604800, // 7 days period
                NX: true,
            });
            await this.redisService.disconnect();
        },
        get: async function (key) {
            await this.startRedis();
            // result
            const res = await this.redisService.get(key);
            await this.redisService.disconnect();
            return res;
        },
    };
})();

module.exports = Redis;
