import { AdminTable } from "@/components/admin-table/admin-table";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

export default async function Home() {
    return (
        <div className="mx-auto p-8">
            <Input placeholder="Search by name, email or role" />
            <Suspense fallback={<div>Loading 2</div>}>
                <AdminTable />
            </Suspense>
        </div>
    );
}
