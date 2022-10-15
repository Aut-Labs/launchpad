import { useEffect, useState } from 'react';
import { StepWizardChildProps } from 'react-step-wizard';
import { Button, Toolbar } from '@mui/material';
import { ReactComponent as AutLogo } from '@assets/aut/logo.svg';
import { ReactComponent as BackIcon } from '@assets/aut/back.svg';
import { pxToRem } from '@utils/text-size';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { integrateUpdateStatus, resetIntegrateState } from '@store/Integrate/integrate';
import { ResultState } from '@store/result-status';
import { useAppDispatch } from '@store/store.model';
import { useWeb3React } from '@web3-react/core';
import { SelectedNetworkConfig, setProviderIsOpen } from '@store/WalletProvider/WalletProvider';
import { useSelector } from 'react-redux';
import IntegrateSuccess from './IntegrateSuccess';
import IntegrateStepper from './IntegrateStepper';

const Integrate = () => {
  const dispatch = useAppDispatch();
  const { isActive } = useWeb3React();
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const networkConfig = useSelector(SelectedNetworkConfig);
  const [instance, setInstance] = useState<StepWizardChildProps>();
  const goBack = () => {
    if (instance?.currentStep === 1) {
      history.push({
        pathname: `/`,
        search: location.search,
      });
    } else if (!instance) {
      history.push({
        pathname: '/integrate',
        search: location.search,
      });
    } else {
      instance?.previousStep();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(integrateUpdateStatus(ResultState.Idle));
      dispatch(resetIntegrateState());
    };
  }, []);

  useEffect(() => {
    if (!isActive && !networkConfig) {
      dispatch(setProviderIsOpen(true));
    }
  }, [isActive, networkConfig]);

  return (
    <>
      <Toolbar
        sx={{
          p: '0px !important',
          height: `${pxToRem(120)}`,
          minHeight: `${pxToRem(120)}`,
          maxHeight: `${pxToRem(120)}, !important`,
          justifyContent: 'center',
        }}
      >
        {!history.location.pathname.includes('success') && (
          <Button
            sx={{
              color: 'white',
              position: 'absolute',
              left: pxToRem(140),
              top: pxToRem(40),
            }}
            type="button"
            onClick={goBack}
            startIcon={<BackIcon style={{ height: pxToRem(34), width: pxToRem(28) }} />}
            variant="text"
          >
            Back
          </Button>
        )}
        <AutLogo width="80" height="80" />
      </Toolbar>
      <Switch>
        <Route exact path={path} render={() => <IntegrateStepper instance={setInstance} />} />
        <Route path={`${path}/success/:address`} component={IntegrateSuccess} />
      </Switch>
    </>
  );
};

export default Integrate;
