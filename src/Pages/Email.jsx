/* eslint-disable react/prop-types */
import { emailsvg } from "../components/svg"
import { useState } from "react"
import { EmailAD, Otp } from "../components"


function Email() {

  const [otpModal, setOtpModal] = useState(false)



  return (
    <>
      {!otpModal &&
        <EmailAD setOtpModal={setOtpModal} emailSvg={emailsvg} />
      }

      {otpModal &&
        <Otp />
      }

    </>
  )
}
export default Email