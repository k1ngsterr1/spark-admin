import { Step } from "@shared/ui/Step";

interface IStepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<IStepIndicatorProps> = ({
  currentStep,
}) => (
  <div className="flex items-center justify-center gap-4">
    {[1, 2].map((step) => (
      <Step
        key={step}
        number={step}
        margin="mt-4"
        isActive={step === currentStep}
      />
    ))}
  </div>
);
