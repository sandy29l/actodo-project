import Login from'./login.jsx';
import Actodo from './actodo.js'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './signup.jsx';

function App() {


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login  />}></Route>
                    <Route path='/signup' element={<Signup  />}></Route>
                    <Route path='/actodo' element={<Actodo></Actodo>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;