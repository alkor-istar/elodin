import { useState } from 'react'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import type { State } from './types/state'

function App() {
  const [appState, setAppState] = useState<State>({
    images: [],
    selected: undefined,
    prompt: '',
    apiKey: ''
  })

  const handleAddImage = (file: File) => {
    const newImage = {
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      caption: '',
      status: 'idle' as const,
      error: ''
    }

    setAppState(prev => ({
      ...prev,
      images: [...prev.images, newImage],
      selected: prev.images.length
    }))
  }

  const handleSelectImage = (index: number) => {
    setAppState(prev => ({
      ...prev,
      selected: index
    }))
  }


  return (
    <>
      <div className="h-screen grid grid-rows-[auto_1fr_auto] bg-zinc-950 text-amber-600">
        <Header />
        <Main state={appState} onAddImage={handleAddImage} onSelectImage={handleSelectImage} />
        <Footer />
      </div>
    </>
  )
}

export default App
