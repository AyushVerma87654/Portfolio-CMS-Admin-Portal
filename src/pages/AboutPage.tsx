import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import Button from "../components/Button";
import {
  aboutSelector,
  aboutLoadingSelector,
} from "../redux/selectors/aboutSelector";
import {
  fetchAboutInitiatedAction,
  updateAboutInitiatedAction,
} from "../redux/slice/aboutSlice";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import Loading from "../components/Loading";

const AboutPage: FC<ReduxProps> = ({
  about,
  loading,
  fetchAbout,
  updateAbout,
  isLoggedIn,
}) => {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  useEffect(() => {
    if (about?.content) {
      setContent(about.content);
    }
  }, [about]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!about?.id) return;

    updateAbout({
      about: {
        id: about.id,
        content,
      },
    });

    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4 min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">
            About
          </h1>

          {isLoggedIn && (
            <Button
              onClick={isEditing ? handleSave : handleEdit}
              disabled={loading}
            >
              {loading
                ? content
                  ? "Saving..."
                  : "Loading"
                : isEditing
                ? "Save"
                : "Edit"}
            </Button>
          )}
        </div>

        {loading ? (
          <Loading className="h-48" />
        ) : !isEditing ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {about?.content || "No content available."}
          </p>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="
              w-full rounded-md border border-gray-300 p-3
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            placeholder="Write something about yourself..."
          />
        )}
      </div>
    </div>
  );
};

/* ---------------- Redux ---------------- */

const mapStateToProps = (state: AppState) => ({
  about: aboutSelector(state),
  loading: aboutLoadingSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchAbout: fetchAboutInitiatedAction,
  updateAbout: updateAboutInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AboutPage);
