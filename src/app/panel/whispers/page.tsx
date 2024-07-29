"use client";
import { getPendingWhispers, getWhispers } from "@/api/apiCalls";
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
import { PendingTable } from "@/components/Whisper-Pending-Table/PostPendingTable";
import { PendingTable2 } from "@/components/Whisper-Pending-Table/PostPendingTable2";
import { PostPendingTable3 } from "@/components/Whisper-Pending-Table/PostPendingTable3";
import { PostPendingTable4 } from "@/components/Whisper-Pending-Table/PostPendingTable4";



/*
export type Whisper = {
    authorName: string
    title: string
    description: string
    source: string,
    category: string,
    id: number
}

export const columns: ColumnDef<Whisper>[] = [
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
      accessorKey: "title",
      header: "Başlık",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "authorName",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Yazar Adı
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("authorName")}</div>,
    },
    {
      accessorKey: "category",
      header: () => <div className="text-right">Kategori</div>,
      cell: ({ row }) => { return <div className="text-right font-medium">{row.getValue("category")}</div> },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const whisper = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText("g")}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]
*/

//async function getData(): Promise<Whisper[]> {
//  const whisper = await getWhispers();
//  return whisper.data;
//}

//async function getData2(): Promise<Whisper[]> {
//  const whisper = await getPendingWhispers();
//  return whisper.data;
//}


export default function WhispersPage() {

    //const data = await getData();
    //const data2 = await getData2();

    return (
        <div className="w-full h-[95%] flex"> 
            <DashboardMenu />
            <div className="ml-[1%] mr-[1%] w-[98%] mt-5 flex">
                <div className="w-[45%] shadow-2xl pl-5 pr-5 pt-3">
                    <PostPendingTable3 />
                </div>
                <div className="w-[45%] shadow-2xl pl-5 pr-5 pt-3 ml-[4%]">
                    <PostPendingTable4 />
                </div>
            </div>
        </div>
    )
}