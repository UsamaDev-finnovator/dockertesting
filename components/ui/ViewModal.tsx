"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "./button";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Record<string, any> | null;
  title?: string;
}

export const ViewModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  data,
  title = "View Details",
}) => {
  if (!isOpen || !data) return null;

  const entries = Object.entries(data);

  const formatKey = (key: string) =>
    key
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const isImage = (value: any): boolean =>
    typeof value === "string" &&
    (value.startsWith("data:image/") ||
      (value.startsWith("http") &&
        /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i.test(value)));

  const rows: [(typeof entries)[0] | null, (typeof entries)[0] | null][] = [];
  for (let i = 0; i < entries.length; i += 2) {
    rows.push([entries[i], entries[i + 1] || null]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 ">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
          >
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <table className="w-full border-collapse">
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 dark:border-gray-700 ${
                    idx % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800/70"
                      : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <td className="px-6 py-4 w-1/4 font-semibold text-gray-700 dark:text-gray-300 text-left align-top">
                    {row[0] ? formatKey(row[0][0]) : ""}
                  </td>
                  <td className="px-6 py-4 w-1/4 text-gray-900 dark:text-gray-100 text-right align-top">
                    {row[0] ? (
                      isImage(row[0][1]) ? (
                        <img
                          src={row[0][1]}
                          alt={formatKey(row[0][0])}
                          className="max-h-36 w-auto rounded-lg border border-gray-300 dark:border-gray-600 object-contain ml-auto"
                        />
                      ) : typeof row[0][1] === "object" &&
                        row[0][1] !== null ? (
                        <pre className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-right">
                          {JSON.stringify(row[0][1], null, 2)}
                        </pre>
                      ) : (
                        <span>{String(row[0][1] || "-")}</span>
                      )
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="border-l border-gray-300 dark:border-gray-700"></td>

                  <td className="px-6 py-4 w-1/4 font-semibold text-gray-700 dark:text-gray-300 text-left align-top">
                    {row[1] ? formatKey(row[1][0]) : ""}
                  </td>
                  <td className="px-6 py-4 w-1/4 text-gray-900 dark:text-gray-100 text-right align-top">
                    {row[1] ? (
                      isImage(row[1][1]) ? (
                        <img
                          src={row[1][1]}
                          alt={formatKey(row[1][0])}
                          className="max-h-36 w-auto rounded-lg border border-gray-300 dark:border-gray-600 object-contain ml-auto"
                        />
                      ) : typeof row[1][1] === "object" &&
                        row[1][1] !== null ? (
                        <pre className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-right">
                          {JSON.stringify(row[1][1], null, 2)}
                        </pre>
                      ) : (
                        <span>{String(row[1][1] || "-")}</span>
                      )
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
          <Button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl shadow-md font-semibold transition"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// "use client";

// import React from "react";
// import { XIcon, CopyIcon } from "lucide-react";

// interface ViewModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   data: Record<string, any> | null;
//   title?: string;
// }

// export const ViewModal: React.FC<ViewModalProps> = ({
//   isOpen,
//   onClose,
//   data,
//   title = "View Record",
// }) => {
//   if (!isOpen || !data) return null;

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     alert("Copied to clipboard!");
//   };

//   const isImageKey = (key: string) =>
//     key.toUpperCase().includes("IMAGE") ||
//     key.toUpperCase().includes("ANIMATION");

//   const canRenderBase64 = (value: string) =>
//     typeof value === "string" && value.startsWith("data:image");

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
//       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-7xl overflow-hidden transform scale-95 animate-slide-up">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             {title}
//           </h2>
//           <button
//             className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
//             onClick={onClose}
//           >
//             <XIcon className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Modal Content */}
//         <div className="p-6 max-h-[75vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {Object.entries(data).map(([key, value]) => {
//             const isImage = isImageKey(key) && canRenderBase64(value);

//             return (
//               <div
//                 key={key}
//                 className="relative p-4 border rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm flex flex-col gap-3"
//               >
//                 <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">
//                   {key}
//                 </span>

//                 {isImage ? (
//                   <img
//                     src={value}
//                     alt={key}
//                     className="max-h-48 w-full object-contain rounded-lg border"
//                   />
//                 ) : (
//                   <pre className="text-gray-900 dark:text-gray-100 text-sm whitespace-pre-wrap break-words leading-relaxed">
//                     {value?.toString() || "-"}
//                   </pre>
//                 )}

//                 {/* Floating Copy Button */}
//                 <button
//                   onClick={() => copyToClipboard(value?.toString() || "")}
//                   className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
//                   title="Copy this field"
//                 >
//                   <CopyIcon className="w-4 h-4" />
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* Modal Footer */}
//         <div className="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl shadow-md font-semibold transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         .animate-fade-in {
//           animation: fadeIn 0.3s ease-out forwards;
//         }
//         .animate-slide-up {
//           animation: slideUp 0.25s ease-out forwards;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         @keyframes slideUp {
//           from {
//             transform: translateY(30px) scale(0.95);
//           }
//           to {
//             transform: translateY(0) scale(1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };
