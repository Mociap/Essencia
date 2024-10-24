import { useState } from 'react'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC31C1X13eqVAOq_o5K2evI8q3GOfnpOpo",
  authDomain: "iebi-2e84e.firebaseapp.com",
  projectId: "iebi-2e84e",
  storageBucket: "iebi-2e84e.appspot.com",
  messagingSenderId: "634456198202",
  appId: "1:634456198202:web:8b4de1b4def23a49303903"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default function Home() {
  const [formData, setFormData] = useState({
    nomeCrianca: '', idade: '', dtnascCrianca: '', mae: '', pai: '',
    foneResponsavel: '', endereco: '', bairro: '', cidade: '', cep: '',
    igreja: '', alergia: '', quaisAlergias: '', anoEBF: '2024',
    nomePagante: '', pago: 'Não', dtRegistro: new Date().toISOString()
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "EBF"), formData)
      alert('Registro realizado com sucesso!')
      setFormData({...formData, nomeCrianca: '', idade: '', dtnascCrianca: '', mae: '', pai: '',
        foneResponsavel: '', endereco: '', bairro: '', cidade: '', cep: '',
        igreja: '', alergia: '', quaisAlergias: '', nomePagante: '', pago: 'Não'})
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error)
      alert('Erro ao realizar o registro. Por favor, tente novamente.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Registro EBF 2024</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Nome da Criança:</label>
          <input type="text" name="nomeCrianca" value={formData.nomeCrianca} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        {/* Adicione campos similares para todos os outros dados do formulário */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar</button>
      </form>
    </div>
  )
}
