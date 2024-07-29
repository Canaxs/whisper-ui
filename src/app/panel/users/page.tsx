"use client";
import { getPendingWhispers, getUsers, getWhispers } from "@/api/apiCalls";
import DashboardMenu from "@/components/Dashboard-Menu/DashboardMenu";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
  } from "@radix-ui/react-icons"
import { useEffect, useState } from "react";
import { Whisper } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { UserPendingTable } from "@/components/Whisper-Pending-Table/UserPendingTable";
import { UserPendingTable2 } from "@/components/Whisper-Pending-Table/UserPendingTable2";


/*
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
*/


export default function UsersPage() {

    return (
        <div className="w-full h-[95%] flex"> 
            <DashboardMenu />
            <div className="ml-[1%] mr-[1%] w-[98%] mt-5 flex">
                <div className="w-[85%] shadow-2xl pl-5 pr-5 pt-3">
                    <UserPendingTable2 />
                </div>
            </div>
        </div>
    )
}