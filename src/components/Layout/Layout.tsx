import React, { useState } from 'react';
import { BlockchainService } from '../../services/BlockchainService';
import NavBar from './NavBar';

class StateModel {
  public accountAddress: string | null;
  public isConnected: boolean;
  public balance: string;
}

const blockchainService: BlockchainService = new BlockchainService();

const Layout: () => JSX.Element = (): JSX.Element => {
  const [blockchain, setBlockchain] = useState(new StateModel());

  const onConnectHandler = async () => {
    try {
      await blockchainService.connect();

      setBlockchain({
        ...blockchain,
        accountAddress: blockchainService.getCurrentAccountAddress(),
        isConnected: true,
      });
    } catch (error) {
      console.log('onConnectHandler error: ', error);
    }
  };

  const onGetBalanceHandler = async (): Promise<void> => {
    const balance: string = await blockchainService.getBalance();

    setBlockchain({
      ...blockchain,
      balance: balance,
    });
  };

  return <NavBar connectHandler={onConnectHandler} getBalanceHandler={onGetBalanceHandler} blockchain={blockchain} />;
};

export default Layout;
