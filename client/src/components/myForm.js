import { BrowserRouter as Prompt } from 'react-router-dom';
import useState from 'react'
function MyForm() {
  const [isFormIncomplete, setIsFormIncomplete] = useState(true);
  return (
    <div>
     <form>{/*Your code*/}</form>

     <Prompt
       when={isFormIncomplete}
       message="Are you sure you want to leave?" />
    </div>
  )
}