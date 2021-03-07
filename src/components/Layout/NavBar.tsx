import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BlockchainStateModel } from './Layout';

export interface INavBarProps {
  blockchain: BlockchainStateModel;
  getBalanceHandler: () => Promise<void>;
  accountClickHandler: (content: JSX.Element) => void;
  connectHandler: () => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const NavBar: (props: INavBarProps) => JSX.Element = (props: INavBarProps): JSX.Element => {
  const classes = useStyles();

  useEffect(() => {
    const getBalance: () => Promise<void> = async (): Promise<void> => {
      if (props.blockchain.isConnected) {
        await props.getBalanceHandler();
      }
    };

    console.log('NavBar > useEffect > BEFORE getBalance');
    getBalance();
    console.log('NavBar > useEffect > AFTER getBalance');
  }, [props.blockchain.isConnected]);

  const balanceContainer: JSX.Element = props.blockchain.accountAddress ? (
    <Button
      onClick={() =>
        props.accountClickHandler(
          <div>
            <h3>{props.blockchain.balance}</h3>
          </div>,
        )
      }
      color="inherit"
    >
      {props.blockchain.accountAddress}
    </Button>
  ) : (
    <Button onClick={props.connectHandler} color="inherit">
      Connect Wallet
    </Button>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Lottery
          </Typography>
          {balanceContainer}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
