import { useEffect, useState } from "react";
import EmojiPickerpopup from "./EmojiPickerpopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm=({onAddExpense,categories})=>{
    const [expense,setExpense]=useState({
        name:'',
        amount:'',
        date:'',
        icon:'',
        categoryId:''
        
    })
    
    useEffect(()=>{
        if(categories.length>0&&!expense.categoryId){
            setExpense((prev)=>({...prev,categoryId:categories[0].id}))
        }
    },[categories,expense.categoryId])

    const [loading,setLoading]=useState(false);

    const handleChange=(key,value)=>{
        setExpense({...expense,[key]:value})
    }

        const handleAddExpense=async()=>{
            setLoading(true);
            try{
                await onAddExpense(expense);
            }finally{
                  setLoading(false);
            }
        }

    const categoryOptions=categories.map(category=>({
        value:category.id,
        label:category.name
    }))
    return(
        <div>
            <EmojiPickerpopup 
            icon={expense.icon}
            onSelect={(selectedIcon)=>handleChange('icon',selectedIcon)}

            />

            <Input 
            value={expense.name}
            onChange={({target})=>handleChange('name',target.value)}
            label="Expense Source"
            placeholder=" "
            type="text"
            />

             <Input 
            label="Category"
            value={expense.categoryId}
            onChange={({target})=>handleChange('categoryId',target.value)}
            isSelect={true}
            options={categoryOptions}
          
            />

            
             <Input 
            label="Amount"
            value={expense.amount}
            onChange={({target})=>handleChange('amount',target.value)}
             placeholder=" "
            type="number"
            />

              <Input 
            label="Date"
            value={expense.date}
            onChange={({target})=>handleChange('date',target.value)}
             placeholder=" "
            type="date"
            />


            <div className="flex justify-end mt-6">
                <button 
                onClick={handleAddExpense}
                disabled={loading}
                className="add-btn add-btn-fill-red">
                  {loading?(
                    <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    Adding....

                    </>
                  ):(
                    <>
                    Add Expense
                    </>
                  )}
                </button>
            </div>

        </div>
    )
}

export default AddExpenseForm;