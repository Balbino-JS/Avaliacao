import { useEffect } from 'react'
import api from '../../services/api'
import './style.css'

function Home() {
 
  let users = []

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    users = usersFromApi.data
    console.log(users)
  }

  useEffect(() => {
    getUsers()
  },[])


   return (
    <div className='container'>
      <form>
        <h1>Avaliações de nosso clientes</h1>
        <input name='nome' type='text'placeholder='Digite seu nome'/>
        <textarea name="depoimento" id="testemonials" placeholder='Deixe sua mensagem'></textarea>
        <button type='button'>Enviar</button>
      </form>

      {users.map((user) => (
           <div key={user.id} className='card'>
              <div>
                <p>Nome: <span>{user.name}</span></p>
                <p>Depoimento: <span>{user.depoimento}</span></p>
              </div>
              <button><i className="fa-solid fa-trash"></i></button>
            </div>
      ))}
     
    </div>
  )
}

export default Home
