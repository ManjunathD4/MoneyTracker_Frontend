import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const IncomeList=({transaction,onDelete,onEmail,onDownload})=>{
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
                    Income Sources
                </h5>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transaction?.map((income)=>(
                    <TransactionInfoCard 
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('Do MMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={()=>onDelete(income.id)}
                      
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;