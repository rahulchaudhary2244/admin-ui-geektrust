import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    useAdminPaginationApi,
    useAdminPaginationData,
} from "@/providers/admin-pagination-provider";
import { User } from "@/types";
import {
    PropsWithChildren,
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type Props = PropsWithChildren<{ user: User }>;

export const EditDetailsDialog = ({
    children,
    user: { email, role, name, id },
}: Props) => {
    const [dropdownValue, setDropdownValue] = useState(role);

    const { data } = useAdminPaginationData();
    const { setPagination } = useAdminPaginationApi();

    const nameRef = useRef<HTMLInputElement>(null!);
    const emailRef = useRef<HTMLInputElement>(null!);

    const handleSubmit = () => {
        const updatedData = data.map((item) => {
            if (item.id === id)
                return {
                    ...item,
                    email: emailRef.current.value,
                    name: nameRef.current.value,
                    role: dropdownValue,
                };
            return item;
        }) satisfies User[];

        setPagination({
            data: updatedData,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you
                        are done
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue={name}
                            type="text"
                            className="col-span-3 h-9"
                            ref={nameRef}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            defaultValue={email}
                            className="col-span-3 h-9"
                            type="email"
                            ref={emailRef}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                            Role
                        </Label>
                        <Select
                            value={dropdownValue}
                            onValueChange={setDropdownValue}
                        >
                            <SelectTrigger id="role" className="col-span-3 h-9">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {["admin", "member"].map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            className="h-8 px-3"
                        >
                            Save changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
