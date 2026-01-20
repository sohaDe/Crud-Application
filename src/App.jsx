import RecordTable from './components/RecordTable'
import { Provider } from "react-redux";
import store from './store/store';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div>
      <Provider store={store}>
        <Toaster position='top-right' reverseOrder={false} /> 
        <RecordTable />
      </Provider>
    </div>
  )
}

export default App
