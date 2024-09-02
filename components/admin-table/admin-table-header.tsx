import {
    useAdminPaginationApi,
    useAdminPaginationData,
} from "@/providers/admin-pagination-provider";
import { Checkbox } from "../ui/checkbox";
import { TableHeader, TableRow, TableHead } from "../ui/table";
import { CheckedState } from "@radix-ui/react-checkbox";

export const AdminTableHeader = () => {
    const { currentPageData, selectedCheckboxes } = useAdminPaginationData();
    const { setPagination } = useAdminPaginationApi();

    const idsOfCurrentPage = currentPageData.map(({ id }) => id);

    const allIdsChecked = idsOfCurrentPage.every(
        (id) => selectedCheckboxes[id]
    );

    const someIdsChecked = idsOfCurrentPage.some(
        (id) => selectedCheckboxes[id]
    );

    const handleChange = (newState: CheckedState) => {
        const state = newState === "indeterminate" ? true : newState;
        const updatedCheckboxes = { ...selectedCheckboxes };
        idsOfCurrentPage.forEach((id) => (updatedCheckboxes[id] = state));

        setPagination({ selectedCheckboxes: updatedCheckboxes });
    };

    return (
        <TableHeader>
            <TableRow className="bg-muted/50">
                <TableHead className="w-[100px]">
                    <Checkbox
                        aria-label="select all"
                        checked={getCheckedStatus({
                            allIdsChecked,
                            someIdsChecked,
                        })}
                        onCheckedChange={handleChange}
                    />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
    );
};

const getCheckedStatus = ({
    someIdsChecked,
    allIdsChecked,
}: {
    someIdsChecked: boolean;
    allIdsChecked: boolean;
}): CheckedState => {
    if (allIdsChecked && someIdsChecked) return true;
    if (someIdsChecked) return "indeterminate";
    return false;
};
