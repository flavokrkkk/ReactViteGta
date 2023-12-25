import { useState } from 'react';
import styles from './Home.module.css'
import { SubmitHandler, useForm } from 'react-hook-form';

//Переменная отправки запроса о получении игры
// const isSuccess = false

  //Выполнение типизации интерфейса форм
  interface IFormState {
      name: string
      email: string
  }
  function Home () {
  //Состояние для формы с помощью React Hook Form
  const {register, handleSubmit, reset} = useForm<IFormState>()

  //Состояние об успешном запросе на получение игры
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const url = 'http://localhost:5000/api'
  //Отправка запроса на сервер
  const onSubmit: SubmitHandler<IFormState> = (data) => {
    setIsLoading(true)
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
      }).then(response =>
          response.json()

      ).then(data => {
          if(!data) return

          setIsSuccess(true)
          reset()
      }).finally(() => {
          setIsLoading(false)
      })
  }
  return (
    <div className={styles.wrapper}>

      <form onSubmit={handleSubmit(onSubmit)}>
      {isSuccess ?(
      <div className={styles.success}>
        Successfully!
      </div>
      ):(
      <>
        <h1>GTA 6 - Оставить заявку!</h1>
        <input type='name' placeholder='Enter Name: ' {...
          register('name')}/>

        <input type='email' placeholder='Enter E-mail: ' {...
          register('email')}/>
        <button disabled={isLoading}>
            {isLoading 
              ? 'Загрузка ...'
              : 'Получить'
            }
        </button>
      </>
      )}
      </form>
    </div>
  )
}

export default Home;
