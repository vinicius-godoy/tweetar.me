import { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'

import { Header } from '../../components/Header'
import { useAuth } from '../../hooks/useAuth'

import { avatarPhoto } from '../../constants'

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum" />
)

const validationSchema = yup.object({
  avatar: yup.string().required('Selecione um avatar').oneOf([
    'blue',
    'cyan',
    'green',
    'grey',
    'orange',
    'purple',
    'red',
    'yellow',
  ], 'Selecione um avatar'),
  name: yup.string().required('Digite seu nome'),
  username: yup.string().required('Digite seu nome de usuário'),
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
})

export const Profile = () => {
  const { user, refreshData } = useAuth()

  const formik = useFormik({
    onSubmit: async values => {
      const res = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_API_HOST}/users`,
        data: {
          avatar: values.avatar,
          name: values.name,
          username: values.username,
          email: values.email,
        },
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      })

      if (res.status === 200) refreshData()
    },
    initialValues: {
      avatar: '',
      name: '',
      username: '',
      email: '',
    },
    validateOnMount: true,
    validationSchema,
  })

  const getUserData = async () => {
    const res = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_HOST}/users`,
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })

    if (res.status === 200) {
      formik.setValues({
        avatar: res.data.avatar,
        name: res.data.name,
        username: res.data.username,
        email: res.data.email,
      })
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <main className="!mb-auto overflow-y-auto lg:w-4/5 lg:border-x lg:border-silver lg:h-full">
      <Header title="Perfil" />

      <div className="p-12 space-y-6">
        <h2 className="text-3xl">Edite seu perfil</h2>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>

          <div className="flex items-center space-x-6">
            <div>
              <img className="w-40" src={avatarPhoto[formik.values.avatar]} alt="" />
            </div>

            <div className="space-y-2 w-full">
              <select
                name="avatar"
                className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none appearance-none focus:border-platinum"
                value={formik.values.avatar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              >
                <option className="bg-richBlack text-platinum" value="yellow">Amarelo</option>
                <option className="bg-richBlack text-platinum" value="blue">Azul</option>
                <option className="bg-richBlack text-platinum" value="cyan">Ciano</option>
                <option className="bg-richBlack text-platinum" value="grey">Cinza</option>
                <option className="bg-richBlack text-platinum" value="orange">Laranja</option>
                <option className="bg-richBlack text-platinum" value="purple">Roxo</option>
                <option className="bg-richBlack text-platinum" value="green">Verde</option>
                <option className="bg-richBlack text-platinum" value="red">Vermelho</option>
              </select>
              {(formik.touched.avatar && formik.errors.avatar) && (
                <span className="text-red-500 text-sm">
                  {formik.errors.avatar}
                </span>
              )}
            </div>
          </div>

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

          <button
            type="submit"
            className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Enviando...' : 'Salvar'}
          </button>
        </form>
      </div>
    </main>
  )
}
