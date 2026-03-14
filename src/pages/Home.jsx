import { WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import { useUser } from "../hooks/useUser";
import { addThousandsSeparator } from "../util/util";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/text";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import toast from "react-hot-toast";
import Transactions from "../components/Transactions";

const Home = () => {
    useUser();
    const navigate=useNavigate();
    const [dashboardData,setDashboardData]=useState(null);
    const [loading,setLoading]=useState(false);

    const fetchDashboardData=async()=>{
        if(loading) return;
       
        setLoading(true);
        try {
           const response= await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
           
            if(response.status===200){
                setDashboardData(response.data);
                 console.log(dashboardData.recent5Incomes);
            }

        } catch (error) {
            console.log('Something went wrong while fetching dashboard data',error);
            toast.error('Something Went Wrong!..');
        }finally{
            setLoading(false);
        }

    }


    useEffect(()=>{
        fetchDashboardData();
        return()=>{};
    },[])

    return(
        <div>
            <Dashboard activeMenu="Dashboard">
               <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Display card */}
                        <InfoCard
                            icon={<WalletCards />}
                            label="Total balance"
                            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                            color="bg-purple-800"
                            
                        />
                          <InfoCard
                            icon={<WalletCards />}
                            label="Total Income"
                            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                            color="bg-green-800"
                            
                        />
                          <InfoCard
                            icon={<WalletCards />}
                            label="Total Expence"
                            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                            color="bg-red-800"
                            
                        />

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Recent transactions */}
                        <RecentTransactions
                            transactions={dashboardData?.recentTransaction}
                            OnMore={()=>navigate("/expense")}
                        />
                    
                        {/* finance overview */}
                        <FinanceOverview 
                            totalBalance={dashboardData?.totalBalance||0}
                            totalIncome={dashboardData?.totalIncome||0}
                            totalExpense={dashboardData?.totalExpense||0}
                        />
                        {/* Expense transaction overview */}
                        <Transactions 
                            transactions={dashboardData?.recent5Expense || []}
                            OnMore={()=>navigate("/expense")}
                            type="expense"
                            title="Recent Expense"
                        />



                        {/* Income transaction overview */}
                           <Transactions 
                            transactions={dashboardData?.recent5Incomes || []}
                            OnMore={()=>navigate("/income")}
                            type="income"
                            title="Recent Incomes"
                        />


                    </div>            


                        
               </div>
            </Dashboard>
        </div>
    )
}

export default Home;