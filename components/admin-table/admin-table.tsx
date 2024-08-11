import { User } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { Table, TableHead, TableHeader, TableRow } from "../ui/table";
import { AdminTableBody } from "./admin-table-body";

const URL = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetchUsers = async () => {
    // await delay(5000);
    const response = await fetch(URL);
    const data = await response.json();
    return data as User[];
};

export const AdminTable = async () => {
    const users = await fetchUsers();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">
                        <Checkbox />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <AdminTableBody data={users} />
        </Table>
    );
};
