import { CronJob } from 'cron';
import { Server } from './presentation/server';
import { envs } from './config/plugins/envs.plugin'
import { MongoDataBase } from './data/mongo/init';
import { LogModel } from './data/mongo/models/log.model';

(async() => {
    main()
})();

async function main() {
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    Server.start()
}