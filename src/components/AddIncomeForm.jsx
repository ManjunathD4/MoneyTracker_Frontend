import { useEffect, useState } from "react";
import EmojiPickerpopup from "./EmojiPickerpopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm=({onAddIncome,categories})=>{
    const [income,setIncome]=useState({
        name:'',
        amount:'',
        date:'',
        icon:'',
        categoryId:''
        
    })
    
    useEffect(()=>{
        if(categories.length>0&&!income.categoryId){
            setIncome((prev)=>({...prev,categoryId:categories[0].id}))
        }
    },[categories,income.categoryId])

    const [loading,setLoading]=useState(false);

    const handleChange=(key,value)=>{
        setIncome({...income,[key]:value})
    }

        const handleAddIncome=async()=>{
            setLoading(true);
            try{
                await onAddIncome(income);
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
            icon={income.icon}
            onSelect={(selectedIcon)=>handleChange('icon',selectedIcon)}

            />

            <Input 
            value={income.name}
            onChange={({target})=>handleChange('name',target.value)}
            label="Income Source"
            placeholder=" "
            type="text"
            />

             <Input 
            label="Category"
            value={income.categoryId}
            onChange={({target})=>handleChange('categoryId',target.value)}
            isSelect={true}
            options={categoryOptions}
          
            />

            
             <Input 
            label="Amount"
            value={income.amount}
            onChange={({target})=>handleChange('amount',target.value)}
             placeholder=" "
            type="number"
            />

              <Input 
            label="Date"
            value={income.date}
            onChange={({target})=>handleChange('date',target.value)}
             placeholder=" "
            type="date"
            />


            <div className="flex justify-end mt-6">
                <button 
                onClick={handleAddIncome}
                disabled={loading}
                className="add-btn add-btn-fill">
                  {loading?(
                    <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    Adding....

                    </>
                  ):(
                    <>
                    Add Income
                    </>
                  )}
                </button>
            </div>

        </div>
    )
}

export default AddIncomeForm;