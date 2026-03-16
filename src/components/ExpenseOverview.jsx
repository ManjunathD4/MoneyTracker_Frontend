import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../util/prepareExpenseLineChartData";
import { Plus } from "lucide-react";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview=({transactions,categories,onAddExpense})=>{

    const [chartData,setChartData]=useState([]);
    useEffect(()=>{
        const data=prepareExpenseLineChartData(transactions,categories);
        setChartData(data);
        return()=>{};

    },[transactions,categories]);



    return(
          <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg"> 
                        Expense Overview
                    </h5>

                    <p className="text-xs text-gray-400 mt-0 5">
                        Track your spendings over time and analyaze your expense trends.
                    </p>
                </div>
                 
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/15 text-red-600 border border-red-500/30 hover:bg-red-500/25 transition" onClick={onAddExpense}>
                           <Plus size={15} className="text-lg"/> Add Expense
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

export default ExpenseOverview;