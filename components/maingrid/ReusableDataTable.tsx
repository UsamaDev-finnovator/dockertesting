"use client";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ViewModal } from "@/components/ui/ViewModal";
import { Eye, Edit, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DeleteModal } from "../ui/deletemodal";
import { useDebounce } from "@/hooks/useDebounce";

interface DataTableProps<T> {
  initialData: T[];
  columns: ColumnDef<T>[];
  onUpdate?: (row: T) => Promise<void>;
  onDelete?: (row: T) => Promise<void>;
  onAdd?: () => void;
  pageSizeOptions?: number[];
  pageTitle?: string;
}

export function ReusableDataTable<T extends { id: number }>(
  props: DataTableProps<T>
) {
  const {
    initialData,
    columns,
    onAdd,
    onUpdate,
    onDelete,
    pageSizeOptions = [10, 20, 50],
    pageTitle = "Page Title",
  } = props;

  const [data, setData] = useState<T[]>(initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSizeOptions[0],
  });

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<T | null>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData])
  

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const dataIds: UniqueIdentifier[] = data.map((d) => d.id);
  const [openRowId, setOpenRowId] = useState<number | null>(null);

  useEffect(() => {
    table.setGlobalFilter(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const allColumns = columns.map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }: { row: Row<T> }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <EllipsisVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem
                className="flex items-center gap-3 px-3 py-2.5 w-full text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setSelectedRow(row.original);
                  setViewModalOpen(true);
                  setOpenRowId(null);
                }}
              >
                <Eye className="w-4 h-4 text-blue-600" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  onUpdate?.(row.original);
                  setOpenRowId(null);
                }}
                className="flex items-center gap-3 px-3 py-2.5 w-full text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit className="w-4 h-4 text-amber-600" />
                Edit Record
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setRowToDelete(row.original);
                  setDeleteModalOpen(true);
                  setOpenRowId(null);
                }}
                className="flex items-center gap-3 px-3 py-2.5 w-full text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Trash className="w-4 h-4 text-red-600" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      };
    }
    return col;
  });

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    globalFilterFn: "includesString",
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  function DraggableRow({ row }: { row: Row<T> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
      id: row.original.id,
    });

    return (
      <TableRow
        ref={setNodeRef}
        data-dragging={isDragging}
        className={`border-b last:border-0 hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isDragging ? "bg-gray-200 dark:bg-gray-600" : ""
        }`}
        style={{ transform: CSS.Transform.toString(transform), transition }}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center mt-5">
      <div className="w-full mb-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-200"
        />
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-[#121212] mt-4">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={allColumns.length}
                    className="text-center py-6 text-gray-600 dark:text-gray-400"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>

        <div className="flex justify-end mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {pagination.pageIndex + 1} | Total Rows: {data.length}
          </div>
        </div>
      </div>

      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        data={selectedRow}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        data={rowToDelete}
        message={
          rowToDelete
            ? `Are you sure you want to delete this record?`
            : undefined
        }
        onConfirm={async (row) => {
          if (!row) return;
          if (onDelete) await onDelete(row);
          setData((prev) => prev.filter((r) => r.id !== row.id));
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
