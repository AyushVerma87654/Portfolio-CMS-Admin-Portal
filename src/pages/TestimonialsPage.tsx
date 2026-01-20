import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  testimonialsMapSelector,
  testimonialsLoadingSelector,
} from "../redux/selectors/testimonialsSelector";
import {
  fetchTestimonialsInitiatedAction,
  createTestimonialInitiatedAction,
  updateTestimonialInitiatedAction,
  deleteTestimonialInitiatedAction,
} from "../redux/slice/testimonialsSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { imageUploadInitiatedAction } from "../redux/slice/imageUploadSlice";
import { RiVideoUploadLine } from "react-icons/ri";
import { uploadedImageUrlSelector } from "../redux/selectors/imageUploadSelector";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import Loading from "../components/Loading";

const TestimonialPage: FC<ReduxProps> = ({
  testimonials,
  loading,
  fetchTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  uploadImage,
  imageUrl,
  isLoggedIn,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string>("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrlState, setImageUrlState] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  useEffect(() => {
    if (imageUrl) setImageUrlState(imageUrl);
  }, [imageUrl]);

  const resetForm = () => {
    setName("");
    setDesignation("");
    setMessage("");
    setImageUrlState("");
    setEditingTestimonialId("");
  };

  const handleAddOrUpdateTestimonial = () => {
    if (!name.trim() || !designation.trim() || !message.trim()) return;

    const payload = {
      name: name.trim(),
      designation: designation.trim(),
      message: message.trim(),
      imageUrl: imageUrlState.trim(),
    };

    if (editingTestimonialId) {
      updateTestimonial({
        testimonial: { id: editingTestimonialId, ...payload },
      });
    } else {
      addTestimonial({ testimonial: payload });
    }

    resetForm();
    setShowForm(false);
  };

  const handleEditTestimonial = (testimonial: any) => {
    setEditingTestimonialId(testimonial.id);
    setName(testimonial.name);
    setDesignation(testimonial.designation);
    setMessage(testimonial.message);
    setImageUrlState(testimonial.imageUrl || "");
    setShowForm(true);
  };

  const handleDeleteTestimonial = (id: string) => {
    deleteTestimonial({ id });
  };

  const handleCancelForm = () => resetForm();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 min-w-0">
        <h1 className="text-2xl font-bold">Testimonials</h1>

        {isLoggedIn && (
          <div className="text-center">
            <Button
              onClick={() => {
                setShowForm((prev) => !prev);
                if (editingTestimonialId) handleCancelForm();
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
                    {editingTestimonialId
                      ? "Edit Testimonial"
                      : "Add Testimonial"}
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
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <Input
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Input
              label="Avatar / Image URL"
              value={imageUrlState}
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

              {imageUrlState && (
                <img
                  src={imageUrlState}
                  alt={name}
                  className="w-24 h-24 object-cover rounded-lg border border-orange-200"
                />
              )}
            </div>

            <Button onClick={handleAddOrUpdateTestimonial}>
              {editingTestimonialId ? "Update Testimonial" : "Add Testimonial"}
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <Loading className="h-72" />
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => {
            if (t.id === editingTestimonialId) return;
            return (
              <div
                key={t.id}
                className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2 outline"
              >
                <div className="flex flex-col items-center">
                  <h2 className="font-semibold">{t.name}</h2>
                  <p className="text-sm text-gray-600">{t.designation}</p>
                  <p className="text-sm mt-1">{t.message}</p>
                  {t.imageUrl && (
                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="w-24 h-24 object-cover rounded mt-2"
                    />
                  )}
                </div>

                {isLoggedIn && (
                  <div className="flex flex-row sm:flex-col gap-4 sm:gap-2">
                    <Button
                      className="bg-yellow-500"
                      onClick={() => handleEditTestimonial(t)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500"
                      onClick={() => handleDeleteTestimonial(t.id)}
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
  testimonials: testimonialsMapSelector(state),
  loading: testimonialsLoadingSelector(state),
  imageUrl: uploadedImageUrlSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchTestimonials: fetchTestimonialsInitiatedAction,
  addTestimonial: createTestimonialInitiatedAction,
  updateTestimonial: updateTestimonialInitiatedAction,
  deleteTestimonial: deleteTestimonialInitiatedAction,
  uploadImage: imageUploadInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector> & { isLoggedIn: boolean };

export default connector(TestimonialPage);
