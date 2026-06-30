import {Body, Controller, Post, Headers} from '@nestjs/common';

import {AddWhitelistAddressDTO} from '../dto/add-whitelist-address.dto';
import {AddWhitelistAddressHttpMapper} from '../mappers/add-whitelist-address-http.mapper';
import {AddWhitelistAddressHandler} from '../../../application/use-cases/add-whitelist-address/add-whitelist-address.handler';

@Controller('whitelist-addresses')
export class WhitelistAddressesController {
    constructor(private readonly addWhitelistAddressesHandler:AddWhitelistAddressHandler){}

    @Post()
    async addWhitelistAddresses(
        @Headers('x-user-id') userId:string,
        @Body() addWhitelistAddressesDto: AddWhitelistAddressDTO,
    ) {
        const useCase = AddWhitelistAddressHttpMapper.toUseCase(userId, addWhitelistAddressesDto);

        return this.addWhitelistAddressesHandler.execute(useCase);
    }
}