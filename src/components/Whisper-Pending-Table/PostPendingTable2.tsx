import {
    ChevronDownIcon,
  } from "@radix-ui/react-icons"
  import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table"
   
  import { Button } from "@/components/ui/button"
  import { Checkbox } from "@/components/ui/checkbox"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
  } from "@/components/ui/dialog"
import React, {useState } from "react"

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

export function PendingTable2<TData, TValue>({columns , data}: DataTableProps<TData,TValue>) {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectWhisper, setSelectWhisper] = useState({ id: "" , authorName: "" , title: "" , description: "" , source: "" , category: ""})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  function openPopup(popupData) {
    setSelectWhisper(popupData);
    setIsDialogOpen(true);
  }

  function rejectWhisper() {
    const gg = data.filter((res) => res['id'] != selectWhisper.id);
    console.log(gg);
  }

    return (
    <div className="w-full">
            <h1 className="font-medium drop-shadow-sm">Onay Bekleyen Paylaşımlar</h1>
            <h6 className="text-gray-600 text-xs mt-2">Görüntülemek İstediğiniz paylaşımın üzerine çift tıklayın</h6>
            <div className="mt-5">
            <Input placeholder="Başlık Filtrele..." value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />
            </div>
            <div className="rounded-md border mt-2">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return ( <TableHead key={header.id}> {header.isPlaceholder ? null : flexRender( header.column.columnDef.header, header.getContext())} </TableHead>)
                      })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow  key={row.id} data-state={row.getIsSelected() && "selected"}  onDoubleClick={() => openPopup(row.original)}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} satır(lar) seçildi.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Geri</Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>İleri</Button>
        </div>
      </div>
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                    <DialogTitle className="mt-5">{selectWhisper.title}</DialogTitle>
                    <DialogDescription>
                      <div>
                        <div>
                          <img src="../../logo-black.png" width={"50%"} height={"50%"} />
                        </div>
                        <div>
                          {selectWhisper.description}
                        </div>
                        <div className="mt-2">
                          <span>Kategori :</span> {selectWhisper.category}
                        </div>
                        <div className="mt-2">
                        <span>Yazar Adı :</span> {selectWhisper.authorName}
                        </div>
                      </div>
                    </DialogDescription>
                    <DialogFooter>
                      <div>
                        <Button className="mr-2 bg-green-500 hover:bg-white  border hover:text-green-500 transition-all">Onayla</Button>
                        <Button className=" bg-red-500 hover:bg-white border hover:text-red-500 transition-all" onClick={() => rejectWhisper()}>Reddet</Button>
                      </div>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>    
    </div>
    )
}