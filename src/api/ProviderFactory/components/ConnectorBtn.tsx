import { walletConnectConnector, metaMaskConnector } from '@api/ProviderFactory/web3.connectors';
import { useAppDispatch } from '@store/store.model';
import { pxToRem } from '@utils/text-size';
import { setWallet } from '@store/WalletProvider/WalletProvider';
import { ReactComponent as WalletConnectLogo } from '@assets/aut/wallet-connect.svg';
import { ReactComponent as MetamaskLogo } from '@assets/aut/metamask.svg';
import { Typography } from '@mui/material';
import { AutGradientButton } from '@components/buttons';

export enum ConnectorTypes {
  WalletConnect = 'walletConnect',
  Metamask = 'metamask',
}

const wallets = {
  [ConnectorTypes.Metamask]: metaMaskConnector,
  [ConnectorTypes.WalletConnect]: walletConnectConnector,
};

const btnConfig = {
  [ConnectorTypes.Metamask]: {
    label: 'Metamask',
    icon: <MetamaskLogo height="15px" />,
  },
  [ConnectorTypes.WalletConnect]: {
    label: 'WalletConnect',
    icon: <WalletConnectLogo height="15px" />,
  },
};

export const getConnector = (type: ConnectorTypes) => {
  return wallets[type];
};

export default function ConnectorBtn({ connectorType, setConnector }: { connectorType: ConnectorTypes; setConnector: any }) {
  const dispatch = useAppDispatch();
  const [connector] = getConnector(connectorType);

  return (
    <AutGradientButton
      onClick={async () => {
        await connector.activate();
        setConnector(connector);
        await dispatch(setWallet(connectorType));
      }}
      sx={{
        width: pxToRem(330),
        height: pxToRem(80),
        fontSize: pxToRem(20),
        mb: pxToRem(25),
        textTransform: 'inherit',
        '&.MuiButton-root': {
          letterSpacing: '0px',
        },
      }}
      type="button"
      color="primary"
      variant="outlined"
    >
      <span
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {btnConfig[connectorType].icon}
        <Typography
          sx={{
            flex: 1,
            fontSize: pxToRem(20),
            color: 'white',
          }}
        >
          {btnConfig[connectorType].label}
        </Typography>
      </span>
    </AutGradientButton>
  );
}
