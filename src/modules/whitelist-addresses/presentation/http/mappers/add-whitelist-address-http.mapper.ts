import {AddWhitelistAddressUseCase} from '../../../application/use-cases/add-whitelist-address/add-whitelist-address.use-case';
import {AddWhitelistAddressDTO} from '../dto/add-whitelist-address.dto';

export class AddWhitelistAddressHttpMapper {
    static toUseCase(userId:string, dto:AddWhitelistAddressDTO): AddWhitelistAddressUseCase {
        return new AddWhitelistAddressUseCase(
            userId,
            dto.label,
            dto.address,
            dto.network,
        );
    }
}