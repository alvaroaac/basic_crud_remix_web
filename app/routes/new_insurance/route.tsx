import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { api } from "~/services/api";

export default function CreateInsurance() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    policyNumber: "",
    policyHolderName: "",
    startDate: "",
    premiumAmount: "",
    status: "Pendente",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.insurances.create({
        policyNumber: formData.policyNumber,
        policyHolderName: formData.policyHolderName,
        startDate: formData.startDate,
        premiumAmount: parseFloat(formData.premiumAmount),
        status: formData.status,
      });
      navigate("/insurances");
    } catch (error) {
      console.error("Error creating insurance:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Insurance</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="policyNumber" className="block text-gray-700">
            Policy Number
          </label>
          <input
            type="text"
            id="policyNumber"
            name="policyNumber"
            value={formData.policyNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="policyHolderName" className="block text-gray-700">
            Policy Holder Name
          </label>
          <input
            type="text"
            id="policyHolderName"
            name="policyHolderName"
            value={formData.policyHolderName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="premiumAmount" className="block text-gray-700">
            Premium Amount
          </label>
          <input
            type="number"
            id="premiumAmount"
            name="premiumAmount"
            value={formData.premiumAmount}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create Insurance
        </button>
      </form>
    </div>
  );
}
