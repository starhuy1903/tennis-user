import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

interface StepsProps {
  currentStep: string;
  steps: string[];
}

export default function Steps({ currentStep, steps }: StepsProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={steps.indexOf(currentStep)}
        alternativeLabel
      >
        {steps.map((step) => (
          <Step
            key={step}
            completed={
              steps.indexOf(step) < steps.indexOf(currentStep) || steps.indexOf(currentStep) === steps.length - 1
            }
          >
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
