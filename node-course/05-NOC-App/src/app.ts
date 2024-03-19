import { CronJob } from 'cron';
import { Server } from './presentation/server';
import { envs } from './config/plugins/envs.plugin'

(async() => {
    main()
})();

function main() {
    Server.start()
}