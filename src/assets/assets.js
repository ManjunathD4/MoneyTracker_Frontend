import logo from "./logo.png";
import login_bg from "./login-bg.jpg";
import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react";

export const assets = {
    logo,
    login_bg,
}


export const SIDE_BAR_DATA=[
    {
        id:"01",
        lable:"Dashboard",
        icon:LayoutDashboard,
        path:"/dashboard",
    },
     {
        id:"02",
        lable:"Category",
        icon:List,
        path:"/category",
    },
     {
        id:"03",
        lable:"Income",
        icon:Wallet,
        path:"/income",
    },
     {
        id:"04",
        lable:"Expense",
        icon:Coins,
        path:"/expense",
    },
     {
        id:"05",
        lable:"Filters",
        icon:FunnelPlus,
        path:"/filter",
    },
]