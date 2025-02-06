import { Controller, Control, FieldErrors } from "react-hook-form";

interface Country {
  name: {
    common: string;
  };
  flag: string;
}

interface PersonalInformationStepProps {
  control: Control<{
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    country: string;
  }>;
  errors: FieldErrors;
  countries: Country[];
  trigger: (name?: string | string[]) => Promise<boolean>;
  nextStep: () => void;
}

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({
  control,
  errors,
  countries,
  trigger,
  nextStep,
}) => (
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
          <p className="text-red-500 text-sm text-left">
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
          <p className="text-red-500 text-sm text-left">
            {errors.email?.message?.toString()}
          </p>
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
    <p className="text-red-500 text-sm text-left">
      {errors.phone?.message?.toString()}
    </p>

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
    <p className="text-red-500 text-sm text-left">
      {errors.dob?.message?.toString()}
    </p>
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
    <p className="text-red-500 text-sm text-left">
      {errors.country?.message?.toString()}
    </p>
    <button type="button" onClick={nextStep} className="submit-button">
      Next
    </button>
  </>
);

export default PersonalInformationStep;
