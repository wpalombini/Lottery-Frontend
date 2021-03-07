import Web3 from 'web3';

export class BlockchainService {
  private _window: any = window as any;
  private web3: Web3;

  public async isConnected(): Promise<boolean> {
    return typeof this.web3 !== 'undefined' && (await this.web3.eth.getChainId()) > 0;
  }

  public async connect(): Promise<void> {
    if (this._window.ethereum) {
      try {
        this.web3 = new Web3(this._window.ethereum);
        const defaultAccount = await this._window.ethereum.enable();
        this.web3.eth.defaultAccount = defaultAccount[0];
      } catch (error) {
        throw new Error('could not connect to the blockchain');
      }
    } else {
      throw new Error('Please use MetaMask');
    }
  }

  public getCurrentAccountAddress(): string | null {
    return this.web3.eth.defaultAccount;
  }

  public async getBalance(): Promise<string> {
    if (await this.isConnected()) {
      return Number(
        this.web3.utils.fromWei(await this.web3.eth.getBalance(this.web3.eth.defaultAccount as string)),
      ).toFixed(5);
    } else {
      throw new Error('Not connected to blockchain network.');
    }
  }
}
