import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview=({transactions,categories,onAddIncome})=>{

    const [chartData,setChartData]=useState([]);
    useEffect(()=>{
       
        

        const result=prepareIncomeLineChartData(transactions,categories);
        
        setChartData(result);
        
        return()=>{};
    },[transactions,categories])

    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg"> 
                        Income Overview
                    </h5>

                    <p className="text-xs text-gray-400 mt-0 5">
                        Track your earnings over time and analyaze your income trends.
                    </p>
                </div>
                 
                        <button className="add-btn" onClick={onAddIncome}>
                           <Plus size={15} className="text-lg"/> Add Income
                        </button>


            </div>
                <div className="mt-10">
                 <CustomLineChart data={chartData}/>
                </div>
            

        </div>

    )
}


export default IncomeOverview;