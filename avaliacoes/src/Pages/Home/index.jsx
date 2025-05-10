import { useEffect, useState } from 'react'
import api from '../../services/api'
import './style.css'

function Home() {
  const [users, setUsers] = useState([])
  const [nome, setNome] = useState('')
  const [depoimento, setDepoimento] = useState('')

  async function getUsers() {
    try {
      const response = await api.get('/usuarios')
      setUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários', error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nome || !depoimento) return alert('Preencha todos os campos!')

    try {
      await api.post('/usuarios', {
        name: nome,
        testimony: depoimento
      })
      setNome('')
      setDepoimento('')
      getUsers() // Atualiza a lista com o novo usuário
    } catch (error) {
      console.error('Erro ao enviar depoimento', error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>Avaliações de nossos clientes</h1>
        <input
          name='nome'
          type='text'
          placeholder='Digite seu nome'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <textarea
          name='depoimento'
          id='testemonials'
          placeholder='Deixe sua mensagem'
          value={depoimento}
          onChange={(e) => setDepoimento(e.target.value)}
        ></textarea>
        <button type='submit'>Enviar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Depoimento: <span>{user.testimony}</span></p> {/* Corrigido aqui */}
          </div>
          <button><i className="fa-solid fa-trash"></i></button>
        </div>
      ))}
    </div>
  )
}

export default Home
