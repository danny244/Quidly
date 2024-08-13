/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from 'yup'
import { Button } from "..";


function EmailAD({ setOtpModal, emailSvg }) {

  const formik = useFormik({

    initialValues: {
      email: '',
    },

    enableReinitialize: true,

    onSubmit: (values) => {
      console.log(values);
      setOtpModal(true)
    },

    validationSchema: yup.object({
      email: yup.string().transform((value) => value.trim()).email().required('Your Email Required'),
    })


  })


  return (
    <form onSubmit={formik.handleSubmit} className='w-full h-fit flex items-center justify-center'>
      <div className='bg-tertiary shadow-shadow-color overflow-hidden h-fit max-w-[25rem] w-full rounded-[15px] '>
        <div className='w-full h-fit bg-primary'>

          <header className='w-full h-[4rem] bg-secondary text-secondary flex justify-between py-4 px-6'>
            <Link to="/" className='p-[0.2rem] w-fit h-fit bg-pure rounded-[7px]'>
              <img src={emailSvg} className='w-[1.3rem] text-secondary' />
            </Link>
            <h6 className='text-[0.7rem] font-bold uppercase '>Email Address</h6>
          </header>

          <div className="w-full h-fit p-[2rem] gap-[2rem] flex flex-col justify-center items-center ">

            <div className={`w-full hero-input-label ${formik.touched.email && formik.errors.email ? 'duration-500 border-b-2 transition-colors border-b-red-500 text-red-500' : 'focus-within:text-primary border-b-[#fff9] focus-within:border-b-primary border-b-2 transition-colors duration-500 focus-within:transition-colors focus-within:duration-500'}`}>

              <label htmlFor='email'>Enter Your Email</label>

              <div className='w-full flex items-center group gap-2'>

                <input
                  id='email'
                  required
                  placeholder={formik.touched.email && formik.errors.email ? (formik.errors.email) : "johnDoe@gmail.com"}
                  type="email"
                  name='email'
                  {...formik.getFieldProps('email')}
                  className={` ${formik.touched.email && formik.errors.email ? " placeholder:text-red-500 placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors" : " placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors  "} hero-input w-full`}
                />
              </div>

            </div>

            <Button text={'Proceed'} buttonType={'submit'} disabled={!formik.isValid || !formik.dirty} />

          </div>
        </div>
      </div>
    </form>
  )
}
export default EmailAD
