import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, DollarSign, AlertTriangle } from "lucide-react";
export default function AdminDashboard() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50 min-h-screen">
      <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Users</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">1,248</div></CardContent></Card>
      <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Verified Dealers</CardTitle><Store className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">482</div></CardContent></Card>
      <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Pending Approvals</CardTitle><AlertTriangle className="h-4 w-4 text-amber-500" /></CardHeader><CardContent><div className="text-2xl font-bold text-amber-600">14</div></CardContent></Card>
      <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Revenue (Ksh)</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">842,500</div></CardContent></Card>
    </div>
  );
}