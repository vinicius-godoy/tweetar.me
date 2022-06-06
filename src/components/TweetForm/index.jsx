import { useRef } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'

import { useAuth } from '../../hooks/useAuth'

import { MAX_TWEET_CHAR } from '../../constants'
import { avatarPhoto } from '../../constants'

export const TweetForm = ({ onSuccess }) => {
  const { user } = useAuth()
  const sendTweetButton = useRef()

  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        data: {
          text: values.text
        },
        headers: {
          'authorization': `Bearer ${user.accessToken}`,
        }
      })

      form.setFieldValue('text', '')
      onSuccess()
    },
    initialValues: {
      text: '',
    }
  })

  const handleEnter = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      sendTweetButton.current.click()
    }
  }

  return (
    <div className="border-b border-silver p-4 space-y-8">
      <div className="flex space-x-7">
        <img src={avatarPhoto[user.avatar]} className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>

      <form className="pl-14 text-lg flex flex-col space-y-2" onSubmit={formik.handleSubmit}>
        <textarea
          name="text"
          value={formik.values.text}
          className="bg-transparent outline-none resize-none disabled:opacity-50"
          placeholder="O que está acontencendo?"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onKeyDown={handleEnter}
          disabled={formik.isSubmitting}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{formik.values.text.length}</span> / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            type="submit"
            ref={sendTweetButton}
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