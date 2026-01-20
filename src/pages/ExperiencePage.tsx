import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  experienceMapSelector,
  experienceLoadingSelector,
} from "../redux/selectors/experienceSelector";
import {
  fetchExperiencesInitiatedAction,
  createExperienceInitiatedAction,
  updateExperienceInitiatedAction,
  deleteExperienceInitiatedAction,
} from "../redux/slice/experienceSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import Loading from "../components/Loading";

const ExperiencePage: FC<ReduxProps> = ({
  experiences,
  loading,
  fetchExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
  isLoggedIn,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string>("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const resetForm = () => {
    setCompany("");
    setRole("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setCurrentlyWorking(false);
    setEditingExperienceId("");
  };

  const handleAddOrUpdateExperience = () => {
    if (!company.trim() || !role.trim() || !startDate.trim()) return;

    const payload = {
      company: company.trim(),
      role: role.trim(),
      description: description.trim(),
      startDate: startDate.trim(),
      endDate: currentlyWorking ? null : endDate.trim() || null,
      currentlyWorking,
    };

    if (editingExperienceId) {
      updateExperience({ experience: { id: editingExperienceId, ...payload } });
    } else {
      addExperience({ experience: payload });
    }

    resetForm();
    setShowForm(false);
  };

  const handleEditExperience = (experience: any) => {
    setEditingExperienceId(experience.id);
    setCompany(experience.company);
    setRole(experience.role);
    setDescription(experience.description);
    setStartDate(experience.startDate);
    setEndDate(experience.endDate || "");
    setCurrentlyWorking(experience.currentlyWorking);
    setShowForm(true);
  };

  const handleDeleteExperience = (id: string) => {
    deleteExperience({ id });
  };

  const handleCancelForm = () => resetForm();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 min-w-0">
        <h1 className="text-2xl font-bold">Experience</h1>

        {isLoggedIn && (
          <div className="text-center">
            <Button
              onClick={() => {
                setShowForm((prev) => !prev);
                if (editingExperienceId) handleCancelForm();
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
                    {editingExperienceId ? "Edit Experience" : "Add Experience"}
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
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Input
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <Input
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {!currentlyWorking && (
              <Input
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            )}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={currentlyWorking}
                onChange={(e) => setCurrentlyWorking(e.target.checked)}
                id="currentlyWorking"
              />
              <label htmlFor="currentlyWorking">Currently Working</label>
            </div>

            <Button onClick={handleAddOrUpdateExperience}>
              {editingExperienceId ? "Update Experience" : "Add Experience"}
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <Loading className="h-72" />
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => {
            if (exp.id === editingExperienceId) return;
            return (
              <div
                key={exp.id}
                className="bg-white p-4 rounded shadow flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center sm:items-start"
              >
                <div>
                  <h2 className="font-semibold">{exp.role}</h2>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  <p className="text-xs text-gray-500">
                    {exp.startDate} -{" "}
                    {exp.currentlyWorking ? "Present" : exp.endDate}
                  </p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>

                {isLoggedIn && (
                  <div className="flex flex-row sm:flex-col gap-4 sm:gap-2">
                    <Button
                      className="bg-yellow-500"
                      onClick={() => handleEditExperience(exp)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500"
                      onClick={() => handleDeleteExperience(exp.id)}
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
  experiences: experienceMapSelector(state),
  loading: experienceLoadingSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchExperiences: fetchExperiencesInitiatedAction,
  addExperience: createExperienceInitiatedAction,
  updateExperience: updateExperienceInitiatedAction,
  deleteExperience: deleteExperienceInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector> & { isLoggedIn: boolean };

export default connector(ExperiencePage);
