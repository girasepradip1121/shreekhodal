import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Component/Variable";

const ManageContact = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/request/getall`);
      setRequests(response.data);
    } catch (error) {
      console.log("Error fetching requests", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    try {
      await axios.delete(`${API_URL}/request/remove/${contactId}`);
      setRequests(requests.filter((req) => req.id !== contactId));
      toast.success("Request Deleted");
    } catch (error) {
      toast.error("Error deleting request");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Manage Contact Requests
        </h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.length > 0 ? (
              requests?.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col md:flex-row justify-between items-center"
                >
                  <div className="text-sm md:text-base w-full md:w-2/3">
                    <p>
                      <strong>Email:</strong> {request.email}
                    </p>
                    <p>
                      <strong>Name:</strong> {request.name}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition"
                    >
                      <Eye size={16} /> View Details
                    </button>
                    <button
                      onClick={() => deleteRequest(request.contactId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No contact requests found.</p>
            )}
          </div>
        )}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full text-white relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setSelectedRequest(null)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Request Details</h2>
            <p>
              <strong>Name:</strong> {selectedRequest.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRequest.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedRequest.phone}
            </p>
            <p>
              <strong>Message:</strong> {selectedRequest.message}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageContact;
