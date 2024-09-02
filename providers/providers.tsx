import { PropsWithChildren } from "react";
import { AdminPaginationProvider } from "./admin-pagination-provider";

export const Providers = ({ children }: PropsWithChildren) => {
    return <AdminPaginationProvider>{children}</AdminPaginationProvider>;
};
