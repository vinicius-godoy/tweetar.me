import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import Logo from '../../assets/images/codarme-logo.png'
import { useAuth } from '../../hooks/useAuth'

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum" />
)

const validationSchema = yup.object({
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha')
})

export const Login = () => {
  const { login } = useAuth()

  const formik = useFormik({
    onSubmit: async values => {
      login(values)
    },
    initialValues: {
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema,
  })

  return (
    <div className="flex h-full justify-center">
      <div className="hidden bg-birdBlue lg:flex-1 lg:flex lg:justify-center lg:items-center">
        <img src={Logo} alt="" />
      </div>

      <div className="flex-1 flex justify-center items-center p-12">
        <div className="max-w-md flex-1 space-y-6">

          <img className="w-14 lg:hidden" src={Logo} alt="" />

          <h1 className="text-3xl">Acesse sua conta</h1>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-2">
              <Input
                name="email"
                type="text"
                placeholder="E-mail"
                autoComplete="username"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {(formik.touched.email && formik.errors.email) && (
                <span className="text-red-500 text-sm">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {(formik.touched.password && formik.errors.password) && (
                <span className="text-red-500 text-sm">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Enviando...' : 'Entrar'}
            </button>
          </form>

          <div className="text-sm text-silver text-center">
            Não tem conta? <a href="/signup" className="text-birdBlue">Inscreva-se</a>
          </div>
        </div>
      </div>
    </div>
  )
}
