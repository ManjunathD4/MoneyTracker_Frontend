import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";


const Expense = () => {
        useUser();
    
    return(
        <Dashboard activeMenu="Expense"> 
                expense
            </Dashboard>
    )
}

export default Expense;