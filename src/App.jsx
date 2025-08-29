import { useState } from 'react'
import LoginPage from './components/LoginPage'
import ParameterSelection from './components/ParameterSelection'
import ResultsPage from './components/ResultsPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('login')
  const [parameters, setParameters] = useState(null)

  const handleLogin = () => {
    setCurrentPage('parameters')
  }

  const handleCompare = (params) => {
    setParameters(params)
    setCurrentPage('results')
  }

  const handleRestart = () => {
    setParameters(null)
    setCurrentPage('parameters')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />
      case 'parameters':
        return <ParameterSelection onCompare={handleCompare} />
      case 'results':
        return <ResultsPage parameters={parameters} onRestart={handleRestart} />
      default:
        return <LoginPage onLogin={handleLogin} />
    }
  }

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  )
}

export default App
