import {BlockchainNetwork} from '../../../../transactions/domain/enums/blockchain-network.enum';

export class AddWhitelistAddressUseCase {
    constructor(
        public readonly userId:string,
        public readonly label:string,
        public readonly address:string,
        public readonly network:BlockchainNetwork,
    ) {}
}