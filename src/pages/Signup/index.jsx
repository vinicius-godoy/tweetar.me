import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import { useAuth } from '../../hooks/useAuth'

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum" />
)

const validationSchema = yup.object({
  name: yup.string().required('Digite seu nome'),
  username: yup.string().required('Digite seu nome de usuário'),
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha')
})

export const SignUp = () => {
  const { signUpLogin } = useAuth()

  const formik = useFormik({
    onSubmit: async values => {
      const res = await axios
        .post(`${import.meta.env.VITE_API_HOST}/signup`, {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        })

      signUpLogin(res.data)
    },
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema,
  })

  return (
    <div className="flex h-full justify-center items-center p-12">
      <div className="flex flex-col space-y-6 w-full lg:w-1/2">
        <h1 className="text-3xl">Crie sua conta</h1>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <Input
              name="name"
              type="text"
              placeholder="Nome"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {(formik.touched.name && formik.errors.name) && (
              <span className="text-red-500 text-sm">
                {formik.errors.name}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Input
              name="username"
              type="text"
              placeholder="Nome de Usuário"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {(formik.touched.username && formik.errors.username) && (
              <span className="text-red-500 text-sm">
                {formik.errors.username}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Input
              name="email"
              type="text"
              placeholder="E-mail"
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
            {formik.isSubmitting ? 'Enviando...' : 'Cadastrar'}
          </button>
        </form>

        <span className="text-sm text-silver text-center">
          Já tem uma conta? <a href="/login" className="text-birdBlue">Acesse</a>
        </span>
      </div>
    </div>
  )
}
