import {
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";

type Props = {
    page: number;
    lastPageNo: number;
    pageNavigations: number[];
    handlePageChange: (newPage: number) => void;
    className?: string;
};

export const Pagination = ({
    page,
    lastPageNo,
    pageNavigations,
    className = "",
    handlePageChange,
}: Props) => {
    const navigationMap = [
        {
            children: <ChevronsLeft size={16} />,
            navigateToPage: 1,
            disabled: page === 1,
        },
        {
            children: <ChevronLeft size={16} />,
            navigateToPage: page - 1,
            disabled: page === 1,
        },
        ...pageNavigations.map((pageNo) => ({
            children: pageNo,
            navigateToPage: pageNo,
            disabled: false,
        })),
        {
            children: <ChevronRight size={16} />,
            navigateToPage: page + 1,
            disabled: page === lastPageNo,
        },
        {
            children: <ChevronsRight size={16} />,
            navigateToPage: lastPageNo,
            disabled: page === lastPageNo,
        },
    ];

    return (
        <div className={className}>
            {navigationMap.map(
                ({ children, navigateToPage, disabled }, idx) => (
                    <Button
                        key={idx}
                        variant={children === page ? "default" : "outline"}
                        size="icon"
                        disabled={disabled}
                        onClick={() => handlePageChange(navigateToPage)}
                        className="w-8 h-8"
                    >
                        {children}
                    </Button>
                )
            )}
        </div>
    );
};
