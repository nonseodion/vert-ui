import React from "react"
import clsx from "classnames"

interface LoaderProps {
  className: string
}

export default function Loader({ className }: LoaderProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="78"
      height="78"
      viewBox="0 0 78 78"
      fill="none"
      className={clsx(className, "animate-spin")}
    >
      <path
        d="M39 1.5C31.5832 1.5 24.333 3.69934 18.1661 7.81989C11.9993 11.9404 7.19282 17.7971 4.35453 24.6494C1.51625 31.5016 0.773623 39.0416 2.22057 46.3159C3.66751 53.5902 7.23904 60.272 12.4835 65.5165C17.728 70.761 24.4098 74.3325 31.6841 75.7794C38.9584 77.2264 46.4984 76.4838 53.3506 73.6455C60.2029 70.8072 66.0596 66.0007 70.1801 59.8339C74.3007 53.667 76.5 46.4168 76.5 39"
        stroke="#72BF65"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
