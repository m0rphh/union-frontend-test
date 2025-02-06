import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formSchema } from "../../schemas/formSchema";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../api/countryService";
import { Country } from "../../types/country";
import PersonalInformationStep from "./components/PersonalInformation";

type FormData = z.infer<typeof formSchema>;

const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};

const LeasingForm = () => {
  const [step, setStep] = useState(1);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      country: "",
      productType: undefined,
      productModel: "",
      leaseDuration: 12,
      monthlyBudget: 500,
      notes: "",
      document: undefined,
      terms: false,
      employerName: "",
      annualIncome: undefined,
    },
  });

  const values = getValues();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Application submitted successfully!");
  };

  const nextStep = () => {
    // const isStepValid = await trigger();
    if (Object.keys(errors).length === 0) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const { data: countries, isLoading, error } = useCountries();

  if (isLoading) return <p>Loading countries...</p>;
  if (error) return <p>Error fetching countries</p>;

  const getProductModel = (productType: string) => {
    switch (productType) {
      case "Car":
        return setValue("productModel", "Car Model");
      case "Apartment":
        return setValue("productModel", "Apartment Model");

      case "Equipment":
        return setValue("productModel", "Equipment Model");
      default:
        return "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <div className="flex flex-col justify-items-start">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <PersonalInformationStep
            control={control}
            errors={errors}
            countries={countries}
            trigger={trigger}
            nextStep={nextStep}
          />
        )}

        {/* Step 2: Leasing Details */}
        {step === 2 && (
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
                    <option value="Car">Car</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                  <p className="text-red-500">{errors.productType?.message}</p>
                </>
              )}
            />
            <label>Product Model</label>
            <Controller
              name="productModel"
              control={control}
              render={({ field }) => (
                <>
                  <input {...field} className="text-input" placeholder="" />
                  <p className="text-red-500">{errors.productModel?.message}</p>
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
                      field.onChange(e);
                      if (Number(e.target.value) > 24) {
                        setShowAdditionalFields(true);
                      }
                    }}
                    type="number"
                    className="text-input"
                  />
                  <p className="text-red-500">
                    {errors.leaseDuration?.message}
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
                  <input {...field} type="number" className="text-input" />
                  <p className="text-red-500">
                    {errors.monthlyBudget?.message}
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
                      <p className="text-red-500">
                        {errors.employerName?.message}
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
                      <input {...field} type="number" className="text-input" />
                      <p className="text-red-500">
                        {errors.annualIncome?.message}
                      </p>
                    </>
                  )}
                />
              </>
            )}
            <div className="flex justify-evenly">
              <button
                type="button"
                onClick={prevStep}
                className="submit-button"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="submit-button "
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3: Additional Details */}
        {step === 3 && (
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
                  <p className="text-red-500">{errors.document?.message}</p>
                </>
              )}
            />
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <>
                  <label>
                    <input {...field} type="checkbox" className="checkbox" />I
                    agree to the terms
                  </label>
                  <p className="text-red-500">{errors.terms?.message}</p>
                </>
              )}
            />

            <div className="flex justify-evenly">
              <button
                type="button"
                onClick={prevStep}
                className="submit-button"
              >
                Previous
              </button>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default LeasingForm;
