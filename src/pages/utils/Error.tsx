import React from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Rocket } from "../../assets/images/rocket.svg"
import { Button, Wrapper } from "../../components/general"
import { PageRoutes } from "../../utils/constants"

export default function Error() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className="py-[60px] flex flex-col items-center justify-center">
        <Rocket />
        <div className="flex flex-col space-y-5 lg:space-y-10 mt-10">
          <h2 className="text-center text-white text-[30px] lg:text-[40px] font-medium">
            Oops! Something went wrong
          </h2>
          <p className="text-center text-xl text-white">
            Sorry, we&apos;re already working to fix this.
          </p>
        </div>
        <div className="mt-5 lg:mt-10 flex items-center justify-center">
          <Button
            text="Back to Home"
            onClick={() => navigate(PageRoutes.HOME)}
          />
        </div>
      </div>
    </Wrapper>
  )
}
