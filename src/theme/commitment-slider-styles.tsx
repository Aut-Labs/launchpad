import { FormHelperText } from "@components/Fields";
import { useTheme } from "@emotion/react";
import {
  Typography,
  Slider,
  SliderProps,
  styled,
  PaletteColor,
  Theme,
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants
} from "@mui/material";
import { CommitmentMessages } from "@utils/misc";
import { pxToRem } from "@utils/text-size";

export function CommitmentMessage({ value, children = null }) {
  const message = CommitmentMessages(value);
  return (
    <Typography
      color="white"
      whiteSpace="nowrap"
      align="left"
      variant="caption"
      component="span"
      sx={{ display: "flex", mb: "4px", height: "20px" }}
    >
      {message}
    </Typography>
  );
}

const errorTypes = {
  min: "Min 1 commitment level!"
};

interface AutSliderProps {
  value: any;
  sliderProps: SliderProps;
  name: string;
  errors: any;
  sx?: any;
}

const SliderWrapper = styled("div")({
  position: "relative"
});

export const AutCommitmentSlider = ({
  value,
  name,
  errors,
  sx,
  sliderProps,
  ...props
}: AutSliderProps) => {
  return (
    <SliderWrapper sx={sx}>
      <CommitmentMessage value={value} />
      <div style={{ position: "relative" }}>
        <Slider {...sliderProps} />
      </div>
      <div
        style={{
          marginTop: "-3px",
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <FormHelperText
          errorTypes={errorTypes}
          value={value}
          name={name}
          errors={errors}
        >
          <Typography className="text-secondary" variant="caption">
            No worries, you’ll be able to change this later.
          </Typography>
        </FormHelperText>
      </div>
    </SliderWrapper>
  );
};

const generateColors = (color: PaletteColor) => ({
  color: color.dark,
  ".MuiSlider-mark": {
    borderColor: color.light
  },
  ".MuiSlider-track": {
    background: color.light
  },
  ".MuiSlider-thumb": {
    background: color.main,
    boxShadow: `0px 0px 0px 0px`
  },
  ".MuiTypography-root": {
    color: color.main
  }
});

export default (theme: Theme) =>
  ({
    ...theme.components.MuiSelect,
    styleOverrides: {
      root: {
        "&.MuiSlider-colorPrimary": generateColors(theme.palette.offWhite),
        [theme.breakpoints.up("xxl")]: {
          width: pxToRem(600),
          height: pxToRem(65),
          ".MuiSlider-thumb": {
            width: "45px",
            height: "45px"
          }
        },
        [theme.breakpoints.up("md")]: {
          width: pxToRem(550),
          height: pxToRem(45),
          ".MuiSlider-thumb": {
            width: "30px",
            height: "30px"
          }
        },
        borderRadius: "8.5px",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: theme.palette.divider,
        padding: "0",

        'span[data-index="10"].MuiSlider-mark': {
          display: "none"
        },
        'span[data-index="0"].MuiSlider-mark': {
          display: "none"
        },

        ".MuiSlider-mark": {
          background: "transparent",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          borderStyle: "solid",
          borderWidth: "1px",

          "&.MuiSlider-markActive": {
            border: "none"
          }
        },
        ".MuiSlider-track": {
          borderRight: "0"
        },

        ".MuiSlider-rail": {
          opacity: "0"
        }
      }
    } as ComponentsOverrides<Theme>["MuiSlider"]
  } as {
    defaultProps?: ComponentsProps["MuiSlider"];
    styleOverrides?: ComponentsOverrides<Theme>["MuiSlider"];
    variants?: ComponentsVariants["MuiSlider"];
  });
