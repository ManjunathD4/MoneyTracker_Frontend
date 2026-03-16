export const prepareExpenseLineChartData = (transactions,categories) => {
  const expenseData = {};
 
  transactions.forEach((transaction) => {

         const date = new Date(transaction.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        });
          const categories1 = categories.find(
      (cat) => cat.id === transaction.categoryId
    );
        
        if (!expenseData[date]) {
            expenseData[date] = {
                amount:0,
            actualDate:transaction.date,
            category:[]
            }
        };
        

      expenseData[date].amount += transaction.amount;

     if (categories1?.name ){
        const existingcat=expenseData[date].category.find((cat)=>cat.name===categories1.name);
        if(existingcat){
          existingcat.amount+=transaction.amount;
        }
        else{
           expenseData[date].category.push({
              name:categories1.name,
              amount: transaction.amount
           });
        }
      }
    

  });

  
  return Object.keys(expenseData)
    .map((date) => ({
      month: date,
      totalAmount: expenseData[date].amount,
      actualDate: expenseData[date].actualDate,
      category:expenseData[date].category,
    }))
    .sort((a, b) => new Date(a.actualDate) - new Date(b.actualDate));
};