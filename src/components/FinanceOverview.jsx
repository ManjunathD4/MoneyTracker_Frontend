// import { addThousandsSeparator } from "../util/util";
// import CustomPieChart from "./CustomPieChart";

// const FinanceOverview=({totalBalance,totalIncome,totalExpense})=>{
//     const COLORS=["#591688","#a0090e","#016630"];
//     const balanceData=[
//         {name:"Total Balance",amount:totalBalance},
//         {name:"Total Expense",amount:totalExpense},
//         {name:"Total Income",amount:totalIncome}

//     ];
//     return(
//         <div className="card">
//             <div className="flex items-center justify-between">
//                 <h5 className="text-lg">
//                     Financial Overview
//                 </h5>
//             </div>

//             <CustomPieChart 
//                 data={balanceData}
//                 label="Total Balance"
//                 totalAmount={`${addThousandsSeparator(totalBalance)}`}
//                 colors={COLORS}
//                 showTextAnchor
//             />
//         </div>
//     )
// }

// export default FinanceOverview;


import { addThousandsSeparator } from "../util/util";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#591688", "#a0090e", "#016630"];

  const balanceData = [
    { name: "Total Balance", value: Number(totalBalance) || 0 },
    { name: "Total Expense", value: Number(totalExpense) || 0 },
    { name: "Total Income", value: Number(totalIncome) || 0 },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={addThousandsSeparator(totalBalance)}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  );
};

export default FinanceOverview;