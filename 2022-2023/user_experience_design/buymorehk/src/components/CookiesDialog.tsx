"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "./@mui/material";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type CookiesDialogProp = {
  isNeedOpen: RequestCookie | undefined;
}

const CookiesDialog: React.FC<CookiesDialogProp> = ({ isNeedOpen }) => {
  const [open, setOpen] = useState<boolean>(isNeedOpen === undefined);

  const router = useRouter();

  const handleAccept = () => {
    setOpen(false);
    let cookie = "cookie_setting=true;";
    document.cookie = cookie;
    router.refresh();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
      fullWidth
    >
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Cookies 設定"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            我們使用 cookie
            和類似技術來幫助個性化內容，並提供更好的體驗。點擊“接受”即表示您同意我們的
            Cookie 政策中所述內容。
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleAccept} variant="contained" color="success">
            同意
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            拒絕
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default CookiesDialog;
