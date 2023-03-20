import React from "react"
import { Tooltip as ReactTooltip } from "react-tooltip"
import { ReactComponent as Question } from "../../assets/icons/question.svg"

interface InfoProps {
  text: string
  tooltip_id?: never
  children?: never
}

interface InfoWithToolTipProps {
  text: string
  tooltip_id: string
  children: React.ReactNode
}

export default function Info({
  text,
  tooltip_id,
  children,
}: InfoProps | InfoWithToolTipProps) {
  return (
    <div className="flex space-x-[3px] items-center">
      <span className="text-[8px] text-purple font-medium">{text}</span>
      <Question
        className="mt-[-3px] outline-none border-none"
        {...(tooltip_id && { id: `question-${tooltip_id}` })}
      />
      {tooltip_id && (
        <ReactTooltip
          className="!bg-white border border-[#DDE0E8] rounded-lg"
          anchorSelect={`#question-${tooltip_id}`}
          place="bottom"
        >
          {children}
        </ReactTooltip>
      )}
    </div>
  )
}
