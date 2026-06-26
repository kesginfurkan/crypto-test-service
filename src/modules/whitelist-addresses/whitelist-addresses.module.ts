import {Module} from '@nestjs/common';

import {WHITELIST_REPOSITORY} from './domain/repositories/whitelist-address.repository';
import {PrismaWhitelistAddressRepository} from './infrastructure/persistence/prisma/prisma-whitelist-address.repository';

@Module({
    providers:[{
        provide:WHITELIST_REPOSITORY,
        useClass:PrismaWhitelistAddressRepository,
    }],
    exports:[WHITELIST_REPOSITORY],
})
export class WhitelistAddressesModule {}