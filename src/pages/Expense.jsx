import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/text";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";
import Modal from "../components/Modal";
import DeleteAlert from "../components/DeleteAlert";
import toast from "react-hot-toast";


const Expense = () => {
        useUser();
            const [expenseData,setExpenseData]=useState([]);
            const [categories,setCategories]=useState([]);
            const [loading,setLoading]=useState(false);
            const [openAddExpenseModal,setOpenAddExpenseModal]=useState(false);
            const [openDeleteAlert,setOpenDeleteAlert]=useState({
                    show:false,
                    data:null,
            });

      const handleDownloadExpenseDetails=async ()=>{
           
             try {
                 console.log('ok')
                const response=await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{responseType:"blog"});
                let filename="income_details.xlsx";
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link=document.createElement("a");
                link.href=url;
                link.setAttribute("download",filename);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                 window.URL.revokeObjectURL(url);
                 toast.success("Income Details Downloaded");

            } catch (error) {
                console.log('Failed to download income details',error);
                toast.error(error.response?.data?.message || "Failed to download income details");
            }
        }

          const handleEmailExpenseDetails=async()=>{
           
             try {
                const response=await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
                 if(response.status===200){
                    
                    toast.success("Income details mailed succesfully")
                }

            } catch (error) {
                console.log('Failed to email income details',error);
                toast.error(error.response?.data?.message || "Failed to email income details");
            }
        }


            const fetchExpenseDetails=async()=>{
            if(loading) return;
            setLoading(true);
            try {
                const response=await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
                console.log(response.data,response.status);
                if(response.status===200){
                    
                    setExpenseData(response.data)
                }
            } catch (error) {
                console.log('Failed to fetch expense details',error);
                toast.error(error.response?.data?.message || "Failed to fetch expense details");
            } finally{
            setLoading(false);

            }

        }


        const fetchExpenseCategories=async()=>{
   
            try {
                const response=await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
                if(response.status===200){
                   
                    setCategories(response.data)
                }
            } catch (error) {
                console.log('Failed to fetch expense details',error);
                toast.error(error.data?.message || "Failed to fetch expense details");
            } 

        }

          const handleAddExpense=async(expense)=>{
            const {name,amount,date,icon,categoryId}=expense;


            if(!name.trim()){
                toast.error("Please Enter name");
                return;

            }

            if(!amount || isNaN(amount) || Number(amount)<=0){
                toast.error("Please Enter valid number greater than 0");
                return;
            }

             if(!date){
                toast.error("Please Select Date");
                return;
            }

            const today=new Date().toISOString().split('T')[0];
            if(date>today){
                toast.error("Date can not be Future");
                return;
            }

            if(!categoryId){
                toast.error("Select category");
                return;
            }

            try {
                const response=await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE,{
                    name,
                    amount:Number(amount),
                    date,
                    icon,
                    categoryId,
                });
                if(response.status===201){
                   
                    setOpenAddExpenseModal(false);
                    toast.success("Expense Added Successfully");
                    fetchExpenseDetails();
                    fetchExpenseCategories();
                }
            } catch (error) {
                console.log('Failed to add expense details',error);
                toast.error(error.response.data?.message || "Failed to add expense details");
            } 

        }



        const deleteExpense=async(id)=>{
          
            try {
                await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
                setOpenDeleteAlert({show:false,data:null});
                toast.success("Expense Deleted Successfully");
                fetchExpenseDetails();
            } catch (error) {
                 console.log('Error deleting income',error);
                toast.error(error.data?.message || "Failed to delete income");
            }

        }

        useEffect(()=>{
            fetchExpenseDetails();
            fetchExpenseCategories();
        },[])


    
    return(
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                     
                        <ExpenseOverview transactions={expenseData} 
                                        categories={categories}
                                        onAddExpense={()=>setOpenAddExpenseModal(true)}
                        />
                    </div>

                    <ExpenseList
                     transaction={expenseData} 
                     onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}
                     onEmail={handleEmailExpenseDetails}
                     onDownload={handleDownloadExpenseDetails}
                     />
                    {/*add income mdel */}
                     <Modal
                     isOpen={openAddExpenseModal}
                        onClose={()=>setOpenAddExpenseModal(false)}
                        title="Add Expense"
                     >
                        <AddExpenseForm 
                        onAddExpense={(expense)=>handleAddExpense(expense)}
                        categories={categories}
                        
                        />

                     </Modal>

                    {/* Delete income modal */}

                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                        title="Delete Expense"
                    >
                       <DeleteAlert
                       content="Are you sure want to delete this expense details?"
                       onDelete={()=>deleteExpense(openDeleteAlert.data)}
                       />
                    </Modal>


                </div>
            </div>
        </Dashboard>
    )
}

export default Expense;