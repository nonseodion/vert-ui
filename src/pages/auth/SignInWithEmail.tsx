import React from "react"
import { Link } from "react-router-dom"
import { ReactComponent as LoneLogo } from "../../assets/icons/logo-lone.svg"
import { Button, Wrapper } from "../../components/general"
import Input from "../../components/inputs/Input"
import { routes } from "../../utils/constants"
import { doNothing } from "../../utils/functions"

const SignInWithEmail: React.FC = () => (
  <Wrapper hideTopNav>
    <div className="flex justify-center pt-[58px]">
      <div className="flex flex-col justify-center items-center space-y-[50.75px] mb-[276px]">
        <LoneLogo />
        <div className="flex flex-col space-y-8">
          <p className="text-white text-center text-lg">
            Sign in to Vert finance
          </p>
          <div className="bg-lightGreen rounded-xl w-[349px] p-7">
            <form className="flex flex-col space-y-4">
              <Input placeholder="Enter your email" autoFocus />
              <Input placeholder="Enter password" type="password" />
              <div className="mt-[30px]">
                <Button
                  text="Sign In"
                  onClick={doNothing}
                  fullWidth
                  className="text-[14.48px]"
                />
                <div className="mt-[6px] mb-[15px] flex items-center justify-between">
                  <div />
                  <a
                    className="text-primary underline text-[10px]"
                    href="https://www.google.com"
                  >
                    Forgot password?
                  </a>
                </div>
                <h4 className="text-black text-[13px] text-center font-semibold mb-[35px]">
                  OR
                </h4>
                <Button
                  text="Connect Wallet"
                  background="transparent"
                  onClick={doNothing}
                  fullWidth
                  className="text-[14.48px] font-semibold"
                  textColor="dark"
                  bordered
                />
              </div>
            </form>
          </div>
          <p className="text-center text-white text-[15px] mt-8">
            Don&apos;t have an account?{" "}
            <Link
              className="text-[15px] text-primary underline"
              to={routes.sign_up_with_email}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  </Wrapper>
)

export default SignInWithEmail
