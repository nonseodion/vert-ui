import React from "react"
import { Link } from "react-router-dom"
import { ReactComponent as LoneLogo } from "../../assets/icons/logo-lone.svg"
import { Button, Wrapper } from "../../components/general"
import Input from "../../components/inputs/Input"
import { routes } from "../../utils/constants"
import { doNothing } from "../../utils/functions"

export default function SignUpWithEmail() {
  return (
    <Wrapper hideTopNav>
      <div className="flex justify-center pt-[58px]">
        <div className="flex flex-col justify-center items-center space-y-[50.75px] mb-[276px]">
          <LoneLogo />
          <div className="flex flex-col space-y-8">
            <p className="text-white text-center text-lg">Sign up</p>
            <div className="bg-lightGreen rounded-xl w-[349px] p-7">
              <form className="flex flex-col space-y-4">
                <Input placeholder="Email Address" />
                <Input placeholder="Username" />
                <Input placeholder="Enter password" type="password" />
                <p className="mt-[10px] text-grey text-[10px] mb-[30px]">
                  By signing up, you agree to our{" "}
                  <a
                    href="https://www.google.com"
                    className="text-primary underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.google.com"
                    className="text-primary underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and to receive periodic updates.
                </p>
                <Button
                  text="Sign Up"
                  onClick={doNothing}
                  fullWidth
                  className="text-[14.48px]"
                />
                <h4 className="text-black text-[13px] text-center font-semibold my-[25px]">
                  OR
                </h4>
                <Button
                  text="Sign up with Wallet"
                  background="transparent"
                  onClick={doNothing}
                  fullWidth
                  className="text-[14.48px] font-semibold"
                  textColor="dark"
                  bordered
                />
              </form>
            </div>
            <p className="text-center text-white text-[15px] mt-8">
              Already have an account?{" "}
              <Link
                className="text-[15px] text-primary underline"
                to={routes.sign_in_with_email}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
