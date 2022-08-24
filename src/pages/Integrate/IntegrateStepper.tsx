import Stepper from '@components/Stepper';
import { Step } from '@components/Stepper/model';
import { useEffect, useState } from 'react';
import { StepWizardChildProps } from 'react-step-wizard';
import CommunityInfoStep from './CommunityInfoStep';
import ImportContractStep from './ImportContractStep';
import SelectMarketStep from './SelectMarketStep';
import RoleStep from './RoleStep';
import CommitmentStep from './CommitmentStep';
import ConfirmStep from './ConfirmStep';

const steps: Step[] = [
  {
    component: ImportContractStep,
    title: 'Import Contract',
    description: (
      <>
        It all starts with your Genesis Contract. Add the address <br /> of your DAO, verify you’re part of it - and start giving it the
        superpowers it deserves ✨
      </>
    ),
  },
  {
    component: CommunityInfoStep,
    title: 'Community Details',
    description: (
      <>
        Time to customize your Community. Add some details, <br /> its name, its logo, its story. Tell your community members why it exists,
        and why it matters.
      </>
    ),
  },
  {
    component: SelectMarketStep,
    title: 'Select Market',
    description: (
      <>
        Markets can be as niche-y as you need them to be. These are our 3 default Markets, choose the one that best represents your
        Community - and partner with other DAOs in the same field!
      </>
    ),
  },
  {
    component: RoleStep,
    title: 'Roles',
    description: (
      <>
        These are Roles you envision in your community (i.e.: dev, curator, DAO operator, …) They always come in sets of 3 to keep balance
        between members. Use Roles to create new Guilds, Projects, operational groups - let your Members & DAO grow with you 🙌
      </>
    ),
  },
  {
    component: CommitmentStep,
    title: 'Commitment',
    description: (
      <>
        The minimum level of Commitment you expect from Members joining your Community. You can see Commitment as the amount of
        “time/dedication” that Members pledge to your DAO. Based on their Commitment, they will receive more or less tasks - and grow or
        lose their Reputation.
      </>
    ),
  },
  {
    component: ConfirmStep,
    title: 'Confirm',
    description: '',
  },
];

const IntegrateStepper = (props) => {
  const [instance, setInstance] = useState<StepWizardChildProps & any>();

  useEffect(() => {
    props.instance(() => instance);
  }, [instance]);

  return <Stepper instance={setInstance} steps={steps} />;
};

export default IntegrateStepper;
