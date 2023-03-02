import React from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"

interface BackButtonProps {
  onClick?: () => any
}

export default function BackButton({ onClick }: BackButtonProps) {
  const navigate = useNavigate()
  const onButtonClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }
  return (
    <button
      type="button"
      onClick={() => onButtonClick()}
      className="border-none w-fit bg-white rounded-lg flex px-4 h-[40px] outline-none justify-center items-center space-x-[10px]"
    >
      <ArrowLeft />
      <span className="text-primary text-sm font-medium">Back</span>
    </button>
  )
}

BackButton.defaultProps = {
  onClick: null,
}
