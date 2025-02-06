import { Controller, useFormContext } from "react-hook-form";

interface AdditionalDetailsProps {
  prevStep: () => void;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({ prevStep }) => {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState || {};
  return (
    <>
      <label>Upload Document</label>
      <Controller
        name="document"
        control={control}
        render={({ field }) => (
          <>
            <input
              type="file"
              className="input"
              onChange={(e) => field.onChange(e.target.files?.[0])}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
            <p className="input-error">
              {errors.document?.message?.toString()}
            </p>
          </>
        )}
      />
      <Controller
        name="terms"
        control={control}
        render={({ field }) => (
          <>
            <label>
              <input
                {...field}
                value={field.value}
                checked={field.value}
                type="checkbox"
                className="checkbox"
              />
              I agree to the terms
            </label>
            <p className="input-error">{errors?.terms?.message?.toString()}</p>
          </>
        )}
      />

      <div className="flex justify-evenly">
        <button type="button" onClick={prevStep} className="submit-button">
          Previous
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </>
  );
};

export default AdditionalDetails;
