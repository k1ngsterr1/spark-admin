import { AddRequest, DeleteRequest, UpdateRequest } from '@core/utils/Redis/Request';
import { createClient, RedisClientType } from 'redis';
const REDIS_URL: string = process.env.REDIS_URL;

// Подключение и взоимодействие с хэшом
export class Redis {
  private static client: RedisClientType;

  private static isConnected() {
    if (!Redis.client) {
      Redis.client = createClient({
        url: REDIS_URL
      });
      Redis.client.on('error', (err) => console.log('Redis Client Error', err));

      Redis.client.connect()
        .then(() => console.log('Connected to Redis'))
        .catch(err => console.log('Error connecting to Redis:', err));
    }
  }

  public async add(request: AddRequest): Promise<void>{
    Redis.isConnected();
    let { table, key, data } = request;
    try{
        key = String(key);
        const serialized_data = JSON.stringify(data);
        await Redis.client.hSet(table, key, serialized_data,);
        console.log("added hash");
    } catch(error){
        console.log("Error with adding hash", error);
    }
  }

  public async del(request: DeleteRequest): Promise<void>{
    Redis.isConnected();
    let { table, key } = request;
    try{
        key = String(key);
        await Redis.client.hDel(table, key);
        console.log("deleted hash");
    } catch(error){
        console.log("Error with adding hash", error);
    }
  }

  public async update(request: UpdateRequest): Promise<void>{
    Redis.isConnected();
    let { table, key, data } = request;
    try{
        key = String(key);
        const serialized_data = JSON.stringify(data);
        await Redis.client.hSet(table, key, serialized_data);
        console.log("updated hash");
    } catch(error){
        console.log("Error with updating hash", error);
    }
  }
}

export default new Redis();