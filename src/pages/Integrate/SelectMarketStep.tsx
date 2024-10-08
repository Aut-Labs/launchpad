 
import { StepperButton } from "@components/Stepper";
import { StepperChildProps } from "@components/Stepper/model";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  alpha,
  styled,
  Typography,
  useTheme
} from "@mui/material";
import {
  IntegrateCommunity,
  integrateUpdateCommunity
} from "@store/Integrate/integrate";
import { useAppDispatch } from "@store/store.model";
import { MarketTemplates } from "@utils/misc";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const StepWrapper = styled("form")({
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
});

const GridBox = styled(Box)(({ theme }) => {
  return {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: "30px",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2,minmax(0,1fr))"
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(3,minmax(0,1fr))"
    }
  };
});

const GridCard = styled(Card)(({ theme }) => {
  return {
    minHeight: "365px",
    width: "100%",
    transition: theme.transitions.create(["transform", "background-color"]),
    "&:hover": {
      transform: "scale(1.019)"
    },
    "&:hover:not(.active)": {
      backgroundColor: alpha(theme.palette.primary.main, 0.16)
    },
    "&.active": {
      backgroundColor: alpha(theme.palette.primary.main, 0.3)
    }
  };
});

const SelectMarketStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { market } = useSelector(IntegrateCommunity);
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      market
    }
  });

  const updateState = () => {
    return dispatch(integrateUpdateCommunity(getValues()));
  };

  const onSubmit = async () => {
    await updateState();
    props?.stepper?.nextStep();
  };

  return (
    <StepWrapper onSubmit={handleSubmit(onSubmit)}>
      <GridBox sx={{ flexGrow: 1 }}>
        {MarketTemplates.map(({ title, market, description }, index) => (
          <Grid item key={index}>
            <Controller
              name="market"
              key={market}
              control={control}
              rules={{
                validate: {
                  selected: (v) => !!v
                }
              }}
              render={({ field: { value, onChange } }) => {
                return (
                  <GridCard
                    className={value === market ? "active" : ""}
                    sx={{
                      bgcolor: "nightBlack.main",
                      borderColor: "divider",
                      borderRadius: "16px",
                      minHeight: "300px",
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "column",
                      position: "relative"
                    }}
                    variant="outlined"
                  >
                    <CardActionArea
                      sx={{
                        flex: 1,
                        height: "100%"
                      }}
                      onClick={() => onChange(value === market ? null : market)}
                    >
                      <CardHeader
                        sx={{
                          alignItems: "center",
                          ".MuiCardHeader-action": {
                            mt: "3px"
                          },
                          display: "flex",
                          flexDirection: "column"
                        }}
                        titleTypographyProps={{
                          fontFamily: "FractulAltBold",
                          mb: 2,
                          fontWeight: 900,
                          color: "white",
                          variant: "subtitle1"
                        }}
                        title={title}
                      />
                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <Typography className="text-secondary" variant="body">
                          {description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </GridCard>
                );
              }}
            />
          </Grid>
        ))}
      </GridBox>
      <StepperButton label="Next" disabled={!formState.isValid} />
    </StepWrapper>
  );
};

export default SelectMarketStep;
