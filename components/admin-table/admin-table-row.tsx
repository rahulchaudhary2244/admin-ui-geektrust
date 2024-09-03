import { UserPen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { TableRow, TableCell } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { User } from "@/types";
import {
    useAdminPaginationApi,
    useAdminPaginationData,
} from "@/providers/admin-pagination-provider";
import { CheckedState } from "@radix-ui/react-checkbox";
import { EditDetailsDialog } from "./edit-details-dialog";

type Props = {
    handleInlineDelete: (id: string) => void;
} & User;

export const AdminTableRow = ({
    name,
    email,
    role,
    id,
    handleInlineDelete,
}: Props) => {
    const { setPagination } = useAdminPaginationApi();
    const { selectedCheckboxes } = useAdminPaginationData();

    const handleChange = (newState: CheckedState) => {
        const state = newState === "indeterminate" ? false : newState;

        const updatedCheckboxes = {
            ...selectedCheckboxes,
            [id]: state,
        };
        setPagination({ selectedCheckboxes: updatedCheckboxes });
    };

    return (
        <TableRow>
            <TableCell className="w-[100px]">
                <Checkbox
                    checked={selectedCheckboxes[id]}
                    onCheckedChange={handleChange}
                />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell className="break-all">{email}</TableCell>
            <TableCell className="break-all">{role}</TableCell>
            <TableCell className="flex items-center justify-end gap-2 flex-wrap">
                <EditDetailsDialog user={{ id, name, email, role }}>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <UserPen size={16} />
                    </Button>
                </EditDetailsDialog>
                <Button
                    className="h-8 w-8"
                    variant="outline"
                    size="icon"
                    onClick={() => handleInlineDelete(id)}
                >
                    <Trash2 size={16} />
                </Button>
            </TableCell>
        </TableRow>
    );
};
