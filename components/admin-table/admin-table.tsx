import { User } from "@/types";
import { TableWrapper } from "./table-wrapper";
import { URL } from "@/lib/utils";

const fetchUsers = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    return data as User[];
};

export const AdminTable = async () => {
    return <TableWrapper users={await fetchUsers()} />;
};
