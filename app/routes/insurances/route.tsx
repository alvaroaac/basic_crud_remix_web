import { json, Link, useLoaderData } from "@remix-run/react";
import { api } from "~/services/api";

// Loader function to fetch insurances from the API
export async function clientLoader() {
  try {
    const response = await api.insurances.list();
    console.log('response is: ', response);
    if (response.status === 200) {
      return json(response.data);
    } else {
      return [];
    }
  } catch (error) {
    console.error('error fetching insurances ', error);
    return null;
  }
}

export default function Insurances() {
  const insurances = useLoaderData<typeof clientLoader>();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Insurances</h1>
      <Link to="/new_insurance" className="mb-6 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Create New Insurance
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insurances && insurances.length > 0 ? (
          insurances.map((insurance: any) => (
            <Link to={`/insurances/${insurance.id}`} key={insurance.id} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="mb-2">
                <span className="font-bold text-lg">Policy Number:</span> {insurance.policyNumber}
              </div>
              <div className="mb-2">
                <span className="font-bold text-lg">Policy Holder:</span> {insurance.policyHolderName}
              </div>
              <div className="mb-2">
                <span className="font-bold text-lg">Premium Amount:</span> {insurance.premiumAmount}
              </div>
              <div>
                <span className="font-bold text-lg">Status:</span> {insurance.status}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center col-span-1 md:col-span-2 lg:col-span-3">
            <p className="text-gray-500">No insurances found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
