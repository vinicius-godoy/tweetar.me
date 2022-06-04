import { TweetForm } from "../../components/TweetForm"
import { Tweet } from "../../components/Tweet"

export const Home = () => {
  return (
    <>
      <TweetForm />
      <Tweet
        name="Elon Musk" username="elonmusk"
        avatar="/src/avatar.png" likes="1.2M"
      >
        Let's manipulate crypto!
      </Tweet>
      <Tweet
        name="Vinícius Godoy" username="vinicius-godoy"
        avatar="/src/avatar.png" likes="6"
      >
        Let's study ReactJS!
      </Tweet>
    </>
  )
}