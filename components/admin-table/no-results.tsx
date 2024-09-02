import { TableBody, TableCell, TableRow } from "../ui/table";

export const NoResults = () => {
    return (
        <TableBody>
            <TableRow>
                <TableCell className="text-center" colSpan={1000}>
                    No Table Data
                </TableCell>
            </TableRow>
        </TableBody>
    );
};
