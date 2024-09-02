"use client";

import { User } from "@/types";
import { AdminTableHeader } from "./admin-table-header";
import { AdminTableBody } from "./admin-table-body";
import { Table } from "../ui/table";
import { useAdminPaginationApi } from "@/providers/admin-pagination-provider";
import { useEffect } from "react";

type Props = {
    users: User[];
};

export const TableWrapper = ({ users }: Props) => {
    const { setPagination } = useAdminPaginationApi();

    useEffect(() => {
        setPagination({ data: users, page: 1 });
    }, [setPagination, users]);

    return (
        <Table className="mt-4">
            <AdminTableHeader />
            <AdminTableBody />
        </Table>
    );
};
