import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import TransactionInfoCard from "../components/TransactionInfoCard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/text";
import toast from "react-hot-toast";
import moment from "moment/moment";
import WeeklyChartData from "../util/WeeklyChartData";

import TransactionChartBar from "../components/TransactionChartBar";

const Transaction=()=>{
    useUser();
   
    const [dashboardData,setDashboardData]=useState(null);
    const [loading,setLoading]=useState(false);

    const fetchDashboardData=async()=>{
        if(loading) return;
       
        setLoading(true);
        try {
           const response= await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
           
            if(response.status===200){
                setDashboardData(response.data);
              
            }

        } catch (error) {
            console.log('Something went wrong while fetching dashboard data',error);
            toast.error('Something Went Wrong!..',error);
        }finally{
            setLoading(false);
        }

    }

    const chartData=WeeklyChartData(dashboardData?.recentTransaction);


    useEffect(()=>{
        fetchDashboardData();
        return()=>{};
    },[])
    return(
         <div>
                   <Dashboard activeMenu="Transaction">

                    {chartData.length===0?(
                ""
            ):(

                <>
                  <div className="mt-10">
                  <TransactionChartBar data={chartData}/>
                </div>
                </>
            )}


              

                        <div className="card">

                     <h5 className="text-lg">
                    Recent Transactions
                </h5>
                   <div className="grid grid-cols-1 md:grid-cols-2">
                {dashboardData?.recentTransaction?.map(item=>(
                    <TransactionInfoCard
                    key={item.id}
                    title={item.name}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYY")}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn
                    />
                ))}
                </div>
                </div>
              
               
           
                    </Dashboard>

          </div>
    )
}
export default Transaction;