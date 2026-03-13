import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Home = () => {
    useUser();
    return(
        <div>
            <Dashboard activeMenu="Dashboard">
                Home page
            </Dashboard>
        </div>
    )
}

export default Home;