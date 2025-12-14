"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { ReusableDataTable } from "@/components/maingrid/ReusableDataTable";
import FormFields from "@/components/FormFeilds/formfeilds";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface SchemeDueDay {
  id: number;
  schemeId: number;
  schemeName: string;
  ruleId: number | null;
  ruleName: string | null;
  dueDayCode: string;
  dueDay: string;
  cutoffDays: number;
  RECID: number;
  DUEDAY: number;
  DUEDAYCUTOFFDAYS: number;
  Othdesc1: string;
  Othdesc2: string;
  Othdesc3: string;
  RECSTATUS?: boolean;
}

export default function SchemeDueDayPage() {
  const { t } = useTranslation("SchemeDueDay");
  const [records, setRecords] = useState<SchemeDueDay[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<SchemeDueDay | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        `http://108.181.189.211:8081/api/CnfgSchmeDueDay`
      );

      setRecords(response.data.map((item:SchemeDueDay, index: number)=>({ ...item, id: index + 1 })));
      
      if (response.data.length > 0) {
        toast.success("Data has been fetched");
      } else {
        toast.info("No data found");
      }
    } catch (error) {
      console.error("API Error:", error);
      setRecords([]);
      toast.error("Failed to fetch data");
    } 
  };

  useEffect(() => {
    fetchRecords();
  }, []);

    const columns: ColumnDef<SchemeDueDay>[] = [
    { id: "actions", header: "Actions" },
    { accessorKey: "RECID", header: "Rule Id" },
    { accessorKey: "SCHEMENAME", header: "Scheme Name" },
    { accessorKey: "DUEDAY", header: "Due Day" },
    { accessorKey: "DUEDAY_VBCODE", header: "Due Code" },
    { accessorKey: "DUEDAYCUTOFFDAYS", header: "Cutoff Days" },
    {
      accessorKey: "RECSTATUS",
      header: "Status",
      cell: ({ row }) => {
        const value = row.original.RECSTATUS;
        
        return (
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full 
          ${
            value
              ? "bg-green-500 text-white border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }
        `}
          >
            {value ? "Active" : "Inactive"}
          </span>
        );
      },
    },
  ];

  const formFields = [
    { name: "RECID", label: "Record ID", type: "text", required: true },
    { name: "DUEDAY", label: "Due Day", type: "text", required: true },
    {
      name: "DUEDAYCUTOFFDAYS",
      label: "Cutoff Days",
      type: "text",
      required: true,
    },

    {
      name: "Othdesc1",
      label: "Description 1",
      type: "text",
      minLength: 3,
      maxLength: 50,
    },
    {
      name: "Othdesc2",
      label: "Description 2",
      type: "text",
      minLength: 3,
      maxLength: 50,
    },
    {
      name: "Othdesc3",
      label: "Description 3",
      type: "text",
      minLength: 3,
      maxLength: 50,
    },
  ];

  const handleFormSubmit = async (data: any) => {
    const payload = {
      RECID: data.RECID,
      DUEDAY: data.DUEDAY,
      DUEDAYCUTOFFDAYS: data.DUEDAYCUTOFFDAYS,
      Othdesc1: data.Othdesc1,
      Othdesc2: data.Othdesc2,
      Othdesc3: data.Othdesc3,
      Recstatus: data.Recstatus,
      Updateby: data.Updateby,
      Updatedate: data.Updatedate,
      Checker: data.Checker,
      Checkdate: data.Checkdate,
      Maker: data.Maker,
      Makedate: data.Makedate,
    };

    try {
      if (selectedRecord) {
        await axios.put(
          `${process.env.BS_API_KEY}/api/CnfgSchmeDueDay/${selectedRecord.RECID}`,
          payload
        );
      } else {
        await axios.post(
          `${process.env.BS_API_KEY}/api/CnfgSchmeDueDay/AddCnfgSchemeDueDay`,
          payload
        );
      }

      setShowForm(false);
      fetchRecords();
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <div className=" p-4 transition-colors">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="
    cursor-pointer 
    flex items-center gap-2 px-4 py-2 
    bg-gray-200 dark:bg-gray-800 
    rounded-lg 
    transition-colors duration-200
    hover:bg-gray-300 dark:hover:bg-gray-700
  "
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>

          <h1 className="text-3xl font-bold">Scheme Due Day</h1>
        </div>

        {!showForm && (  
          <Button
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            onClick={() => {
              setSelectedRecord(null);
              setShowForm(true);
            }}
          >
            Add Record
          </Button>
        )}
      </div>

      {Object.entries(selectedRecord ?? {}).length > 0 && (
        <div className="bg-sidebar p-4 rounded-lg mb-6">
          <FormFields
            fields={formFields as any}
            initialData={selectedRecord || {}}
            onSubmit={handleFormSubmit}
            onCancel={() => setSelectedRecord(null)}
          />
        </div>
      )}

      <div className="bg-sidebar p-4 rounded-lg">
        <ReusableDataTable<SchemeDueDay>
          initialData={records}
          columns={columns}
          onUpdate={async (row) => {
            setSelectedRecord(row);
            setShowForm(true);
          }}
          onDelete={async (row) => {
            if (row.schemeName) {
              await axios.delete(`/api/CnfgSchmeDueDay/${row.id}`);
              fetchRecords();
            }
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>
    </div>
  );
}
