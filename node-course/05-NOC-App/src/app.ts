import { CronJob } from 'cron';
import { Server } from './presentation/server';


(async() => {
    main()
})();

function main() {
    Server.start()
}