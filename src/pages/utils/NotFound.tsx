import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, Wrapper } from "../../components/general"
import { ReactComponent as Svg404 } from "../../assets/images/404.svg"
import { routes } from "../../utils/constants"

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className="mt-[100px] flex justify-center">
        <div className="flex flex-col justify-center items-center space-y-[46px] mb-[266px]">
          <Svg404 />
          <p className="font-medium text-white text-[40px] text-center uppercase">
            ERROR - PAGE NOT FOUND!
          </p>
          <Button
            text="Go Back"
            bordered
            background="transparent"
            textColor="white"
            onClick={() => navigate(routes.home)}
          />
        </div>
      </div>
    </Wrapper>
  )
}
