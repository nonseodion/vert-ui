import React from "react"
import clsx from "classnames"
import Calendar from "react-calendar"

interface VertCalendarProps {
  onChange: (_date: Date) => void
  value: Date | null
  visible: boolean
  onClose: () => void
}

export default function VertCalendar({
  onChange,
  value,
  visible,
  onClose,
}: VertCalendarProps) {
  return (
    <div
      className={clsx(
        "h-screen flex items-center justify-center fixed top-0 left-0 w-full z-[3] opacity-0 pointer-events-none",
        {
          "!opacity-100 !pointer-events-auto": visible,
        }
      )}
    >
      <div
        className="absolute cursor-pointer h-full w-full top-0 left-0 bg-black/[.4]"
        role="presentation"
        onClick={onClose}
      />
      <div className="z-[2]">
        <Calendar
          onChange={(date: Date) => {
            onChange(date)
            onClose()
          }}
          value={value || new Date()}
        />
      </div>
    </div>
  )
}
