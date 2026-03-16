import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/text";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";



const Income = () => {
        useUser();
        const [incomeData,setIncomeData]=useState([]);
        const [categories,setCategories]=useState([]);
        const [loading,setLoading]=useState(false);
        const [openAddIncomeModal,setOpenAddIncomeModal]=useState(false);
        const [openDeleteAlert,setOpenDeleteAlert]=useState({
            show:false,
            data:null,
        });


        const handleDownloadIncomeDetails=async ()=>{
           
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

          const handleEmailIncomeDetails=async()=>{
           
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





        const fetchIncomeDetails=async()=>{
            if(loading) return;
            setLoading(true);
            try {
                const response=await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
                if(response.status===200){
                    
                    setIncomeData(response.data)
                }
            } catch (error) {
                console.log('Failed to fetch income details',error);
                toast.error(error.response?.data?.message || "Failed to fetch income details");
            } finally{
            setLoading(false);

            }

        }


        const fetchIncomeCategories=async()=>{
   
            try {
                const response=await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
                if(response.status===200){
                   
                    setCategories(response.data)
                }
            } catch (error) {
                console.log('Failed to fetch income details',error);
                toast.error(error.data?.message || "Failed to fetch income details");
            } 

        }


         const handleAddIncome=async(income)=>{
            const {name,amount,date,icon,categoryId}=income;


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
                const response=await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{
                    name,
                    amount:Number(amount),
                    date,
                    icon,
                    categoryId,
                });
                if(response.status===201){
                   
                    setOpenAddIncomeModal(false);
                    toast.success("Income Added Successfully");
                      fetchIncomeDetails();
            fetchIncomeCategories();
                }
            } catch (error) {
                console.log('Failed to add income details',error);
                toast.error(error.response.data?.message || "Failed to add income details");
            } 

        }



        const deleteIncome=async(id)=>{
          
            try {
                await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
                setOpenDeleteAlert({show:false,data:null});
                toast.success("Income Deleted Successfully");
                fetchIncomeDetails();
            } catch (error) {
                 console.log('Error deleting income',error);
                toast.error(error.data?.message || "Failed to delete income");
            }

        }

        useEffect(()=>{
            fetchIncomeDetails();
            fetchIncomeCategories();
        },[])
    return(
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                     
                        <IncomeOverview transactions={incomeData} 
                                        categories={categories}
                                        onAddIncome={()=>setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <IncomeList
                     transaction={incomeData} 
                     onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}
                     onEmail={handleEmailIncomeDetails}
                     onDownload={handleDownloadIncomeDetails}
                     />
                    {/*add income mdel */}
                     <Modal
                     isOpen={openAddIncomeModal}
                        onClose={()=>setOpenAddIncomeModal(false)}
                        title="Add Income"
                     >
                        <AddIncomeForm 
                        onAddIncome={(income)=>handleAddIncome(income)}
                        categories={categories}
                        
                        />

                     </Modal>

                    {/* Delete income modal */}

                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                        title="Delete Income"
                    >
                       <DeleteAlert 
                       content="Are you sure want to delete this income details?"
                       onDelete={()=>deleteIncome(openDeleteAlert.data)}
                       />
                    </Modal>


                </div>
            </div>
        </Dashboard>
    )
}

export default Income;