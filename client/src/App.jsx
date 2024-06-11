import { useState } from "react"

function App() {

  const [post, setPost] = useState({
    title: '',
    photo: null
  })

  return (
    <>
<form>
<input 
          type="text" 
          placeholder="title"
          onChange={e => {
            setPost({ ...post, title: e.target.value });
            console.log('input value:', e.target.value);
          }}
        />

  <input type="file" name="photo" id="photo" 
  onChange={e => setPost({...post, photo: e.target.files[0]})}
  />
  <button>
    subir
  </button>
</form>
    </>
  )
}

export default App
