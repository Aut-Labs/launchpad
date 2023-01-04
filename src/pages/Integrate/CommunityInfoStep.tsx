/* eslint-disable max-len */
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
import { pxToRem } from "@utils/text-size";
import { toBase64 } from "@utils/to-base-64";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const errorTypes = {
  maxWords: `Words cannot be more than 3`,
  maxNameChars: `Characters cannot be more than 24`,
  maxLength: `Characters cannot be more than 280`
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
  alignItems: "flex-end"
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
    return dispatch(integrateUpdateCommunity(getValues()));
  };

  const onSubmit = async () => {
    await updateState();
    props?.stepper?.nextStep();
  };

  return (
    <StepWrapper autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="sw-community-description">
        <FormStackWrapper>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange } }) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <AFileUpload
                    color="offWhite"
                    initialPreviewUrl={image}
                    fileChange={async (file) => {
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
                  placeholder="Community Name"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "400px",
                      xxl: "800px"
                    },
                    mb: pxToRem(45)
                  }}
                  helperText={
                    <FormHelperText
                      errorTypes={errorTypes}
                      value={value}
                      name={name}
                      errors={formState.errors}
                    >
                      <span>
                        {3 - countWords(value)}/3 words and{" "}
                        {24 - (value?.length || 0)}/24 characters left
                      </span>
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
          rules={{ maxLength: 280 }}
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
                    xxl: "800px"
                  },
                  mb: pxToRem(45)
                }}
                placeholder="Introduce your community to the world. It can be a one-liner, common values, goals, or even the story behind it!"
                helperText={
                  <FormHelperText
                    errorTypes={errorTypes}
                    value={value}
                    name={name}
                    errors={formState.errors}
                  >
                    <span>
                      {280 - (value?.length || 0)}/280 characters left
                    </span>
                  </FormHelperText>
                }
              />
            );
          }}
        />
      </div>
      <StepperButton
        label="Next"
        disabled={!formState.isValid || !values.image}
      />
    </StepWrapper>
  );
};

export default CommunityInfoStep;
