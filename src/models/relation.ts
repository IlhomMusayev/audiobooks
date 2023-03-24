import Attempts from "./attempts.model";
import Sessions from "./sessions.model";
import User from "./users.model";

export default function Relations() {
  User.hasMany(Sessions, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
    },
  });

  Sessions.belongsTo(User, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
    },
  });

  User.hasMany(Attempts, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
    },
  });

  Attempts.belongsTo(User, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
    },
  });
}
