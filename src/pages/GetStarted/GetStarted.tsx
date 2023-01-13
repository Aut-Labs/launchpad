import { Box, Button, Container, styled, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "@store/store.model";
import {
  SelectedNetworkConfig,
  setProviderIsOpen
} from "@store/WalletProvider/WalletProvider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as GenesisImage } from "@assets/genesis.svg";
import AppTitle from "@components/AppTitle";
import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Config,
  Goerli
} from "@usedapp/core";

const Wrapper = styled(Container)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  height: "100%"
});

const GenesisImageWrapper = styled(GenesisImage)(({ theme }) => ({
  width: "100%",
  zIndex: "-1",
  position: "absolute",
  top: "50%",
  display: "none",
  transform: "translateY(-50%)",
  [theme.breakpoints.up("md")]: {
    display: "inherit",
    height: "662px",
    maxWidth: "662px",
    right: "calc(662px / 2 * -1)"
  },
  [theme.breakpoints.up("xxl")]: {
    height: "892px",
    maxWidth: "892px",
    right: "calc(892px / 2 * -1)"
  }
}));

const GetStarted = () => {
  const dispatch = useAppDispatch();
  const [connectInitiated, setConnectInitiated] = useState(false);
  const [canStartFromScratch, setCanStartFromScratch] = useState(false);
  const { active } = useEthers();
  const networkConfig = useSelector(SelectedNetworkConfig);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!connectInitiated) {
      return;
    }
    if (active && networkConfig) {
      start(canStartFromScratch);
    }
  }, [active, networkConfig, canStartFromScratch]);

  const goToIntegrate = (startFromScratch = false) => {
    setConnectInitiated(true);
    setCanStartFromScratch(startFromScratch);
    if (!active || !networkConfig) {
      dispatch(setProviderIsOpen(true));
    } else {
      start(startFromScratch);
    }
  };

  const start = (startFromScratch: boolean) => {
    const qParams = new URLSearchParams(location.search);
    qParams.set("startFromScratch", `${startFromScratch}`);
    history.push({
      pathname: "/integrate",
      search: qParams.toString()
    });
  };

  return (
    <Wrapper>
      <GenesisImageWrapper />
      <Box
        maxWidth={{
          xs: "100%",
          md: "600px",
          lg: "700px",
          xl: "800px",
          xxl: "900px"
        }}
      >
        <AppTitle
          mb={{
            xs: "32px",
            md: "46px",
            xxl: "100px"
          }}
        />
        <Typography
          component="p"
          variant="subtitle1"
          fontFamily="FractulAltBold"
          mb={{
            xs: "16px",
            md: "24px",
            xxl: "35px"
          }}
          color="white"
        >
          Do more with your DAO.
        </Typography>
        <Typography
          component="p"
          variant="subtitle2"
          mb={{
            xs: "16px",
            md: "24px",
            xxl: "35px"
          }}
          color="white"
        >
          Āut is an expandable Community protocol, powering the next level of
          collective coordination 🤝🫂
        </Typography>
        <Typography
          component="p"
          variant="subtitle2"
          mb={{
            xs: "16px",
            md: "24px",
            xxl: "35px"
          }}
          color="white"
        >
          By integrating it, you can expand your DAO contract - adding the
          concepts of Members Roles & Interactions directly on-chain.
        </Typography>
        <Typography
          component="p"
          variant="subtitle2"
          mb={{
            xs: "16px",
            md: "24px",
            xxl: "35px"
          }}
          color="white"
        >
          Assign Roles to your Community - and kick off role-based working
          routines and role-weighted governance in seconds.
        </Typography>
        <Typography component="p" variant="subtitle2" color="white">
          There is no community like yours - create your own Standards. Opt Āut.
        </Typography>
      </Box>
      <Box
        sx={{
          gridGap: "30px",
          display: "flex",
          justifyContent: "center",
          mt: {
            xs: "20px",
            lg: "35px",
            xxl: "80px"
          }
        }}
        className="right-box"
      >
        <Button
          type="submit"
          variant="outlined"
          size="normal"
          color="offWhite"
          onClick={() => goToIntegrate()}
        >
          Expand
        </Button>
        <Button
          type="submit"
          variant="outlined"
          size="normal"
          color="offWhite"
          onClick={() => goToIntegrate(true)}
        >
          Start from scratch
        </Button>
      </Box>
    </Wrapper>
  );
};

export default GetStarted;
