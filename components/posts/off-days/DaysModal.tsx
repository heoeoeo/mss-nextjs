"use client";
import { useState } from "react";

interface SelectDaysModalProps {
  availableDays: string[];
  onClose: () => void;
  onSave: (selectedDays: string[]) => void;
}

export default function DaysModal({
  availableDays,
  onClose,
  onSave,
}: SelectDaysModalProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false); // 요청 진행 중 여부

  const handleCheckboxChange = (day: string) => {
    if (!isSaving) {
      setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
      );
    }
  };

  const handleSave = async () => {
    if (selectedDays.length > 0) {
      setIsSaving(true);
      await onSave(selectedDays);
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-80">
        <h3 className="text-lg font-bold mb-4">추가할 요일 선택</h3>
        <div className="flex flex-col gap-2">
          {availableDays.map((day) => (
            <div
              key={day}
              onClick={() => handleCheckboxChange(day)}
              className={`flex items-center gap-3 p-2 border rounded-md transition ${
                isSaving
                  ? "bg-gray-100 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-100"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                  selectedDays.includes(day)
                    ? "bg-blue-500 border-blue-500"
                    : "bg-gray-200 border-gray-300"
                }`}
              >
                {selectedDays.includes(day) && (
                  <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                )}
              </div>
              <span
                className={`text-gray-700 font-medium ${
                  isSaving && "opacity-50"
                }`}
              >
                {day}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            disabled={isSaving}
            className={`px-4 py-2 rounded-md transition-all ${
              isSaving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={selectedDays.length === 0 || isSaving}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedDays.length > 0 && !isSaving
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSaving ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-blue-500 rounded-full"></span>
            ) : (
              "저장"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
