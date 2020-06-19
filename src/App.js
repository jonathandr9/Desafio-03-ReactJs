import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories]  = useState([]);

  useEffect(() =>{
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    
    const response = await api.post('/repositories',
    {
      "title": `Repositório ${Date.now()}`,
      "url": "",
      "techs": [
        "Node.js",
        "express"
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);    

  }

  async function handleRemoveRepository(id) {
    
    // await api.delete(`/repositories/${id}`);

    // await api.get('/repositories').then(response => {
    //   setRepositories(response.data);
    // })    

    try {

      await api.delete(`/repositories/${id}`).then(response => {
      
        if(response.status === 204){
          setRepositories(repositories.filter(repository => repository.id !== id));
        }          
      });    

    } catch (err) {

      console.log(err);
    }
      
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
           {repositories.map(repository => 
           
              <li key={repository.id}>{repository.title}

                    <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>
                      Remover
                    </button>
              </li>
            )}     
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
