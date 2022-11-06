import { DatePicker, CalendarPicker } from "@mui/lab";
import {
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { pxToRem } from "@utils/text-size";
import { Controller, FieldErrors } from "react-hook-form";

interface FormHelperTextProps {
  errors: any;
  name: string;
  children?: string | JSX.Element;
  errorTypes?: any;
  value: any;
}

const defaultErrorTypes = {
  required: "Field is required!"
};

export function FormHelperText({
  errors,
  name,
  errorTypes,
  children = null,
  value
}: FormHelperTextProps) {
  if (errors[name]) {
    const { type } = errors[name];
    const types = {
      ...defaultErrorTypes,
      ...(errorTypes || {})
    };

    const message = types[type];

    return (
      <Typography
        whiteSpace="nowrap"
        color="red"
        align="right"
        component="span"
        variant="body2"
        className="auto-helper-error"
        sx={{
          width: "100%",
          position: "absolute",
          left: "0"
        }}
      >
        {message}
      </Typography>
    );
  }
  return (
    children && (
      <Typography
        sx={{
          width: "100%",
          position: "absolute",
          left: "0"
        }}
        className="auto-helper-info"
        color="white"
        align="right"
        component="span"
        variant="body2"
      >
        {children}
      </Typography>
    )
  );
}

const CustomSwCalendarPicker = styled(CalendarPicker)(({ theme }) => ({
  ".MuiTypography-caption": {
    color: theme.palette.primary.main
  },
  ".MuiTypography-root, .MuiButtonBase-root": {
    fontSize: pxToRem(25),
    width: pxToRem(50),
    height: pxToRem(50)
  },
  'div[role="presentation"]': {
    ".PrivatePickersFadeTransitionGroup-root": {
      fontSize: pxToRem(29),
      color: "#000"
    }
  },
  ".MuiButtonBase-root .MuiSvgIcon-root": {
    width: pxToRem(40),
    height: pxToRem(40)
  },
  ".PrivatePickersSlideTransition-root": {
    minHeight: pxToRem(300),
    ".MuiButtonBase-root.Mui-disabled": {
      color: "#777777"
    },
    // '.MuiButtonBase-root': {
    //   margin: `0 ${pxToRem(6)}`,
    // },
    ".MuiButtonBase-root:not(.Mui-disabled)": {
      backgroundColor: "rgba(119, 119, 119, .25)",
      color: theme.palette.primary.main,
      borderRadius: 0,
      "&:hover, &.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: "#fff"
      }
    }
  }
}));

export const SwDatePicker = ({
  control,
  name,
  minDate,
  maxDate = null,
  otherProps = {}
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <DatePicker
            inputFormat="dd/MM/yyyy"
            minDate={minDate}
            maxDate={maxDate}
            PaperProps={{
              sx: {
                ".MuiCalendarPicker-root": {
                  'div[role="presentation"], .MuiButtonBase-root, .MuiTypography-root, .PrivatePickersYear-yearButton':
                    {
                      fontSize: pxToRem(18),
                      color: "primary.main",
                      "&.Mui-selected": {
                        color: "text.primary"
                      },
                      "&[disabled]": {
                        color: "text.disabled"
                      }
                    }
                }
              }
            }}
            value={field.value}
            onChange={field.onChange}
            renderInput={(params) => {
              const v = params.inputProps.value;
              delete params.inputProps.value;
              return (
                <TextField
                  {...params}
                  value={field.value ? v : ""}
                  color="primary"
                  name={field.name}
                  required
                />
              );
            }}
            {...otherProps}
          />
        );
      }}
    />
  );
};

export const SwCalendarPicker = ({
  control,
  name,
  minDate,
  maxDate = null,
  otherProps = {}
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <CustomSwCalendarPicker
            minDate={minDate}
            maxDate={maxDate}
            date={field.value ? new Date(field.value) : null}
            onChange={field.onChange}
            {...otherProps}
          />
        );
      }}
    />
  );
};

