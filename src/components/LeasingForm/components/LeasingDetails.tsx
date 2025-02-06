import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";

interface LeaseDetailsProps {
  prevStep: () => void;
  nextStep: () => void;
  getProductModel: (arg: string) => void;
}

const LeaseDetails: React.FC<LeaseDetailsProps> = ({
  prevStep,
  nextStep,
  getProductModel,
}) => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const methods = useFormContext();
  const { control, formState, trigger, setValue } = methods;
  const { errors } = formState || {};
  const handleNextStep = async () => {
    const isStepValid = await trigger([
      "productType",
      "productModel",
      "leaseDuration",
      "monthlyBudget",
    ]);
    if (isStepValid) nextStep();
  };
  return (
    <>
      <label>Product Type</label>
      <Controller
        name="productType"
        control={control}
        render={({ field }) => (
          <>
            <select
              {...field}
              onChange={
                field.onChange
                  ? (e) => {
                      field.onChange(e);
                      getProductModel(e.target.value);
                    }
                  : undefined
              }
              className="text-input"
            >
              <option value={undefined}></option> // This is the default value to prevent selecting first item by default
              <option value="Car">Car</option>
              <option value="Apartment">Apartment</option>
              <option value="Equipment">Equipment</option>
            </select>
            <p className="text-red-500 text-sm text-left">
              {errors.productType?.message?.toString()}
            </p>
          </>
        )}
      />
      <label>Product Model</label>
      <Controller
        name="productModel"
        control={control}
        render={({ field }) => (
          <>
            <input {...field} disabled className="text-input" placeholder="Product Model" />
            <p className="text-red-500 text-sm text-left">
              {errors.productModel?.message?.toString()}
            </p>
          </>
        )}
      />
      <label>Lease Duration</label>
      <Controller
        name="leaseDuration"
        control={control}
        render={({ field }) => (
          <>
            <input
              {...field}
              onChange={(e) => {
                setValue("leaseDuration", Number(e.target.value)); // For some reason it's setting the value
                if (Number(e.target.value) > 24) {
                  // as a string, so we need to convert it to a number
                  setShowAdditionalFields(true);
                } else {
                  setShowAdditionalFields(false);
                }
              }}
              type="number"
              className="text-input"
            />
            <p className="input-error">
              {errors.leaseDuration?.message?.toString()}
            </p>
          </>
        )}
      />
      <label>Monthly Budget</label>
      <Controller
        name="monthlyBudget"
        control={control}
        render={({ field }) => (
          <>
            <input
              {...field}
              onChange={(e) =>
                setValue("monthlyBudget", Number(e.target.value))
              }
              onBlur={() => trigger(field.name)}
              type="number"
              className="text-input"
            />
            <p className="input-error">
              {errors.monthlyBudget?.message?.toString()}
            </p>
          </>
        )}
      />
      {showAdditionalFields && (
        <>
          <label>Employer Name</label>
          <Controller
            name="employerName"
            control={control}
            render={({ field }) => (
              <>
                <input {...field} className="text-input" />
                <p className="input-error">
                  {errors.employerName?.message?.toString()}
                </p>
              </>
            )}
          />
          <label>Annual Income</label>
          <Controller
            name="annualIncome"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  onChange={(e) =>
                    setValue("annualIncome", Number(e.target.value))
                  }
                  type="number"
                  className="text-input"
                />
                <p className="input-error">
                  {errors.annualIncome?.message?.toString()}
                </p>
              </>
            )}
          />
        </>
      )}
      <div className="flex justify-evenly">
        <button type="button" onClick={prevStep} className="submit-button">
          Previous
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="submit-button"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default LeaseDetails;
