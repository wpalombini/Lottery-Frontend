import { Dialog, DialogContent } from '@material-ui/core';
import React from 'react';

export interface IDialogProps {
  content: JSX.Element | null;
  isOpen: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const LotteryDialog: (props: IDialogProps) => JSX.Element = (props: IDialogProps): JSX.Element => {
  const { onClose, selectedValue, isOpen } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={isOpen}>
      <DialogContent>{props.content}</DialogContent>
    </Dialog>
  );
};

export default LotteryDialog;
