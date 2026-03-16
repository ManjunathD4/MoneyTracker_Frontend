
  const WeeklyChartData = (transactions) => {
    // const weeklyData = [
    //   { week: "Week 1", income: 0, expense: 0 },
    //   { week: "Week 2", income: 0, expense: 0 },
    //   { week: "Week 3", income: 0, expense: 0 },
    //   { week: "Week 4", income: 0, expense: 0 },
    //   { week: "Week 5", income: 0, expense: 0 },
    // ];

    // transactions?.forEach((item) => {
    //   const day = new Date(item.date).getDate();
    //   const weekIndex = Math.floor((day - 1) / 7);

    //   if (item.type === "income") {
    //     weeklyData[weekIndex].income += item.amount;
    //   } else if (item.type === "expense") {
    //     weeklyData[weekIndex].expense += item.amount;
    //   }
    // });

    // return weeklyData;

    if (!transactions || transactions.length === 0) return [];

  const grouped = {};

  transactions.forEach((item) => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const weekStartDay = Math.floor((day - 1) / 7) * 7 + 1;
    const weekEndDay = Math.min(weekStartDay + 6, new Date(year, month + 1, 0).getDate());

    const startDate = new Date(year, month, weekStartDay);
    const endDate = new Date(year, month, weekEndDay);

    const label = `${startDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })} - ${endDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })}`;

    if (!grouped[label]) {
      grouped[label] = {
        label,
        income: 0,
        expense: 0,
      };
    }

    if (item.type === "income") {
      grouped[label].income += Number(item.amount);
    } else if (item.type === "expense") {
      grouped[label].expense += Number(item.amount);
    }
  });

  return Object.values(grouped);

  };

  export default WeeklyChartData;