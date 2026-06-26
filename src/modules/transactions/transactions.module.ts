import {Module} from '@nestjs/common';

import {TRANSACTION_REPOSITORY} from './domain/repositories/transaction.repository';
import {PrismaTransactionRepository} from './infrastructure/persistence/prisma/prisma-transaction.repository';

@Module({
    providers: [{
        provide: TRANSACTION_REPOSITORY,
        useClass: PrismaTransactionRepository,
    }],
    exports:[TRANSACTION_REPOSITORY],
})
export class TransactionsModule {}