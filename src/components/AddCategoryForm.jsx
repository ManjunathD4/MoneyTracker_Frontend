import { useEffect, useState } from "react";
import EmojiPickerpopup from "./EmojiPickerpopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";


const AddCategoryForm=({onAddCategory,initialCategoryData,isEditing})=>{
        const [loading,setLoading]=useState(false);


    useEffect(()=>{
        console.log('is:',isEditing);
        console.log('in:',initialCategoryData);

        if(isEditing&&initialCategoryData){
            setCategory(initialCategoryData);
        }else{
            setCategory({   name:"",
                            type:"income",
                            icon:""});
        }
    },[isEditing,initialCategoryData]);

    const [category,setCategory]=useState({
        name:"",
        type:"income",
        icon:""
    })

    const handleSubmit=async()=>{
        setLoading(true);
       try{
     
        await onAddCategory(category);
       }catch (error) {
    console.error(error);
       }finally{
        setLoading(false);
       }
    }

    const categoryTypeOptions=[
        {value:"income",label:"Income"},
        {value:"expense",label:"Expense"},

    ]

    const handleChange=(key,value)=>{
        setCategory({...category,[key]:value})
    }

    return(
        <div className="p-4">
            <EmojiPickerpopup icon={category.icon}
                               onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}             
            />
            <Input 
                value={category.name}
                onChange={({target})=>handleChange("name",target.value)}
                label="Category Name"
                placeholder=""
                type="text"
            />
             <Input 
                label="Category Type"
                value={category.type}
                onChange={({target})=>handleChange("type",target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />
            <div className="flex justify-end mt-6">
                <button 
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="add-btn add-btn-fill-blue">
                     {loading ?(
                        <>
                           <LoaderCircle className="animate-spin w-5 h-5" />
                                 {isEditing?"Updating....":"Adding....."}
                        </>
                       ):(   <>
                       {
                       isEditing?"Update Category":"Add Category"}
                            </> )}
                </button>
            </div>
        </div>
    )

}

export default AddCategoryForm;