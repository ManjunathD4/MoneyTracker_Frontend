import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TransactionChartBar = ({ data }) => {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 px-4 py-3">
          <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
  
          <div className="space-y-1">
            <p className="text-sm text-green-600 font-medium">
              Income: ₹{payload.find((item) => item.dataKey === "income")?.value || 0}
            </p>
            <p className="text-sm text-red-500 font-medium">
              Expense: ₹{payload.find((item) => item.dataKey === "expense")?.value || 0}
            </p>
          </div>
        </div>
      );
    }
  
    return null;
  };
  return (
    <div className="card mt-6">
      <h5 className="text-lg mb-4">Weekly Income vs Expense</h5>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip content={<CustomTooltip />}/>
            <Legend />
          <Bar dataKey="income" fill="#4ade80" radius={[8, 8, 0, 0]} />
<Bar dataKey="expense" fill="#f87171" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionChartBar;