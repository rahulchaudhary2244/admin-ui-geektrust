"use client";

import { TableBody, TableRow, TableCell, TableFooter } from "../ui/table";
import { Pagination } from "./pagination";
import { AdminTableRow } from "./admin-table-row";
import { range } from "@/lib/utils";
import {
    useAdminPaginationApi,
    useAdminPaginationData,
} from "@/providers/admin-pagination-provider";
import { NoResults } from "./no-results";
import { Button } from "../ui/button";

export const AdminTableBody = () => {
    const { setPagination } = useAdminPaginationApi();
    const { data, page, currentPageData, totalPages, selectedCheckboxes } =
        useAdminPaginationData();

    const pageNavigations = range(totalPages);
    const lastPageNo = pageNavigations[pageNavigations.length - 1];

    const handleInlineDelete = (id: string) => {
        const updatedCheckboxes = { ...selectedCheckboxes };
        delete updatedCheckboxes[id];

        setPagination({
            data: data.filter((user) => user.id !== id),
            selectedCheckboxes: updatedCheckboxes,
        });
    };

    const handlePageChange = (newPage: number) =>
        setPagination({ page: newPage });

    const handleDeleteSelected = () => {
        setPagination({
            data: data.filter(({ id }) => !selectedCheckboxes[id]),
            selectedCheckboxes: {},
        });
    };

    if (currentPageData.length === 0) return <NoResults />;

    return (
        <>
            <TableBody>
                {currentPageData.map(({ id, email, name, role }) => (
                    <AdminTableRow
                        key={id}
                        id={id}
                        name={name}
                        email={email}
                        role={role}
                        handleInlineDelete={handleInlineDelete}
                    />
                ))}
            </TableBody>
            <TableFooter className="bg-transparent">
                <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={100}>
                        <div className="flex items-center justify-between w-full gap-4">
                            <Button
                                className="h-8 px-3"
                                onClick={handleDeleteSelected}
                            >
                                Delete Selected
                            </Button>
                            <Pagination
                                className="flex items-center gap-2 justify-center flex-wrap"
                                page={page}
                                lastPageNo={lastPageNo}
                                pageNavigations={pageNavigations}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </>
    );
};
