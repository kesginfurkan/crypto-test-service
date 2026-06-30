import {IsEthereumAddress, IsEnum, IsString, IsNotEmpty} from 'class-validator';
import {BlockchainNetwork} from '../../../../transactions/domain/enums/blockchain-network.enum';

export class AddWhitelistAddressDTO {
    @IsString()
    @IsNotEmpty()
    label!:string;

    @IsEthereumAddress()
    address!:string;

    @IsEnum(BlockchainNetwork)
    network!:BlockchainNetwork;
}
