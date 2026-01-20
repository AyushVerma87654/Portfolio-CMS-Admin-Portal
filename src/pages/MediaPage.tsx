import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AppState } from "../redux/store";
import {
  mediaMapSelector,
  mediaLoadingSelector,
} from "../redux/selectors/mediaSelector";
import {
  fetchMediaInitiatedAction,
  deleteMediaInitiatedAction,
  uploadMediaInitiatedAction,
  updateMediaInitiatedAction,
} from "../redux/slice/mediaSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import Loading from "../components/Loading";

const MediaPage: FC<ReduxProps> = ({
  media,
  loading,
  fetchMedia,
  addMedia,
  updateMedia,
  deleteMedia,
  isLoggedIn,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingMediaId, setEditingMediaId] = useState<string>("");

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const resetForm = () => {
    setFileName("");
    setFile(null);
    setEditingMediaId("");
  };

  const handleAddOrUpdateMedia = () => {
    if (!file && !editingMediaId) return;

    if (editingMediaId) {
      file &&
        updateMedia({
          media: {
            id: editingMediaId,
            fileName: fileName.trim(),
            file,
          },
        });
    } else {
      file &&
        addMedia({
          media: {
            fileName: fileName.trim(),
            file: file!,
          },
        });
    }

    resetForm();
    setShowForm(false);
  };

  const handleEditMedia = (item: any) => {
    setEditingMediaId(item.id);
    setFileName(item.fileName);
    setFile(null);
    setShowForm(true);
  };

  const handleDeleteMedia = (id: string) => {
    deleteMedia({ id });
  };

  const handleCancelForm = () => resetForm();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 min-w-0">
        <h1 className="text-2xl font-bold">Media</h1>

        {isLoggedIn && (
          <div className="text-center">
            <Button
              onClick={() => {
                setShowForm((prev) => !prev);
                if (editingMediaId) handleCancelForm();
              }}
              className={showForm ? "bg-gray-500" : ""}
            >
              {showForm ? (
                <div className="flex items-center gap-2">
                  <IoClose size={22} />
                  <span>Cancel</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaPlus />
                  <span>{editingMediaId ? "Edit Media" : "Add New Media"}</span>
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
              ? "max-h-100 opacity-100 mb-6"
              : "max-h-0 opacity-0 mb-0 pointer-events-none"
          }`}
        >
          <div className="space-y-4 border p-4 rounded shadow text-center">
            <Input
              label="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />

            <label className="flex flex-col items-center justify-center px-4 py-4 bg-orange-50 text-orange-600 rounded-lg border-2 border-dashed border-orange-300 cursor-pointer hover:bg-orange-100 w-36 text-center">
              <RiVideoUploadLine className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">
                {editingMediaId ? "Replace File (optional)" : "Choose File"}
              </span>
              <input
                type="file"
                accept="*/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const selectedFile = e.target.files[0];
                    setFile(selectedFile);

                    if (!fileName.trim()) {
                      setFileName(selectedFile.name);
                    }
                  }
                }}
              />
            </label>

            {file && (
              <p className="text-sm text-gray-500">Selected: {file.name}</p>
            )}

            <Button onClick={handleAddOrUpdateMedia}>
              {editingMediaId ? "Update Media" : "Upload Media"}
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <Loading className="h-72" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {media.map((item) => {
            if (editingMediaId === item.id) return null;

            return (
              <div
                key={item.id}
                className="bg-white rounded shadow overflow-hidden flex flex-col"
              >
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-32 flex items-center justify-center bg-gray-300 hover:opacity-90 transition"
                >
                  {item.fileName.match(/\.(png|jpe?g|gif)$/i) ? (
                    <img
                      src={item.fileUrl}
                      alt={item.fileName}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center gap-4 px-2 text-sm font-medium">
                      <span>{item.fileName}</span>
                      <span>{item.fileType.toUpperCase()}</span>
                    </div>
                  )}
                </a>

                {isLoggedIn && (
                  <div className="p-2 flex gap-2 justify-center">
                    <Button
                      className="bg-yellow-500"
                      onClick={() => handleEditMedia(item)}
                    >
                      Edit
                    </Button>

                    <Button
                      className="bg-red-500"
                      onClick={() => handleDeleteMedia(item.id)}
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
  media: mediaMapSelector(state),
  loading: mediaLoadingSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchMedia: fetchMediaInitiatedAction,
  addMedia: uploadMediaInitiatedAction,
  updateMedia: updateMediaInitiatedAction,
  deleteMedia: deleteMediaInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector> & { isLoggedIn: boolean };

export default connector(MediaPage);
