import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  skillsMapSelector,
  skillsLoadingSelector,
} from "../redux/selectors/skillsSelector";
import {
  fetchSkillsInitiatedAction,
  createSkillInitiatedAction,
  updateSkillInitiatedAction,
  deleteSkillInitiatedAction,
} from "../redux/slice/skillsSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import { Skill } from "../models/skill";
import Loading from "../components/Loading";

const SkillsPage: FC<ReduxProps> = ({
  skills,
  loading,
  fetchSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  isLoggedIn,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string>("");
  const [newSkillName, setNewSkillName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const resetForm = () => {
    setNewSkillName("");
    setCategory("");
    setEditingSkillId("");
    setShowForm(false);
  };

  const handleAddOrUpdateSkill = () => {
    if (!isLoggedIn) return;

    const trimmedName = newSkillName.trim();
    const trimmedCategory = category.trim();
    if (!trimmedName || !trimmedCategory) return;

    const duplicate = skills.find(
      (s) =>
        s.name.toLowerCase() === trimmedName.toLowerCase() &&
        s.category.toLowerCase() === trimmedCategory.toLowerCase() &&
        s.id !== editingSkillId
    );
    if (duplicate) {
      alert(
        `Skill "${trimmedName}" already exists in category "${trimmedCategory}"`
      );
      return;
    }

    if (editingSkillId) {
      updateSkill({
        skill: {
          id: editingSkillId,
          name: trimmedName,
          category: trimmedCategory,
        },
      });
    } else {
      addSkill({ skill: { name: trimmedName, category: trimmedCategory } });
    }

    resetForm();
  };

  const handleEditSkill = (skill: Skill) => {
    if (!isLoggedIn) return;
    setEditingSkillId(skill.id);
    setNewSkillName(skill.name);
    setCategory(skill.category);
    setShowForm(true);
  };

  const handleDeleteSkill = (id: string) => {
    if (!isLoggedIn) return;
    deleteSkill({ id });
  };

  const handleCancel = () => resetForm();

  const skillsByCategory = skills.reduce(
    (acc: { [key: string]: Skill[] }, skill) => {
      const cat = skill.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {}
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 min-w-0">
        <h1 className="text-2xl font-bold">Skills</h1>

        {isLoggedIn && (
          <div className="flex items-center justify-center">
            {showForm ? (
              <div className="flex items-center justify-center gap-2">
                <Button
                  onClick={handleCancel}
                  className="bg-gray-500 flex items-center gap-1"
                >
                  <IoClose size={20} />
                  Cancel
                </Button>
                <Button
                  onClick={handleAddOrUpdateSkill}
                  className="bg-blue-500"
                >
                  {editingSkillId ? "Update Skill" : "Add Skill"}
                </Button>
              </div>
            ) : (
              <Button
                className="flex items-center gap-2"
                onClick={() => setShowForm(true)}
              >
                <FaPlus />
                <span>Add New Skill</span>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      {isLoggedIn && showForm && (
        <div className="transition-all duration-300 mb-6">
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                label="Skill Name"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="flex-1"
              />
              <Input
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-40"
              />
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <Loading className="h-72" />
      ) : (
        <div className="space-y-6">
          {Object.entries(skillsByCategory).map(([cat, skillsInCategory]) => (
            <div key={cat}>
              <h2 className="text-lg font-semibold mb-2 text-center">{cat}</h2>
              <ul className="space-y-2">
                {skillsInCategory.map((skill) => (
                  <li
                    key={skill.id}
                    className="bg-white p-3 rounded shadow flex flex-col sm:flex-row justify-between items-center gap-4 w-full min-w-0"
                  >
                    <span>{skill.name}</span>

                    {isLoggedIn && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditSkill(skill)}
                          className="bg-yellow-500"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="bg-red-500"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  skills: skillsMapSelector(state),
  loading: skillsLoadingSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchSkills: fetchSkillsInitiatedAction,
  addSkill: createSkillInitiatedAction,
  updateSkill: updateSkillInitiatedAction,
  deleteSkill: deleteSkillInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SkillsPage);
