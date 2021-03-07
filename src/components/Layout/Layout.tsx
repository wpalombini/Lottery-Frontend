import React, { Fragment, useState } from 'react';
import { BlockchainService } from '../../services/BlockchainService';
import LotteryDialog from '../Dialog';
import NavBar from './NavBar';

export class BlockchainStateModel {
  public accountAddress: string | null;
  public isConnected: boolean;
  public balance: string;
}

const blockchainService: BlockchainService = new BlockchainService();

const Layout: () => JSX.Element = (): JSX.Element => {
  const [blockchain, setBlockchain] = useState(new BlockchainStateModel());
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedDialogValue, setSelectedDialogValue] = useState('');
  const [dialogContent, setDialogContent] = useState(null);

  const handleConnect: () => Promise<void> = async (): Promise<void> => {
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

  const handleGetBalance: () => Promise<void> = async (): Promise<void> => {
    const balance: string = await blockchainService.getBalance();

    setBlockchain({
      ...blockchain,
      balance: balance,
    });
  };

  const handleAccountAddressClick: (content: any) => void = (content: any) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleCloseDialog = (value: string) => {
    setDialogOpen(false);
    setSelectedDialogValue(value);
  };

  return (
    <Fragment>
      <NavBar
        accountClickHandler={handleAccountAddressClick}
        connectHandler={handleConnect}
        getBalanceHandler={handleGetBalance}
        blockchain={blockchain}
      />
      <LotteryDialog
        content={dialogContent}
        selectedValue={selectedDialogValue}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </Fragment>
  );
};

export default Layout;
