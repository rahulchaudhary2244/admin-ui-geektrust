import { AdminTable } from "@/components/admin-table/admin-table";
import { SearchInput } from "@/components/search-input";
import { delay } from "@/lib/utils";
import { Suspense } from "react";

export default async function Home() {
    return (
        <div className="mx-auto p-8">
            <SearchInput />
            <Suspense fallback={<div>Loading 2</div>}>
                <AdminTable />
            </Suspense>
        </div>
    );
}
