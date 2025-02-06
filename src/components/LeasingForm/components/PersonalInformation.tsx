import { Controller, useFormContext } from "react-hook-form";

interface Country {
  name: {
    common: string;
  };
  flag: string;
}

interface PersonalInformationStepProps {
  countries: Country[];
  nextStep: () => void;
}

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({
  countries,
  nextStep,
}) => {
  const methods = useFormContext(); // Get access to the form context
  const { control, formState, trigger } = methods;
  const { errors } = formState;
  const handleNextStep = async () => {
    const isStepValid = await trigger([
      "fullName",
      "email",
      "phone",
      "dob",
      "country",
    ]);
    if (isStepValid) nextStep();
  };
  return (
    <>
      <label className="text-left mt-2 mb-1">Full Name</label>
      <Controller
        name="fullName"
        control={control}
        rules={{ required: "Full Name is required" }}
        render={({ field }) => (
          <>
            <input
              {...field}
              onBlur={() => trigger("fullName")}
              type="text"
              className="text-input"
              placeholder="Enter your full name"
              required
            />
            <p className="input-error">
              {errors.fullName?.message?.toString()}
            </p>
          </>
        )}
      />

      <label className="text-left mt-2 mb-1">Email</label>
      <Controller
        name="email"
        control={control}
        rules={{ required: "Email is required" }}
        render={({ field }) => (
          <>
            <input
              {...field}
              onBlur={() => trigger("email")}
              type="email"
              className="text-input"
              placeholder="Email"
            />
            <p className="input-error">{errors.email?.message?.toString()}</p>
          </>
        )}
      />

      <label className="text-left mt-2 mb-1">Phone</label>
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            onBlur={() => trigger("phone")}
            className="text-input"
            placeholder="Phone"
          />
        )}
      />
      <p className="input-error">{errors.phone?.message?.toString()}</p>

      <label className="text-left mt-2 mb-1">Date of Birth</label>
      <Controller
        name="dob"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            onBlur={() => trigger("dob")}
            type="date"
            className="text-input"
          />
        )}
      />
      <p className="input-error">{errors.dob?.message?.toString()}</p>
      <label className="text-left mt-2 mb-1">Country</label>
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <select {...field} className="text-input">
            {countries?.map((country) => (
              <option
                className="flex align-center"
                key={country.name?.common}
                value={country.name?.common}
              >
                {`${country.flag} ${country.name.common}`}
              </option>
            ))}
          </select>
        )}
      />
      <p className="input-error">{errors.country?.message?.toString()}</p>
      <button
        type="button"
        onClick={handleNextStep}
        className="submit-button ml-auto mr-auto"
      >
        Next
      </button>
    </>
  );
};

export default PersonalInformationStep;
