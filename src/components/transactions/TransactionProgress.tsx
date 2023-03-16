import React from "react"
import clsx from "classnames"

interface Step {
  number: number
  text: string
}

interface TransactionStepProps {
  text: string
  step: number
  currentStep: number
}

interface TransactionProgressProps {
  currentStep: number
  steps: Step[]
}

function TransactionStep({ text, step, currentStep }: TransactionStepProps) {
  const isActive = step === 3 ? false : currentStep === step
  const isCompleted = step === 3 ? currentStep === 3 : currentStep > step
  return (
    <div className="flex flex-col space-y-[7.09px] items-center">
      {isActive ? (
        <div className="lg:h-11 lg:w-11 h-5 w-5 rounded-full bg-primary lg:bg-[#F1FFEF] flex items-center justify-center">
          <div className="lg:h-9 lg:w-9 h-5 w-5 rounded-full flex items-center justify-center lg:bg-black lg:border-primary lg:border-2">
            <span className="text-[11px] lg:text-base text-white lg:text-primary leading-6">
              {step}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={clsx(
            "lg:h-9 lg:w-9 h-5 w-5 rounded-full opacity-0 lg:!opacity-100 flex items-center justify-center border-2 border-[#E5E7EB] bg-white",
            { "!bg-primary !opacity-100 !border-primary": isCompleted }
          )}
        >
          <span
            className={clsx(
              "text-[11px] lg:text-base leading-6 text-[#9BA8AF]",
              {
                "!text-white": isCompleted,
              }
            )}
          >
            {step}
          </span>
        </div>
      )}
      <span
        className={clsx(
          "text-[#707A8A] text-sm leading-[18px] hidden lg:block",
          {
            "!text-white": isActive,
            "!text-primary": isCompleted,
          }
        )}
      >
        {text}
      </span>
    </div>
  )
}

export default function TransactionProgress({
  currentStep,
  steps,
}: TransactionProgressProps) {
  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100
  return (
    <div className="lg:w-[849px] w-full max-w-[calc(100%_-_30px)] md:max-w-[458px] lg:max-w-full h-5 lg:h-9 relative">
      <div className="absolute h-[2px] w-full left-0 top-[50%] translate-y-[-50%] bg-white" />
      <div className="lg:hidden absolute w-full bg-[#545969]/[.4] h-[2px] left-0 top-[50%] translate-y-[-50%]" />
      <div
        className="lg:hidden transition-all duration-500 absolute bg-primary h-[2px] left-0 top-[50%] translate-y-[-50%]"
        style={{ width: `${progressWidth}%` }}
      />
      <div className="absolute w-full lg:bottom-[-13px] h-full flex items-center justify-between lg:justify-center space-x-[58.32px]">
        {steps.map((step) => (
          <TransactionStep
            key={step.number}
            step={step.number}
            text={step.text}
            currentStep={currentStep}
          />
        ))}
      </div>
    </div>
  )
}
