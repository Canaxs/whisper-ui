"use client";
import { getPendingWhispers, getUsers, getWhispers } from "@/api/apiCalls";
import DashboardMenu from "@/components/Dashboard-Menu/DashboardMenu";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
  import {
    CaretSortIcon,
  } from "@radix-ui/react-icons"
import { ModPendingTable } from "@/components/Whisper-Pending-Table/ModPendingTable";



export type User = {
    username: string
    password: string
    userPoint: number
    id: number
    authorities: string
}

export const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox checked={ table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />
      ),
      cell: ({ row }) => (
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
      accessorKey: "username",
      header: "Kullanıcı Adı",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("username")}</div>
      ),
    },
    {
      accessorKey: "password",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Şifre
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">******************</div>,
    },
    {
      accessorKey: "userPoint",
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="flex justify-end pl-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Puan
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => { return <div className="font-medium pl-5">{row.getValue("userPoint")}</div> },
    },
]

async function getData(): Promise<User[]> {
  const user = await getUsers();
  return user.data;
}


export default async function ModsPage() {

    const data = await getData();

    return (
        <div className="w-full h-[95%] flex"> 
            <DashboardMenu />
            <div className="ml-[1%] mr-[1%] w-[98%] mt-5 flex">
                <div className="w-[45%] shadow-2xl pl-5 pr-5 pt-3">
                    <ModPendingTable columns={columns} data={data} />
                </div>
                <div className="w-[45%] shadow-2xl pl-5 pr-5 pt-3 ml-[4%]">
                </div>
            </div>
        </div>
    )
}