import axios from 'axios'
import { useFormik } from 'formik'

import AvatarBlue from '../../assets/images/avatar-blue.png'

import { MAX_TWEET_CHAR } from '../../constants/index'

export const TweetForm = ({ loggedInUser, onSuccess }) => {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios.post(`${import.meta.env.VITE_API_HOST}/tweets`, {
        text: values.text
      }, {
        headers: {
          'authorization': `Bearer ${loggedInUser.accessToken}`,
        }
      })

      form.setFieldValue('text', '')
      onSuccess()
    },
    initialValues: {
      text: '',
    }
  })

  return (
    <div className="border-b border-silver p-4 space-y-8">
      <div className="flex space-x-7">
        <img src={AvatarBlue} className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>

      <form className="pl-14 text-lg flex flex-col" onSubmit={formik.handleSubmit}>
        <textarea
          name="text"
          value={formik.values.text}
          className="bg-transparent outline-none disabled:opacity-50"
          placeholder="O que está acontencendo?"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{formik.values.text.length}</span> / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            type="submit"
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={
              formik.values.text.length > MAX_TWEET_CHAR ||
              formik.isSubmitting
            }
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  )
}