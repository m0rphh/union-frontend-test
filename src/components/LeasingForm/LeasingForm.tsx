import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formSchema } from "../../schemas/formSchema";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../api/countryService";
import { Country } from "../../types/country";
import PersonalInformationStep from "./components/PersonalInformation";
import LeaseDetails from "./components/LeasingDetails";
import AdditionalDetails from "./components/AdditionalDetails";

type FormData = z.infer<typeof formSchema>;

const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};

const LeasingForm = () => {
  const methods = useForm<FormData>({
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
  const { handleSubmit, setValue } = methods;
  const [step, setStep] = useState(1);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Application submitted successfully!");
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const { data: countries } = useCountries();

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
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto p-4 bg-white shadow-md rounded-md"
      >
        <div className="flex flex-col justify-items-start">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <PersonalInformationStep
              countries={countries || []}
              nextStep={nextStep}
            />
          )}

          {/* Step 2: Leasing Details */}
          {step === 2 && (
            <LeaseDetails
              prevStep={prevStep}
              nextStep={nextStep}
              getProductModel={getProductModel}
            />
          )}

          {/* Step 3: Additional Details */}
          {step === 3 && <AdditionalDetails prevStep={prevStep} />}
        </div>
      </form>
    </FormProvider>
  );
};

export default LeasingForm;
