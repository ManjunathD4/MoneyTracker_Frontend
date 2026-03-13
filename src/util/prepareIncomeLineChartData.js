export const prepareIncomeLineChartData = (transactions,categories) => {
  const incomeData = {};
 
  transactions.forEach((transaction) => {

         const date = new Date(transaction.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        });
          const categories1 = categories.find(
      (cat) => cat.id === transaction.categoryId
    );
        
        if (!incomeData[date]) {
            incomeData[date] = {
                amount:0,
            actualDate:transaction.date,
            category:[]
            }
        };
        

      incomeData[date].amount += transaction.amount;

     if (categories1?.name ){
        const existingcat=incomeData[date].category.find((cat)=>cat.name===categories1.name);
        if(existingcat){
          existingcat.amount+=transaction.amount;
        }
        else{
           incomeData[date].category.push({
              name:categories1.name,
              amount: transaction.amount
           });
        }
      }
    

  });

  
  return Object.keys(incomeData)
    .map((date) => ({
      month: date,
      totalAmount: incomeData[date].amount,
      actualDate: incomeData[date].actualDate,
      category:incomeData[date].category,
    }))
    .sort((a, b) => new Date(a.actualDate) - new Date(b.actualDate));
};