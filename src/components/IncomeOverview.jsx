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

                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyaze your income trends.
                    </p>
                </div>
                 
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/15 text-green-600 border border-green-500/30 hover:bg-green-500/25 transition" onClick={onAddIncome}>
                           <Plus size={15} className="text-lg"/> Add Income
                        </button>


            </div>
               {chartData.length===0?(
                ""
            ):(

                <>
                  <div className="mt-10">
                 <CustomLineChart data={chartData}/>
                </div>
                </>
            )}
            

        </div>

    )
}


export default IncomeOverview;