import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  servicesMapSelector,
  servicesLoadingSelector,
} from "../redux/selectors/servicesSelector";
import {
  fetchServicesInitiatedAction,
  createServiceInitiatedAction,
  updateServiceInitiatedAction,
  deleteServiceInitiatedAction,
} from "../redux/slice/servicesSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiVideoUploadLine } from "react-icons/ri";
import { imageUploadInitiatedAction } from "../redux/slice/imageUploadSlice";
import { uploadedImageUrlSelector } from "../redux/selectors/imageUploadSelector";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import Loading from "../components/Loading";

const ServicePage: FC<ReduxProps> = ({
  services,
  loading,
  fetchServices,
  addService,
  updateService,
  deleteService,
  uploadImage,
  imageUrl,
  isLoggedIn,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serviceImageUrl, setServiceImageUrl] = useState("");

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (imageUrl) setServiceImageUrl(imageUrl);
  }, [imageUrl]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setServiceImageUrl("");
    setEditingServiceId("");
  };

  const handleAddOrUpdateService = () => {
    if (!title.trim() || !description.trim()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: serviceImageUrl.trim(),
    };

    if (editingServiceId) {
      updateService({ service: { id: editingServiceId, ...payload } });
    } else {
      addService({ service: payload });
    }

    resetForm();
    setShowForm(false);
  };

  const handleEditService = (service: any) => {
    setEditingServiceId(service.id);
    setTitle(service.title);
    setDescription(service.description);
    setServiceImageUrl(service.imageUrl || "");
    setShowForm(true);
  };

  const handleDeleteService = (id: string) => {
    deleteService({ id });
  };

  const handleCancelForm = () => resetForm();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 min-w-0">
        <h1 className="text-2xl font-bold">Services</h1>

        {isLoggedIn && (
          <div className="text-center">
            <Button
              onClick={() => {
                setShowForm((prev) => !prev);
                if (editingServiceId) handleCancelForm();
              }}
              className={showForm ? "bg-gray-500" : ""}
            >
              {showForm ? (
                <div className="flex items-center justify-center gap-2">
                  <IoClose size={22} />
                  <span>Cancel</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FaPlus />
                  <span>
                    {editingServiceId ? "Edit Service" : "Add Service"}
                  </span>
                </div>
              )}
            </Button>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showForm
              ? "max-h-350 opacity-100 mb-6"
              : "max-h-0 opacity-0 mb-0 pointer-events-none"
          }`}
        >
          <div className="space-y-4 border p-4 rounded shadow">
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              label="Image URL"
              value={serviceImageUrl}
              onChange={() => {}}
            />

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <label className="flex flex-col items-center justify-center px-4 py-4 bg-orange-50 text-orange-600 rounded-lg border-2 border-dashed border-orange-300 cursor-pointer hover:bg-orange-100 w-36 text-center">
                <RiVideoUploadLine className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">
                  {loading ? "Uploading..." : "Choose Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage({ file });
                  }}
                />
              </label>

              {serviceImageUrl && (
                <img
                  src={serviceImageUrl}
                  alt={title}
                  className="w-24 h-24 object-cover rounded-lg border border-orange-200"
                />
              )}
            </div>

            <Button onClick={handleAddOrUpdateService}>
              {editingServiceId ? "Update Service" : "Add Service"}
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <Loading className="h-72" />
      ) : (
        <div className="space-y-4">
          {services.map((service) => {
            if (service.id === editingServiceId) return;
            return (
              <div
                key={service.id}
                className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2"
              >
                <div className="flex flex-col items-center justify-center">
                  <h2 className="font-semibold">{service.title}</h2>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  {service.imageUrl && (
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-24 h-24 object-cover rounded mt-2"
                    />
                  )}
                </div>

                {isLoggedIn && (
                  <div className="flex flex-row sm:flex-col gap-2">
                    <Button
                      className="bg-yellow-500"
                      onClick={() => handleEditService(service)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  services: servicesMapSelector(state),
  loading: servicesLoadingSelector(state),
  imageUrl: uploadedImageUrlSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchServices: fetchServicesInitiatedAction,
  addService: createServiceInitiatedAction,
  updateService: updateServiceInitiatedAction,
  deleteService: deleteServiceInitiatedAction,
  uploadImage: imageUploadInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector> & { isLoggedIn: boolean };

export default connector(ServicePage);
