import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList=({transaction,onDelete,onEmail,onDownload})=>{
    const [loadingDown,setLoadingDown]=useState(false);
    const [loadingEma,setLoadingEma]=useState(false);


    const handleDownload=async()=>{
        setLoadingDown(true);
        try{
           
            await onDownload();
        }
        finally{
        setLoadingDown(false);
        }
    }

    const handleEmail=async()=>{
        setLoadingEma(true);
        try{
            await onEmail();
        }
        finally{
        setLoadingEma(false);
        }
    }

    
    return(
        <div className="card"> 
            <div className="flex items-center justify-between">
                <h5 className="text-lg">
                    Expense Sources
                </h5>
                {/* {transaction.length===0?(
                   " "
                ):(
                     <div className="flex items-center justify-end gap-2">
                        <button disabled={loadingEma} className="card-btn" onClick={handleEmail}>
                             {loadingEma?(
                                      <>
                                         <LoaderCircle className="w-4 h-4 animate-spin" />
                                            Emailing....
                            
                                      </>
                                         ):(
                                      <>
                                         <Mail size={15} className="text-base"  />Email
                                      </>
                                    )}

                           
                        </button>
                        <button disabled={loadingDown} className="card-btn" onClick={handleDownload}>
                           {loadingDown?(
                                       <>
                                            <LoaderCircle className="w-4 h-4 animate-spin" />
                                               Downloading....

                                        </>
                                   ):(
                                        <>
                   
                                            <Download size={15} className="text-base"  />Download
                                        </>
                                     )}
                          
                        </button>
                    </div>
                )} */}
                   
            </div>

                  {transaction.length===0?(
                    <div className="text-center m-15">

                      <h4>No Expenses</h4>
                      </div>
                ):(
                    <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    {transaction?.map((expense)=>(
                    <TransactionInfoCard 
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format('Do MMM YYYY')}
                        amount={expense.amount}
                        type="expense"
                        onDelete={()=>onDelete(expense.id)}
                      
                    />
                ))}
            
            </div>
                )}
        </div>
    )
}

export default ExpenseList;