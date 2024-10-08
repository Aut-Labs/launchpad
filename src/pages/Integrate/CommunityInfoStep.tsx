 
import { FormHelperText } from "@components/Fields";
import AFileUpload from "@components/FileUpload";
import { StepperButton } from "@components/Stepper";
import { StepperChildProps } from "@components/Stepper/model";
import { styled } from "@mui/material";
import {
  IntegrateCommunity,
  integrateUpdateCommunity
} from "@store/Integrate/integrate";
import { useAppDispatch } from "@store/store.model";
import { AutTextField } from "@theme/field-text-styles";
import { countWords } from "@utils/helpers";
import { toBase64 } from "@utils/to-base-64";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const errorTypes = {
  maxWords: `Words cannot be more than 3`,
  maxNameChars: `Characters cannot be more than 24`,
  maxLength: `Characters cannot be more than 257`
};

const StepWrapper = styled("form")({
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
});

const FormStackWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  marginBottom: "45px",
  gridGap: "20px",
  [theme.breakpoints.up("xs")]: {
    width: "100%"
  },
  [theme.breakpoints.up("sm")]: {
    width: "400px"
  },
  [theme.breakpoints.up("md")]: {
    width: "600px"
  },
  [theme.breakpoints.up("xxl")]: {
    width: "800px"
  }
}));

const CommunityInfoStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const { name, image, description } = useSelector(IntegrateCommunity);
  const { control, handleSubmit, getValues, watch, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      name,
      image,
      description
    }
  });

  const values = watch();

  const updateState = () => {
    const values = getValues();
    return dispatch(integrateUpdateCommunity(values));
  };

  const onSubmit = async () => {
    await updateState();
    props?.stepper?.nextStep();
  };

  return (
    <StepWrapper autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <FormStackWrapper>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "3px"
                }}
              >
                <AFileUpload
                  color="offWhite"
                  initialPreviewUrl={image}
                  fileChange={async (file: File) => {
                    if (file) {
                      onChange(await toBase64(file));
                    } else {
                      onChange(null);
                    }
                  }}
                />
              </div>
            );
          }}
        />
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
            validate: {
              maxNameChars: (v) => v.length <= 24,
              maxWords: (v: string) => countWords(v) <= 3
            }
          }}
          render={({ field: { name, value, onChange } }) => {
            return (
              <AutTextField
                variant="standard"
                color="offWhite"
                required
                autoFocus
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder="Project Name"
                sx={{
                  flex: 1
                }}
                helperText={
                  <FormHelperText
                    errorTypes={errorTypes}
                    value={value}
                    name={name}
                    errors={formState.errors}
                  >
                    <span>{3 - countWords(value)} words left</span>
                  </FormHelperText>
                }
              />
            );
          }}
        />
      </FormStackWrapper>

      <Controller
        name="description"
        control={control}
        rules={{ maxLength: 257 }}
        render={({ field: { name, value, onChange } }) => {
          return (
            <AutTextField
              name={name}
              value={value || ""}
              onChange={onChange}
              variant="outlined"
              color="offWhite"
              multiline
              rows={5}
              sx={{
                width: {
                  xs: "100%",
                  sm: "400px",
                  md: "600px",
                  xxl: "800px"
                }
              }}
              placeholder="Description"
              helperText={
                <FormHelperText
                  errorTypes={errorTypes}
                  value={value}
                  name={name}
                  errors={formState.errors}
                >
                  <span>{257 - (value?.length || 0)} characters left</span>
                </FormHelperText>
              }
            />
          );
        }}
      />
      <StepperButton
        label="Next"
        disabled={!formState.isValid || !values.image}
      />
    </StepWrapper>
  );
};

export default CommunityInfoStep;
