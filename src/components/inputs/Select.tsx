import React from "react"
import clsx from "classnames"
import ReactSelect, {
  Props,
  ClassNamesConfig,
  DropdownIndicatorProps,
  GroupBase,
} from "react-select"
import { ReactComponent as DropDown } from "../../assets/icons/dropdown.svg"

interface SelectProps extends Props {
  label?: string
  [key: string]: any
}

export interface OptionType {
  label: string
  value: string
  aliases?: string[]
}

const customClassNames: ClassNamesConfig = {
  control: (state) =>
    `h-[52px] !border outline-none !border-black/[.5] !rounded-xl ${
      state.isFocused ? "!border-primary/[.5] !shadow-none" : ""
    }`,
  option: (state) =>
    state.data === state.selectProps.value
      ? "!text-black !bg-[#EFEFEF]"
      : "hover:bg-[#EFEFEF]",
}

function Indicator({ isFocused }: DropdownIndicatorProps) {
  return (
    <DropDown
      className={clsx("mr-5 stroke-lightBlue h-[6.59px] w-[11.18px]", {
        "rotate-180": isFocused,
      })}
    />
  )
}

export default function Select<
  Option = OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group> & SelectProps) {
  const { label, ...rest } = props
  return (
    <div>
      {label && <p className="text-black font-medium mb-[10px]">{label}</p>}
      <ReactSelect
        placeholder=""
        classNames={customClassNames}
        components={{
          DropdownIndicator: Indicator,
          IndicatorSeparator: null,
        }}
        {...rest}
      />
    </div>
  )
}

Select.defaultProps = {
  label: null,
}
