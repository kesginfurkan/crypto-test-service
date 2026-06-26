import {Module} from '@nestjs/common';

import {WALLET_REPOSITORY} from './domain/repositories/wallet.repository';
import {PrismaWalletRepository} from './infrastructure/persistence/prisma/prisma-wallet.repository';

@Module({
    providers: [{
        provide:WALLET_REPOSITORY,
        useClass:PrismaWalletRepository,
    }],
    exports:[WALLET_REPOSITORY],
})
export class WalletsModule {}