import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  projectsMapSelector,
  projectsLoadingSelector,
} from "../redux/selectors/projectsSelector";
import {
  fetchProjectsInitiatedAction,
  createProjectInitiatedAction,
  deleteProjectInitiatedAction,
  updateProjectInitiatedAction,
} from "../redux/slice/projectsSlice";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { imageUploadInitiatedAction } from "../redux/slice/imageUploadSlice";
import { RiVideoUploadLine } from "react-icons/ri";
import { uploadedImageUrlSelector } from "../redux/selectors/imageUploadSelector";
import Loading from "../components/Loading";

const ProjectsPage: FC<ReduxProps> = ({
  projects,
  loading,
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  uploadImage,
  imageUrl,
  isLoggedIn,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const [githubLinks, setGithubLinks] = useState<
    { name: string; url: string }[]
  >([{ name: "", url: "" }]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    imageUrl && setCoverImageUrl(imageUrl);
  }, [imageUrl]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTechStack("");
    setLiveUrl("");
    setCoverImageUrl("");
    setGithubLinks([{ name: "", url: "" }]);
    setEditingProjectId("");
  };

  const handleAddGithubLink = () => {
    setGithubLinks([...githubLinks, { name: "", url: "" }]);
  };

  const handleGithubChange = (
    index: number,
    field: "name" | "url",
    value: string
  ) => {
    const updated = [...githubLinks];
    updated[index][field] = value;
    setGithubLinks(updated);
  };

  const handleRemoveGithubLink = (index: number) => {
    setGithubLinks(githubLinks.filter((_, i) => i !== index));
  };

  const handleAddOrUpdateProject = () => {
    if (!title.trim()) return;

    const projectData = {
      title: title.trim(),
      description: description.trim(),
      techStack: techStack.split(",").map((t) => t.trim()),
      liveUrl: liveUrl.trim(),
      coverImageUrl: coverImageUrl.trim(),
      githubLinks: githubLinks.filter((g) => g.name.trim() && g.url.trim()),
    };

    if (editingProjectId) {
      updateProject({ project: { id: editingProjectId, ...projectData } });
    } else {
      addProject({ project: projectData });
    }

    resetForm();
    setShowForm(false);
  };

  const handleEditProject = (project: any) => {
    setEditingProjectId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setTechStack(project.techStack.join(", "));
    setLiveUrl(project.liveUrl);
    setCoverImageUrl(project.coverImageUrl);
    setGithubLinks(
      project.githubLinks.length > 0
        ? project.githubLinks
        : [{ name: "", url: "" }]
    );
    setShowForm(true);
  };

  const handleDeleteProject = (id: string) => {
    deleteProject({ id });
  };

  const handleCancelForm = () => resetForm();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 min-w-0">
        <h1 className="text-2xl font-bold">Projects</h1>

        {isLoggedIn && (
          <div className="text-center">
            <Button
              onClick={() => {
                setShowForm((prev) => !prev);
                if (editingProjectId) handleCancelForm();
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
                  <span>Add New Project</span>
                </div>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Animated Add/Edit Project Form */}
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
              label="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input
              label="Tech Stack (comma separated)"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />

            <Input
              label="Live URL"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
            />

            <Input
              label="Cover Image URL"
              value={coverImageUrl}
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
                    if (file) {
                      uploadImage({ file });
                    }
                  }}
                />
              </label>

              {coverImageUrl && (
                <img
                  src={coverImageUrl}
                  alt="Uploaded preview"
                  className="w-24 h-24 object-cover rounded-lg border border-orange-200"
                />
              )}
            </div>

            {/* GitHub Links */}
            <div className="space-y-3">
              <h2 className="font-semibold">GitHub Links</h2>

              {githubLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 items-end"
                >
                  <Input
                    label="Name"
                    placeholder="Frontend / Backend"
                    value={link.name}
                    onChange={(e) =>
                      handleGithubChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    label="GitHub URL"
                    value={link.url}
                    onChange={(e) =>
                      handleGithubChange(index, "url", e.target.value)
                    }
                  />
                  {githubLinks.length > 1 && (
                    <Button
                      className="bg-red-500 h-12"
                      onClick={() => handleRemoveGithubLink(index)}
                    >
                      <IoClose size={22} />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                className="bg-green-500"
                onClick={handleAddGithubLink}
              >
                + Add GitHub Link
              </Button>
            </div>

            <Button onClick={handleAddOrUpdateProject}>
              {editingProjectId ? "Update Project" : "Add Project"}
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <Loading className="h-72" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            if (editingProjectId === project.id) return;
            return (
              <div key={project.id} className="bg-white p-4 rounded shadow">
                <img
                  src={project.coverImageUrl}
                  alt={project.title}
                  className="w-40 h-40 object-cover rounded mb-2"
                />
                <h2 className="font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-600">{project.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Tech: {project?.techStack.join(", ")}
                </p>
                <div className="mt-2 space-y-1">
                  {project.githubLinks.map((g, i) => (
                    <a
                      key={i}
                      href={g.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-blue-500 text-sm underline"
                    >
                      Github {g.name}
                    </a>
                  ))}
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 text-sm underline block mt-2"
                  >
                    Live Demo
                  </a>
                )}

                <div className="flex gap-2 mt-3">
                  {isLoggedIn && (
                    <>
                      <Button
                        className="bg-yellow-500"
                        onClick={() => handleEditProject(project)}
                      >
                        Edit
                      </Button>

                      <Button
                        className="bg-red-500"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  projects: projectsMapSelector(state),
  loading: projectsLoadingSelector(state),
  imageUrl: uploadedImageUrlSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchProjects: fetchProjectsInitiatedAction,
  addProject: createProjectInitiatedAction,
  updateProject: updateProjectInitiatedAction,
  deleteProject: deleteProjectInitiatedAction,
  uploadImage: imageUploadInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ProjectsPage);
