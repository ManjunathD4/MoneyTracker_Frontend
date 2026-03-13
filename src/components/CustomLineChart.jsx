import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

const CustomLineChart = ({ data }) => {


  const CustomTooltip = ({ active, payload }) => {

  if (active && payload && payload.length) {

    const data = payload[0].payload;

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-sm">

        <p className="font-semibold text-gray-700">Details:</p>

    {data.category.map((cat, index) => (
      <p key={index} className="text-gray-600">
        {cat.name} : ₹{cat.amount}
      </p>
    ))}

        <p className="text-gray-500">
          Date: {new Date(data.actualDate).toLocaleDateString()}
        </p>

        <p className="text-purple-600 font-bold">
          Total Amount: ₹{data.totalAmount}
        </p>

      </div>
    );
  }

  return null;
};



  return (
    <div className="w-full h-[300px]">

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>

          {/* Gradient background */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />

          {/* Gradient area */}
          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#7c3aed"
            fill="url(#incomeGradient)"
            strokeWidth={3}
             dot={{ r: 4, fill: "#7c3aed" }}
  activeDot={{ r: 5 }}
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
};

export default CustomLineChart;