require('dotenv').config();
const redis = require('redis');

async function initializeRedisClient() {
    try {
        let client;
        
        // Support for Railway REDIS_URL format (redis://default:password@host:port)
        if (process.env.REDIS_URL) {
            client = redis.createClient({
                url: process.env.REDIS_URL
            });
        } else {
            // Fallback to individual environment variables
            client = redis.createClient({
                username: 'default',
                password: process.env.DB_PASS,
                socket: {
                    host: process.env.HOST,
                    port: process.env.REDIS_PORT
                },
            });
        }

        setInterval(async () => {
            try {
              await client.ping();
            } catch (err) {
              console.error('❌ Redis ping failed:', err);
            }
          }, 60000); // ping every 60 seconds
          
        await client.connect().then(() => {
            console.log('✅ Connected to Redis');
        }).catch((err) => {
            console.error('❌ Redis connection error:', err);
        });

        return client;
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
        throw error;
    }
}

// Initialize Redis client immediately
const redisClient = initializeRedisClient();

module.exports = { redisClient };