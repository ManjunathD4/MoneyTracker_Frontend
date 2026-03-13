import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import "../index.css";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/text";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";


const Category = () => {
        useUser();
        const [loading,setLoading]=useState(false);
        const [categoryData,setCatagoryData]=useState([]);
        const [openAddCategoryModal,setOpenAddCategoryModal]=useState(false);
        const [openEditCategoryModal,setOpenEditCategoryModal]=useState(false);
        const [selectedCategory,setSelectedCategory]=useState(null);




        const fetchcategoryDetails= async()=>{
            if(loading) return;

            setLoading(true);

            try {
                const response=await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
                if(response.status===200){
                    console.log('categories',response.data);
                    setCatagoryData(response.data);
                }
            } catch (error) {
                console.error('something went wrong.try again',error)
                toast.error(error.message);
            }
            finally{
            setLoading(false);

            }
        }
    

     useEffect(()=>{
            fetchcategoryDetails();
        },[]);

     const handleAddCategory = async(category) =>{
       const {name,type,icon}=category;

       if(!name.trim()){
        toast.error("Category Name is Required");
        return;
       }
       const isDup=categoryData.some((category)=>{
        return category.name.toLowerCase()===name.trim().toLowerCase();
       })

       if(isDup){
        toast.error("Category Name Already Exists");
        return;
       }

       try {
           const response= await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY,{name,type,icon});
           if(response.status===201){
                   toast.success("Category Added Successfully");
                   setOpenAddCategoryModal(false);
                   fetchcategoryDetails();
                }
       } catch (error) {
         console.error('something went wrong.try again',error)
                toast.error(error.response?.data?.message || "Failed to add category");
       }

     }

     const handleEditCategory=(categoryToEdit)=>{
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
     }
     const handleUpdateCategory=async(updateCategory)=>{
        const {id,name,type,icon}=updateCategory;

       if(!name.trim()){
        toast.error("Category Name is Required");
        return;
       }

       if(!type){
        toast.error("Category Type is Missing");
        return;
       }

        try {
           await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});
           
               setOpenEditCategoryModal(false);
               setSelectedCategory(null);
               toast.success("Category Updated Successfully");
                 fetchcategoryDetails();
                
       } catch (error) {
         console.error('Error updating category:',error.response?.data?.message || error.message )
                toast.error(error.response?.data?.message || "Failed to update category");
       }

     }

    return(
       <Dashboard activeMenu="Category">
         <div className="my-5 mx-auto">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold">
                    All Categories
                </h2>
                <button 
                onClick={()=>setOpenAddCategoryModal(true)}
                className="add-btn  flex items-center gap-1 ">
                    <Plus size={15} />
                    Add Category
                    
                </button>
            </div>
            <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

            <Modal 
                isOpen={openAddCategoryModal}
                onClose={()=>setOpenAddCategoryModal(false)}
                title="Add Category">
                <AddCategoryForm onAddCategory={handleAddCategory} />
            </Modal> 

            
            <Modal 
                isOpen={openEditCategoryModal}
                onClose={()=> {
                   setOpenEditCategoryModal(false)
                setSelectedCategory(null)
                }}
                title="Update Category">
                <AddCategoryForm 
                                initialCategoryData={selectedCategory}
                                onAddCategory={handleUpdateCategory}
                                isEditing={true}
                />
            </Modal> 
         </div>
        </Dashboard>
    )
}

export default Category;