export const AutTextField = styled(
  (props: TextFieldProps & { width: string }) => <TextField {...props} />
)(({ theme, width, multiline }) => ({
  width: pxToRem(width),
  ".MuiInputLabel-root": {
    top: "-2px"
  },
  ".MuiFormHelperText-root": {
    marginRight: 0,
    marginLeft: 0,
    textAlign: "right",
    position: "relative"
  },
  ".MuiInput-underline": {
    "&:after": {
      borderWidth: "1px",
      transform: "scaleX(1)"
    }
  },
  ".MuiOutlinedInput-root, .MuiInput-underline": {
    color: "#fff",
    fontSize: pxToRem(18),
    ...(!multiline && {
      padding: 0,
      height: pxToRem(50)
    }),
    ".MuiInputBase-input": {
      paddingTop: 0,
      paddingBottom: 0
    },
    "&::placeholder": {
      opacity: 1,
      color: "#707070"
    },
    "&::-webkit-input-placeholder": {
      color: "#707070",
      opacity: 1,
      fontSize: pxToRem(18)
    },
    "&::-moz-placeholder": {
      color: "#707070",
      opacity: 1
    }
  },
  ".MuiOutlinedInput-root": {
    "& > fieldset": {
      border: "1px solid #439EDD",
      borderWidth: "1px"
    },
    "&.Mui-focused fieldset, &:hover fieldset": {
      border: "1px solid #439EDD",
      borderWidth: "1px !important"
    }
  }
}));

const StyledSelectField = styled((props: SelectProps & { width: string }) => {
  return (
    <Select
      MenuProps={{
        sx: {
          ".MuiPaper-root": {
            borderWidth: "1px !important",
            background: "black"
          },
          borderTop: 0,
          "& ul": {
            color: "#000",
            padding: 0
          },
          "& li": {
            fontSize: pxToRem(18),
            color: "white",
            "&:hover:not(.Mui-selected)": {
              backgroundColor: "#009FE3",
              color: "#fff"
            },
            "&.Mui-selected:hover, &.Mui-selected": {
              backgroundColor: "#009FE3",
              color: "#fff"
            }
          }
        }
      }}
      {...props}
    />
  );
})(({ width }) => ({
  ".MuiFormHelperText-root": {
    marginRight: 0,
    marginLeft: 0,
    textAlign: "right",
    position: "relative"
  },
  "&.MuiInput-underline": {
    "&:after": {
      borderWidth: "1px",
      transform: "scaleX(1)"
    }
  },
  "&.MuiOutlinedInput-root, &.MuiInput-underline": {
    width: pxToRem(width),
    ".MuiSelect-select, .MuiSelect-nativeInput": {
      height: "100%",
      display: "flex",
      alignItems: "center"
    },
    color: "#fff",
    padding: 0,
    fontSize: pxToRem(18),
    height: pxToRem(50),
    ".MuiInputBase-input": {
      paddingTop: 0,
      paddingBottom: 0
    },
    ".MuiSvgIcon-root": {
      fontSize: "20px",
      color: "#fff"
    },
    "&::placeholder": {
      opacity: 1,
      color: "#707070"
    },
    "&::-webkit-input-placeholder": {
      color: "#707070",
      opacity: 1,
      fontSize: pxToRem(18)
    },
    "&::-moz-placeholder": {
      color: "#707070",
      opacity: 1
    }
  },
  "&.MuiOutlinedInput-root": {
    fieldset: {
      border: "1px solid #439EDD"
    },
    "&:hover fieldset": {
      border: "2px solid #439EDD"
    },
    ".MuiSelect-select, .MuiSelect-nativeInput": {
      justifyContent: "center"
    }
  }
}));

const SelectWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: pxToRem(45),
  position: "relative",
  ".auto-helper-info, .auto-helper-error": {
    bottom: "-18px"
  }
});

interface AutSelectProps extends Partial<SelectProps> {
  width: string;
  helperText: JSX.Element;
}
export const AutSelectField = ({ helperText, ...props }: AutSelectProps) => {
  return (
    <SelectWrapper>
      <StyledSelectField {...props} />
      {helperText}
    </SelectWrapper>
  );
};
