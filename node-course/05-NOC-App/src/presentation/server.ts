import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service';


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class Server {
    public static start() {
        console.log('Server started...')
        
        // const emailService = new EmailService(
        //     fileSystemLogRepository
        // );
        // emailService.sendEmailWithFileSysyemLogs('zagoagus@gmail.com')

        
        // const url = 'https://google.com'
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         new CheckService(
        //             () => console.log( `${url} is ok` ),
        //             ( error ) => console.log( error ),
        //             fileSystemLogRepository
        //         ).execute( 'https://google.com')
        //         // new CheckService().execute( 'http://localhost:3000')
        //     }
        // );
    }
}