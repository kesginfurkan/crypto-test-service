import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {PrismaModule} from '../src/shared/infrastructure/prisma/prisma.module';
import {TransactionsModule} from './modules/transactions/transactions.module';
import {WalletsModule} from './modules/wallets/wallets.module';
import {WhitelistAddressesModule} from './modules/whitelist-addresses/whitelist-addresses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    PrismaModule,
    TransactionsModule,
    WalletsModule,
    WhitelistAddressesModule,
  ],
})
export class AppModule {}
