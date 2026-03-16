import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CustomPieChart = ({
  data = [],
  label = "Total Balance",
  totalAmount = "0",
  colors = [],
  showTextAnchor = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };



  


  
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={(props) => (
              <g>
                <path
                  d={`
                    M ${props.cx},${props.cy}
                  `}
                  fill="none"
                />
                <circle cx={props.cx} cy={props.cy} r={0} fill="transparent" />
                <PieSector {...props} outerRadius={props.outerRadius + 10} />
              </g>
            )}
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                style={{
                  filter: activeIndex === index ? "brightness(1.1)" : "brightness(1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Pie>

           <Tooltip  />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: "14px", fill: "#777" }}
              >
                {label}
              </text>
              <text
                x="50%"
                y="54%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: "20px", fontWeight: "bold", fill: "#111" }}
              >
                ₹{totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const PieSector = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
}) => {
  const RADIAN = Math.PI / 180;

  const x1 = cx + outerRadius * Math.cos(-startAngle * RADIAN);
  const y1 = cy + outerRadius * Math.sin(-startAngle * RADIAN);
  const x2 = cx + outerRadius * Math.cos(-endAngle * RADIAN);
  const y2 = cy + outerRadius * Math.sin(-endAngle * RADIAN);

  const x3 = cx + innerRadius * Math.cos(-endAngle * RADIAN);
  const y3 = cy + innerRadius * Math.sin(-endAngle * RADIAN);
  const x4 = cx + innerRadius * Math.cos(-startAngle * RADIAN);
  const y4 = cy + innerRadius * Math.sin(-startAngle * RADIAN);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  const pathData = [
    `M ${x1} ${y1}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x4} ${y4}`,
    "Z",
  ].join(" ");

  return <path d={pathData} fill={fill} />;
};

export default CustomPieChart;